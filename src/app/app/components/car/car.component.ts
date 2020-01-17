import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { fromEvent, PartialObserver } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CarDataSource } from '../../data-sources/car-data-source';
import { Car, CarService } from '../../services/car.service';

@Component({
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  displayedColumns = ['id','name','country','actions'];
  currentItem: Car;
  dataSource: CarDataSource | null;
  formGroup: FormGroup;
  isCreate: boolean = false;
  isModifiy: boolean = false;
  formButtonName: string;

  httpObserver: PartialObserver<any> = {
    next: response => console.info(response),
    error: error => console.error(error),
    complete: () => {
      this.refreshTable()
    },
  };

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  constructor(public httpClient: HttpClient, public dialog: MatDialog, private formBuilder: FormBuilder, public carService: CarService) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      country: ['', Validators.required]
    });
    this.resetCurrentItem();
    this.dataSource = new CarDataSource(this.carService, this.paginator, this.sort);
    this.filterSubscribe()
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  private resetCurrentItem() {
    this.currentItem = { id: -1, name: '', country: ''};
  }

  isSelected(): boolean {
    return this.currentItem.id >= 0;
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
    this.refreshTable()
  }

  onDelete(car: Car) {
    if (car.id < 0) return;
    this.carService.delete(car).subscribe(this.httpObserver);
    this.resetCurrentItem();
    this.isModifiy = false;
    this.refreshTable()
  }

  onCancel() {
    this.resetCurrentItem();
    this.isModifiy = false;
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
