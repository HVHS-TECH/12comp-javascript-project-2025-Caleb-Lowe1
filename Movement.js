const MOVEMENTSPEED = 2.4;
const JUMPSPEED = 4;
function Movement() 
{
//movement code    
if (kb.pressing('a')) {
    Player.vel.x = -MOVEMENTSPEED;
    Player.rotation = 0;
} else if (kb.pressing('d')) {
    Player.vel.x = MOVEMENTSPEED;
    Player.rotation = 0;
} 

 

//jump code, checks if the user is colliding with the ground and if true then and the user is pressing down on 'w' then it will allow the player to jump 
if (kb.presses('w') && Player.colliding(rock) || kb.presses('w') && Player.colliding(cobblestone)) {
    Player.vel.y = -(JUMPSPEED);
    Player.rotation = 0;
    } 
  

}

