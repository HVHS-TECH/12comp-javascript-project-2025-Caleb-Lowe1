var jumps = 0;
function Movement() 
{if (kb.pressing('a')) {
    Player.vel.x = -MOVEMENTSPEED;
} else if (kb.pressing('d')) {
    Player.vel.x = MOVEMENTSPEED;
} 

 
else if (kb.pressing('s')) {
    Player.vel.y = MOVEMENTSPEED;
}

if (kb.presses('w') && Player.vel.y == 0) {
    Player.vel.y = -JUMPSPEED;
    jumps = jumps + 1
    console.log(jumps);
    } 

}