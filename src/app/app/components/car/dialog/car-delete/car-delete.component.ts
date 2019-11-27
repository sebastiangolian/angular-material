import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-car-delete',
  templateUrl: './car-delete.component.html',
  styleUrls: ['./car-delete.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarDeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CarDeleteComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onDelete(): void {}
}
