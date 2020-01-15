import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { DataApiService } from '../core/services/data-api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-data-fetch',
  templateUrl: './data-fetch.component.html',
  styleUrls: ['./data-fetch.component.scss']
})
export class DataFetchComponent implements OnInit, OnDestroy {
  numberOfPorts: number;
  numberOfFans: number;
  numberOfPower: number;

  isFlipEnabled: boolean = false;

  deviceDataSubscription: Subscription;

  @Output() fetchData = new EventEmitter();

  constructor(private dataService: DataApiService) {
    const deviceName = 'cisco5';
    this.deviceDataSubscription = this.dataService.getDeviceData(deviceName).subscribe(res => {
      console.log('data fetched: ', res);
    });
  }

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

  ngOnDestroy() {
    if (this.deviceDataSubscription) {
      this.deviceDataSubscription.unsubscribe();
    }
  }
}
