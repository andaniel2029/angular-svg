import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-data-fetch',
  templateUrl: './data-fetch.component.html',
  styleUrls: ['./data-fetch.component.scss']
})
export class DataFetchComponent implements OnInit {
  numberOfPorts: number;
  numberOfFans: number;
  numberOfPower: number;

  @Output() fetchData = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  drawSVG() {
    if (this.numberOfFans && this.numberOfPorts && this.numberOfPower) {
      const data = {
        numberOfFans: this.numberOfFans,
        numberOfPorts: this.numberOfPorts,
        numberOfPower: this.numberOfPower
      }
      this.fetchData.emit(data);
    }
  }

}
