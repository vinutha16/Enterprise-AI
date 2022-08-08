import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UploadFileService } from './../services/upload-file.service';
import { MatSnackBar } from '@angular/material/snack-bar';
export interface DialogData {
  id: number,
  filename: String,
  headerData: Array<string>;
  fileId: number;


}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  count: number;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public uploadFileService: UploadFileService, private _snackBar: MatSnackBar) {
    dialogRef.disableClose = true;
  }


  onNoClick(): void {

    this.dialogRef.close();

  }
  Save(): void {

    let json = {
      jsonHeaderDesc: this.data
    }
    var fileId = this.data.id;
    var jsonData = JSON.stringify(json)
    //console.log(JSON.stringify(json.headerData))
    var formData = {
      "jsonHeaderDesc": this.data
    }

    //console.log(JSON.stringify(this.data))
    //console.log(JSON.stringify(formData))
    this.uploadFileService.updateHeaderDesc(fileId, formData).subscribe(
      (resData) => {
        var data = resData;
        //console.log(JSON.stringify(resData))
        //console.log(JSON.stringify(resData.message))
        if (resData.message == 'File Details updated successfully !') {
          this.openSnackBar('File Details updated successfully', "")
        }


      }
    );
  }
  ngOnInit(): void {
   // console.log("kk" + JSON.stringify(this.data.fileId))
    this.count = this.data.headerData.length;
    //console.log(this.count)
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,

    });
  }

}
