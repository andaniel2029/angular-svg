import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';
declare const SVG:any;
const RECT_DEFAULT_SIZE = 20;
const OFFSET_TOP = 100;
const OFFSET_LEFT = 30;
const PADDING_SIZE = 10;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('svgImg', { static: false })  
  svgImg: any;

  title = 'angular-svg-project';
  portCount: number;
  fanCount: number;
  powerCount: number;

  frontImageWidth: number;
  frontImageHeight: number;

  switchImgUrl: string = 'assets/switch-svg.svg';

  isDataFetched: boolean = false;
  portColors: Array<string> = [];

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    
  }

  getData(data) {
    if (data) {
      this.isDataFetched = true;

      this.portCount = data.numberOfPorts;
      this.fanCount = data.numberOfFans;
      this.powerCount = data.numberOfPower;

      const possibleCountInRow = Math.floor((this.frontImageWidth - OFFSET_LEFT) / (RECT_DEFAULT_SIZE + PADDING_SIZE));
      const possibleCountInColumn = Math.floor((this.frontImageHeight - OFFSET_TOP) / (RECT_DEFAULT_SIZE + PADDING_SIZE))

      let colIndex = 0;
      let rowIndex = 0;

      if (this.portCount > (possibleCountInColumn * possibleCountInRow)) {
        window.alert("can't draw rects because of limited space");
      } else {

        const canvas = document.getElementById('canvas');
        const svg = Array.from(canvas.children).find(el => el.tagName === 'svg');
        if (svg) {
          this.renderer.removeChild(canvas, svg);
        }

        const draw = SVG('canvas').size(this.frontImageWidth, this.frontImageHeight);
        for (let index = 0; index < this.portCount; index++) {
          
          if (OFFSET_LEFT + colIndex * (RECT_DEFAULT_SIZE + PADDING_SIZE + 1) > this.frontImageWidth) {
            colIndex = 0;
            rowIndex++
          }
          const positionX = OFFSET_LEFT + colIndex * (RECT_DEFAULT_SIZE + PADDING_SIZE);
          const positionY = OFFSET_TOP + rowIndex * (RECT_DEFAULT_SIZE + PADDING_SIZE);
          const color = this.generateRandomColor();
          const rect = draw.rect(RECT_DEFAULT_SIZE, RECT_DEFAULT_SIZE).fill(color).move(positionX, positionY);
          rect.draggable();

          rect.on('click', () => {
            rect.fill({ color: this.generateRandomColor() });
          });

          colIndex++;
        }
      }
    }
  }

  generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.frontImageWidth = this.svgImg.element.nativeElement.offsetWidth;
      this.frontImageHeight = this.svgImg.element.nativeElement.offsetHeight;
    }, 100);
    
  }

}
