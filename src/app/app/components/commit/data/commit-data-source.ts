import { DataSource } from '@angular/cdk/table';
import { CommitService, Commits } from 'src/app/app/services/commit.service';
import { BehaviorSubject, Observable, merge } from 'rxjs';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';

export class CommitDataSource extends DataSource<Commits> {
    filterChange = new BehaviorSubject('');
    filteredData: Commits[] = [];
    renderedData: Commits[] = [];

    get filter(): string {return this.filterChange.value;}
    set filter(filter: string) {this.filterChange.next(filter);}

    constructor(public commitService: CommitService, public paginator: MatPaginator, public sort: MatSort) {
        super();
        this.filterChange.subscribe(() => this.paginator.pageIndex = 0);
    }

    connect(): Observable<Commits[]> {
        const displayDataChanges = [
            this.commitService.dataChange,
            this.sort.sortChange,
            this.filterChange,
            this.paginator.page
        ];

        this.commitService.getAll();
        return merge(...displayDataChanges).pipe(map(() => {
            this.filteredData = this.commitService.data.slice().filter((issue: Commits) => {
                const searchStr = (issue.sha + issue.node_id).toLowerCase();
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

    sortData(data: Commits[]): Commits[] {
        if (!this.sort.active || this.sort.direction === '') {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            switch (this.sort.active) {
                case 'sha': [propertyA, propertyB] = [a.sha, b.sha]; break;
                case 'node_id': [propertyA, propertyB] = [a.node_id, b.node_id]; break;
            }

            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this.sort.direction === 'asc' ? 1 : -1);
        });
    }
}
