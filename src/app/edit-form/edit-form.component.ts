import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RestapiService } from '../services/rest-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UploadFileService } from '../services/upload-file.service';
export interface DialogData {
  dataSetName: string,
  targetVariable: string,
  identifierData: string;
  reviewField: string;
  ratingField: string;
  selctedGlobalValue: string;
  modelname: string;

}
@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit {
  modelName: any;
  createmodelRes: any = [];
  DataSetName: any;
  dataSets: any = [];
  tragetDataSets: any = [];
  globalBaisValue: Boolean = false;
  globalCexValue: Boolean = false;
  globalValue: any;
  dataSetName: any;
  newDatasetdata: any = [];

  formGroup: FormGroup;
  submitted = false;
  tabName: any;


  constructor(
    public dialogRef: MatDialogRef<EditFormComponent>, private uploadService: UploadFileService, private _snackBar: MatSnackBar, private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private apiservice: RestapiService) {

    dialogRef.disableClose = true;
    this.uploadService.getTabNameData.subscribe(data => {
      this.tabName = data;
    })
  }

  onNoClick(): void {

    this.dialogRef.close();

  }
  get f() { return this.formGroup.controls; }

  onSubmit(post) {

    this.submitted = true;
    if (this.formGroup.invalid) {
      return;
    }
    console.log(JSON.stringify(post))
    this.dialogRef.close(post);
  }
  submit(form): void {



    //console.log("form..."+this.formGroup.value.dataSetName)
    this.dialogRef.close(`${form.value.dataSetName}`);

  }


  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      dataSetName: ['', Validators.required],
      modelname: ['', Validators.required],
      targetVariable: ['', Validators.required],
      identifierData: '',
      reviewField: '',
      // ratingField:'',
    })
    this.globalValue = "";
    this.globalValue = this.data.selctedGlobalValue
    if (this.globalValue == "bais") {
      this.globalBaisValue = true;
      this.globalCexValue = false;
    } else {
      this.globalBaisValue = false;
      this.globalCexValue = true;
    }

    this.getDataSet();
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,

    });
  }

  getDataSet() {
    this.apiservice.getDataSets(this.tabName).subscribe(
      (resData) => {
        this.dataSets = resData;
        console.log("data" + JSON.stringify(this.dataSets))
      }
    )
  }
  onChangeDataSet(data) {
    console.log(data);
    this.apiservice.getDataSelectTarget(data.fileName, data.fileId).subscribe(
      (resData) => {
        var data = resData;
        this.tragetDataSets = resData;
        console.log("data" + JSON.stringify(data))
      }
    )

  }

}
