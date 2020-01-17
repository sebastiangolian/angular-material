import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { fromEvent, PartialObserver } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CarEditComponent } from './dialog/car-edit/car-edit.component';
import { CarAddComponent } from './dialog/car-add/car-add.component';
import { CarDeleteComponent } from './dialog/car-delete/car-delete.component';
import { CarDataSource } from '../../data-sources/car-data-source';
import { CarService, Car } from '../../services/car.service';

@Component({
  templateUrl: './car-dialog.component.html',
  styleUrls: ['./car-dialog.component.css']
})
export class CarDialogComponent implements OnInit {

  displayedColumns = ['id','name', 'country', 'actions'];
  dataSource: CarDataSource | null;

  httpObserver: PartialObserver<any> = {
    next: response => console.info(response),
    error: error => console.error(error),
    complete: () => {this.ngOnInit()},
  };

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  constructor(public httpClient: HttpClient, public dialog: MatDialog, public carService: CarService) { }

  ngOnInit() {
    this.dataSource = new CarDataSource(this.carService, this.paginator, this.sort);
    this.filterSubscribe()
  }

  add() {
    const dialogRef = this.dialog.open(CarAddComponent, {data: { }});
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

  private filterSubscribe() {
    fromEvent(this.filter.nativeElement, 'keyup')
      .subscribe(() => {
        if (this.dataSource) {
          this.dataSource.filter = this.filter.nativeElement.value;
        }
      });
  }

}
