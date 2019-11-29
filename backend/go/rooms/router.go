package rooms

import (
	"github.com/gin-gonic/gin"
	"strconv"
)

// Routers ...
func Routers(router *gin.RouterGroup) {
	router.GET("/", ReadAll)
	router.GET("/:id", ReadOne)
	router.POST("/", Create)
	router.PUT("/", Update)
	router.DELETE("/:id", Remove)
}

func ReadAll(c *gin.Context) {
	var RoomModel Room
	ReadRooms(&RoomModel)
	serializer := RoomSerializer{RoomModel}
	c.JSON(200, gin.H{"room": serializer.Response()})
}

func ReadOne(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if (err != nil) {
		c.JSON(400, gin.H{"error": "The id is a number"})
		return
	}
	var RoomModel Room
	err = ReadRoom(&RoomModel, id)
	if (err != nil) {
		c.JSON(404, gin.H{"error": "Room not found"})
		return
	}
	serializer := RoomSerializer{RoomModel}
	c.JSON(200, gin.H{"room": serializer.Response()})
}
func Create(c *gin.Context) {
	var RoomModel Room
	c.BindJSON(&RoomModel)
	CreateRoom(&RoomModel)
	c.JSON(200, gin.H{"room": "ok"})
}

func Update(c *gin.Context) {
	
}

func Remove(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if (err != nil) {
		c.JSON(400, gin.H{"error": "The id is a number"})
		return
	}
	err = DeleteRoom(&Room{Id: id})
	if (err != nil) {
		c.JSON(400, gin.H{"error": "Room not found"})
		return
	}
	c.JSON(200, gin.H{"deleted": true})
}