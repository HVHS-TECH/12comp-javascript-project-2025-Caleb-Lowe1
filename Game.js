/*******************************************************/
// P5.play: Cave run
// Extension tasks
// Written by 22026cl
/*******************************************************/
//Variables
var Player;
var Score;
canvasSize = {
	x: 1200,
	y: 600
	}

//enviroment
let sheetImg;
let rock, cobblestone, water, gold;
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
	
diamond = new Group();
diamond.collider = "static";
diamond.spriteSheet = sheetImg;
diamond.addAni({w:16, h:16, row:11, col:3 });
diamond.tile = 'd';

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
water.addAni({w:16, h:16, row:8, col:0 });
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
'r.......d',
'r',
'r',
'rrrrrrrrrr',
'rrrrrrrrrrrr',
'rrrrrrrrrrrr.rrrrrrrrrrrrrrrrrccccwwwwwwwwwwwwwwcccccccccccccccwwwwwwww'

],
100, 300, //x,y
16,16, //w,h 
)}

function lose()	{console.log("you died")}
/*******************************************************/
// draw()
/*******************************************************/
function draw() {
background('gray');
Player.rotation = 0;
Movement();
//makes the camera follow the player 
camera.x = Player.x;
camera.y = Player.y;
if (Player.collides(water)){lose();}
}

/*******************************************************/
//  END OF APP
/*******************************************************/