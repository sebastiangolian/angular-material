import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommitService } from '../../services/commit.service';
import { CommitDataSource } from './data/commit-data-source';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { fromEvent } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: './commit.component.html',
  styleUrls: ['./commit.component.css']
})
export class CommitComponent implements OnInit {

  displayedColumns = ['node_id', 'sha'];
  databaseService: CommitService | null;
  dataSource: CommitDataSource | null;
  index: number;
  id: number;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  constructor(public httpClient: HttpClient, public dialog: MatDialog, public issueService: CommitService) { }

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

  private filterSubscribe() {
    fromEvent(this.filter.nativeElement, 'keyup')
      .subscribe(() => {
        if (this.dataSource) {
          this.dataSource.filter = this.filter.nativeElement.value;
        }
      });
  }
}
