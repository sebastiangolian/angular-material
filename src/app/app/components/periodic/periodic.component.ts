import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { PeriodicArrayService, PeriodicElement } from '../../services/periodic-array.service';

@Component({
  templateUrl: './periodic.component.html',
  styleUrls: ['./periodic.component.css']
})
export class PeriodicComponent implements OnInit {

  private readonly DATA_URL = 'assets/periodic.json'
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];
  dataSource: MatTableDataSource<PeriodicElement>;
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public httpClient: HttpClient, protected service: PeriodicArrayService) { }

  ngOnInit() {
    this.httpClient.get<PeriodicElement[]>(this.DATA_URL).subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource<PeriodicElement>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error: HttpErrorResponse) => console.error(error.name + ' ' + error.message)
    );

    this.service.fetchAllPromise().then(val => console.log(val))
    this.service.fetchAllObservable().subscribe(val => console.log(val))
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onAdd() {

  }

  onEdit(row:PeriodicElement) {
    console.log(row)
  }

  onDelete(row:PeriodicElement) {
    this.dataSource.data.pop();
    console.log(row)
  }
}