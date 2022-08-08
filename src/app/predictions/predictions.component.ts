import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { UploadFileService } from '../services/upload-file.service';
import { RestapiService } from '../services/rest-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { Globals } from '../../app/services/globals';
import { MatSnackBar } from '@angular/material/snack-bar';
import { variable } from '@angular/compiler/src/output/output_ast';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ViewReportDialogComponent } from '../view-report-dialog/view-report-dialog.component';
import { UfileNameChangeDialogComponent } from '../update-dataset/ufile-name-change-dialog/ufile-name-change-dialog.component';
export interface PeriodicElement {
  predictionDataSetName: string,
  predictionFileName: string;
  predictionId: string;
  predictionStatus: string;
}

@Component({
  selector: 'app-predictions',
  templateUrl: './predictions.component.html',
  styleUrls: ['./predictions.component.scss']
})
export class PredictionsComponent implements OnInit {
  displayedColumns: string[] = ['predictionDataSetName', 'predictionStatus', 'predictionFileName', 'predictionId'];
  dataSource;
  show: boolean;
  showTable: boolean
  fileName: any;
  fileNameUpload: any;
  isExcelFile: boolean;
  selectedFiles: FileList;
  currentFile: File;
  modelData: any = [];
  downloadArray: any = [];
  modelTableData: any = [];
  modelTableFilterData: any = [];
  DataSetModel: string;
  selectedDataSetModel: string;
  predictionsSampleDownData: any;
  makePredictionsRequest: any = [];
  newModelTableData: any = [];
  disableMake: boolean = true;
  sucessMsg: any;
  makePredictionsmodel: any;
  makePredictionsipFile: any;
  fileNameUploadBaisCom: any;
  ionUploadIndex: any;
  oldFileName: any;
  changefileName: any;
  dataSetFileId: any;
  modelId: any;
  dataSetName: any;
  modelOriginalName: any;
  modelUniqueName: any;
  uploadePredictionFileNameSu: any;
  modelReviewField: any;
  modelS3Location: any;
  tabName: any;
  @ViewChild("inputFile") inputFile: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private uploadService: UploadFileService, private apiservice: RestapiService, private globals: Globals, private _snackBar: MatSnackBar, public dialog: MatDialog) {
    this.getPredictionsModel();
    this.uploadService.getTabNameData.subscribe(data => {
      this.tabName = data;
    })
    // this.getPredictionsTableData();

  }

  ngOnInit(): void {
    this.uploadService.getTabNameData.subscribe(data => {
      this.tabName = data;
    })
    this.getPredictionsTableData();
  }

  refreshPredictions() {
    this.getPredictionsModel();
    this.getPredictionsTableData();
    this.DataSetModel = "";
    this.showTable = false;
    this.fileNameUpload = "";
    this.disableMake = true;
    this.sucessMsg = "";
    this.makePredictionsipFile = "";
    this.fileNameUploadBaisCom = "";
  }
  globalValue() {
    this.getPredictionsModel();
    this.getPredictionsTableData();
    this.DataSetModel = "";
    //this.showTable = false;
    this.fileNameUpload = "";
    this.disableMake = true;
    this.sucessMsg = "";
    this.makePredictionsipFile = "";
    this.fileNameUploadBaisCom = "";
    this.modelReviewField = "";



  }


  // onChange(deviceValue) {

  // }
  fileBrowseHandler(evt) {
    this.fileNameUploadBaisCom = "";
    this.fileNameUpload = "";
    // this.isExcelFile='';
    const target: DataTransfer = <DataTransfer>evt.target;
    this.isExcelFile = !!target.files[0].name.match(/(.xls|.xlsx|.csv)/);
    //alert(target.files[0].name)
    this.fileNameUpload = target.files[0].name
    let baisFileUploade = this.fileNameUpload.split('.')
    this.fileNameUploadBaisCom = baisFileUploade[0]



    if (target.files.length > 1) {
      this.inputFile.nativeElement.value = "";
      throw new Error('Cannot use multiple files');


    }
    if (this.isExcelFile) {
      this.show = true;
      //this.selectedFiles='FileList';
      this.selectedFiles = evt.target.files;
      this.currentFile = this.selectedFiles.item(0);
      console.log(this.currentFile)
      this.getFileExistorNot(this.fileNameUpload)

    }
    else {
      // alert("upload only Excel file or Csv file");
      this.inputFile.nativeElement.value = "";
      this.fileNameUploadBaisCom = "";
      this.fileNameUpload = "";
      this.openSnackBar('upload only Excel file or Csv file', "")
    }
  }
  filesDropped(targetInput: Array<File>): void {
    // console.log(targetInput)
    this.fileNameUploadBaisCom = "";
    this.fileNameUpload = "";
    this.fileNameUpload = targetInput[0].name;
    // console.log("this.fileNameUpload .."+this.fileNameUpload )
    let baisFileUploade = this.fileNameUpload.split('.')
    // console.log("this.baisFileUploade .."+baisFileUploade )
    this.fileNameUploadBaisCom = baisFileUploade[0];
    //  console.log("this.fileNameUploadBaisCom .."+this.fileNameUploadBaisCom )

    this.isExcelFile = !!targetInput[0].name.match(/(.xls|.xlsx|.csv)/);



    if (targetInput.length !== 1) {
      throw new Error('Cannot use multiple files');

    }
    if (this.isExcelFile) {
      // this.selectedFiles = targetInput;
      //console.log(this.selectedFiles)
      //console.log("formdata.." + JSON.stringify(this.selectedFiles))
      this.show = true;
      this.currentFile = targetInput[0];
      this.getFileExistorNot(this.fileNameUpload)

    } else {
      //alert("upload only Excel file or Csv file")
      this.openSnackBar('upload only Excel file or Csv file', "")
      this.fileNameUploadBaisCom = "";
      this.fileNameUpload = "";
    }
  };
  getFileExistorNot(fileName) {
    this.uploadService.getfileExistsValue(fileName).subscribe(
      (resData) => {
        var data = resData;
        console.log(data.fileExists)
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
        //targetVariable: this.targetVariable,
        //targetVariable: this.DataSetOutputVariable,
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.changefileName = "";
      this.changefileName = result;
      //var dataSet=this.result.dataSetName.name;
      //var targetVariable=this.result .targetVariable;
      console.log("res.." + JSON.stringify(this.changefileName))
      if (this.changefileName == undefined) {
        this.removeData();
      } else {
        var replace;
        if (this.oldFileName == this.changefileName) {
          //replace file location
          replace = "Y";
          this.uploadefileNameChangeApi(this.changefileName, replace)
        } else {
          this.getFileExistorNot(this.changefileName)
          //file name change
          //replace="n";
        }
      }

    });
  };

  uploadefileNameChangeApi(changefileName, replace) {

    //const replace="n";
    this.fileNameUpload = changefileName;
    const screenname = "prediction";
    const formData: FormData = new FormData();
    formData.append('file', this.currentFile, changefileName);
    this.uploadService.uploadPredictions(formData, replace, screenname).subscribe(
      (resData) => {
        var data = resData;
        // console.log("daat" + data)
        this.sucessMsg = data.message;
        if (this.sucessMsg == "Uploaded the file successfully") {
          this.makePredictionsipFile = data.bucketLocation;
          this.disableMake = false;
        }
      }
    )
  }
  uploadefileApi(changefileName) {
    this.fileNameUpload = changefileName;
    const formData: FormData = new FormData();
    formData.append('file', this.currentFile, changefileName);
    const replace = "";
    const screenname = "prediction";
    this.uploadService.uploadPredictions(formData, replace, screenname).subscribe(
      (resData) => {
        var data = resData;
        //console.log("daat" + data)
        this.sucessMsg = data.message;
        this.uploadePredictionFileNameSu = data.fileName
        //if (this.sucessMsg == "Uploaded the file successfully") {
        this.makePredictionsipFile = data.bucketLocation;
        this.disableMake = false;
        this.removeData();
        //}
      }
    );
  };

  getPredictionsModel() {
    if (this.tabName != null) {
      this.apiservice.predictionsModel(this.tabName).subscribe(
        (resData) => {
          var data = resData;
          this.modelData = data;
          // console.log("daat" + data[0].name)
        }
      );
    }

  }
  onChangeDataModelSelect(data) {
    //console.log(data.name);
    // console.log(data.bucketLocation);
    this.dataSetFileId = "";
    this.modelId = "";
    this.dataSetName = "";
    this.modelOriginalName = "";
    this.modelUniqueName = "";
    this.modelReviewField = "";
    this.modelS3Location = "";

    this.dataSetFileId = data.fileId;
    this.modelId = data.modelId;
    this.dataSetName = data.dataSetName;
    this.modelOriginalName = data.modelOriginalName;
    this.modelUniqueName = data.modelUniqueName;
    this.modelReviewField = data.modelReviewField;
    this.modelS3Location = data.modelS3Location;

    //let modeldataMake=data.bucketLocation.split('.')
    this.makePredictionsmodel = data.bucketLocation;
    //console.log("this.makePredictionsmode" + this.makePredictionsmodel);
    this.showTable = false;
    this.fileNameUpload = "";
    this.disableMake = true;
  }

  makePredictionsData() {
    if (this.modelUniqueName != undefined) {
      let formdata = {
        "dataSetFileId": this.dataSetFileId,
        "modelId": this.modelId,
        "dataSetName": this.dataSetName,
        "modelOriginalName": this.modelOriginalName,
        "modelUniqueName": this.modelUniqueName,
        "predictionDataSetName": this.uploadePredictionFileNameSu,
        "modelReviewField": this.modelReviewField
      };
      //this.getPredictionsTableData();
      //this.showTable = true;
      //console.log("datat..." + JSON.stringify(formdata))
      this.apiservice.makePredictionsDataModel(formdata).subscribe(
        (resData) => {
          var data = resData;
          this.makePredictionsRequest = resData
          //console.log(JSON.stringify(this.makePredictionsRequest.message));
          // if (this.makePredictionsRequest.message == "Successfully predicted the model !!") {
          //   this.openSnackBar('Successfully Created Predictions Model', "")
          this.getPredictionsTableData();
          this.disableMake = true;
          this.DataSetModel = "";
          //   //this.showTable = true;
          // }
          switch (data.message) {
            case 'Predictions already generated for these fields, please check the table below':
              this.openSnackBar('Predictions already generated for these fields, please check the table below', "")
              break;
            case 'Prediction creation in progress !!':
              this.openSnackBar('Prediction report creation in progress !!', "")
              break;
            case 'Model prediction unsuccessfull !!':
              this.openSnackBar('Model prediction unsuccessfull !!', "")
              break;
            case 'Client error !!':
              this.openSnackBar('Client error !!', "")
              break;

            default:
              //this.openSnackBar('upload only Excel file or Csv file', "")
              break;
          }
        })
    } else {
      this.openSnackBar('Plase Select Model Name', "")
      this.disableMake = true;
      this.removeData();
    }
  }
  getPredictionsTableData() {

    this.apiservice.predictionsTable().subscribe(
      (resData) => {
        this.dataSource = "";
        this.newModelTableData = "";
        let data = resData;
        this.newModelTableData = resData.reverse()
        //console.log(JSON.stringify(data));
        //console.log("table.."+data.dataSetFileInfo)
        this.dataSource = new MatTableDataSource<PeriodicElement>(this.newModelTableData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      }
    );
  }
  PredictionsDataDownload() {
    //console.log("this.predictionsSampleDownData" + this.predictionsSampleDownData)
    if (this.modelUniqueName != undefined) {
      var Filename = this.modelUniqueName
      this.apiservice.predictionsSampleDownload(this.modelUniqueName, this.modelS3Location).subscribe(
        (resData) => {
          //console.log(resData);

          const a = document.createElement('a');
          document.body.appendChild(a);
          const blob = new Blob([resData], { type: 'application/octet-stream' }),
            url = window.URL.createObjectURL(blob);
          // console.log(blob);
          a.href = url;
          a.download = Filename + '.csv';
          a.click();
          window.URL.revokeObjectURL(url);
        }
      );
    } else {
      this.openSnackBar('Plase Select Model Name', "")
    }

  }
  TableFiledownload(data) {
    var predictionFileName = data.predictionFileName;
    var predictionFileLocation = data.predictionFileLocation;

    var Filename = predictionFileName
    this.apiservice.predictionsTableFileDownload(predictionFileName, predictionFileLocation).subscribe(
      (resData) => {
        const a = document.createElement('a');
        document.body.appendChild(a);
        const blob = new Blob([resData], { type: 'application/octet-stream' }),
          url = window.URL.createObjectURL(blob);
        //console.log(blob);

        a.href = url;
        a.download = Filename;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    );

  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,

    });
  }

  viewreport(data) {
    let newdata = {
      "datafileid": data.dataSetFileId,
      "predid": data.predictionId,
      "screenName": "predictions"
    }
    const dialogRef = this.dialog.open(ViewReportDialogComponent, {
      width: '800px',
      // height: '460px',
      data: {
        inputDataSet: newdata,
        //inputVariables: this.inputVariable,
        //targetVariable: this.DataSetOutputVariable,
      }
    })
  }
  removeData() {
    this.inputFile.nativeElement.value = "";
    this.fileName = "";
    // this.show = false;
    this.sucessMsg = "";
    this.fileNameUpload = "";
    this.fileNameUploadBaisCom = "";

  };

  getTooltip(column) {
    return column;
  }
}
