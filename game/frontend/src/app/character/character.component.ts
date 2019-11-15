import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  /*context;
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
    //positionX: this.canvas.nativeElement.width / 2,
    //positionY: this.canvas.nativeElement.height / 2,
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
*/
  ngOnInit() {
  }
/*
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
  }*/

}
