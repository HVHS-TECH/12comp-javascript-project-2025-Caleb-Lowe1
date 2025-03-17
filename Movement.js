const MOVEMENTSPEED = 3;
const JUMPSPEED = 4;
var jumps = 0;
function Movement() 
{
//movement code    
if (kb.pressing('a')) {
    Player.vel.x = -MOVEMENTSPEED;
} else if (kb.pressing('d')) {
    Player.vel.x = MOVEMENTSPEED;
} 

 
else if (kb.pressing('s')) {
    Player.vel.y = MOVEMENTSPEED;
}
//jump code
if (kb.pressing('w') && Player.vel.y == 0 && Player.colliding(rock) || Player.colliding(cobblestone) && kb.pressing('w') && Player.vel.y == 0) {
    Player.vel.y = -JUMPSPEED;
    jumps = jumps + 1
    console.log(jumps);
    } 
  

}