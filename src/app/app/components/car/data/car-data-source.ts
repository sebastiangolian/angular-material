import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable, merge } from 'rxjs';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Car, CarService } from '../service/car.service';

export class CarDataSource extends DataSource<Car> {
    filterChange = new BehaviorSubject('');
    filteredData: Car[] = [];
    renderedData: Car[] = [];

    get filter(): string {return this.filterChange.value;}
    set filter(filter: string) {this.filterChange.next(filter);}

    constructor(public carService: CarService, public paginator: MatPaginator, public sort: MatSort) {
        super();
        this.filterChange.subscribe(() => this.paginator.pageIndex = 0);
    }

    connect(): Observable<Car[]> {        
        const displayDataChanges = [
            this.carService.dataChange,
            this.sort.sortChange,
            this.filterChange,
            this.paginator.page
        ];

        this.carService.getAll();
        return merge(...displayDataChanges).pipe(map(() => {
            this.filteredData = this.carService.data.slice().filter((car: Car) => {
                const searchStr = (car.id + car.name + car.country).toLowerCase();
                return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
            });

            const sortedData = this.sortData(this.filteredData.slice());
            const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
            this.renderedData = sortedData.splice(startIndex, this.paginator.pageSize);
            return this.renderedData;
        }
        ));
    }

    disconnect() { }

    sortData(data: Car[]): Car[] {
        if (!this.sort.active || this.sort.direction === '') {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            switch (this.sort.active) {
                case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
                case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
                case 'country': [propertyA, propertyB] = [a.country, b.country]; break;
            }

            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this.sort.direction === 'asc' ? 1 : -1);
        });
    }
}
