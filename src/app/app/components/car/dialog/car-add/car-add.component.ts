import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { Car, CarService } from 'src/app/app/services/car.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  formControl = new FormControl('', [Validators.required]);
  constructor(public dialogRef: MatDialogRef<CarAddComponent>, @Inject(MAT_DIALOG_DATA) public data: Car, public dataService: CarService) { }

  ngOnInit() {}

  public getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' : '';
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  public onSave(): void {
    this.dataService.add(this.data);
  }

}
