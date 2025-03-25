/*******************************************************/
// P5.play: Cave run
// Extension tasks
// Written by 22026cl
/*******************************************************/
//Variables
var Player;
var score = 0;
canvasSize = {
	x: 1200,
	y: 600
	}

let restart;	
//enviroment
let sheetImg;
let rock, cobblestone, water, diamond;
function preload() {
	sheetImg = loadImage("Textures-16.png");
	buttonImg = loadImage("Restart.png")
}
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
'r................................d',
'rrrrrrrrrr',
'rrrrrrrrrrrr...........................................d',
'rrrrrrrrrrrr.rrrrrrrrrrrrrrrrrccccwwwwwwwwwwwwwwcccccccccccccccwwwwwwww'

],
100, 300, //x,y
16,16, //w,h 
)}
//if the player collides with a diamond the diamond will disapear and the user will gain 100 score 
function playercollectsdiamond(diamond, Player) {
    
    diamond.remove();
    score = score + 100;

    Player.rotationSpeed = 0;
    Player.rotation = 0;
	
}
function displayScore() {
    textSize(30);
	text("Score: " + score, 0, 25);
}
function lose()	{console.log("you died");
Player.remove()
water.remove()
diamond.remove()
cobblestone.remove()
rock.remove()
background("yellow");
textSize(20)
textAlign(CENTER, CENTER);
text("YOU WON!!", canvasSize/2, 50);
text("Score: "+ score, canvasSize/2, 100);
text("Books issued: " + booksFound + "/6", canvasSize.x/2, 150)
}


function win() {console.log("you win")}
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
if (Player.y >= 700){lose();}
displayScore();
//console.log(Player.x)
//console.log(Player.y)
if (Player.x >= 1100) {win();}
if (diamond.collides(Player, playercollectsdiamond)) {
	playerHitCoin();	
	}
	
}

function Restart(){
	
}

/*******************************************************/
//  END OF APP
/*******************************************************/