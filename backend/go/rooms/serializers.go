package rooms

import (
	//"github.com/gin-gonic/gin"
)

// UserSerializer ...
type RoomSerializer struct {
	//c *gin.Context
	room Room
}

// UserResponse ...
type RoomResponse struct {
	Id   int
	Code string `json:"code"`
}

// Response ...
func (serializer *RoomSerializer) Response() RoomResponse {
	room := RoomResponse{
		Id:   serializer.room.Id,
		Code: serializer.room.Code,
	}
	return room
}
