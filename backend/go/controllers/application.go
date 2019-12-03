package controllers

import (
    "github.com/gin-gonic/gin"
)

type Application struct {
    Base
}

func NewApplicationController(r *gin.Engine) IController {
    app := new(Application)

    rg := r.Group("/api/app")
    rg.GET("/", app.Get)

    return app
}

func (self *Application) Get(c *gin.Context) {
    self.Ok(c)
}