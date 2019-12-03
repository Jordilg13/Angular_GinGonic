package game

type Character struct {
	ID int
	SpriteX int
	SpriteY int
	Width int
	Height int
	MoveSpeed int
	SpritePositionsX []int
	SpritePositionsY []int
	TagPositionsX []int
	TagPositionsY []int
	Moving bool
	CurrentSprite int
	Direction int
	TagPressed bool
	FramesByImage int
	X int
	Y int
	Chaser bool
	Gum int
}

func NewCharacter(chaser bool) *Character {
	character := new(Character)
	character.SpriteX = 0;
	character.SpriteY = 0;
	character.Width = 100;
	character.Height = 200;
	character.MoveSpeed = 7;
	character.SpritePositionsX = []int{0, 100, 200, 300};
	character.SpritePositionsY = []int{0, 200, 400, 600};
	character.Moving = false;
	character.CurrentSprite = 1;
	character.Direction = 0;
	character.FramesByImage = 5;
	character.X = 0;
	character.Y = 0;
	character.Chaser = chaser;
	character.Gum = 0;
	return character
}

func (character *Character) SetConstants(){
	character.Width = 100
	character.Height = 200
	character.MoveSpeed = 7
}

func (character *Character) SetChaser(chaser bool) {
	character.Chaser = chaser
}