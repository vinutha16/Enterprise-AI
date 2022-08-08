import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RestapiService } from './../services/rest-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UploadFileService } from '../services/upload-file.service';

@Component({
  selector: 'app-view-report-dialog',
  templateUrl: './view-report-dialog.component.html',
  styleUrls: ['./view-report-dialog.component.scss']
})
export class ViewReportDialogComponent implements OnInit {
  reportdata: any;
  visualreport: any = [];
  visualreportPrediction: any = [];
  visualJsonTargetResponse: any = [];
  visualJsonFileResponse: any = [];
  visualFileResponseKnowYourData: any = [];
  concatdata2: any;
  concatdata1: any;
  convertData: any;
  finalReportData: any;
  showCarousel: boolean = false;
  showButton: boolean = false;
  explainability = [];
  finalExplainabilty = [];
  tabName: any;
  componentData = [];

  constructor(
    public dialogRef: MatDialogRef<ViewReportDialogComponent>, private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any, private apiservice: RestapiService, private uploadService: UploadFileService) {
    dialogRef.disableClose = true;
    this.uploadService.getTabNameData.subscribe(data => {
      this.tabName = data;
    })
  }

  ngOnInit(): void {
    this.reportdata = "";
    this.reportdata = this.data.inputDataSet;
    console.log(JSON.stringify(this.data.inputDataSet));
    this.viewrReportCarousel();
  }
  onNoClick(): void {

    this.dialogRef.close();

  }
  viewrReportCarousel() {
    this.showCarousel = true;
    if (this.reportdata.screenName == "KnowYourData") {
      var fileId = this.reportdata.fileId;
      var targetLevelId = this.reportdata.targetLevelId;
      var fileLevelId = this.reportdata.fileLevelId;

      this.apiservice.getViewReportKnowYourCarousel(fileId, targetLevelId, fileLevelId, this.tabName).subscribe(
        (resData) => {
          this.visualreport = resData;
          var visualJsonTargetResponse = (this.visualreport.visualJsonTargetResponse == null) ? [] : JSON.parse(this.visualreport.visualJsonTargetResponse)
          var visualJsonFileResponse = (this.visualreport.visualJsonFileResponse == null) ? [] : JSON.parse(this.visualreport.visualJsonFileResponse)

          var concat = [...visualJsonFileResponse, ...visualJsonTargetResponse]
          this.convertData = JSON.stringify(concat).replace(new RegExp("\\\\", "g"), '');
          this.finalReportData = JSON.parse(this.convertData)

        }
      )
    } else if (this.reportdata.screenName == "predictions") {
      var datafileid = this.reportdata.datafileid;
      var predid = this.reportdata.predid;
      this.apiservice.getViewReportPredictionsCarousel(datafileid, predid).subscribe(
        (resData) => {
          this.convertData = "";
          this.visualreport = resData;
          var concat = JSON.parse(this.visualreport.predictionJsonResponse);
          this.convertData = JSON.stringify(concat).replace(new RegExp("\\\\", "g"), '');
          this.finalReportData = JSON.parse(this.convertData)

        }
      )
    }
    else if (this.reportdata.screenName == "explainability")
      this.componentData = this.reportdata.inputData;
    for (var i = 0; i < this.componentData.length; i++) {
      this.explainability = this.componentData[i].componentReport;
      for (var j = 0; j < this.explainability.length; j++) {
        this.finalExplainabilty.push(this.explainability[j]);
      }
    }
    this.finalReportData = this.finalExplainabilty;
  }
  updateCarouselTab(event) {
    this.showCarousel = event;
    if (event == false) {
      this.showButton = true;
    } else {
      this.showButton = false;
    }

  }

}

