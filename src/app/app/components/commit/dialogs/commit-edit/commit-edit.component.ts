import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CommitService } from 'src/app/app/services/commit.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  templateUrl: './commit-edit.component.html',
  styleUrls: ['./commit-edit.component.css']
})
export class CommitEditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CommitEditComponent>,@Inject(MAT_DIALOG_DATA) public data: any, public dataService: CommitService) { }

  formControl = new FormControl('', [
    Validators.required
  ]);

  ngOnInit() {
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    this.dataService.update(this.data);
  }

}
