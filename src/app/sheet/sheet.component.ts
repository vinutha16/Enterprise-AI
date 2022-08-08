import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import * as XLSX from "xlsx";
import { Subject } from "rxjs";
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatInput } from '@angular/material/input';

export interface DialogData {
  header: string;
  name: string;
}

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss']
})
export class SheetComponent implements OnInit {
  header: string;
  name: string;
  exportsheet: any = [];




  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  spinnerEnabled = false;
  keys: string[];
  displayedColumns: string[]
  columnsToDisplay: string[]
  newdata: any = [];
  fileName: any;
  dataSheet = new Subject();
  @ViewChild("inputFile") inputFile: ElementRef;
  @ViewChild('TABLE') table: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChildren(MatInput, { read: ElementRef }) inputs: QueryList<ElementRef>;
  isExcelFile: boolean;
  show: boolean;
  newdata1: any = [];
  newformatkeys: any = [];
  editRowId: number = -1;

  onChange(evt) {
    let data, header;
    const target: DataTransfer = <DataTransfer>evt.target;
    this.isExcelFile = !!target.files[0].name.match(/(.xls|.xlsx|.csv)/);
    //alert(target.files[0].name)
    this.fileName = target.files[0].name
    if (target.files.length > 1) {
      this.inputFile.nativeElement.value = "";
    }
    if (this.isExcelFile) {
      this.spinnerEnabled = true;
      this.show = true;
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        /* read workbook */
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: "binary" });

        /* grab first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /* save data */
        data = XLSX.utils.sheet_to_json(ws);
      };

      reader.readAsBinaryString(target.files[0]);

      reader.onloadend = e => {
        this.spinnerEnabled = false;
        this.keys = Object.keys(data[0]);
        // var kk=this.keys.map(x=>(name:this.keys[0])
        for (var i = 0; this.keys.length > i; i++) {
          var obj = new Object();
          obj['name'] = this.keys[i];
          obj['head'] = this.keys[i];
          obj['fixed'] = false;
          this.newformatkeys.push(obj)
        }

        console.log(JSON.stringify(this.newformatkeys));
        //this.dataSheet.next(data);
        this.newdata1 = new MatTableDataSource(data);
        this.displayedColumns= this.newformatkeys.map(x=>x.name);
        // if (data.length > 20) {
        //   this.newdata = data.slice(0, 20);

        // } else {
        //   this.newdata = data;
        // }
       // this.newdata = data
        //this.displayedColumns = this.keys
        this.columnsToDisplay = this.displayedColumns.slice();

        //this.newdata1 = new MatTableDataSource(data);
        this.newdata1.paginator = this.paginator;
        // data= this.newdata;

        //console.log(JSON.stringify(this.newdata))
      };
    } else {
      this.inputFile.nativeElement.value = "";
    }
  }

  ngAfterViewInit() {
    this.newdata.paginator = this.paginator;
  }


  editshow(row, element) {
    alert(row)
    alert(element)
    this.editRowId = row;
    setTimeout(() => {
      this.inputs.find(x => x.nativeElement.getAttribute(row)).nativeElement.focus()

    })
  }

  removeData() {
    this.inputFile.nativeElement.value = "";
    this.dataSheet.next(null);
    this.keys = null;
    this.newdata = [];

    this.displayedColumns = []
    this.columnsToDisplay = []
  }

  export(): void {
    /* generate worksheet */
    // const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.newdata);

    /* generate workbook and add the worksheet */
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    /* save to file */
    // XLSX.writeFile(wb, "shh");
    {
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      /* save to file */
      //XLSX.writeFile(wb, this.fileName);
      this.exportsheet = XLSX.writeFile(wb, this.fileName);
      console.log("json..." + JSON.stringify(this.exportsheet))
    }
    ///////////////////////////////




  }
}

