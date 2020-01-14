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

  isFlipEnabled: boolean = false;

  @Output() fetchData = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  drawSVG() {
    if (this.numberOfFans && this.numberOfPorts && this.numberOfPower) {
      this.isFlipEnabled = true;
      const data = {
        numberOfFans: this.numberOfFans,
        numberOfPorts: this.numberOfPorts,
        numberOfPower: this.numberOfPower
      };
      this.fetchData.emit(data);
    };
  }

  flipImage() {
    window.alert('Flip is not ready for now!');
  }

}
