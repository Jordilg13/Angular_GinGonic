export class Character {
    private spriteX = 0;
    private spriteY = 0;
    private width = 100;
    private height = 200;
    private moveSpeed = 7;
    private spritePositionsX = [0, 100, 200, 300];
    private spritePositionsY = [0, 200, 400, 600];
    private attackPositionsX = [0, 200, 400, 600];
    private attackPositionsY = [0, 200, 400, 600];
    private moving = false;
    private currentSprite = 0;
    private attackSprite = undefined;
    private direction = 0;
    private attacking = false;
    private attackPressed = false;
    private framesByImage = 5;
    private alive = true;
    private x = 0;
    private y = 0;

    public sprites = {
        characterMovement: new Image(),
    }
  
    constructor(private ctx: CanvasRenderingContext2D, character) {
        for (let property in character) {
            this[property] = character[property];
        }
        for (let spriteName in this.sprites) {
            this.sprites[spriteName].src = "assets/" + spriteName + ".png";
        }
    }

    private draw() {
        this.spriteX = this.spritePositionsX[this.currentSprite];
        this.spriteY = this.spritePositionsY[this.direction];
        this.ctx.drawImage(this.sprites.characterMovement, this.spriteX, this.spriteY, this.width, this.height, this.x, this.y, this.width, this.height);
    
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
    }
  }
  