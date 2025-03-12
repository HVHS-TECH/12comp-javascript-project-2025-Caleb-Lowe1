function Movement() 
{if (kb.pressing('a')) {
    Player.vel.x = -MOVEMENTSPEED;
} else if (kb.pressing('d')) {
    Player.vel.x = MOVEMENTSPEED;
} 

if (kb.pressing('w')) {
    Player.vel.y = -MOVEMENTSPEED;
} else if (kb.pressing('s')) {
    Player.vel.y = MOVEMENTSPEED;
} 
}