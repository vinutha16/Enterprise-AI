import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditFormComponent } from '../edit-form/edit-form.component';
import { UploadFileService } from '../services/upload-file.service';
import { RestapiService } from '../services/rest-api.service';
import { Globals } from '../../app/services/globals';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
export interface PeriodicElement {
  dataSetName: string;
  targetVariable: string;
  modelOriginalName: string;
  modelReady:string;
}
@Component({
  selector: 'app-build-model',
  templateUrl: './build-model.component.html',
  styleUrls: ['./build-model.component.scss']
})
export class BuildModelComponent implements OnInit {
  displayedColumns: string[] = ['dataSetName', 'targetVariable', 'modelOriginalName', 'modelReady'];
  dataSource;
  @ViewChild('TABLE') table: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  DataSet: any = [];
  headerData: any = [];
  inputDataSet: any;
  DataSetName: any;
  dataSetName: string;
  targetVariable: string;
  identifierData: string;
  reviewField: string;
  ratingField: string;
  modelname: string;
  result: any = [];
  baisOutputData: any = [];
  OutputDataSelctModel: any = [];
  DataSetOutputVariable: string
  showBais: boolean = false;
  showVral: boolean = false;
  showIon: boolean = false;
  selctedGlobalValue: string = "bais";
  availableFeatures: any = [];
  inputVariable: any = [];
  inputlableFeature: any = [];
  disableSelect: boolean = false;
  reciveHeaderData: any = [];
  buildModelTableData: any = [];
  churnOutputData: any = [];

  constructor(public dialog: MatDialog, public upload: UploadFileService, private apiservice: RestapiService, public globals: Globals, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getBuildModelTableData();
  }


  refreshBuildModel() {
    this.getBuildModelTableData();

  }
  globalValue() {
    this.selctedGlobalValue = this.globals.modelName;
    //console.log("this.globals.modelName............"+this.globals.modelName)
    this.getBuildModelTableData();

  }
  openDialog(dataSetName, modelname): void {
    const dialogRef = this.dialog.open(EditFormComponent, {
      width: '543px',
      height: '450px',
      data: {
        selctedGlobalValue: this.selctedGlobalValue,
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.result = result;
      console.log("model...." + JSON.stringify(this.result))
      var dataSetName = this.result.dataSetName.fileName;
      var targetVariable = this.result.targetVariable;
      var fileId = this.result.dataSetName.fileId;
      var modelname = this.result.modelname;
      if (this.globals.modelName == "bais") {
        let formData = {
          "dataSetName": this.result.dataSetName.fileName,
          "targetVariable": this.result.targetVariable,
          "chooseIdentifierColumn": this.result.identifierData
        }
        this.createSaveModel(formData, fileId, modelname);

      } else {
        let formData = {
          "dataSetName": dataSetName,
          "targetVariable": this.result.targetVariable,
          "chooseIdentifierColumn": this.result.identifierData,
          "chooseReviewField": this.result.reviewField,
          //"chooseRatingField":this.result.ratingField
        }
        this.createSaveModel(formData, fileId, modelname);

      }

      //console.log("res.." + JSON.stringify(dataSetName))

    });
  }
  createSaveModel(formData, fileId, modelname) {
    this.apiservice.getBuildCreateSaveModel(formData, fileId, modelname).subscribe(
      (resData) => {
        var data = resData;
        this.getBuildModelTableData();
        switch (data.message) {
          case 'Model already generated for these fields, please check the table below':
            this.openSnackBar('Model already generated for these fields, please check the table below', "")
            break;
          case 'Model creation in progress !!':
            this.openSnackBar('Model creation in progress !!', "")
            break;
          case 'Model creation unsuccessfull !!':
            this.openSnackBar('Model creation unsuccessfull !!', "")
            break;
          case 'Client error !!':
            this.openSnackBar('Client error !!', "")
            break;

          default:
            //this.openSnackBar('upload only Excel file or Csv file', "")
            break;
        }
      }
    )
  };

  getBuildModelTableData() {
    this.apiservice.getBuilYourModelTableData().subscribe(
      (resData) => {
        var data = resData;
        this.buildModelTableData = resData.reverse();
        this.dataSource = new MatTableDataSource<PeriodicElement>(this.buildModelTableData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      }
    )
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,

    });
  }

}
