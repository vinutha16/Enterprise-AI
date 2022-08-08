import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import * as XLSX from "xlsx";
import { Subject } from "rxjs";
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatInput } from '@angular/material/input';
import { UploadFileService } from '../services/upload-file.service';
import { Globals } from '../../app/services/globals';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UfileNameChangeDialogComponent } from '../update-dataset/ufile-name-change-dialog/ufile-name-change-dialog.component';

@Component({
  selector: 'app-update-dataset',
  templateUrl: './update-dataset.component.html',
  styleUrls: ['./update-dataset.component.scss']
})
export class UpdateDatasetComponent implements OnInit {
  keys: string[];
  fileName: any;
  dataSheet = new Subject();
  @ViewChild("inputFile") inputFile: ElementRef;
  @ViewChild('TABLE') table: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChildren(MatInput, { read: ElementRef }) inputs: QueryList<ElementRef>;
  isExcelFile: boolean;
  show: boolean;
  header: any = [];
  selectedFiles: FileList;
  selected: File;
  currentFile: File;
  uploadFileId: any;
  sucessMsg: any;
  dragdropselectedfile: File;
  spinnerstaus: boolean;
  downloadURL = '';
  changefileName: any;
  oldFileName: any;
  constructor(private uploadService: UploadFileService, public dialog: MatDialog, private globals: Globals, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if (this.globals.modelName == 'bais') {
      this.downloadURL = "assets/bais/Bais_Sampledata.csv";
    }
  }

  globalValue() {
    switch (this.globals.modelName) {

      case 'bais':
        this.downloadURL = "";
        this.downloadURL = "assets/bais/Bais_Sampledata.csv";
        break;
      case 'customersentiment':

        this.downloadURL = "";
        this.downloadURL = "assets/customersentiment/Customersentiment_Sampledata.csv";
        break;

      default:
        this.downloadURL = "";
        this.downloadURL = "assets/bais/Bais_Sampledata.csv";
        break;
    }
    this.removeData();
  }
  refreshUpdate() {
    this.removeData();

  }


  fileBrowseHandler(evt) {
    let data, header;
    const target: DataTransfer = <DataTransfer>evt.target;
    this.isExcelFile = !!target.files[0].name.match(/(.xls|.xlsx|.csv)/);

    this.fileName = target.files[0].name
    console.log("file.."+this.fileName)
    if (target.files.length > 1) {
      this.inputFile.nativeElement.value = "";
    }
    if (this.isExcelFile) {
      this.show = true;
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: "binary" });
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        data = XLSX.utils.sheet_to_json(ws);

      };

      reader.readAsBinaryString(target.files[0]);
      reader.onloadend = e => {
        this.keys = Object.keys(data[0]);
        this.selectedFiles = evt.target.files;
        this.currentFile = this.selectedFiles.item(0);
        this.uploadFileId = "";
        this.getFileExistorNot(this.fileName)
      };
    } else {
      this.inputFile.nativeElement.value = "";
      this.removeData();
      this.openSnackBar('upload only Excel file or Csv file', "")
    }
  }

  filesDropped(targetInput: Array<File>): void {
    console.log(targetInput)
    this.fileName = targetInput[0].name;
    this.isExcelFile = !!targetInput[0].name.match(/(.xls|.xlsx|.csv)/);
    let x = this.fileName.split('.')
    console.log(this.fileName)
    if (targetInput.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    if (this.isExcelFile) {
      this.dragdropselectedfile = targetInput[0];
      const reader: FileReader = new FileReader();
      this.readerExcel(reader);
      reader.readAsArrayBuffer(targetInput[0]);
    }
    else {
      this.removeData()
      this.openSnackBar('upload only Excel file or Csv file', "")
    }
  }
  readerExcel(reader, index = 0) {
    this.show = true;
    reader.onload = (e: any) => {
      const data: string = e.target.result;
      const wBook: XLSX.WorkBook = XLSX.read(data, { type: 'array' });
      const wsname: string = wBook.SheetNames[index];
      const ws: XLSX.WorkSheet = wBook.Sheets[wsname];
      let data1 = XLSX.utils.sheet_to_json(ws);
      // console.log("data", JSON.stringify(data1))
      this.keys = Object.keys(data1[0]);
      this.currentFile = this.dragdropselectedfile;
      this.getFileExistorNot(this.fileName)

    };
  }
  getFileExistorNot(fileName) {
    //console.log("fileName,,,," + fileName);
    this.uploadService.getfileExistsValue(fileName).subscribe(
      (resData) => {
        var data = resData;
        this.oldFileName = "";
        this.oldFileName = fileName;
        if (data.fileExists == true) {
          this.openFileNameDialog(this.oldFileName)
        } else {
          this.uploadefileApi(this.oldFileName)
        }
      })
  };


  openFileNameDialog(filename): void {
    const dialogRef = this.dialog.open(UfileNameChangeDialogComponent, {
      width: '543px',
      height: '320px',
      data: {
        uploadeFileName: filename,
        dispplayFileName: filename
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.changefileName = result;

      if (this.changefileName == undefined) {
        this.removeData();
      } else {
        var replace;
        if (this.oldFileName == this.changefileName) {
          replace = "Y";
          this.uploadefileNameChangeApi(this.changefileName, replace)
        } else {
          this.getFileExistorNot(this.changefileName)
        }

      }


    });
  };

  uploadefileNameChangeApi(changefileName, replace) {

    this.spinnerstaus = true;
    const screenname = "upload";
    this.fileName = changefileName;
    const formData: FormData = new FormData();
    formData.append('file', this.currentFile, changefileName);
    this.uploadService.upload(formData, replace, screenname).subscribe(
      (resData) => {
        var data = resData;
        this.uploadFileId = data.fileId;
        this.sucessMsg = data.message;
        this.spinnerstaus = false;
        if (this.sucessMsg == "Uploaded the file successfully") {
          // console.log("id..........." + this.uploadFileId);
          this.openDialog();
          this.removeData();
        }

      }
    )
  }
  uploadefileApi(changefileName) {
    this.spinnerstaus = true;
    this.fileName = changefileName;
    const formData: FormData = new FormData();
    formData.append('file', this.currentFile, changefileName);
    const replace = "";
    const screenname = "upload";
    this.uploadService.upload(formData, replace, screenname).subscribe(
      (resData) => {
        var data = resData;
        this.uploadFileId = data.fileId;
        this.sucessMsg = data.message;
        this.spinnerstaus = false;
        //console.log("daat................" + JSON.stringify(data))
        //console.log("daat................" + this.uploadFileId)
        if (this.sucessMsg == "Uploaded the file successfully") {
          console.log("id..........." + this.uploadFileId);
          this.openDialog();
          this.removeData();
        }
      }
    );
  };

  openDialog(): void {
    const headerdata = []
    for (var i = 0; i < this.keys.length; i++) {
      var obj = new Object();
      obj['key'] = this.keys[i];
      obj['desc'] = ''
      headerdata.push(obj)
    }
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '750px',
      height: '610px',
      data: {
        filename: this.changefileName,
        headerData: headerdata,
        id: this.uploadFileId
      }
    })
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,

    });
  }

  removeData() {
    this.inputFile.nativeElement.value = "";
    this.dataSheet.next(null);
    this.keys = null;
    this.fileName = "";
    this.show = false;
    this.uploadFileId = "";
    this.sucessMsg = "";
  };

}
