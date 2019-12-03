import { Component, ViewChild, ElementRef, OnInit, NgZone } from '@angular/core';
import { Character } from '../character/character';
import { Background } from '../background/background';
import { SocketService } from "../core/services/socket.service";
import { UserService } from "../core";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  public chatBox: string;
  public countSend: number;

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
  constructor(
    private socket: SocketService, 
    private userService: UserService, 
    private ngZone: NgZone
  ) {}


  ngOnInit() {
    let count = 0;
    this.userService.currentUser.subscribe(res => console.log(res))
    this.socket.getEventListener().subscribe(event => {
      
      if (event.type == "message") {
        let data = event.data;
        if (data.content == undefined) {
          if (count < 5 ) {
            count++;
            console.log(data);
          }
          let properties;
          if (data.ID == this.mainCharacter.id) {
            properties = {
              width: data.Width,
              height: data.Height,
              moveSpeed: data.MoveSpeed,
              chaser: data.Chaser
            }
            this.mainCharacter.updateProps(properties);
          } else {
            properties = {
              id: data.ID,
              spriteX: data.SpriteX,
              spriteY: data.SpriteY,
              width: data.Width,
              height: data.Height,
              moveSpeed: data.MoveSpeed,
              spritePositionsX: data.SpritePositionsX,
              spritePositionsY: data.SpritePositionsY,
              tagPositionsX: data.TagPositionsX,
              tagPositionsY: data.TagPositionsY,
              x: data.X,
              y: data.Y,
              moving: data.Moving,
              currentSprite: data.CurrentSprite,
              direction: data.Direction,
              tagPressed: data.TagPressed,
              framesByImage: data.FramesByImage,
              chaser: data.Chaser
            };
            if (this.characters[data.ID] != undefined && properties.ID != 0) {
              this.characters[data.ID].updateProps(properties);
            } else if (properties.ID != 0) {
              this.characters[data.ID] = new Character(this.ctx, properties);
            }
          }
        }
      }
      if (event.type == "close") {
      }
      if (event.type == "open") {
        console.log(event);
        //console.log(event.data);
        //this.characters.push(new Character(this.ctx, properties))
      }
    });
    this.countSend = 2;
    this.ctx = this.canvas.nativeElement.getContext('2d');
    let keys = this.keys;
    this.background = new Background(this.ctx);
    this.mainCharacter = new Character(this.ctx, {});
    window.onkeyup = function (e) { keys[e.keyCode] = false; }
    window.onkeydown = function (e) { keys[e.keyCode] = true; }
    this.ngZone.runOutsideAngular(() => function () { this.main() });
    setInterval(() => {
      this.main();
    }, 17);
  }

  main() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.send();
    // uncomment this if you want see the other characters in 30fps
    /*if (this.countSend == 0) {
      this.countSend = 1;
    } else {
      this.countSend--;
    }*/
    this.requestId = requestAnimationFrame(() => this.main);
    this.background.draw();

    for (let character in this.characters) {

      if (this.characters[character].id != this.mainCharacter.id) {
        this.characters[character].draw();
      }
    };
    if (this.mainCharacter.alive) {
      if (!this.mainCharacter.tagging) {
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
      //this.send();
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
    this.socket.close();

  }
  public send() {
    let sendableProperties = {
      ID: this.mainCharacter.id,
      SpriteX: this.mainCharacter.spriteX,
      SpriteY: this.mainCharacter.spriteY,
      SpritePositionsX: this.mainCharacter.spritePositionsX,
      SpritePositionsY: this.mainCharacter.spritePositionsY,
      TagPositionsX: this.mainCharacter.tagPositionsX,
      TagPositionsY: this.mainCharacter.tagPositionsY,
      Moving: this.mainCharacter.moving,
      CurrentSprite: this.mainCharacter.currentSprite,
      Direction: this.mainCharacter.direction,
      Tagging: this.mainCharacter.tagging,
      TagPressed: this.mainCharacter.tagPressed,
      X: this.mainCharacter.x,
      Y: this.mainCharacter.y,
      Chaser: this.mainCharacter.chaser
    }
    this.socket.send(JSON.stringify(sendableProperties));
  }

  public isSystemMessage(message: string) {
    return message.startsWith("/") ? "<strong>" + message.substring(1) + "</strong>" : message;
  }

}
