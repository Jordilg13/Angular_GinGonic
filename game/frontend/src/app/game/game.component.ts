import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  @ViewChild('#canvas', { static: false }) canvas: ElementRef;
  context;
  keys = {};
  keyCode = {
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    space: 32
  };
  character = {
    spriteX: 0,
    spriteY: 0,
    width: 100,
    height: 200,
    attackWidth: 200,
    attackHeight: 200,
    moveSpeed: 7,
    positionX: this.canvas.nativeElement.width / 2,
    positionY: this.canvas.nativeElement.height / 2,
    spritePositionsX: [0, 100, 200, 300],
    spritePositionsY: [0, 200, 400, 600],
    attackPositionsX: [0, 200, 400, 600],
    attackPositionsY: [0, 200, 400, 600],
    moving: false,
    currentSprite: 0,
    attackSprite: undefined,
    direction: 0,
    attacking: false,
    attackPressed: false,
    alive: true
  };
  sprites = {
    characterMovement: new Image(),
    characterAttack: new Image(),
    grass: new Image(),
  };
  framesByImage = 5;

  constructor() {
    
    let keys = {};
    
    for (let spriteName in this.sprites) {
      this.sprites[spriteName].src = "assets/" + spriteName + ".png";
    }

    window.onkeyup = function (e) { keys[e.keyCode] = false; }
    window.onkeydown = function (e) { keys[e.keyCode] = true; }

    this.context = this.canvas.nativeElement.getContext('2d');

    
  }

  ngOnInit() {
    this.mapGenerate();
    this.draw();
    setInterval(this.main, 17);
  }

  draw() {
    this.clearCanvas();
    this.context.beginPath();
    this.context.textAlign = "center";
    let pattern = this.context.createPattern(this.sprites.grass, 'repeat'); // Create a pattern with this image, and set it to "repeat".
    this.context.fillStyle = pattern;
    this.context.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height); // this.context.fillRect(x, y, width, height);

    this.character.spriteX = this.character.spritePositionsX[this.character.currentSprite];
    this.character.spriteY = this.character.spritePositionsY[this.character.direction];
    this.context.drawImage(this.sprites.characterMovement, this.character.spriteX, this.character.spriteY, this.character.width, this.character.height, this.character.positionX, this.character.positionY, this.character.width, this.character.height);

    if (this.character.moving) {
      if (this.framesByImage == 0) {
        this.character.currentSprite++;
        this.framesByImage = 5;
      } else {
        this.framesByImage--;
      }
      if (this.character.currentSprite >= 3 && this.framesByImage == 0) {
        this.character.currentSprite = 0;
        this.framesByImage = 5;
      }
    } else {
      this.character.currentSprite = 0;
    }
  }

  clearCanvas() {
    this.canvas.nativeElement.width = this.canvas.nativeElement.width;
  }

  mapGenerate() {
    let x = 0;
    let y = 0;
    let map = [];
    for (x = 0; x < this.canvas.nativeElement.width / 192; x++) {
      map[x] = [];
      for (y = 0; y < this.canvas.nativeElement.height / 108; y++) {
        let randomNumber = Math.floor(Math.random() * 10000);
        if (randomNumber > 9995) {
          map[x][y] = "babyDown";
        } else if (randomNumber > 9900) {
          map[x][y] = "skull";
        } else if (randomNumber > 9800) {
          map[x][y] = "rock2";
        } else if (randomNumber > 9700) {
          map[x][y] = "flowers2";
        } else if (randomNumber > 8500) {
          map[x][y] = "flowers";
        } else if (randomNumber > 8000) {
          map[x][y] = "rock";
        } else if (randomNumber > 7750) {
          map[x][y] = "groundLog2";
        } else {
          map[x][y] = undefined;
        }
      }
    }
  }

  characterControls() {
    let directionX = 0
    let directionY = 0
    if (this.keys[this.keyCode.left]) {
      directionX += - this.character.moveSpeed;
      this.character.direction = 3; //left
    }
    if (this.keys[this.keyCode.right]) {
      directionX += this.character.moveSpeed;
      this.character.direction = 1; //right
    }
    if (this.keys[this.keyCode.up]) {
      directionY += -this.character.moveSpeed;
      this.character.direction = 2; //up
    }
    if (this.keys[this.keyCode.down]) {
      directionY += this.character.moveSpeed;
      this.character.direction = 0; //down
    }
    if (directionX == 0 && directionY == 0) {
      this.character.moving = false;
    } else {
      this.character.moving = true;
    }
    this.character.positionX += directionX;
    this.character.positionY += directionY;
  }

  characterMove() {
    if (this.character.positionX < 0) {
      this.character.positionX = this.canvas.nativeElement.width - this.character.width;
    } else if (this.character.positionX > this.canvas.nativeElement.width - this.character.width) {
      this.character.positionX = 0;
    } else if (this.character.positionY < 0) {
      this.character.positionY = this.canvas.nativeElement.height - this.character.height;
    } else if (this.character.positionY > this.canvas.nativeElement.height - this.character.height) {
      this.character.positionY = 0;
    }
  }
  main() {
    if (this.character.alive) {
      if (!this.character.attacking) {
        this.characterControls();
      }
      this.characterMove();
    }
    this.draw();
  }
}
