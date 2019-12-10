package game

import (
	"math/rand"
	"time"
)

// Character ...
type Character struct {
	ID               int
	SpriteX          int
	SpriteY          int
	Width            int
	Height           int
	MoveSpeed        int
	SpritePositionsX []int `gorm:"-"`
	SpritePositionsY []int `gorm:"-"`
	TagPositionsX    []int `gorm:"-"`
	TagPositionsY    []int `gorm:"-"`
	Moving           bool
	CurrentSprite    int
	Direction        int
	TagPressed       bool
	FramesByImage    int
	X                int
	Y                int
	Chaser           bool
	Sprite int
	Gum int
	Username string
	Alive bool
}

// NewCharacter ...
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
	rand.Seed(time.Now().UnixNano())
	character.Sprite = rand.Intn(4) ;
	character.Username = "player";
	character.Alive = true;
	return character
}

// SetConstants ...
func (character *Character) SetConstants() {
	character.Width = 100
	character.Height = 200
	character.MoveSpeed = 7
}

func (character *Character) SetChaser(chaser bool) {
	character.Chaser = chaser
}
