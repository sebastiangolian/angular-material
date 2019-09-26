import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CarService } from '../../services/car.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

export interface Car {
  id: number;
  name: string;
  color: string;
}

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  items = new BehaviorSubject<Car[]>([]);
  currentItem: Car = { id: -1, name: '', color: ''};
  dataSource: MatTableDataSource<Car>;
  editForm: FormGroup;
  isCreate = false;
  isEdit = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private formBuilder: FormBuilder, private carService: CarService) {
    //this.carService.subscribe(this.items);
    this.dataSource = new MatTableDataSource(this.carService.getAll());
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      color: ['', Validators.required]
    });
  }

  onSelect(id: number) {
    this.currentItem = this.carService.get(id);
  }

  isSelected(): boolean {
    return this.currentItem.id >= 0;
  }

  onAdd() {
    this.editForm.reset();
    this.isCreate = true;
    this.isEdit = true;
  }

  onEdit() {
    if (this.currentItem.id < 0) return;
    this.editForm.get('name').setValue(this.currentItem.name);
    this.editForm.get('color').setValue(this.currentItem.color);
    this.isCreate = false;
    this.isEdit = true;
  }

  onDelete() {
    if (this.currentItem.id < 0) return;
    this.carService.delete(this.currentItem.id);
    this.currentItem = { id: -1, name: '', color: '' };
    this.isEdit = false;
  }

  onUpdate() {
    if (!this.editForm.valid) return;
    const name = this.editForm.get('name').value;
    const color = this.editForm.get('color').value;
    if (this.isCreate) {
      this.currentItem = this.carService.add(name, color);
    } else {
      const id = this.currentItem.id;
      this.carService.update(id, name, color);
      this.currentItem = {id, name, color};
    }
    this.isEdit = false;
  }

  onCancel() {
    this.currentItem = { id: -1, name: '', color: ''};
    this.isEdit = false;
  }

  onFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}