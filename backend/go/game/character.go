package game

// Character ...
type Character struct {
	ID               int
	SpriteX          int
	SpriteY          int
	Width            int
	Height           int
	MoveSpeed        int
	SpritePositionsX []int
	SpritePositionsY []int
	TagPositionsX    []int
	TagPositionsY    []int
	Moving           bool
	CurrentSprite    int
	Direction        int
	TagPressed       bool
	FramesByImage    int
	X                int
	Y                int
	Chaser           bool
}

// NewCharacter ...
func NewCharacter(chaser bool) *Character {
	character := new(Character)
	character.SpriteX = 0
	character.SpriteY = 0
	character.Width = 100
	character.Height = 200
	character.MoveSpeed = 6
	character.SpritePositionsX = []int{0, 100, 200, 300}
	character.SpritePositionsY = []int{0, 200, 400, 600}
	character.Moving = false
	character.CurrentSprite = 0
	character.Direction = 0
	character.FramesByImage = 10
	character.X = 0
	character.Y = 0
	character.Chaser = chaser
	return character
}

// SetConstants ...
func (character *Character) SetConstants() {
	character.Width = 100
	character.Height = 200
	character.MoveSpeed = 6
	character.FramesByImage = 10
}

// SetChaser ...
func (character Character) SetChaser(chaser bool) {
	character.Chaser = chaser
}
