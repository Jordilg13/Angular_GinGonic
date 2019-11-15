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
  mainCharacter: Character;
  characters: Character[] = [];
  background: Background;
  keys = {};
  keyCode = {
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    space: 32
  };
  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    let keys = this.keys;
    this.background = new Background(this.ctx);
    this.mainCharacter = new Character(this.ctx, {});
    window.onkeyup = function (e) { keys[e.keyCode] = false; }
    window.onkeydown = function (e) { keys[e.keyCode] = true; }
    this.ngZone.runOutsideAngular(() => function() { this.main() });
    setInterval(() => {
      this.main();
    }, 17);
  }

  main() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.characters.forEach((character: Character) => {
      character.draw();
    });
    this.requestId = requestAnimationFrame(() => this.main);
    this.background.draw();
    if (this.mainCharacter.alive) {
      if (!this.mainCharacter.attacking) {
        this.characterControls();
      }
      this.characterMove();
    }
    this.mainCharacter.draw();
  }

  characterControls() {
    let directionX = 0
    let directionY = 0
    if (this.keys[this.keyCode.left]) {
      directionX += - this.mainCharacter.moveSpeed;
      this.mainCharacter.direction = 3; //left
    }
    if (this.keys[this.keyCode.right]) {
      directionX += this.mainCharacter.moveSpeed;
      this.mainCharacter.direction = 1; //right
    }
    if (this.keys[this.keyCode.up]) {
      directionY += -this.mainCharacter.moveSpeed;
      this.mainCharacter.direction = 2; //up
    }
    if (this.keys[this.keyCode.down]) {
      directionY += this.mainCharacter.moveSpeed;
      this.mainCharacter.direction = 0; //down
    }
    if (directionX == 0 && directionY == 0) {
      this.mainCharacter.moving = false;
    } else {
      this.mainCharacter.moving = true;
    }
    this.mainCharacter.x += directionX;
    this.mainCharacter.y += directionY;
  }

  characterMove() {
    if (this.mainCharacter.x < 0) {
      this.mainCharacter.x = this.canvas.nativeElement.width - this.mainCharacter.width;
    } else if (this.mainCharacter.x > this.canvas.nativeElement.width - this.mainCharacter.width) {
      this.mainCharacter.x = 0;
    } else if (this.mainCharacter.y < 0) {
      this.mainCharacter.y = this.canvas.nativeElement.height - this.mainCharacter.height;
    } else if (this.mainCharacter.y > this.canvas.nativeElement.height - this.mainCharacter.height) {
      this.mainCharacter.y = 0;
    }
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    cancelAnimationFrame(this.requestId);
  }
}
