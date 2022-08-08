
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ufile-name-change-dialog',
  templateUrl: './ufile-name-change-dialog.component.html',
  styleUrls: ['./ufile-name-change-dialog.component.scss']
})
export class UfileNameChangeDialogComponent implements OnInit {
   uploadedatafile:any;
  constructor(
    public dialogRef: MatDialogRef<UfileNameChangeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    dialogRef.disableClose = true;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.uploadedatafile=this.data.uploadeFileName;
  }

}
