export class Character {
  public id;
  public username;
  public room;
  public spriteX = 0;
  public spriteY = 0;
  public width = 100;
  public height = 200;
  public moveSpeed = 15;
  public spritePositionsX = [0, 100, 200, 300];
  public spritePositionsY = [0, 200, 400, 600];
  public tagPositionsX = [0, 100, 200, 300];
  public tagPositionsY = [0, 200, 400, 600];
  public moving = false;
  public currentSprite = 0;
  public direction = 0;
  public tagging = false;
  public tagPressed = false;
  public framesByImage = 5;
  public alive = true;
  public x = 0;
  public y = 0;
  public chaser = false;
  public sprite = 0;
  public sprites = {
    ethan: new Image(),
    ivan: new Image(),
    raul: new Image(),
    jordi: new Image(),
    chaser: new Image()
  }
  public spriteNames = [ "ethan", "ivan", "raul", "jordi" ];
  public userName = "player";
  constructor(private ctx: CanvasRenderingContext2D, character) {
    this.id = Math.floor(Math.random()*999999999999);
    console.log(this.id);

    for (let property in character) {
      this[property.charAt(0).toLowerCase() + property.slice(1)] = character[property];
    }
    for (let spriteName in this.sprites) {
      this.sprites[spriteName].src = "assets/" + spriteName + ".png";
    }
  }

  public draw() {
    this.spriteX = this.spritePositionsX[this.currentSprite];
    this.spriteY = this.spritePositionsY[this.direction];
    this.ctx.drawImage(this.sprites[this.spriteNames[this.sprite]], this.spriteX, this.spriteY, this.width, this.height, this.x, this.y, this.width, this.height);
    if (this.moving) {
      if (this.framesByImage == 0) {
        this.currentSprite++;
        this.framesByImage = 5;
      } else {
        this.framesByImage--;
      }
      if (this.currentSprite >= 3 && this.framesByImage == 0) {
        this.currentSprite = 0;
        this.framesByImage = 5;
      }
    } else {
      this.currentSprite = 0;
    }
    if (this.chaser) {
      this.ctx.drawImage(this.sprites.chaser, 0, 0, 100, 100, this.x + 25, this.y - 50, 100, 100);
    }
    this.ctx.font = "30px boocity";
    this.ctx.fillStyle = "black";
    this.ctx.textAlign = "center";
    this.ctx.fillText(this.userName, this.x + 55, this. y + 30);
  }

  public updateProps(props) {
    for (let property in props) {
      this[property.charAt(0).toLowerCase() + property.slice(1)] = props[property];
    }
  }

}
