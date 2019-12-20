import { Component, ViewChild, ElementRef, OnInit, NgZone } from '@angular/core';
import { Character } from '../character/character';
import { Background } from '../background/background';
import { Scoreboard } from '../scoreboard/scoreboard';
import { SocketService } from "../core/services/socket.service";
import { UserService, User } from "../core";
import { ActivatedRoute } from '@angular/router';

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
  currentUser: User;
  characters: Character[] = [];
  profiles: any[] = [];
  background: Background;
  keys = {};
  scoreboard: Scoreboard;
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
    private ngZone: NgZone,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {

    // this.userService.checkLoggedUser();

    let count = 0;
    this.socket.getEventListener().subscribe(event => {
      if (event.type == "message") {
        let data = event.data;
        if (data.content == undefined) {
          if (count < 5 ) {
            count++;
            console.log(data);
          }
          let properties;
          if (data.ID == this.mainCharacter.id && data.ID != 0) {
            properties = {
              width: data.Width,
              height: data.Height,
              moveSpeed: data.MoveSpeed,
              chaser: data.Chaser,
              sprite: data.Sprite,
              time: data.Time,
              notChasing: data.NotChasing,
              profile: data.Profile
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
              chaser: data.Chaser,
              sprite: data.Sprite,
              userName: data.Username,
              alive: data.Alive,
              room: data.Room,
              time: data.Time,
              notChasing: data.NotChasing,
              profile: data.Profile
            };
            if (count < 5 ) {
              console.log("miau");
              console.log(this.characters);
            }
            if (this.characters[data.ID] != undefined && data.ID != 0) {
              this.characters[data.ID].updateProps(properties);
            } else if (data.ID != 0) {
              this.characters[data.ID] = new Character(this.ctx, properties);
              this.profiles[data.ID] = new Image();
              this.profiles[data.ID].src = data.Profile;
            }
            if (this.profiles[data.ID] != undefined && this.profiles[data.ID].src != data.Profile) {
              this.profiles[data.ID].src = data.Profile;
            }
          }
        }
      }
      if (event.type == "close") {
        console.log('eeeeeeeeeeeeei');
        console.log(event);
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
    this.scoreboard = new Scoreboard(this.ctx);
    this.mainCharacter.room = this.route.snapshot.paramMap.get('room')
    this.userService.currentUser.subscribe(user => {
      if (user.username != undefined) {
        this.currentUser = user;
        this.mainCharacter.userName = user.username;
      }
      if (user.image != undefined && user.image != "") {
        this.mainCharacter.profile = user.image;
        this.profiles[this.mainCharacter.id] = new Image();
        this.profiles[this.mainCharacter.id].src = user.image;
      } else if (user.username != undefined) {
        this.mainCharacter.profile = "https://api.adorable.io/avatars/35/" + user.username;
        this.profiles[this.mainCharacter.id] = new Image();
        this.profiles[this.mainCharacter.id].src = this.mainCharacter.profile;
      }
    });
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
    let characterArray = [];
    for (let character in this.characters) {
      if (this.characters[character].id != this.mainCharacter.id && this.characters[character].alive) {
        this.characters[character].draw(false);
      }
      characterArray.push(this.characters[character]);
    };
    if (this.mainCharacter.alive) {
      if (!this.mainCharacter.tagging) {
        this.characterControls();
      }
      this.characterMove();
    }
    this.mainCharacter.draw(true);
    //console.log(this.characters.length);
    this.scoreboard.draw(characterArray, this.mainCharacter, this.profiles);
  }

  characterControls() {
    let directionX = 0
    let directionY = 0
    let showLog = false;
    let showUp = false;
    let showDown = false;
    if (this.keys[this.keyCode.left]) {
      //this.send();
      directionX += - this.mainCharacter.moveSpeed;
      this.mainCharacter.direction = 3; //left
      showLog = true;
    }
    if (this.keys[this.keyCode.right]) {
      directionX += this.mainCharacter.moveSpeed;
      this.mainCharacter.direction = 1; //right
      (showLog==true) ? showLog = false : showLog = true;
    }
    if (this.keys[this.keyCode.up]) {
      directionY += -this.mainCharacter.moveSpeed;
      this.mainCharacter.direction = 2; //up
      showUp = true;
    }
    if (this.keys[this.keyCode.down]) {
      directionY += this.mainCharacter.moveSpeed;
      this.mainCharacter.direction = 0; //down
      showDown = true;
    }
    if (showLog && showUp && showDown) {
      console.log("Characters: ");
      console.log(this.characters);
      console.log("Profiles: ");
      console.log(this.profiles);
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
      Chaser: this.mainCharacter.chaser,
      UserName: this.mainCharacter.userName,
      Room: this.mainCharacter.room,
      Time: this.mainCharacter.time,
      Profile: this.mainCharacter.profile
    }
    this.socket.send(JSON.stringify(sendableProperties));
  }

  public isSystemMessage(message: string) {
    return message.startsWith("/") ? "<strong>" + message.substring(1) + "</strong>" : message;
  }

}
