import { Character } from '../character/character';

export class Scoreboard {
    private x = 1900;
    private y = 40;
    private count = 1;

    constructor(private ctx: CanvasRenderingContext2D) {}

    public draw(characters: Character[], mainCharacter: Character) {
        this.ctx.font = "40px boocity";
        this.ctx.fillStyle = "#733362";
        this.ctx.textAlign = "right";
        this.y = 40;
        this.count = 1;
        if (characters.filter(e => e.id === mainCharacter.id).length <= 0) {
            characters.push(mainCharacter);
        }
        let sortedCharacters: Character[] = characters.sort((a, b) => {
            if (a.time > b.time) {
                return -1
            } else {
                return 1
            }
        });
        if (characters != sortedCharacters) {
            console.log('noise');
        }
        for (let character in sortedCharacters) {
            if (sortedCharacters[character].alive) {
                let time = sortedCharacters[character].time.toString().slice(0, -2);
                //console.log(time);
                if (time == "") {
                    time = "0";
                }
                this.ctx.fillText(time + " - " + this.count + ". " + sortedCharacters[character].userName, this.x, this. y);
                this.y+=35;
                this.count++;
            }
        }
    }
}