import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IssueService } from 'src/app/app/services/issue.service';

@Component({
  selector: 'app-issue-delete',
  templateUrl: './issue-delete.component.html',
  styleUrls: ['./issue-delete.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IssueDeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<IssueDeleteComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public dataService: IssueService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dataService.delete(this.data.id);
  }

  ngOnInit() {}

}
