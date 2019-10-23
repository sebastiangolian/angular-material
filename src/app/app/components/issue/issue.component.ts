import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IssueService, Issue } from '../../services/issue.service';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
import { fromEvent, } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IssueAddComponent } from './dialogs/issue-add/issue-add.component';
import { IssueEditComponent } from './dialogs/issue-edit/issue-edit.component';
import { IssueDeleteComponent } from './dialogs/issue-delete/issue-delete.component';
import { IssueDataSource } from './data-source/issue-data-source';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {

  displayedColumns = ['id', 'title', 'state', 'url', 'created_at', 'updated_at', 'actions'];
  exampleDatabase: IssueService | null;
  dataSource: IssueDataSource | null;
  index: number;
  id: number;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  constructor(public httpClient: HttpClient, public dialog: MatDialog, public issueService: IssueService) { }

  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  add(issue: Issue) {
    const dialogRef = this.dialog.open(IssueAddComponent, {data: { issue: issue }});

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.exampleDatabase.dataChange.value.push(this.issueService.getDialogData());
        this.refreshTable();
      }
    });
  }

  edit(i: number, id: number, title: string, state: string, url: string, created_at: string, updated_at: string) {
    this.id = id;
    this.index = i;
    const dialogRef = this.dialog.open(IssueEditComponent, {
      data: { id: id, title: title, state: state, url: url, created_at: created_at, updated_at: updated_at }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        this.exampleDatabase.dataChange.value[foundIndex] = this.issueService.getDialogData();
        this.refreshTable();
      }
    });
  }

  delete(i: number, id: number, title: string, state: string, url: string) {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialog.open(IssueDeleteComponent, {
      data: { id: id, title: title, state: state, url: url }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  public loadData() {
    this.exampleDatabase = new IssueService(this.httpClient);
    this.dataSource = new IssueDataSource(this.exampleDatabase, this.paginator, this.sort);
    fromEvent(this.filter.nativeElement, 'keyup')
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }
}