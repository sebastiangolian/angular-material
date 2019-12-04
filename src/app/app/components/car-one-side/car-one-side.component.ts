import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { fromEvent } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CarService, Car } from '../car/service/car.service';
import { CarDataSource } from '../car/data/car-data-source';


@Component({
  templateUrl: './car-one-side.component.html',
  styleUrls: ['./car-one-side.component.css']
})
export class CarOneSideComponent implements OnInit {

  
  displayedColumns = ['id','name', 'country', 'actions'];
  databaseService: CarService | null;
  dataSource: CarDataSource | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  constructor(public httpClient: HttpClient, public dialog: MatDialog, public carService: CarService) { }

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
    this.databaseService = new CarService(this.httpClient);
    this.dataSource = new CarDataSource(this.databaseService, this.paginator, this.sort);
    this.filterSubscribe()
  }

  add(car: Car) {
    
  }

  edit(row: Car) {
    
  }

  delete(row: Car) {
    
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
