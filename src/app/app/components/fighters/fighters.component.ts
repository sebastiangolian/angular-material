import { Component, OnInit } from '@angular/core';
import { FightersService } from '../../services/fighters.service';
import { Fighter } from './fighter';

@Component({
  templateUrl: './fighters.component.html',
  styleUrls: ['./fighters.component.css']
})
export class FightersComponent implements OnInit {

  fighters: Array<Fighter>;

  constructor(private fightersService: FightersService) { }

  ngOnInit() {
    this.fightersService.get().subscribe(res => {
      this.fighters = res;
    });
  }

  add() {
    this.fightersService.add({ id: 7, name: 'Brock Lesnar', wins: 5, losses: 3 })
  }

  update() {
    this.fightersService.update({ id: 6, name: 'Brock Leśniak', wins: 50, losses: 30 })
  }

  delete() {
    this.fightersService.delete({ id: 1, name: 'Conor McGregor', wins: 21, losses: 3 })
  }
}
