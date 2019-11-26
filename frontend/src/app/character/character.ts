export class Character {
  public id;
  public username;
  public spriteX = 0;
  public spriteY = 0;
  public width = 100;
  public height = 200;
  public moveSpeed = 6;
  public spritePositionsX = [0, 100, 200, 300];
  public spritePositionsY = [0, 200, 400, 600];
  public attackPositionsX = [0, 200, 400, 600];
  public attackPositionsY = [0, 200, 400, 600];
  public moving = false;
  public currentSprite = 0;
  public attackSprite = undefined;
  public direction = 0;
  public attacking = false;
  public attackPressed = false;
  public framesByImage = 10;
  public alive = true;
  public x = 0;
  public y = 0;

  public sprites = {
    characterMovement: new Image(),
  }

  constructor(private ctx: CanvasRenderingContext2D, character) {
    this.id = Math.floor(Math.random()*999999999999);
    console.log(this.id);

    for (let property in character) {
      this[property] = character[property];
    }
    for (let spriteName in this.sprites) {
      this.sprites[spriteName].src = "assets/" + spriteName + ".png";
    }
  }

  public draw() {
    this.spriteX = this.spritePositionsX[this.currentSprite];
    this.spriteY = this.spritePositionsY[this.direction];
    this.ctx.drawImage(this.sprites.characterMovement, this.spriteX, this.spriteY, this.width, this.height, this.x, this.y, this.width, this.height);

    if (this.moving) {
      if (this.framesByImage == 0) {
        this.currentSprite++;
        this.framesByImage = 10;
      } else {
        this.framesByImage--;
      }
      if (this.currentSprite >= 3 && this.framesByImage == 0) {
        this.currentSprite = 0;
        this.framesByImage = 10;
      }
    } else {
      this.currentSprite = 0;
    }
  }

  public updateProps(props) {
    for (let property in props) {
      this[property] = props[property];
    }

  }

}
