package rooms

import "github.com/reji/backend/go/common"
//import "github.com/reji/backend/go/clients"
// User ...
type Room struct {
	Id   string `gorm:"primary_key;not null"`
	//Code string
	//Public bool
	//Players int
}

// AutoMigrate Migrate the schema of database if needed
func AutoMigrate() {
	common.Connection.AutoMigrate(&Room{})
}

// SaveOne You could input an UserModel which will be saved in database returning with error info
// 	if err := SaveOne(&userModel); err != nil { ... }

func ReadRooms() ([]Room, error) {
	var RoomModel []Room
	err := common.Connection.Find(&RoomModel).Error
	return RoomModel,err
}

func ReadRoom(data interface{}, id string) error {
	err := common.Connection.Find(data, id).Error
	return err
}

func CreateRoom(data interface{}) error {
	err := common.Connection.Save(data).Error
	return err
}

func (room *Room)UpdateRoom(data interface{}) error {
	err := common.Connection.Model(room).Update(data).Error
	return err
}

func DeleteRoom(data interface{}) error {
	err := common.Connection.Where(data).Delete(Room{}).Error
	return err
}