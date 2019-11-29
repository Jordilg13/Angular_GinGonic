package controllers

import (
    "net/http"

    "github.com/gin-gonic/gin"
)

type IController interface {
    Get(c *gin.Context)
    Post(c *gin.Context)
    Put(c *gin.Context)
    Delete(c *gin.Context)
}

type Base struct {
}

func (self *Base) Ok(c *gin.Context) {
    payload := gin.H{
        "code":    http.StatusOK,
        "message": "hey",//http.StatusText(http.StatusOK),
    }
    c.JSON(http.StatusOK, payload)
}

func (self *Base) Json(c *gin.Context, data interface{}) {
    payload := gin.H{
        "code":    http.StatusOK,
        "message": http.StatusText(http.StatusOK),
        "data":    data,
    }
    c.JSON(http.StatusOK, payload)
}

func (self *Base) Error(c *gin.Context, code int) {
    payload := gin.H{
        "code":    code,
        "message": http.StatusText(code),
    }
    c.JSON(http.StatusBadRequest, payload)
}

func (self *Base) Get(c *gin.Context) {
    self.Error(c, http.StatusNotImplemented)
}

func (self *Base) Post(c *gin.Context) {
    self.Error(c, http.StatusNotImplemented)
}

func (self *Base) Put(c *gin.Context) {
    self.Error(c, http.StatusNotImplemented)
}

func (self *Base) Delete(c *gin.Context) {
    self.Error(c, http.StatusNotImplemented)
}