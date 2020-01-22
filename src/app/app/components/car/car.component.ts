import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { CarService, Car } from '../../services/car.service';
import { merge, of, fromEvent, PartialObserver } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  displayedColumns = ['id','name','country','actions'];
  currentItem: Car;
  data: Car[] = [];
  formGroup: FormGroup;
  filterText: string = "";
  isCreate: boolean = false;
  isModifiy: boolean = false;
  formButtonName: string;
  resultsLength: number = 0;
  isLoadingResults: boolean = true;

  httpObserver: PartialObserver<any> = {
    next: response => console.info(response),
    error: error => console.error(error),
    complete: () => {this.refreshData() },
  };

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private formBuilder: FormBuilder, private carService: CarService) {
    this.resetCurrentItem();
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      country: ['', Validators.required]
    });
    this.subscribeData()
  }

  onAdd() {
    this.formGroup.reset();
    this.formGroup.get('name').setValue("car " + Math.floor(Math.random() * 1000));
    this.formGroup.get('country').setValue("Poland");
    this.isCreate = true;
    this.isModifiy = true;
    this.formButtonName = 'Add';
  }

  onEdit(car: Car) {
    if (car.id < 0) return;
    this.currentItem = car;
    this.formGroup.get('name').setValue(car.name);
    this.formGroup.get('country').setValue(car.country);
    this.isCreate = false;
    this.isModifiy = true;
    this.formButtonName = 'Update';
  }

  onUpdate() {
    if (!this.formGroup.valid) return;
    this.currentItem.name = this.formGroup.get('name').value;
    this.currentItem.country = this.formGroup.get('country').value;
    if (this.isCreate) {
      this.carService.create(this.currentItem).subscribe(this.httpObserver);
    } else {
      this.carService.update(this.currentItem).subscribe(this.httpObserver);
    }

    this.isModifiy = false;
  }

  onDelete(car: Car) {
    if (car.id < 0) return;
    this.carService.delete(car).subscribe(this.httpObserver);
    this.resetCurrentItem();
    this.isModifiy = false;
  }

  onCancel() {
    this.resetCurrentItem();
    this.isModifiy = false;
  }

  onFilter(filterValue: string) {
    this.filterText = filterValue.trim().toLowerCase();
  }

  isSelected(): boolean {
    return this.currentItem.id >= 0;
  }

  private resetCurrentItem() {
    this.currentItem = { id: -1, name: '', country: ''};
  }

  private refreshData() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  private subscribeData() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page, fromEvent(document.getElementById('filter'),'keyup'))
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
