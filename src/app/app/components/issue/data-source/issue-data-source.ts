import { DataSource } from '@angular/cdk/table';
import { Issue, IssueService } from 'src/app/app/services/issue.service';
import { BehaviorSubject, Observable, merge } from 'rxjs';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';

export class IssueDataSource extends DataSource<Issue> {
    _filterChange = new BehaviorSubject('');
    filteredData: Issue[] = [];
    renderedData: Issue[] = [];

    get filter(): string {return this._filterChange.value;}
    set filter(filter: string) {this._filterChange.next(filter);}

    constructor(public _exampleDatabase: IssueService, public _paginator: MatPaginator, public _sort: MatSort) {
        super();
        this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
    }

    connect(): Observable<Issue[]> {
        const displayDataChanges = [
            this._exampleDatabase.dataChange,
            this._sort.sortChange,
            this._filterChange,
            this._paginator.page
        ];

        this._exampleDatabase.getAllIssues();


        return merge(...displayDataChanges).pipe(map(() => {
            this.filteredData = this._exampleDatabase.data.slice().filter((issue: Issue) => {
                const searchStr = (issue.id + issue.title + issue.url + issue.created_at).toLowerCase();
                return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
            });

            const sortedData = this.sortData(this.filteredData.slice());

            const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
            this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
            return this.renderedData;
        }
        ));
    }

    disconnect() { }

    sortData(data: Issue[]): Issue[] {
        if (!this._sort.active || this._sort.direction === '') {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            switch (this._sort.active) {
                case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
                case 'title': [propertyA, propertyB] = [a.title, b.title]; break;
                case 'state': [propertyA, propertyB] = [a.state, b.state]; break;
                case 'url': [propertyA, propertyB] = [a.url, b.url]; break;
                case 'created_at': [propertyA, propertyB] = [a.created_at, b.created_at]; break;
                case 'updated_at': [propertyA, propertyB] = [a.updated_at, b.updated_at]; break;
            }

            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
        });
    }
}
