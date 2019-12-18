package clients

import (
	"encoding/json"
	"fmt"
	"time"
	"strconv"
	/*"math/rand"*/
	"github.com/gorilla/websocket"
	"github.com/reji/backend/go/game"
	"github.com/reji/backend/go/rooms"
	//"github.com/go-redis/redis"
	"github.com/reji/backend/go/redis"
)

// Manager ...
var Manager = ClientManager{
	broadcast:  make(chan []byte),
	Register:   make(chan *Client),
	unregister: make(chan *Client),
	clients:    make(map[*Client]bool),
	//rooms: 		make(map[*Client]bool),
}

// Start ...
var lastRequestTime = time.Now()

func (manager *ClientManager) Start() {
	for {
		select {
		case conn := <-manager.Register:
			fmt.Println(conn)
			manager.clients[conn] = true
			fmt.Println(len(manager.clients))
			conn.Character = game.NewCharacter(len(manager.clients) == 1)
			//RoomModels, err := rooms.ReadRooms()
			fmt.Println(conn.Character.Chaser)
			jsonMessage, _ := json.Marshal(&Message{Content: "/A new socket has connected."})
			manager.send(jsonMessage, conn)
		case conn := <-manager.unregister:
			if _, ok := manager.clients[conn]; ok {
				close(conn.Send)
				if (conn.Character.Chaser) {
					delete(manager.clients, conn)
					chaserFound := false
					for connn := range manager.clients {
						fmt.Println(connn.ID)
						if (conn.Character.Room == connn.Character.Room) && (conn.ID != connn.ID) && !chaserFound{
							connn.Character.Chaser = true;
							chaserFound = true;
						}
						if (conn.ID == connn.ID) {
							conn.Character.Alive = false;
						}
						jsonMessage, _ := json.Marshal(connn.Character);
						manager.send(jsonMessage, connn)
					}
					if (!chaserFound) {
						rooms.DeleteRoom(&rooms.Room{Id: conn.Character.Room})
					}
				} else {
					delete(manager.clients, conn)
				}
				conn.Character.Alive = false;
				client := redis.NewClient()
				var data redis.Dataa
				data.Key = conn.Character.Username
				err, val := redis.Get(data.Key, client)
				if (err != nil) {
					data.Value = fmt.Sprintf("%d", conn.Character.Time)
				} else {
					lastValue, _ := strconv.Atoi(val)
					data.Value = fmt.Sprintf("%d", lastValue + conn.Character.Time)
				}
				redis.Set(data.Key, data.Value, client)
				jsonMessage, _ := json.Marshal(conn.Character);
				manager.send(jsonMessage, conn);
				jsonMessageClose, _ := json.Marshal(&Message{Content: "/A socket has disconnected."})
				manager.send(jsonMessageClose, conn)
			}
		case message := <-manager.broadcast:

			for conn := range manager.clients {
				select {
				case conn.Send <- message:

					wasChasing := conn.Character.Chaser
					m := Message{ Sender: 0, Content: "Default" }
					json.Unmarshal(message, &m)
					if (conn.ID == m.Sender) {
						json.Unmarshal([]byte(m.Content), &conn.Character)
						conn.Character.SetConstants()
						conn.Character.Chaser = wasChasing
						manager.addTimeToChaser(conn)
						manager.checkClients(conn)
						manager.checkChaser(conn)
					}
					jsonMessage, _ := json.Marshal(conn. Character);
					manager.send(jsonMessage, conn)
				}
			}
		}
	}
}

func (manager *ClientManager) send(message []byte, ignore *Client) {
	for conn := range manager.clients {
		if (ignore.Character.Room == conn.Character.Room) {
			conn.Send <- message
		}
	}
}

func (manager *ClientManager) checkClients(ignore *Client) {
	for conn := range manager.clients {
		for connn := range manager.clients {
			if (conn.Character.ID != connn.Character.ID && conn.Character.Room == connn.Character.Room) {
				differenceX := conn.Character.X - connn.Character.X
				differenceY := conn.Character.Y - connn.Character.Y
				if (differenceX < conn.Character.Width && differenceX > -conn.Character.Width && differenceY < 0 && differenceY > - conn.Character.Height + 50) {
					if (conn.Character.Gum != connn.Character.ID && connn.Character.Gum != conn.Character.ID) {
						if (conn.Character.Chaser) {
							conn.Character.Chaser = false;
							connn.Character.Chaser = true;
							conn.Character.Gum = connn.Character.ID;
							connn.Character.Gum = 0;
						} else if (connn.Character.Chaser) {
							connn.Character.Chaser = false;
							conn.Character.Chaser = true;
							connn.Character.Gum = conn.Character.ID;
							conn.Character.Gum = 0;
						}
					}
				}
			}
		}
	}
}

func (manager *ClientManager) checkChaser(ignore *Client) {
	coincidence := false
	for conn := range manager.clients {
		if (ignore.Character.ID != conn.Character.ID) {
			if (ignore.Character.Room == conn.Character.Room) {
				coincidence = true
				break
			}
		}
	}
	if (!coincidence) {
		ignore.Character.Chaser = true
	}
}

func (manager *ClientManager) addTimeToChaser(client *Client) {
	for conn := range manager.clients {
		if ( conn.Character.ID == client.Character.ID && client.Character.Chaser) {
			//fmt.Println(client.Character.Time)
			timeNow := time.Now()
			elapsed := timeNow.Sub(lastRequestTime)
			conn.Character.Time += int(elapsed.Milliseconds())
			lastRequestTime = timeNow
			//fmt.Println(client.Character.Time)
		}
	}
}

func (c *Client) Read() {
	defer func() {
		Manager.unregister <- c
		c.Socket.Close()
	}()

	for {
		_, message, err := c.Socket.ReadMessage()
		if err != nil {
			Manager.unregister <- c
			c.Socket.Close()
			break
		}
		jsonMessage, _ := json.Marshal(&Message{Sender: c.ID, Content: string(message)})
		Manager.broadcast <- jsonMessage
	}
}

func (c *Client) Write() {
	defer func() {
		c.Socket.Close()
	}()

	for {
		select {
		case message, ok := <-c.Send:
			if !ok {
				c.Socket.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}
			// fmt.Println(message)
			c.Socket.WriteMessage(websocket.TextMessage, message)
		}
	}
}

// Test using DB in other modules
// func Test() *gorm.DB {
// 	name := []common.Name{}
// 	result := common.Connection.Find(&name)
// 	return result
// }
