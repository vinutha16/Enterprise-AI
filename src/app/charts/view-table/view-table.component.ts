import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
export interface PeriodicElement {
  name: string;
  position: string;
  weight: string;
}


@Component({
  selector: 'app-view-table',
  templateUrl: './view-table.component.html',
  styleUrls: ['./view-table.component.scss']
})
export class ViewTableComponent implements OnInit {
  @Input() public inputTableData: any = {}
  data: any = [];
  keys: string[];
  columnNames: string[]
  columnsToDisplay: string[];
  displayedColumns: any;
  columnName: any;
  newdata: any = [];
  @ViewChild('TABLE') table: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  rulesValues: any;

  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges() {
    console.log(this.inputTableData);
    var ruleData = [{ "rule": ["if (payment_value <= 247.787) and (payment_installments <= 4.496) and (freight_value <= 46.292) then class: 0 (proba: 99.86%) | based on 2,787 samples", "if (payment_value <= 247.787) and (payment_installments > 4.496) and (freight_value <= 37.507) then class: 0 (proba: 80.64%) | based on 408 samples", "if (payment_value > 247.787) and (payment_installments > 4.354) and (freight_value > 22.054) then class: 1 (proba: 99.1%) | based on 223 samples", "if (payment_value > 247.787) and (payment_installments <= 4.354) and (freight_value > 29.209) then class: 1 (proba: 69.35%) | based on 186 samples", "if (payment_value > 247.787) and (payment_installments <= 4.354) and (freight_value <= 29.209) then class: 0 (proba: 82.94%) | based on 170 samples", "if (payment_value <= 247.787) and (payment_installments <= 4.496) and (freight_value > 46.292) then class: 0 (proba: 76.53%) | based on 98 samples", "if (payment_value <= 247.787) and (payment_installments > 4.496) and (freight_value > 37.507) then class: 1 (proba: 87.63%) | based on 97 samples", "if (payment_value > 247.787) and (payment_installments > 4.354) and (freight_value <= 22.054) then class: 1 (proba: 73.21%) | based on 56 samples"] }];
    this.inputTableData.data = ruleData;
    this.data = this.inputTableData.data;
    this.displayedColumns = Object.keys(this.data[0]);
    this.rulesValues = Object.values(this.data[0]);

    if (this.displayedColumns[0] == 'rule') {
      this.columnName = [{
        'Rule Name': this.displayedColumns[0],
        'Rules': this.rulesValues[0].toString().replace(",", "\n")
      }]
      this.displayedColumns = Object.keys(this.columnName[0]);
      this.newdata = new MatTableDataSource(this.columnName);
    }
    else {
      this.newdata = new MatTableDataSource(this.data);
    }
    this.ngAfterViewInit();
  }
  ngAfterViewInit() {
    this.newdata.paginator = this.paginator;
  }

}
