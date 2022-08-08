import { Component, OnInit, Input, OnChanges, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { RestapiService } from '../services/rest-api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { KnowYourDataDialogComponent } from './know-your-data-dialog/know-your-data-dialog.component';
import { ViewReportDialogComponent } from '../view-report-dialog/view-report-dialog.component';
import { MatTableDataSource, } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UploadFileService } from '../services/upload-file.service';
export interface PeriodicElement {
  dataSetName: string;
  targetVariable: string;
  fileId: number;
  reportReady: string;
}



interface dataSet {
  value: string;
}
@Component({
  selector: 'app-next-churn',
  templateUrl: './next-churn.component.html',
  styleUrls: ['./next-churn.component.scss'],

})

export class NextChurnComponent implements OnInit, OnChanges, AfterViewInit {
  displayedColumns: string[] = ['dataSetName', 'targetVariable', 'reportReady', 'fileId'];
  dataSource;
  @ViewChild('TABLE') table: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  modalvalue: any;
  @Input() inputModelType: any;

  selectedValue: string;
  imageDetails: any;
  location: any;
  thumbnail: any;
  formattedMetricsArray: any = [];
  imageArray: any = [];
  imageValue: any;

  indexValue: any;
  modelvalue: any;
  DataSet: any = [];
  inputDataSet: any;
  DataSetName: any = [];
  dataSetName: string;
  targetVariable: string;
  res: any;
  result: any = [];
  visualizationTableData: any = [];
  tabName: any;

  constructor(private apiservice: RestapiService, private uploadService: UploadFileService, private sanitizer: DomSanitizer, public dialog: MatDialog, private _snackBar: MatSnackBar) {
    this.imageArray = [];
    this.uploadService.getTabNameData.subscribe(data => {
      this.tabName = data;
    })
  }
  ngAfterViewInit() {

    this.imageArray = [];
    this.formattedMetricsArray = [];
  }
  ngOnChanges() {
    // create header using child_id
    // console.log("onchange", this.inputModelType);
    this.modelvalue = this.inputModelType;
    this.imageArray = [];
    this.formattedMetricsArray = [];
    this.DataSetName = [];


  }
  ngOnInit(): void {
    //console.log("value modeltype123", this.inputModelType)
    this.imageArray = [];
    this.formattedMetricsArray = [];
    // this.getSingleFile();
    //this.getSetData();
    //console.log("file value", this.imageArray);
    this.getVisualizationTableData();

  }
  onChangedata(event) {
    //this.fileGroup();
    this.imageArray = [];
    this.formattedMetricsArray = [];
  }

  globalValue() {
    this.DataSet = [];
    this.DataSetName = [];
    this.getVisualizationTableData();
    //this.getSetData();
    //this.DataSetName = ["Select Your DataSet"];

  }
  refreshKnowYourData() {
    this.DataSet = [];
    this.DataSetName = [];
    this.getVisualizationTableData();
    //this.getSetData();
    //this.DataSetName = ["Select Your DataSet"];
  }

  getVisualizationTableData() {
    if (this.tabName != null) {
      this.apiservice.getVisualizationTableData(this.tabName).subscribe(
        (resData) => {
          this.visualizationTableData = resData.reverse();
          this.dataSource = new MatTableDataSource<PeriodicElement>(this.visualizationTableData);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      )
    }

  }


  openDialog(): void {
    const dialogRef = this.dialog.open(KnowYourDataDialogComponent, {
      width: '543px',
      height: '320px',
      data: {
        // dataSetName: this.dataSetName,
        // targetVariable: this.targetVariable,
        //targetVariable: this.DataSetOutputVariable,
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.result = result;
      var dataSetName = this.result.dataSetName.fileName;
      var targetVariable = this.result.targetVariable;
      var fileId = this.result.dataSetName.fileId;
      // var dataSetName=this.result.dataSetName.name;
      //console.log("res.."+JSON.stringify(this.result))
      //console.log("res.."+JSON.stringify(dataSetName))
      this.setvisualization(dataSetName, targetVariable, fileId)
    });
  }
  setvisualization(dataSetName, targetVariable, fileId) {
    // console.log("dataSetName.." + dataSetName);
    // console.log("targetVariable.." + targetVariable);
    // if (targetVariable !== undefined) {
    // do something 

    var formData = {
      "dataSetName": dataSetName,
      "targetVariable": targetVariable
    }
    // console.log("res.." + JSON.stringify(formData))

    this.apiservice.postVisualizationData(formData, fileId, this.tabName).subscribe(
      (resData) => {
        var data = resData;
        this.getVisualizationTableData()
        //console.log("mess++"+JSON.stringify(data.message))
        switch (data.message) {
          case 'Visual report already generated for these fields, please check the table below':
            this.openSnackBar('Visual report already generated for these fields, please check the table below', "")
            break;
          case 'Visual report creation in progress !!':
            this.openSnackBar('Visual report creation in progress !!', "")
            break;
          case 'Visual report creation unsuccessfull !!':
            this.openSnackBar('Visual report creation unsuccessfull !!', "")
            break;

          default:
            //this.openSnackBar('upload only Excel file or Csv file', "")
            break;
        }


      }
    )
    // } else {
    //   alert("Please Select DataSetName or TargetVariable")
    // }

  }

  viewreport(data) {
    console.log(data);
    //const timeout = 3000;
    //   setTimeout(() => {
    //     dialogRef.close();
    //  }, timeout)
    // console.log("datat.." + JSON.stringify(data));
    let newdata = {
      "fileId": data.fileId,
      "targetLevelId": data.targetLevelId,
      "fileLevelId": data.fileLevelId,
      "screenName": "KnowYourData"
    }
    // setTimeout(() => {
    // dialogRef.close();

    const dialogRef = this.dialog.open(ViewReportDialogComponent, {
      width: '800px',
      // height: '460px',
      data: {
        inputDataSet: newdata,
        //inputVariables: this.inputVariable,
        //targetVariable: this.DataSetOutputVariable,
      }
    })
    // }, timeout)
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
