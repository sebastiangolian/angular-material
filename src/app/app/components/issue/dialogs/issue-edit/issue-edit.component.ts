import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { IssueService } from 'src/app/app/services/issue.service';

@Component({
  selector: 'app-issue-edit',
  templateUrl: './issue-edit.component.html',
  styleUrls: ['./issue-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IssueEditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<IssueEditComponent>,@Inject(MAT_DIALOG_DATA) public data: any, public dataService: IssueService) { }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
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
    this.dataService.updateIssue(this.data);
  }

  

}
