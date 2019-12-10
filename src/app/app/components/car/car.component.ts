import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { fromEvent } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CarService, Car } from './service/car.service';
import { CarDataSource } from './data/car-data-source';
import { CarEditComponent } from './dialog/car-edit/car-edit.component';
import { CarAddComponent } from './dialog/car-add/car-add.component';
import { CarDeleteComponent } from './dialog/car-delete/car-delete.component';

@Component({
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  displayedColumns = ['id','name', 'country', 'actions'];
  dataSource: CarDataSource | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  constructor(public httpClient: HttpClient, public dialog: MatDialog, public carService: CarService) { }

  ngOnInit() {
    this.dataSource = new CarDataSource(this.carService, this.paginator, this.sort);
    this.filterSubscribe()
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  add() {
    const dialogRef = this.dialog.open(CarAddComponent, {data: { }});
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.refreshTable();
      }
    });
  }

  edit(row: Car) {
    const dialogRef = this.dialog.open(CarEditComponent, {
      data: {id: row.id, name: row.name, country: row.country}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.refreshTable();
      }
    });
  }

  delete(row: Car) {
    const dialogRef = this.dialog.open(CarDeleteComponent, {
      data: {id: row.id, country: row.country, name: row.name}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
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
