import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as XLSX from "xlsx";
import { Subject } from "rxjs";
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

export interface DialogData {
  header: string;
  name: string;
}
@Component({
  selector: 'app-sheetxl',
  templateUrl: './sheetxl.component.html',
  styleUrls: ['./sheetxl.component.scss']
})
export class SheetxlComponent implements OnInit {
  header: string;
  name: string;
  exportsheet:any=[];

  
  

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  spinnerEnabled = false;
  keys: string[];
  displayedColumns: string[]
  columnsToDisplay: string[]
  newdata: any = [];
  fileName:any;
  dataSheet = new Subject();
  @ViewChild("inputFile") inputFile: ElementRef;
  @ViewChild('TABLE') table: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isExcelFile: boolean;
  show:boolean;
  newdata1:any=[];


  onChange(evt) {
    let data, header;
    const target: DataTransfer = <DataTransfer>evt.target;
    this.isExcelFile = !!target.files[0].name.match(/(.xls|.xlsx|.csv)/);
    //alert(target.files[0].name)
    this.fileName=target.files[0].name
    if (target.files.length > 1)
    {
      this.inputFile.nativeElement.value = "";
    }
    if (this.isExcelFile) {
      this.spinnerEnabled = true;
      this.show=true;
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
        console.log(JSON.stringify(this.keys));
        this.dataSheet.next(data);
        // if (data.length > 20) {
        //   this.newdata = data.slice(0, 20);
         
        // } else {
        //   this.newdata = data;
        // }
       this.newdata = data
        this.displayedColumns = this.keys
        this.columnsToDisplay = this.displayedColumns.slice();

        this.newdata1 = new MatTableDataSource(data);
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

  openDialog(dataname): void {
    console.log("name.." + this.name)
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      height:'250px',
      
      data: { name: this.name, header: this.header }

    });
    //dialogRef.updatePosition({ top: '80px', left: '50px' });
    dialogRef.updatePosition({ top: '100px' });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log("name.." + this.name)
      this.header = result;
      console.log("name.." + this.header)
      if(this.header !=undefined){
        this.edit(dataname,result);
      }
    
    });
  }
  edit(dataname,header) {
    alert(dataname)
    alert(this.header)

    //let i=this.displayedColumns.indexOf(data);

   // this.displayedColumns.splice(i, 1, "sri");
    var i, len = this.newdata.length;
    for (i = 0; i < len; i++) {
      this.newdata[i][this.header] = this.newdata[i][dataname];
      delete this.newdata[i][dataname];
    }
    this.newdata[1]={'description':"jj"}
    //var gg=this.header
    // var result=this.newdata.map(({ data: header, ...rest }) => 
    //                  ({header, ...rest }));
    //                  this.newdata=[]
    //                  this.newdata=  result;            
    console.log(JSON.stringify(this.newdata));
    this.keys = Object.keys(this.newdata[0]);
    console.log(JSON.stringify(this.keys));
    //this.dataSheet.next(data);
    //this.newdata=data
    console.log(this.newdata);
    this.displayedColumns = this.keys
    this.columnsToDisplay = this.displayedColumns.slice();
    this.newdata1 = new MatTableDataSource(this.newdata);
    this.newdata1.paginator = this.paginator;

    console.log("data-col" + JSON.stringify(this.displayedColumns))

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
      const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
      /* save to file */
      //XLSX.writeFile(wb, this.fileName);
      this.exportsheet = XLSX.writeFile(wb, this.fileName);
      console.log("json..."+JSON.stringify(this.exportsheet))
    }
      ///////////////////////////////
     
     
      
    
  }
}

