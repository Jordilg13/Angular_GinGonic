import { Component, ViewChild, ElementRef, OnInit, NgZone } from '@angular/core';
import { Character } from './character/character';
import { Background } from './background/background';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;
  requestId;
  interval;
  squares: Character[] = [];
  background: Background;

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.fillStyle = 'red';
    this.ngZone.runOutsideAngular(() => this.main());
    setInterval(() => {
      this.main();
    }, 17);
  }

  main() {
    this.background = new Background(this.ctx);
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.squares.forEach((square: Character) => {
      square.moveRight();
    });
    this.requestId = requestAnimationFrame(() => this.main);
    this.background.draw();
  }

  play() {
    const square = new Character(this.ctx);
    this.squares = this.squares.concat(square);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    cancelAnimationFrame(this.requestId);
  }
}
