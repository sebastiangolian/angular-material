import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';

export class Commits {
  sha: string;
  node_id: string;
  commit: Commit[];
}

export class Commit {
  message: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommitService {

  private readonly API_URL = 'https://api.github.com/repos/sebastiangolian/angular-material/commits';

  dataChange: BehaviorSubject<Commits[]> = new BehaviorSubject<Commits[]>([]);
  dialogData: any;

  constructor(private httpClient: HttpClient) { }

  get data(): Commits[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAll(): void {
    this.httpClient.get<Commits[]>(this.API_URL).subscribe(
      (data) => this.dataChange.next(data),
      (error: HttpErrorResponse) => console.log(error.name + ' ' + error.message)
    );
  }

  add(commit: Commits): void {
    this.dialogData = commit;
  }

  update(commit: Commits): void {
    this.dialogData = commit;
  }

  delete(id: number): void {
    console.log(id);
  }
}
