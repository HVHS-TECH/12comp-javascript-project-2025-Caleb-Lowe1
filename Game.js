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
health = 3;
canvasSize = {
	x: 1200,
	y: 600
	}



var restartButton;	
var backButton;	
//enviroment
let sheetImg;
let rock, cobblestone, unclimableblock, lava, diamond, emerald, hotrock;
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
Player = new Sprite(30, 178.01034375, 10, 10, 'd');
	Player.color = 'blue';
	Player.stroke = 'black';
	Player.strokeWeight = 1;

lava = new Group();
lava.collider = "static";
lava.spriteSheet = sheetImg;
lava.addAni({w:16, h:16, row:9, col:11 });
lava.tile = 'l';

hotrock = new Group();
hotrock.collider = "static";
hotrock.spriteSheet = sheetImg;
hotrock.addAni({w:16, h:16, row:9, col:0 });
hotrock.tile = 'h';


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
unclimableblock.friction = 0;

new Tiles([
'rrrrrcrrrrrrrrrrrcrrrrrrrrrrcrrrrrrrrrrrrrrcccccrrrrrrrcrrrrrrcrrrrrrrrrrrrrrrrrcrrrrrrcrrrrrrrrrrrrrcrrrrrrrrrrcccrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',
'w',
'w........................................................................................c',
'w........................................................................................rr',
'w...............................................................................rrcrrrcccrcr',
'w........................................................................................rr',
'w........................................................................................c',
'w.......................e',	
'w......................hrc.......................e................d',
'w........d........rr.........................r....................r',
'w............................................r....................r',
'w...........cr...................d...........r....................c',
'rrrrrcrrr.......................................................rrr................e',
'rrrrrhrrrrr......e.....................................d........hcrr',
'rcrccccrrrrrrrrrrrrrrrhhhrrrrrcr..rrrrhrrrrrrrrrcccllcccrrrchrcrrrrcrrrrrrrcrrrcrrr....rrrhhrrrcrrrrcrrcrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',
'rchhrrrrhrrrcrrrrcrrrrrrrrrrrrrw..wrrrhrrrrrrhrrrrrrrrrrrrrrrrrrrrrrhrr...........w....w',
'rrcrrrrrrrrrrrrrrrrrcrhrrrrrrrrhllhrrrrrrhrhhrrccrrrrrhrrcrrrrrrcrrrrrr...........wllllw',
'rrrrrrrrrcrrrrccrrrrrrrrcrrrrrrhhhhrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr...........wwwwww'
],
0, 0, //x,y
16,16, //w,h 

)}

//if the player collects a diamond the diamond will disapear and the user will gain 100 score 
function playercollectsdiamond(d) {
    
    d.remove();
    score = score + 70;

    
	
}
//if player collects an emerald they will earn 120 score points and the emerald will disapear
function playercollectsemerald(e) {
    
    e.remove();
    score = score + 120;

    
	
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
    };

}




/*******************************************************/
// Functions()
/*******************************************************/
function displayScore() {
	textSize(20);
	fill(0);
	text("Score: " + score, 0, 15);	
	
}

function runGame(){
	
	
 
clear();
background("grey")
healthbar();
camera.x = Player.x;
camera.y = Player.y;	
Movement();
displayScore();
Player.rotationLock = true;

//makes the camera follow the player 




//checking if the player has won
if (Player.x >= 2000) {completedlevel();}


//checking if the player has lost
if (Player.y >= 1300 || (health <= 0)) 
	{lostgame();}

if (Player.collides (lava) || Player.collides (hotrock)) {Player.vel.y = -5; Player.vel.x = 1; health = (health - 1);
	console.log(health)
	}
	

if (diamond.overlaps(Player, playercollectsdiamond)) {
	
	playercollectsdiamond();
		
	}


	if (emerald.overlaps(Player, playercollectsemerald)) {
	
		playercollectsemerald();
			
		}	
		
	}		
		


	function lose () {
		console.log ("I LOST :(")
		mouseInteractRestartButton();
		mouseInteractBackButton();
	
	};
	function lostgame()	{
		gameState = "lose";
		
		Player.remove();
		unclimableblock.removeAll();
		diamond.removeAll();
		cobblestone.removeAll();
		rock.removeAll();
		lava.removeAll();
		emerald.removeAll();
		hotrock.removeAll();
		camera.x = canvasSize.x/2;
		camera.y = canvasSize.y/2;
		background("red");
		textSize(20);
		textAlign(CENTER, CENTER);
		text("you lost!!", canvasSize.x/2, 50);
		text("Score: "+ score, canvasSize.x/2, 100);
		
		
		Restart();
		
		
		Back();

		

		};

function win () {
	console.log("WINNING")
		mouseInteractRestartButton();
		mouseInteractBackButton();
	};
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
    hotrock.removeAll();
	camera.x = canvasSize.x / 2;
    camera.y = canvasSize.y / 2;
	background("yellow");
	textSize(20);
	textAlign(CENTER, CENTER);
	text("YOU WON!!", canvasSize.x/2, 50);
	text("Score: "+ score, canvasSize.x/2, 100);


	Restart();

	Back();


};



	
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
		
	restartButton = new Sprite(canvasSize.x / 2, canvasSize.y / 2);
	  restartButton.spriteSheet = buttonImg;
	  restartButton.addAni ({w:16, h:16, row:0, col:0,}); 
	   restartButton.collider = "static";

   };

	function Back(){
		backButton = new Sprite (canvasSize.x / 2 + (16), canvasSize.y / 2);
		backButton.spriteSheet = backImg;
		backButton.addAni ({w:16, h:16, row:1, col:0,}); 
		backButton.collider = "static";	
		console.log("back working")
	

	}
	

	function mouseInteractBackButton () {
		if (backButton.mouse.hovering()) {
			backButton.addAni ({w:16, h:16, row:0, col:0,}); 
			
		
		}


	
		else {
			backButton.addAni ({w:16, h:16, row:1, col:0,});     
		}
		if (backButton.mouse.pressing()) {
			window.location.href = "index.html";
		}}

		function healthbar() {
			fill(255); 
			textSize(20); 
			text("Health:", 15, 50);
			for (var i = 0; i < health; i++) {
				
				fill(255, 0, 0);
    			noStroke();
    			rect(90 + 30 * i, 40, 20, 20); 
				
				
			  }
		}

/*******************************************************/
//  END OF APP
/*******************************************************/