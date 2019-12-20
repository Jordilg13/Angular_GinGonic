import { Character } from '../character/character';

export class Scoreboard {
    private x = 1850;
    private y = 40;
    private count = 1;

    constructor(private ctx: CanvasRenderingContext2D) {}

    public draw(characters: Character[], mainCharacter: Character, profiles: any[]) {
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
                //console.log(profiles);
                //console.log(profiles[sortedCharacters[character].id]);
                if (profiles[sortedCharacters[character].id] != undefined) {
                    //console.log(profiles[sortedCharacters[character].id].src);
                    this.ctx.drawImage(profiles[sortedCharacters[character].id], 0, 0, profiles[sortedCharacters[character].id].naturalWidth, profiles[sortedCharacters[character].id].naturalHeight, this.x + 20, this.y - 35, 35, 35);
                }
                this.y+=35;
                this.count++;
            }
        }
    }
}