import { Component, OnInit } from '@angular/core';
import { FightersService } from '../../services/fighters.service';

@Component({
  templateUrl: './fighters.component.html',
  styleUrls: ['./fighters.component.css']
})
export class FightersComponent implements OnInit {

  fighters: Array<any>;

  constructor(private fightersService: FightersService) { }

  ngOnInit() {
    this.fightersService.get().subscribe(res => {
      this.fighters = res;
    });
  }

  add() {
    this.fightersService.add()
  }

  update() {
    this.fightersService.update()
  }

  delete() {
    this.fightersService.delete()
  }
}
