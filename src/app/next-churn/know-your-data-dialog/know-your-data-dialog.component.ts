import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RestapiService } from '../../services/rest-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UploadFileService } from 'src/app/services/upload-file.service';
// export interface DialogData {
//   inputDataSet: string,
//   targetVariable: String,
//   inputVariables: Array<string>;
//   //fileId:number;
// }

@Component({
  selector: 'app-know-your-data-dialog',
  templateUrl: './know-your-data-dialog.component.html',
  styleUrls: ['./know-your-data-dialog.component.scss']
})
export class KnowYourDataDialogComponent implements OnInit {

  modelName: any;
  createmodelRes: any = [];
  DataSets: any = [];
  TragetDataSets: any = [];
  DataSetName: any;
  formGroup: FormGroup;
  submitted = false;
  tabName: any;

  constructor(
    public dialogRef: MatDialogRef<KnowYourDataDialogComponent>, private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any, private uploadService: UploadFileService, private apiservice: RestapiService, private formBuilder: FormBuilder) {
    dialogRef.disableClose = true;
    this.uploadService.getTabNameData.subscribe(data => {
      this.tabName = data;
    })
  }

  onNoClick(): void {

    this.dialogRef.close();

  }
  //   Save(modelName): void {
  //     var formData = {
  //       "inputDataset": this.data.inputDataSet,
  //       "inputVariable": this.data.inputVariables,
  //       "targetVariable": this.data.targetVariable,
  //       "modelName": modelName
  //     }

  // console.log("data..."+JSON.stringify(formData))
  //     this.apiservice.createmodel(formData).subscribe(
  //       (resData) => {
  //         var data = resData;
  //         this.createmodelRes=resData
  //         console.log("this.createmodelRes.responseCode.."+this.createmodelRes.responseCode)
  //         if(this.createmodelRes.message ="Successfully created the model !!"){
  //          this.openSnackBar('Successfully created the model','')
  //         } 
  //         // else if(this.createmodelRes.responseCode = '500'){

  //         //   this.openSnackBar('Not created the model','')
  //         // }
  //         console.log("daat" + data)

  //       }
  //     );

  //   }

  ngOnInit(): void {
    this.getDataSet();
    this.formGroup = this.formBuilder.group({
      dataSetName: ['', Validators.required],
      targetVariable: [''],

    })
  }

  get f() { return this.formGroup.controls; }

  onSubmit(post) {
    //this.post = post;
    this.submitted = true;
    //console.log(JSON.stringify(post))
    this.dialogRef.close(post);
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,

    });
  }

  getDataSet() {

    this.apiservice.getDataSets(this.tabName).subscribe(
      (resData) => {
        this.DataSets = resData;
        //console.log("data"+JSON.stringify(this.DataSets))
      }
    )
  }
  onChangeDataSet(data) {
    //console.log(data);
    if (this.tabName.module != 'customersegment')
      this.apiservice.getDataSelectTarget(data.fileName, data.fileId).subscribe(
        (resData) => {
          var data = resData;
          this.TragetDataSets = resData;
          //console.log("data"+JSON.stringify(data))
        }
      )

  }

}

