import { Component, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { EnterpriseService } from '../services/enterprise.service';
import { NavBarService } from '../services/navBarService.service';
import { RestapiService } from '../services/rest-api.service';
import { Router } from '@angular/router';
import { Globals } from '../../app/services/globals';
import { ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { PredictionsComponent } from '../predictions/predictions.component';
import { BuildModelComponent } from '../build-model/build-model.component';
import { UpdateDatasetComponent } from '../update-dataset/update-dataset.component';
import { NextChurnComponent } from '../next-churn/next-churn.component';
import { UploadFileService } from '../services/upload-file.service';


@Component({
  selector: 'app-churnmodel',
  templateUrl: './churnmodel.component.html',
  styleUrls: ['./churnmodel.component.scss']
})
export class ChurnmodelComponent implements OnInit, OnChanges {
  @ViewChild(UpdateDatasetComponent) private UpdateDatasetComponent: UpdateDatasetComponent;
  @ViewChild(NextChurnComponent) private NextChurnComponent: NextChurnComponent;
  @ViewChild(BuildModelComponent) private BuildModelComponent: BuildModelComponent;
  @ViewChild(PredictionsComponent) private PredictionsComponent: PredictionsComponent;
  @Output() output = new EventEmitter();
  @ViewChild('stepper') stepper;

  imageDetails: any;
  newColor: boolean = true;
  cexColor: boolean = false;
  subNewColor: boolean = false;
  lithiumColor: boolean = false;
  supplyColor: boolean = false;
  salesColor: boolean = false;
  iotColor: boolean = false;
  revenueColor: boolean = false;
  ionColour: boolean = false;
  ionModelVal: boolean = false;
  upsModelVal: boolean = false;
  segmentColor: boolean = false;
  ShowBuildYourSegment: boolean = false;
  ShowExplainability: boolean = false;
  modelTypeName = "bais";
  index: any;
  numSelect: number;
  disableSelect: boolean = true;
  description = 'Detect customers who are likely to cancel their subscription to a service. Customers can be from telecom, SaaS, or any other sector and provide services for a monthly, quarterly, or yearly fee.';
  showBuildYourModel: boolean = true;
  tabName: any;


  constructor(private router: Router, private enterpriseService: EnterpriseService, private apiservice: RestapiService, public navbarService: NavBarService, public globals: Globals, private uploadService: UploadFileService) {
    this.navbarService.visible = true;
  }

  ngOnInit(): void {
    this.tabName = {
      "project": "customer1",
      "module": "bais",
      "submodule": "telecom"
    }
    this.uploadService.sendTabName(this.tabName);
  }
  ngOnChanges() {

  }

  onTabChanged(event: MatTabChangeEvent) {

    switch (event.index) {
      case 0:
        this.UpdateDatasetComponent.refreshUpdate();
        break;
      case 1:
        this.NextChurnComponent.refreshKnowYourData();
        break;
      case 2:
        this.BuildModelComponent.refreshBuildModel();
        break;
      case 3:
        this.PredictionsComponent.refreshPredictions();
        break;

      default:
        this.UpdateDatasetComponent.refreshUpdate();
        break;
    }

  }

  churnModel() {
    // alert(1)
    this.newColor = !this.newColor;
    this.newColor = true;
    this.cexColor = false;
    this.iotColor = false;
    this.revenueColor = false;
    this.salesColor = false;
    this.supplyColor = false;
    this.ionColour = false;
    this.globals.modelName = "";
    this.globals.submoduleName = "";
    this.globals.modelName = "bais";
    this.globals.submoduleName = "telecom";
    this.modelTypeName = "bais";
    this.index = 0;
    this.stepper.selectedIndex = this.index;
    this.ionModelVal = false;
    this.upsModelVal = false;
    this.description = 'Detect customers who are likely to cancel their subscription to a service. Customers can be from telecom, SaaS, or any other sector and provide services for a monthly, quarterly, or yearly fee.';
    //alert("churn")
    this.showBuildYourModel = true;
    this.ShowBuildYourSegment = false;
    this.ShowExplainability = false;
    this.segmentColor = false;
    this.tabName = {
      "project": "customer1",
      "module": "bais",
      "submodule": "telecom"
    }
    this.uploadService.sendTabName(this.tabName);
  };
  Cex() {
    this.cexColor = true;
    this.newColor = false;
    this.iotColor = false;
    this.revenueColor = false;
    this.salesColor = false;
    this.supplyColor = false;
    this.ionColour = false;
    this.globals.modelName = "";
    this.globals.submoduleName = "";
    this.globals.modelName = "customersentiment";
    this.globals.submoduleName = "customersentiment";
    this.modelTypeName = "bais";
    this.index = 0;
    this.stepper.selectedIndex = this.index;
    this.ionModelVal = false;
    this.upsModelVal = false;
    this.description = 'Detect sentiments of customer reviews, analyse products with less NPS scores and recommend new/updated features or functionality.';
    this.showBuildYourModel = true;
    this.ShowBuildYourSegment = false;
    this.ShowExplainability = false;
    this.segmentColor = false;
    this.tabName = {
      "project": "customer1",
      "module": "bais",
      "submodule": "telecom"
    }
    this.uploadService.sendTabName(this.tabName);
  }
  iot() {
    this.iotColor = true;
    this.newColor = false;
    this.salesColor = false;
    this.supplyColor = false;
    this.revenueColor = false;
    this.ionColour = false;
    this.globals.modelName = "";
    this.description = "vrla111"
    this.globals.modelName = "";
    this.modelTypeName = "vrla";
    this.index = 0;
    this.stepper.selectedIndex = this.index;
    this.ionModelVal = false;
    this.upsModelVal = true;
    this.description = "";
    this.showBuildYourModel = true;
    this.ShowBuildYourSegment = false;
    this.ShowExplainability = false;
    this.segmentColor = false;
  };
  segment() {
    this.segmentColor = true;
    this.lithiumColor = true;
    this.ShowBuildYourSegment = true;
    this.ShowExplainability = true;
    this.showBuildYourModel = false;
    this.iotColor = false;
    this.newColor = false;
    this.cexColor = false;
    this.revenueColor = false;
    this.salesColor = false;
    this.supplyColor = false;
    this.ionColour = false;
    this.globals.modelName = "";
    this.globals.submoduleName = "";
    this.globals.modelName = "bais";
    this.globals.submoduleName = "telecom";
    this.modelTypeName = "bais";
    this.index = 0;
    this.stepper.selectedIndex = this.index;
    this.ionModelVal = false;
    this.upsModelVal = false;
    this.description = 'Detect customers who are likely to cancel their subscription to a service. Customers can be from telecom companies, SaaS companies,and any other company that sells a service for a monthly/quarterly/yearly fee.';
    this.tabName = {
      "project": "customer1",
      "module": "customersegment",
      "submodule": "customersegment"
    }
    this.uploadService.sendTabName(this.tabName);
  }
  ionModel() {
    this.ionColour = true;
    this.newColor = false;
    this.iotColor = false;
    this.revenueColor = false;
    this.salesColor = false;
    this.supplyColor = false;
    this.globals.modelName = "";
    this.modelTypeName = "ion";
    this.showBuildYourModel = true;
    this.ShowBuildYourSegment = false;
    this.ShowExplainability = false;
    this.index = 0;
    this.stepper.selectedIndex = this.index;
    this.ionModelVal = true;
    this.upsModelVal = false;
    this.description = "";
  };
  revenue() {
    this.revenueColor = !this.revenueColor;
    this.newColor = false;
    this.iotColor = false;
    this.salesColor = false;
    this.supplyColor = false;
    this.ionColour = false;
    this.modelTypeName = "revenue";
    this.index = 0;
    this.stepper.selectedIndex = this.index;
    this.ionModelVal = false;
    this.upsModelVal = false;
    this.showBuildYourModel = true;
    this.ShowBuildYourSegment = false;
    this.ShowExplainability = false;
  };
  sales() {
    this.salesColor = !this.salesColor;
    this.iotColor = false;
    this.newColor = false;
    this.supplyColor = false;
    this.revenueColor = false;
    this.ionColour = false;
    this.modelTypeName = "sales";
    this.index = 0;
    this.stepper.selectedIndex = this.index;
    this.ionModelVal = false;
    this.upsModelVal = false;
    this.showBuildYourModel = true;
    this.ShowBuildYourSegment = false;
    this.ShowExplainability = false;
  };

  supply() {
    this.supplyColor = !this.supplyColor;

    this.iotColor = this.iotColor;

    this.salesColor = false;
    this.iotColor = false;
    this.newColor = false;
    this.revenueColor = false;
    this.ionColour = false;
    this.modelTypeName = "supply";
    this.index = 0;
    this.stepper.selectedIndex = this.index;
    this.ionModelVal = false;
    this.upsModelVal = false;
    this.showBuildYourModel = true;
    this.ShowBuildYourSegment = false;
    this.ShowExplainability = false;
  };



  vrlaClick() {
    this.subNewColor = true;
    this.globals.modelName = "";
    this.index = 0;
    this.stepper.selectedIndex = this.index;
    this.description = "Battery failure prediction and anomaly detection for a UPS system."
    this.globals.modelName = "vrla";
    this.modelTypeName = "vrla";
  }



  lithiumClick() {
    this.lithiumColor = true;
    this.globals.modelName = "";
    this.globals.modelName = "ion";
    this.description = "Automotive battery degradation prediction based on cycles.";
    this.modelTypeName = "ion";
    this.index = 0;
    this.stepper.selectedIndex = this.index;
  }

}
