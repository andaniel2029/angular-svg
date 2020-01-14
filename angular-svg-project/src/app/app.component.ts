import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-svg-project';
  portCount: number;
  fanCount: number;
  powerCount: number;

  isDataFetched: boolean = false;

  portColors: Array<string> = [];


  getData(data) {
    if (data) {
      this.portCount = data.numberOfPorts;
      this.fanCount = data.numberOfFans;
      this.powerCount = data.numberOfPower;

      this.isDataFetched = true;
      console.log('******', this.generateRandomColor());
    }
  }

  generateRandomColor() {
    return Math.floor(Math.random()*16777215).toString(16);
  }
}
