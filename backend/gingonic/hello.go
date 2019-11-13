package main

import (
	"fmt"
    // "strings"
	"net/http"
	"os"
	"gopkg.in/gin-gonic/gin.v1"
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	//"github.com/jinzhu/gorm"
	//"github.com/wangzitian0/golang-gin-starter-kit/articles"
	//"github.com/wangzitian0/golang-gin-starter-kit/common"
	//"github.com/wangzitian0/golang-gin-starter-kit/users"
	"github.com/wangzitian0/golang-gin-starter-kit/driver"
	ph "github.com/wangzitian0/golang-gin-starter-kit/handler/http"
)

/*func Migrate(db *gorm.DB) {
	users.AutoMigrate()
	db.AutoMigrate(&articles.ArticleModel{})
	db.AutoMigrate(&articles.TagModel{})
	db.AutoMigrate(&articles.FavoriteModel{})
	db.AutoMigrate(&articles.ArticleUserModel{})
	db.AutoMigrate(&articles.CommentModel{})
}*/

func main() {
	dbName := os.Getenv("DB_NAME")
	dbRoot := os.Getenv("DB_ROOT")
	dbPass := os.Getenv("DB_PASS")
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")

	connection, err := driver.ConnectSQL(dbHost, dbPort, dbRoot, dbPass, dbName)

	if err != nil {
		fmt.Println(err)
		os.Exit(-1)
	}
	/*db := common.Init()
	Migrate(db)
	defer db.Close()

	r := gin.Default()
	v1 := r.Group("/api")
	users.UsersRegister(v1.Group("/users"))
	v1.Use(users.AuthMiddleware(false))
	articles.ArticlesAnonymousRegister(v1.Group("/articles"))
	articles.TagsAnonymousRegister(v1.Group("/tags"))

	v1.Use(users.AuthMiddleware(true))
	users.UserRegister(v1.Group("/user"))
	users.ProfileRegister(v1.Group("/profiles"))

	articles.ArticlesRegister(v1.Group("/articles"))

	testAuth := r.Group("/api/ping")

	testAuth.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	// test 1 to 1
	tx1 := db.Begin()
	userA := users.UserModel{
		Username: "AAAAAAAAAAAAAAAA",
		Email:    "aaaa@g.cn",
		Bio:      "hehddeda",
		Image:    nil,
	}
	tx1.Save(&userA)
	tx1.Commit()
	fmt.Println(userA)

	//db.Save(&ArticleUserModel{
		//    UserModelID:userA.ID,
		//})
		//var userAA ArticleUserModel
		//db.Where(&ArticleUserModel{
			//    UserModelID:userA.ID,
			//}).First(&userAA)
			//fmt.Println(userAA)

			r.Use(Cors())
			r.Run() // listen and serve on 0.0.0.0:8080
		}*/

		/*testAuth := r.Group("/api/ping")

		testAuth.GET("/", func(c *gin.Context) {
			c.JSON(200, gin.H{
				"message": "pong",
			})
		})*/

		r := chi.NewRouter()
		r.Use(middleware.Recoverer)
		r.Use(middleware.Logger)

		pHandler := ph.NewPostHandler(connection)
		r.Route("/", func(rt chi.Router) {
			rt.Mount("/posts", postRouter(pHandler))
		})
		fmt.Println("Server listen at :8080")
		http.ListenAndServe(":8080", r)
	}
func Cors() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Headers", "access-control-allow-origin, access-control-allow-headers")
		c.JSON(http.StatusOK, struct{}{})
		c.Next()
	}
}

// A completely separate router for posts routes
func postRouter(pHandler *ph.Post) http.Handler {
	r := chi.NewRouter()
	r.Get("/", pHandler.Fetch)
	r.Get("/{id:[0-9]+}", pHandler.GetByID)
	r.Post("/", pHandler.Create)
	r.Put("/{id:[0-9]+}", pHandler.Update)
	r.Delete("/{id:[0-9]+}", pHandler.Delete)

	return r
}
