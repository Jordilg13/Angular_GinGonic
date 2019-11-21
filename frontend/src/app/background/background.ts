export class Background {
    private x = 0;
    private y = 0;
    private z = 30;

    public sprites = {
        grass: new Image()
    }

    constructor(private ctx: CanvasRenderingContext2D) {
        for (let spriteName in this.sprites) {
            this.sprites[spriteName].src = "assets/" + spriteName + ".png";
        }
    }

    public draw() {
        let pattern = this.ctx.createPattern(this.sprites.grass, 'repeat'); // Create a pattern with this image, and set it to "repeat".
        this.ctx.fillStyle = pattern;
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
}