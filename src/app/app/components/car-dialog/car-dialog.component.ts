import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { fromEvent, PartialObserver, merge, of } from 'rxjs';
import { CarEditComponent } from './dialog/car-edit/car-edit.component';
import { CarAddComponent } from './dialog/car-add/car-add.component';
import { CarDeleteComponent } from './dialog/car-delete/car-delete.component';
import { CarService, Car } from '../../services/car.service';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';

@Component({
  templateUrl: './car-dialog.component.html',
  styleUrls: ['./car-dialog.component.css']
})
export class CarDialogComponent implements OnInit {

  displayedColumns = ['id','name', 'country', 'actions'];
  data: Car[] = [];
  isLoadingResults: boolean = true;
  resultsLength: number = 0;
  filterText: string = "";

  httpObserver: PartialObserver<any> = {
    next: response => console.info(response),
    error: error => console.error(error),
    complete: () => {this.refreshData() },
  };

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public dialog: MatDialog, public carService: CarService) { }

  ngOnInit() {
    this.subscribeData()
  }

  add() {
    const dialogRef = this.dialog.open(CarAddComponent, {
      data: { id: -1, name: "car " + Math.floor(Math.random() * 1000), country: "Poland"}});
    dialogRef.afterClosed().subscribe(this.httpObserver);
  }

  edit(row: Car) {
    const dialogRef = this.dialog.open(CarEditComponent, {
      data: {id: row.id, name: row.name, country: row.country}
    });

    dialogRef.afterClosed().subscribe(this.httpObserver);
  }

  delete(row: Car) {
    const dialogRef = this.dialog.open(CarDeleteComponent, {
      data: {id: row.id, country: row.country, name: row.name}
    });

    dialogRef.afterClosed().subscribe(this.httpObserver);
  }

  onFilter(filterValue: string) {
    this.filterText = filterValue.trim().toLowerCase();
  }

  private refreshData() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  private subscribeData() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page, fromEvent(document.getElementById('filter-car-dialog'),'keyup'))
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.carService.get(this.paginator.pageSize, this.paginator.pageIndex, this.sort.active + "." + this.sort.direction, this.filterText);
        }),
        map(data => {
          this.isLoadingResults = false;
          this.resultsLength = data.total_items;
          return data.items;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return of([]);
        })
      ).subscribe(data => this.data = data);
  }

}
