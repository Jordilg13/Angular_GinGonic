package redis
import (
	"github.com/go-redis/redis"
	"fmt"
)
// Dataa ...
type Dataa struct {
	Key   string `json:"key"   binding:"required"`
	Value string `json:"value" binding:"required"`
}

func NewClient() *redis.Client {
	client := redis.NewClient(&redis.Options{
		Addr:     "redis:6379",
		Password: "", // no password set
		DB:       0,  // use default DB
	})

	return client
}

func Set(key string, value string, client *redis.Client) error {
	err := client.Set(key, value, 0).Err()
	if err != nil {
		return err
	}
	return nil
}

func Get(key string, client *redis.Client) (error, string) {
	val, err := client.Get(key).Result()
	return err, val
}

// ping tests connectivity for redis (PONG should be returned)
func Ping(client *redis.Client) error {
	pong, err := client.Ping().Result()
	if err != nil {
		return err
	}
	fmt.Println(pong, err)
	// Output: PONG <nil>

	return nil
}