import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BuildYourSegmentService } from 'src/app/services/build-your-segment.service';
import { RestapiService } from 'src/app/services/rest-api.service';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { ViewReportDialogComponent } from 'src/app/view-report-dialog/view-report-dialog.component';

@Component({
  selector: 'app-explainability',
  templateUrl: './explainability.component.html',
  styleUrls: ['./explainability.component.scss']
})
export class ExplainabilityComponent implements OnInit {
  dataSetList: any[] = [];
  segmentNames: any[] = [];
  componentList: any[] = [];
  explainabilityForm: FormGroup;
  tabName: any;
  dataSetFieldId: any;
  viewReportData: any;

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private restApiService: RestapiService, private uploadService: UploadFileService, private segmentService: BuildYourSegmentService) {
    this.explainabilityForm = this.formBuilder.group({
      dataSetName: ['', Validators.required],
      analysisName: ['', Validators.required],
      components: ['', Validators.required]
    });
    this.uploadService.getTabNameData.subscribe(data => {
      this.tabName = data;
    })
  }

  ngOnInit(): void {
    this.getDataSet();
  }
  viewReport(event, data) {
    let newdata = {
      "inputData": this.viewReportData,
      "screenName": "explainability"
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
  onChangeDataSet(event) {
    this.dataSetFieldId = event.fileId;
    this.segmentService.getAnalysisName(event.fileId).subscribe((data: any) => {
      this.segmentNames = data;
      console.log(this.segmentNames);
    })
    //this.segmentNames = [{ 'analysisName': 'Analysis', 'segId': 1 }];
  }
  onChangeOfAnalysis(event) {
    this.segmentService.getComponentList(this.dataSetFieldId, event.id).subscribe((data: any) => {
      this.componentList = data;
      // this.viewReportData = data;
      // this.componentList = data.componentName;
    })
    this.viewReportData = [

      {
        "componentId": 3,
        "segmentId": 4,
        "componentStatus": "Y",
        "componentReport": [
          {
            "title": "Count of reviews by id",
            "xlabel": "id",
            "ylabel": "count",
            "chartType": "TreeMap",
            "data": [
              {
                "x": "AVphgVaX1cnluZ0-DR74",
                "y": 10966
              },
              {
                "x": "AVpfl8cLLJeJML43AE3S",
                "y": 6619
              },
              {
                "x": "AV1YE_muvKc47QAVgpwE",
                "y": 5056
              },
              {
                "x": "AV1YnRtnglJLPUi8IJmV",
                "y": 3176
              },
              {
                "x": "AVqkIhwDv8e3D1O-lebb",
                "y": 2814
              },
              {
                "x": "AVqVGWLKnnc1JgDc3jF1",
                "y": 1685
              },
              {
                "x": "AVpjEN4jLJeJML43rpUe",
                "y": 1038
              },
              {
                "x": "AVpfpK8KLJeJML43BCuD",
                "y": 636
              },
              {
                "x": "AVphPmHuilAPnD_x3E5h",
                "y": 580
              },
              {
                "x": "AVsRjfwAU2_QcyX9PHqe",
                "y": 402
              }
            ]
          }
        ],
        "componentName": "pepperoni"
      },
      {
        "componentId": 0,
        "segmentId": 4,
        "componentStatus": "Y",
        "componentReport": [
          {
            "title": "Count of reviews by id",
            "xlabel": "id",
            "ylabel": "count",
            "chartType": "TreeMap",
            "data": [
              {
                "x": "AVphgVaX1cnluZ0-DR74",
                "y": 10966
              },
              {
                "x": "AVpfl8cLLJeJML43AE3S",
                "y": 6619
              },
              {
                "x": "AV1YE_muvKc47QAVgpwE",
                "y": 5056
              },
              {
                "x": "AV1YnRtnglJLPUi8IJmV",
                "y": 3176
              },
              {
                "x": "AVqkIhwDv8e3D1O-lebb",
                "y": 2814
              },
              {
                "x": "AVqVGWLKnnc1JgDc3jF1",
                "y": 1685
              },
              {
                "x": "AVpjEN4jLJeJML43rpUe",
                "y": 1038
              },
              {
                "x": "AVpfpK8KLJeJML43BCuD",
                "y": 636
              },
              {
                "x": "AVphPmHuilAPnD_x3E5h",
                "y": 580
              },
              {
                "x": "AVsRjfwAU2_QcyX9PHqe",
                "y": 402
              }
            ]
          }
        ],
        "componentName": "Segment"
      }
    ]


  }
  getDataSet() {
    this.restApiService.getDataSets(this.tabName).subscribe(data => {
      this.dataSetList = data;
    })
  }
}
