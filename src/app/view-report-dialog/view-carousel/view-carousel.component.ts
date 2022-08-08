import { Component, OnInit, VERSION, Input, OnChanges, AfterViewChecked, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-carousel',
  templateUrl: './view-carousel.component.html',
  styleUrls: ['./view-carousel.component.scss'],
  providers: [NgbCarouselConfig]
})
export class ViewCarouselComponent implements OnInit, OnChanges {

  @Input() reportdata
  @Output() viewCarouselClickEvent = new EventEmitter();

  tabledata: any = [];
  tabledata1: any = [];
  newTableData: any = [];
  data12: any = [];
  treeArray: any = [];
  data1: any = [];
  format: any = [];
  treemapdata: any = [];
  treemapdata1: any = [];
  treeArray1: any = [];
  data2: any = [];
  format1: any = [];
  newverdata: any = []
  newverdata1: any = []
  donutchartdata: any = [];
  verticalBardata: any = [];
  pieChartdata: any = [];
  vericalBarlength: any;
  treeMapChartData: any = [];
  horizontalBarData: any = [];
  showCarousel: boolean = false;
  carouselDisplay: boolean;
  viewReportData: any = [];

  constructor(config: NgbCarouselConfig) {
    //config.interval = 2000;
    //config.keyboard = true;
    //config.pauseOnHover = true;
  }

  ngOnInit(): void {
    // this.viewReportGen();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (((changes['reportdata'] && changes['reportdata'].previousValue) !== changes['reportdata'].currentValue) && Object.keys(changes['reportdata'].currentValue).length > 0) {
      this.viewReportData = this.reportdata;
      this.viewReportGen();
    }
  }

  viewReportGen() {
    console.log(JSON.stringify(this.viewReportData));
    for (var i = 0; i < this.viewReportData.length; i++) {
      switch (this.viewReportData[i].chartType) {
        case 'VerticalBar':
          var obj = new Object();
          obj['title'] = this.viewReportData[i].title;
          obj['chartType'] = this.viewReportData[i].chartType;
          obj['data'] = this.viewReportData[i].data;
          obj['xlabel'] = this.viewReportData[i].xlabel;
          obj['ylabel'] = this.viewReportData[i].ylabel;
          obj['chartId'] = "vertical" + [i];

          this.verticalBardata.push(obj)
          this.showCarousel = false;
          this.carouselDisplay = true;
          this.viewCarouselClickEvent.emit(this.showCarousel);
          //console.log("verbar len..." + JSON.stringify(this.verticalBardata))
          break;
        case 'Pie':
          var obj = new Object();
          obj['title'] = this.viewReportData[i].title;
          obj['chartType'] = this.viewReportData[i].chartType;
          obj['data'] = this.viewReportData[i].data;
          obj['xlabel'] = this.viewReportData[i].xlabel;
          obj['ylabel'] = this.viewReportData[i].ylabel;
          obj['chartId'] = "pieChart" + [i];


          this.showCarousel = false;
          this.carouselDisplay = true;
          this.viewCarouselClickEvent.emit(this.showCarousel);
          this.pieChartdata.push(obj)
          // console.log(".pieChartdata.........." + JSON.stringify(this.pieChartdata))
          break;
        case 'Donutchart':
          var obj = new Object();
          obj['title'] = this.viewReportData[i].title;
          obj['chartType'] = this.viewReportData[i].chartType;
          obj['data'] = this.viewReportData[i].data;
          obj['xlabel'] = this.viewReportData[i].xlabel;
          obj['ylabel'] = this.viewReportData[i].ylabel;
          obj['chartId'] = "donutchart" + [i];


          this.donutchartdata.push(obj)
          this.showCarousel = false;
          this.carouselDisplay = true;
          this.viewCarouselClickEvent.emit(this.showCarousel);
          //console.log("donutchartdata..........." + JSON.stringify(this.donutchartdata))
          break;
        case 'TreeMap':
          var obj = new Object();
          obj['title'] = this.viewReportData[i].title;
          obj['chartType'] = this.viewReportData[i].chartType;
          obj['data'] = this.viewReportData[i].data;
          obj['xlabel'] = this.viewReportData[i].xlabel;
          obj['ylabel'] = this.viewReportData[i].ylabel;
          obj['showLabel'] = this.viewReportData[i].showLabel;
          obj['chartId'] = "treemap" + [i];

          this.treeMapChartData.push(obj)
          this.showCarousel = false;
          this.carouselDisplay = true;
          this.viewCarouselClickEvent.emit(this.showCarousel);
          // console.log("treeMapChartData..........." + JSON.stringify(this.treeMapChartData))
          break;
        case 'HorizontalBar':
          var obj = new Object();
          obj['title'] = this.viewReportData[i].title;
          obj['chartType'] = this.viewReportData[i].chartType;
          obj['data'] = this.viewReportData[i].data;
          obj['xlabel'] = this.viewReportData[i].xlabel;
          obj['ylabel'] = this.viewReportData[i].ylabel;
          obj['chartId'] = "diverge" + [i];


          this.horizontalBarData.push(obj)
          this.showCarousel = false;
          this.carouselDisplay = true;
          this.viewCarouselClickEvent.emit(this.showCarousel);
          // console.log("horizontalBarData..........." + JSON.stringify(this.horizontalBarData))
          break;
        case 'Table':
          var obj = new Object();
          obj['title'] = this.viewReportData[i].title;
          obj['chartType'] = this.viewReportData[i].chartType;
          obj['data'] = this.viewReportData[i].data;

          this.newTableData.push(obj)
          this.showCarousel = false;
          this.carouselDisplay = true;
          this.viewCarouselClickEvent.emit(this.showCarousel);
          // console.log("table..........." + JSON.stringify(this.newTableData))
          break;

        default:
          // this.downloadURL = "";

          break;
      }

    }
  }

}
