import { DataSource } from '@angular/cdk/table';
import { Issue, IssueService } from 'src/app/app/services/issue.service';
import { BehaviorSubject, Observable, merge } from 'rxjs';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';

export class IssueDataSource extends DataSource<Issue> {
    filterChange = new BehaviorSubject('');
    filteredData: Issue[] = [];
    renderedData: Issue[] = [];

    get filter(): string {return this.filterChange.value;}
    set filter(filter: string) {this.filterChange.next(filter);}

    constructor(public issueService: IssueService, public paginator: MatPaginator, public sort: MatSort) {
        super();
        this.filterChange.subscribe(() => this.paginator.pageIndex = 0);
    }

    connect(): Observable<Issue[]> {
        const displayDataChanges = [
            this.issueService.dataChange,
            this.sort.sortChange,
            this.filterChange,
            this.paginator.page
        ];

        this.issueService.getAllIssues();
        return merge(...displayDataChanges).pipe(map(() => {
            this.filteredData = this.issueService.data.slice().filter((issue: Issue) => {
                const searchStr = (issue.id + issue.title + issue.url + issue.created_at).toLowerCase();
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

    sortData(data: Issue[]): Issue[] {
        if (!this.sort.active || this.sort.direction === '') {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            switch (this.sort.active) {
                case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
                case 'title': [propertyA, propertyB] = [a.title, b.title]; break;
                case 'state': [propertyA, propertyB] = [a.state, b.state]; break;
                case 'url': [propertyA, propertyB] = [a.url, b.url]; break;
                case 'created_at': [propertyA, propertyB] = [a.created_at, b.created_at]; break;
                case 'updated_at': [propertyA, propertyB] = [a.updated_at, b.updated_at]; break;
            }

            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this.sort.direction === 'asc' ? 1 : -1);
        });
    }
}
