package rooms

import "github.com/reji/backend/go/common"

// User ...
type Room struct {
	Id   int `gorm:"primary_key;auto_increment;not null"`
	Code string
}

// AutoMigrate Migrate the schema of database if needed
func AutoMigrate() {
	common.Connection.AutoMigrate(&Room{})
}

// SaveOne You could input an UserModel which will be saved in database returning with error info
// 	if err := SaveOne(&userModel); err != nil { ... }

func ReadRooms(data interface{}) error {
	err := common.Connection.Find(data).Error
	return err
}

func ReadRoom(data interface{}, id int) error {
	err := common.Connection.Find(data, id).Error
	return err
}

func CreateRoom(data interface{}) error {
	err := common.Connection.Save(data).Error
	return err
}

func (room *Room) UpdateRoom(data interface{}) error {
	err := common.Connection.Model(room).Update(data).Error
	return err
}

func DeleteRoom(data interface{}) error {
	err := common.Connection.Where(data).Delete(Room{}).Error
	return err
}