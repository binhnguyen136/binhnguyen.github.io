var containCanvas = document.getElementById("containCanvas");
var ctx = containCanvas.getContext("2d");
var menuCanvas = document.getElementById("menuCanvas");
ctxMenu = menuCanvas.getContext("2d");

const FPS = 60; //frame per second
const TICKS = 1000 / FPS;

//speed monster base on game lae
var speedArr = [ 2, 4, 6, 10]; 

//score begin
var score = 100; 

//status game
var running = true;

//heart
var heart = 3;
var end = false; 
var highScore = 0; 
var level = 0; 
var speed = speedArr[0]; 

var boomNum = 3;
var bloodList = [];

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
var lastUpdateTime = Date.now();

//Init High Score Session Storage
if (sessionStorage.getItem("highscore") == null) {
	sessionStorage.setItem("highscore", 0);
} else {
	highScore = sessionStorage.getItem("highscore");
}
