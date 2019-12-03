package rooms

import (
	//"github.com/gin-gonic/gin"
)

// UserSerializer ...
type RoomSerializer struct {
	//c *gin.Context
	room Room
}

type RoomsSerializer struct {
	rooms []Room
}
// UserResponse ...
type RoomResponse struct {
	Id   int `json:"id"`
	Public bool `json:"public"`
	Players int `json:"players"`
}

// Response ...
func (serializer *RoomSerializer) Response() RoomResponse {
	room := RoomResponse{
		Id:   serializer.room.Id,
		Public: serializer.room.Public,
		Players: serializer.room.Players,
	}
	return room
}

func (serializer *RoomsSerializer) Response() []RoomResponse {
	rooms := []RoomResponse{}
	for _, room := range serializer.rooms {
		s := RoomSerializer{room}
		rooms = append(rooms, s.Response())
	}
	return rooms
}
