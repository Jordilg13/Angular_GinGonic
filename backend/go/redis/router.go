package redis

import (
	"fmt"
	"net/http"

	"reflect"

	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis"
)

// Routers ...
func Routers(router *gin.RouterGroup) {
	router.GET("/", getAll)
	router.GET("/:key", getData)
	router.POST("/", setData)
}

// Dataa ...
type Dataa struct {
	Key   string `json:"key"   binding:"required"`
	Value string `json:"value" binding:"required"`
}

func getData(c *gin.Context) {
	client := newClient()

	key := c.Param("key")

	err, val := get(key, client)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{key: val})

}

func setData(c *gin.Context) {
	client := newClient()

	var data Dataa
	// if error in input json
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Parse POST data
	c.BindJSON(&data)

	err := set(data.Key, data.Value, client)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"operation": "successfully"})
	// fmt.Printf("%+v\n", data)
}

func getAll(c *gin.Context) {
	client := newClient()
	var keys2 map[string]string
	keys2 = make(map[string]string)

	keys, err := client.Do("KEYS", "*").Result()
	if err != nil {
		// fmt.Println("error in KEYS ---------------")
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
	// get values of the keys
	for i := 0; i < reflect.ValueOf(keys).Len(); i++ {
		key := fmt.Sprintf("%v", reflect.ValueOf(keys).Index(i)) // convert from interface to string

		err, val := get(key, client) // gets the value
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}
		keys2[key] = val
	}
	c.JSON(200, gin.H{"keys": keys2})
}

func newClient() *redis.Client {
	client := redis.NewClient(&redis.Options{
		Addr:     "redis:6379",
		Password: "", // no password set
		DB:       0,  // use default DB
	})

	return client
}

// ping tests connectivity for redis (PONG should be returned)
func ping(client *redis.Client) error {
	pong, err := client.Ping().Result()
	if err != nil {
		return err
	}
	fmt.Println(pong, err)
	// Output: PONG <nil>

	return nil
}

/////////////////////////////////////////////////////////////////////////////////////////////
// set executes the redis Set command
func set(key string, value string, client *redis.Client) error {
	err := client.Set(key, value, 0).Err()
	if err != nil {
		return err
	}
	return nil
}

func get(key string, client *redis.Client) (error, string) {
	val, err := client.Get(key).Result()
	return err, val
}
