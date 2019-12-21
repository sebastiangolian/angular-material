import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private user: UserService) {
    this.user.get().subscribe(val => console.log(val))
    this.user.register({id:1,username:"sebagolian"}).subscribe(val => console.log(val))
  }
}