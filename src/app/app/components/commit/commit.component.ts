import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommitService, Commits } from '../../services/commit.service';
import { CommitDataSource } from './data/commit-data-source';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { fromEvent } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommitAddComponent } from './dialogs/commit-add/commit-add.component';
import { CommitEditComponent } from './dialogs/commit-edit/commit-edit.component';
import { CommitDeleteComponent } from './dialogs/commit-delete/commit-delete.component';

@Component({
  templateUrl: './commit.component.html',
  styleUrls: ['./commit.component.css']
})
export class CommitComponent implements OnInit {

  displayedColumns = ['node_id', 'sha', 'actions'];
  databaseService: CommitService | null;
  dataSource: CommitDataSource | null;
  index: number;
  id: string;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  constructor(public httpClient: HttpClient, public dialog: MatDialog, public commitService: CommitService) { }

  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  public loadData() {
    this.databaseService = new CommitService(this.httpClient);
    this.dataSource = new CommitDataSource(this.databaseService, this.paginator, this.sort);
    this.filterSubscribe()
  }

  
  add(commits: Commits) {
    const dialogRef = this.dialog.open(CommitAddComponent, {data: { commits: commits }});

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.databaseService.dataChange.value.push(this.commitService.getDialogData());
        this.refreshTable();
      }
    });
  }

  edit(i: number, row: Commits) {
    this.index = i;
    this.id = row.node_id;
    const dialogRef = this.dialog.open(CommitEditComponent, {
      data: { node_id: row.node_id, sha: row.sha}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.databaseService.dataChange.value.findIndex(x => x.node_id === this.id);
        this.databaseService.dataChange.value[foundIndex] = this.commitService.getDialogData();
        this.refreshTable();
      }
    });
  }

  delete(i: number, row: Commits) {
    this.index = i;
    this.id = row.node_id;
    const dialogRef = this.dialog.open(CommitDeleteComponent, {
      data: { node_id: row.node_id, sha: row.sha}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.databaseService.dataChange.value.findIndex(x => x.node_id === this.id);
        this.databaseService.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }


  private filterSubscribe() {
    fromEvent(this.filter.nativeElement, 'keyup')
      .subscribe(() => {
        if (this.dataSource) {
          this.dataSource.filter = this.filter.nativeElement.value;
        }
      });
  }
}
