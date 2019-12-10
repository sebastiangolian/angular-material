import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { fromEvent } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CarService, Car } from '../car/service/car.service';
import { CarDataSource } from '../car/data/car-data-source';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl: './car-one-side.component.html',
  styleUrls: ['./car-one-side.component.css']
})
export class CarOneSideComponent implements OnInit {

  displayedColumns = ['id','name', 'country', 'actions'];
  currentItem: Car = { id: -1, name: '', country: ''};
  databaseService: CarService | null;
  dataSource: CarDataSource | null;
  formGroup: FormGroup;
  isCreate: boolean = false;
  isModifiy: boolean = false;
  formButtonName: string;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  constructor(public httpClient: HttpClient, public dialog: MatDialog, public carService: CarService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      country: ['', Validators.required]
    });
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

  isSelected(): boolean {
    return this.currentItem.id >= 0;
  }

  onAdd() {
    this.formGroup.reset();
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
    const name = this.formGroup.get('name').value;
    const country = this.formGroup.get('country').value;
    if (this.isCreate) {
      let nextId = this.databaseService.getSubject().value[this.databaseService.getSubject().value.length-1].id + 1;
      this.currentItem = {id: nextId, name: name, country: country};
      this.databaseService.getSubject().value.push(this.currentItem);
    } else {
      this.currentItem.name = name;
      this.currentItem.country = country;
      const foundIndex = this.databaseService.getSubject().value.findIndex(x => x.id === this.currentItem.id);
      this.databaseService.getSubject().value[foundIndex] = this.currentItem;
    }

    this.refreshTable()
    this.isModifiy = false;
  }

  onDelete(car: Car) {
    if (car.id < 0) return;
    const foundIndex = this.databaseService.getSubject().value.findIndex(x => x.id === car.id);
    this.databaseService.getSubject().value.splice(foundIndex, 1);
    this.currentItem = { id: -1, name: '', country: ''};
    this.isModifiy = false;
    this.refreshTable()
  }

  onCancel() {
    this.currentItem = { id: -1, name: '', country: ''};
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
