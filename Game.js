/*******************************************************/
// P5.play: Cave run
// Extension tasks
// Written by 22026cl
/*******************************************************/
//Variables
var Player;
var Score;
canvasSize = {
	x: 1100,
	y: 600
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
Player = new Sprite(213, 477.9145351606422, 10, 10, 'd');
	Player.color = 'blue';
	
	

rock = new Group();
rock.collider = "static";
rock.spriteSheet = sheetImg;
rock.addAni({w:16, h:16, row:0, col:7 });
rock.tile = 'r';

cobblestone = new Group();
cobblestone.collider = "static";
cobblestone.spriteSheet = sheetImg;
cobblestone.addAni({w:16, h:16, row:30, col:10 });
cobblestone.tile = 'c';

water = new Group();
water.collider = "static";
water.spriteSheet = sheetImg;
water.addAni({w:16, h:16, row:11, col:3 });
water.tile = 'w';

new Tiles([
'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',
'r',
'r',
'r',
'r',
'r',
'r',
'r',	
'r',
'r',
'r',
'r',
'rrrrrrrrrr',
'rrrrrrrrrrrr',
'rrrrrrrrrrrr.rrrrrrrrrrrrrrrrrccccwwwwwwwwwwwwwwcccccccccccccccwwwwwwww'

],
100, 300, //x,y
16,16, //w,h 
)}

/*******************************************************/
// draw()
/*******************************************************/
function draw() {
background('gray');
Movement();

Player.rotation = 0;
camera.x = Player.x;
camera.y = Player.y;

}

/*******************************************************/
//  END OF APP
/*******************************************************/