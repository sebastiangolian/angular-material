import { Component, OnInit, ViewChild } from '@angular/core';
import { CarDataSource } from '../../data-sources/car-data-source';
import { MatPaginator, MatSort } from '@angular/material';
import { CarService } from '../../services/car.service';

@Component({
  templateUrl: './car-new.component.html',
  styleUrls: ['./car-new.component.css']
})
export class CarNewComponent implements OnInit {

  displayedColumns = ['id','name','country'];
  dataSource: CarDataSource | null;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private carService: CarService) {}

  ngOnInit() {
    this.dataSource = new CarDataSource(this.carService, this.paginator, this.sort);
  }
}
