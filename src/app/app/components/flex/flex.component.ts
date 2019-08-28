import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flex',
  templateUrl: './flex.component.html',
  styleUrls: ['./flex.component.css']
})
export class FlexComponent implements OnInit {

  text: string =  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta volutpat ligula non interdum. In in consequat diam, egestas fringilla tellus.' + 
                  ' Nam quis diam id dui maximus aliquam. Maecenas in laoreet risus. Aliquam vehicula pharetra sapien, quis facilisis erat cursus vel. Curabitur congue condimentum tincidunt.'
  
  constructor() { }

  ngOnInit() {
  }

}
