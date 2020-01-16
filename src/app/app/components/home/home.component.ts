import { Component } from '@angular/core';
import { CarService, Car } from '../../services/car.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  cars: Car[]

  constructor(private carService: CarService) {
    this.carService.getSubject().subscribe(cars => {
      this.carService.add({id:null, name:"new car",country:"Poland"});
      this.carService.update({id:1, name:"car 111",country:"Poland"});
      this.carService.delete({id:2, name:null,country:null});
      this.cars = cars;
    })
  }
}
