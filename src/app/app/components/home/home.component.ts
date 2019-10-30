import { Component } from '@angular/core';
import { CarService } from '../car/service/car.service';
import { CommitService } from '../commit/service/commit.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  model: any;

  constructor(public carService: CarService, public commitService: CommitService) {

  }
}
