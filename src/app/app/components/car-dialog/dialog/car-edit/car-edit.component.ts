import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { CarBehaviorSubjectService } from 'src/app/app/services/car-behavior-subject.service';

@Component({
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent implements OnInit {

  formControl = new FormControl('', [Validators.required]);

  constructor(public dialogRef: MatDialogRef<CarEditComponent>,@Inject(MAT_DIALOG_DATA) public data: any, public dataService: CarBehaviorSubjectService) { }

  ngOnInit() {}

  public getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' : '';
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  public onSave(): void {
    this.dataService.update(this.data);
  }
}