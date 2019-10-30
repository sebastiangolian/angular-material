import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { CommitService } from '../../service/commit.service';

@Component({
  templateUrl: './commit-edit.component.html',
  styleUrls: ['./commit-edit.component.css']
})
export class CommitEditComponent implements OnInit {

  formControl = new FormControl('', [Validators.required]);

  constructor(public dialogRef: MatDialogRef<CommitEditComponent>,@Inject(MAT_DIALOG_DATA) public data: any, public dataService: CommitService) { }

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