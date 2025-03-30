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



var restartButton;	
//enviroment
let sheetImg;
let rock, cobblestone, unclimableblock, diamond, lava, gold;
function preload() {
	sheetImg = loadImage("Textures-16.png");
	buttonImg = loadImage("Restart.png")
}
/*******************************************************/
// setup()
/*******************************************************/
function setup() {
	gameState = "play";
console.log("setup: ");
cnv = new Canvas(canvasSize.x,canvasSize.y, "pixelated x4")
world.gravity.y = 10
Player = new Sprite(213, 477.9145351606422, 10, 10, 'd');
	Player.color = 'blue';

lava = new Group();
lava.collider = "static";
lava.spriteSheet = sheetImg;
lava.addAni({w:16, h:16, row:9, col:11 });
lava.tile = 'l';


gold = new Group();
gold.collider = "static";
gold.spriteSheet = sheetImg;
gold.addAni({w:16, h:16, row:11, col:3 });
gold.tile = 'g';

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

unclimableblock = new Group();
unclimableblock.collider = "static";
unclimableblock.spriteSheet = sheetImg;
unclimableblock.addAni({w:16, h:16, row:1, col:9 });
unclimableblock.tile = 'w';

new Tiles([
'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',
'r',
'r',
'r',
'r',
'r',
'r',
'r',	
'r...............................................d.................r',
'r.......d...................................r.....................r',
'r...........................................r.....................r',
'r................................d..........r.....................r',
'rrrrrrrrrr.......................................................rrr',
'rrrrrrrrrrrr.....g.....................................d........rrrr',
'rrrrrrrrrrrr.rrrrrrrrrrrrrrrrrcr..wrrrrrrrrrrrrrcccccccccccccccwwwwwwwwrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',
'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrw..wrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',
'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrw..wrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',
'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrwllwrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr'
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

function playercollectsgold(gold, Player) {
    
    gold.remove();
    score = score + 50;

    Player.rotationSpeed = 0;
    Player.rotation = 0;
	
}




function win() {console.log("you win")}
/*******************************************************/
// draw()
/*******************************************************/
function draw() {

	if (gameState == "play") {
        runGame();
		
    }
	
    if (gameState == "win") {
        win();
    }
    if (gameState == "lose") {
        lose();
    }
console.log(Player.x)
    
}




/*******************************************************/
// Functions()
/*******************************************************/
function displayScore() {
	textSize(20);
	text("Score: " + score, 0, 15);	
}

function runGame(){
	
	

	
clear();
background("grey")
displayScore();
	Player.rotation = 0;
	Movement();
	//makes the camera follow the player 
camera.x = Player.x;
camera.y = Player.y;
if (Player.y >= 1300 || Player.collides (lava)){lostgame();}
if (Player.x >= 1000) {completedlevel();}






if (diamond.collides(Player, playercollectsdiamond)) {
	
	playercollectsdiamond();
		
	}


	if (gold.collides(Player, playercollectsgold)) {
	
		playercollectsgold();
			
		}	
}

function win () {
	console.log("WINNING")
		mouseInteractRestartButton();
	
	}
function completedlevel(){
	gameState = "win";
	score = score + 200;
	Player.remove();
	unclimableblock.removeAll();
	diamond.removeAll();
	gold.removeAll();
	cobblestone.removeAll();
	rock.removeAll();
	lava.removeAll();

	camera.x = canvasSize.x/2;
    camera.y = canvasSize.y/2;
	background("yellow");
	textSize(20);
	textAlign(CENTER, CENTER);
	text("YOU WON!!", canvasSize.x/2, 50);
	text("Score: "+ score, canvasSize.x/2, 100);


	Restart();
}

function lose () {
    console.log ("I LOST :(");
    mouseInteractRestartButton();


}
function lostgame()	{
	gameState = "lose";
	
	Player.remove();
	unclimableblock.removeAll();
	diamond.removeAll();
	cobblestone.removeAll();
	rock.removeAll();
	lava.removeAll();
	gold.removeAll();
	camera.x = canvasSize.x/2;
    camera.y = canvasSize.y/2;
	background("red");
	textSize(20);
	textAlign(CENTER, CENTER);
	text("you lost!!", canvasSize.x/2, 50);
	text("Score: "+ score, canvasSize.x/2, 100);
	Restart();
	}

	
function Restart(){
	restartButton = new Sprite (canvasSize.x/2, 200);
    restartButton.spriteSheet = buttonImg;
    restartButton.addAni ({w:16, h:16, row:0, col:0,}); 
    restartButton.collider = "static";	
}
function mouseInteractRestartButton () {
    if (restartButton.mouse.hovering()) {
        restartButton.addAni ({w:16, h:16, row:1, col:0,}); 
	
    }

	else {
        restartButton.addAni ({w:16, h:16, row:0, col:0,});     
    }
    if (restartButton.mouse.pressing()) {
        window.location.href = "Game.html";
    }}
/*******************************************************/
//  END OF APP
/*******************************************************/