//gem textures https://laredgames.itch.io/gems-coins-free
//map textures https://piiixl.itch.io/textures
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
var backButton;	
//enviroment
let sheetImg;
let rock, cobblestone, unclimableblock, lava, diamond, emerald;
function preload() {
	sheetImg = loadImage("Textures-16.png");
	buttonImg = loadImage("Restart.png");
	diamondImg = loadImage("spr_coin_azu.png")
	emeraldImg = loadImage("spr_coin_strip4.png")
	backImg = loadImage("back.png");
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


emerald = new Group();
emerald.collider = "none";
emerald.spriteSheet = emeraldImg;
emerald.addAni({w:16, h:16, row:0, col:0 });
emerald.tile = 'e';

diamond = new Group();
diamond.collider = "none";
diamond.spriteSheet = diamondImg;
diamond.addAni({w:16, h:16, row:0, col:0 });
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
'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',
'w',
'w',
'w',
'w',
'w',
'w',
'w.......................e',	
'w......................rrr.......................d.................r',
'w........d........rr........................r.....................r',
'w...........................................r.....................r',
'w...........rr...................d..........r.....................r',
'rrrrrrrrrr.......................................................rrr.................',
'rrrrrrrrrrr......e.....................................d........rrrr',
'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrcr..wrrrrrrrrrrrrrcccccccccccccccwwwwwwwwrrrrrrrrrrrr....rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',
'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrw..wrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr...........w....w',
'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrw..wrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr...........w....w',
'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrwllwrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr...........wllllw'
],
100, 300, //x,y
16,16, //w,h 

)}

//if the player collides with a diamond the diamond will disapear and the user will gain 100 score 
function playercollectsdiamond(d) {
    
    d.remove();
    score = score + 70;

    Player.rotationSpeed = 0;
    Player.rotation = 0;
	
}

function playercollectsemerald(e) {
    
    e.remove();
    score = score + 120;

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
if (Player.x >= 2000) {completedlevel();}






if (diamond.overlaps(Player, playercollectsdiamond)) {
	
	playercollectsdiamond();
		
	}


	if (emerald.overlaps(Player, playercollectsemerald)) {
	
		playercollectsemerald();
			
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
	emerald.removeAll();
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
	mouseInteractBackButton();

}
function lostgame()	{
	gameState = "lose";
	
	Player.remove();
	unclimableblock.removeAll();
	diamond.removeAll();
	cobblestone.removeAll();
	rock.removeAll();
	lava.removeAll();
	emerald.removeAll();
	camera.x = canvasSize.x/2;
    camera.y = canvasSize.y/2;
	background("red");
	textSize(20);
	textAlign(CENTER, CENTER);
	text("you lost!!", canvasSize.x/2, 50);
	text("Score: "+ score, canvasSize.x/2, 100);
	Restart();
	Back();
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

	function Restart(){
		restartButton = new Sprite (canvasSize.x/2, 200);
	  restartButton.spriteSheet = buttonImg;
	  restartButton.addAni ({w:16, h:16, row:0, col:0,}); 
	   restartButton.collider = "static";	
   };

	function Back(){
		backButton = new Sprite (200, 100);
		backButton.spriteSheet = backImg;
		backButton.addAni ({w:16, h:16, row:0, col:0,}); 
		backButton.collider = "static";	
	}
	

	function mouseInteractBackButton () {
		if (backButton.mouse.hovering()) {
			backButton.addAni ({w:16, h:16, row:1, col:0,}); 
		
		}
	
		else {
			backButton.addAni ({w:16, h:16, row:0, col:0,});     
		}
		if (backButton.mouse.pressing()) {
			window.location.href = "index.html";
		}}

/*******************************************************/
//  END OF APP
/*******************************************************/