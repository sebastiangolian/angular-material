import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { Commits, CommitService } from '../../service/commit.service';

@Component({
  selector: 'app-commit-add',
  templateUrl: './commit-add.component.html',
  styleUrls: ['./commit-add.component.css']
})
export class CommitAddComponent implements OnInit {

  formControl = new FormControl('', [Validators.required]);
  constructor(public dialogRef: MatDialogRef<CommitAddComponent>, @Inject(MAT_DIALOG_DATA) public data: Commits, public dataService: CommitService) { }

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
