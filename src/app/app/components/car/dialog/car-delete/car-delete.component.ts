import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CarService } from '../../service/car.service';

@Component({
  selector: 'app-car-delete',
  templateUrl: './car-delete.component.html',
  styleUrls: ['./car-delete.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarDeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CarDeleteComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public dataService: CarService) { }

  ngOnInit() {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onDelete(): void {
    this.dataService.delete(this.data)
  }
}
