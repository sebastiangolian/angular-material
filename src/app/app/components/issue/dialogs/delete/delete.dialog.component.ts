import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import { IssueService } from 'src/app/app/services/issue.service';


@Component({
  selector: 'app-delete.dialog',
  templateUrl: '../../dialogs/delete/delete.dialog.html',
  styleUrls: ['../../dialogs/delete/delete.dialog.css']
})
export class DeleteIssueComponent {

  constructor(public dialogRef: MatDialogRef<DeleteIssueComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: IssueService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dataService.deleteIssue(this.data.id);
  }
}