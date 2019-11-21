import { Component, ViewChild, ElementRef, OnInit, NgZone } from '@angular/core';
import { Character } from './character/character';
import { Background } from './background/background';
import { SocketService } from "./services/socket.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  public messages: Array<any>;
  public chatBox: string;


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
  constructor(private socket: SocketService, private ngZone: NgZone) {

    // let keys = {};
    this.messages = [];


  }


  ngOnInit() {
    this.socket.getEventListener().subscribe(event => {
      // console.log(event.data);

      if (event.type == "message") {
        let data = event.data;
        for (let i = 0; i < data.length; i++) {
          let content;
          let properties;

          try {
            // console.log(JSON.parse(data[i]).sender);
            content = JSON.parse(JSON.parse(data[i]).content);
            properties = {
              id: content.id,
              spriteX: content.spriteX,
              spriteY: content.spriteY,
              width: content.width,
              height: content.height,
              moveSpeed: content.moveSpeed,
              x: content.x,
              y: content.y,
              moving: content.moving,
              currentSprite: content.currentSprite,
              attackSprite: content.attackSprite,
              direction: content.direction,
              attacking: content.attacking,
              attackPressed: content.attackPressed,
              alive: content.alive
            };
            if (this.characters[JSON.parse(data[i]).sender] != undefined) {
              this.characters[JSON.parse(data[i]).sender].updateProps(properties);
            } else {
              this.characters[JSON.parse(data[i]).sender] = new Character(this.ctx, properties);

            }
          } catch (error) {
          }


        }
        // this.messages.push(data);
      }
      if (event.type == "close") {
        //this.messages.push("/The socket connection has been closed");
      }
      if (event.type == "open") {
        //this.messages.push("/The socket connection has been established");
        //this.characters.push(new Character(this.ctx, properties))
      }
    });

    this.ctx = this.canvas.nativeElement.getContext('2d');
    let keys = this.keys;
    this.background = new Background(this.ctx);
    this.mainCharacter = new Character(this.ctx, {});
    window.onkeyup = function (e) { keys[e.keyCode] = false; }
    window.onkeydown = function (e) { keys[e.keyCode] = true; }
    this.ngZone.runOutsideAngular(() => function () { this.main() });
    setInterval(() => {
      this.main();
    }, 34);
  }

  main() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.send();
    this.requestId = requestAnimationFrame(() => this.main);
    this.background.draw();

    for (let character in this.characters) {

      if (this.characters[character].id != this.mainCharacter.id) {
        this.characters[character].draw();

      }
    };
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
    this.socket.send(JSON.stringify(this.mainCharacter));

  }

  public isSystemMessage(message: string) {
    return message.startsWith("/") ? "<strong>" + message.substring(1) + "</strong>" : message;
  }
}
