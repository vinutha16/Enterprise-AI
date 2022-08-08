import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BuildYourSegmentService } from 'src/app/services/build-your-segment.service';
import { RestapiService } from 'src/app/services/rest-api.service';
import { UploadFileService } from 'src/app/services/upload-file.service';

@Component({
  selector: 'app-build-your-segment',
  templateUrl: './build-your-segment.component.html',
  styleUrls: ['./build-your-segment.component.scss']
})
export class BuildYourSegmentComponent implements OnInit {
  numericalFeatures = new FormControl();
  buildYourSegment: FormGroup;
  myFormValueChanges$;
  // numericalFeatureList: any[] = ['steak', 'pizza', 'tacos'];
  // categoryFeatureList: any[] = ['Extra cheese', 'Mushroom', 'Onion'];
  // groupFeatureList: any[] = ['Pepperoni', 'Sausage', 'Tomato'];
  dataAnlysis: any;
  showComponent: boolean = false;
  tabName: any;
  dataSetList: any;
  // dataSetList: any[] = [{ 'fileName': 'Churn Historical Data 4.csv', 'dataSetFileId': 1 }];
  dataSetField: any;
  dataSetName: any;
  segmentData: any;
  dataSetDetails: any;

  constructor(private formBuilder: FormBuilder, private restApiService: RestapiService, private segmentService: BuildYourSegmentService, private uploadService: UploadFileService) {
    this.uploadService.getTabNameData.subscribe(data => {
      this.tabName = data;
    })
  }

  ngOnInit() {
    this.buildYourSegment = this.formBuilder.group({
      dataSetName: ['', Validators.required],
      dataSetFileId: this.dataSetField,
      analysisName: ['', Validators.required],
      inputData: this.formBuilder.array([
        this.getSegments(),
      ]),
    });
    this.myFormValueChanges$ = this.buildYourSegment.controls['inputData'].valueChanges;
    this.getDataSet();
  }
  ngOnDestroy(): void {
    this.myFormValueChanges$.unsubscribe();
  }

  submitBuildYourSegment(model: any, isValid: boolean, e: any) {
    model.dataSetName = this.dataSetName;
    this.segmentService.addSegmentData(model, this.tabName).subscribe(data => {
      this.segmentData = data;
    })
  }
  onChangeDataSet(event) {
    this.dataSetName = event.fileName;
    this.dataSetField = event.fileId;
    this.restApiService.getDataSetDetails(event.fileId).subscribe(data => {
      this.showComponent = true;
      this.dataSetDetails = data;
    })

  }
  private getSegments() {
    return this.formBuilder.group({
      numfeatures: ['', Validators.required],
      catFeatures: ['', Validators.required],
      groupFeatures: ['', Validators.required],
      groupExplainability: ['', Validators.required],
      featureImportance: ['', Validators.required],
      treeExplainability: ['', Validators.required],
      sensitivityAnalysis: ['', Validators.required]
    });
  }

  getDataSet() {
    this.restApiService.getDataSets(this.tabName).subscribe(data => {
      this.dataSetList = data;
    })

  }
  addComponent() {
    const control = <FormArray>this.buildYourSegment.controls['inputData'];
    control.push(this.getSegments());
  }
}
