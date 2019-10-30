import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IssueAddComponent } from '../../../issue/dialogs/issue-add/issue-add.component';
import { FormControl, Validators } from '@angular/forms';
import { Commits, CommitService } from '../../service/commit.service';

@Component({
  selector: 'app-commit-add',
  templateUrl: './commit-add.component.html',
  styleUrls: ['./commit-add.component.css']
})
export class CommitAddComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<IssueAddComponent>, @Inject(MAT_DIALOG_DATA) public data: Commits, public dataService: CommitService) { }

  ngOnInit() {
  }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

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

  public confirmAdd(): void {
    this.dataService.add(this.data);
  }

}
