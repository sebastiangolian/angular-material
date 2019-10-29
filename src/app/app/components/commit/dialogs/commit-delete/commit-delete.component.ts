import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CommitService } from 'src/app/app/services/commit.service';

@Component({
  selector: 'app-commit-delete',
  templateUrl: './commit-delete.component.html',
  styleUrls: ['./commit-delete.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommitDeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CommitDeleteComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public dataService: CommitService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dataService.delete(this.data.id);
  }

  ngOnInit() {}

}
