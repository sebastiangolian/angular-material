import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { PeriodicElement } from './interfaces/periodic-element.interface';

@Component({
  templateUrl: './periodic.component.html',
  styleUrls: ['./periodic.component.css']
})
export class PeriodicComponent implements OnInit {

  private readonly DATA_URL = 'assets/periodic.json'
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: MatTableDataSource<PeriodicElement>;
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get<PeriodicElement[]>(this.DATA_URL).subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource<PeriodicElement>(data);
        this.dataSource.paginator = this.paginator;
      },
      (error: HttpErrorResponse) => console.error(error.name + ' ' + error.message)
    );
    
  }
}