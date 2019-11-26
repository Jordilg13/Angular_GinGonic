package clients

import (
	"encoding/json"
	"fmt"
	"github.com/reji/backend/go/game"
	"github.com/gorilla/websocket"
)

// Manager ...
var Manager = ClientManager{
	broadcast:  make(chan []byte),
	Register:   make(chan *Client),
	unregister: make(chan *Client),
	clients:    make(map[*Client]bool),
}

// Start ...
func (manager *ClientManager) Start() {
	for {
		select {
		case conn := <-manager.Register:
			fmt.Println(conn)
			manager.clients[conn] = true
			conn.Character = game.NewCharacter(len(manager.clients) == 0)
			jsonMessage, _ := json.Marshal(&Message{Content: "/A new socket has connected."})
			manager.send(jsonMessage, conn)
		case conn := <-manager.unregister:
			if _, ok := manager.clients[conn]; ok {
				close(conn.Send)
				delete(manager.clients, conn)
				jsonMessage, _ := json.Marshal(&Message{Content: "/A socket has disconnected."})
				manager.send(jsonMessage, conn)
			}
		case message := <-manager.broadcast:
			for conn := range manager.clients {
				select {
				case conn.Send <- message:
					m := Message{
						Sender: 0,
						Content: "Default",
					}
					json.Unmarshal(message, &m)
					json.Unmarshal([]byte(m.Content), &conn.Character)
					conn.Character.Width = 100
					jsonMessage, _ := json.Marshal(conn.Character);
					manager.send(jsonMessage, conn)
				}
			}
		}
	}
}

func (manager *ClientManager) send(message []byte, ignore *Client) {
	for conn := range manager.clients {
		if conn != ignore {
			conn.Send <- message
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
