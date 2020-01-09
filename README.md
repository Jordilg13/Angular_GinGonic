# Angular_GinGonic

Fully dockerized online game based on websockets with GinGonic backend and an Angular 8 frontend.  
Project developed by **R**aül, **E**than, **J**ordi and **I**ván.

---

## Screenshots

[tag1](https://github.com/Jordilg13/Angular_GinGonic/raw/master/frontend/src/assets/tag1.png?raw=true)
[tag2](https://github.com/Jordilg13/Angular_GinGonic/raw/master/frontend/src/assets/tag2.png?raw=true)

---

## Getting started

To get the repo running locally:

- Clone this repo
- Install Docker Community Edition
- `docker-compose up --build`

<small>untested</small>

---

## Features

| Service | Features |
| - | - |
| Register | Regular register or login with GitHub or Google |
| Login | Regular login or login with GitHub or Google |
| Lobby | List of public rooms with ability to add more or join a private room |
| Game | Functional tag game based on websockets |

<br>

| Technical Feature | Where it works |
| - | - |
| Authentication | Lobby and game requires logged in user with JWT |
| Docker | Entire application is dockerized |
| Redis | Total score of each user is saved in redis |
| Websocket | Whole game works on websockets |

---

### Technologies used

* GinGonic
* Angular 8
* Docker
* MySQL
* Redis

### Other technologies used

* JWT 
* Bootstrap
* Toaster
* Gorm
* Gocialite

---

## Backend Packages

| Name | Description |
| - | - |
| clients | Websocket handler |
| common | Database handler and utils functions (JWT GenToken) |
| game | Character model |
| redis | Redis request handler |
| rooms | Rooms handler |
| social | Social login route handler |
| tokens | Tokens.json file with Social APIs, functions to extract from file |
| users | Login, register and overall users handler |
| Dockerfile | Our Go Dockerfile |
| main.go | Main package |


## Frontend Application Structure

| Name | Description |
| - | - |
| e2e | Angular generated e2e testing | 
| src | Main frontend Angular application | 
| Dockerfile | Our Angular Dockerfile | 
| `src/`app | Module folder | 
| `src/`assets | Images and font used | 
| `src/`environments | Constant environment variables | 
| `src/app/`auth | Login and register module | 
| `src/app/`background | Draws the background | 
| `src/app/`character | Draws the characters | 
| `src/app/`core | Core services, interceptors and models | 
| `src/app/`game | Game module | 
| `src/app/`lobby | Lobby module | 
| `src/app/`logout | Logout button component, linked to AuthModule | 
| `src/app/`scoreboard | Draws the scoreboard | 
| `src/app/`social | Social module | 
| `src/app/`app.module.ts | Main app module | 

---

### Links to used Go packages

- https://github.com/kardianos/govendor
- https://github.com/pilu/fresh
- https://github.com/go-sql-driver/mysql
- https://github.com/gorilla/websocket
- https://github.com/gin-gonic/gin
- https://github.com/jinzhu/gorm
- https://github.com/go-redis/redis
- https://golang.org/x/crypto/bcrypt
- https://gopkg.in/danilopolani/gocialite.v1
- https://github.com/dgrijalva/jwt-go

#### TODO 
- [X] Implement Redux
- [X] User's image on ingame ranking
