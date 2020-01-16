import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { CarBehaviorSubjectService, Car } from 'src/app/app/services/car-behavior-subject.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  formControl = new FormControl('', [Validators.required]);
  constructor(public dialogRef: MatDialogRef<CarAddComponent>, @Inject(MAT_DIALOG_DATA) public data: Car, public dataService: CarBehaviorSubjectService) { }

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
