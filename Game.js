/*******************************************************/
// P5.play: Cave run
// Extension tasks
// Written by 22026cl
/*******************************************************/
//Variables
var Player;
var Score;
canvasSize = {
	x: 500,
	y: 500
	}

//enviroment
let sheetImg;
let rock, cobblestone, water;
function preload() {sheetImg = loadImage("Textures-16.png");}
/*******************************************************/
// setup()
/*******************************************************/
function setup() {
console.log("setup: ");
cnv = new Canvas(canvasSize.x,canvasSize.y, "pixelated x4")
world.gravity.y = 10
Player = new Sprite(100, 10, 10, 10, 'd');
	Player.color = 'blue';
	Player.rotationSpeed = 0;
	

rock = new Group();
rock.collider = "static";
rock.spriteSheet = sheetImg;
rock.addAni({w:16, h:16, row:0, col:8 });
rock.tile = 'r';

new Tiles([

'rrrrrrrrrr'

],
10, 50, //x,y
16,16, //w,h 
)}
/*******************************************************/
// draw()
/*******************************************************/
function draw() {
clear();	
}

/*******************************************************/
//  END OF APP
/*******************************************************/