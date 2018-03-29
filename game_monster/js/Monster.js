// Class Monster
function Monster(initX, initY, x, y, toX, toY, initToX, initToY, die, dieX, dieY, visible) {
	this.initX   = initX;   //position x default
	this.initY   = initY;   //position y default
	this.x       = x;       //position x current
	this.y       = y;       //position y current
	this.toX     = toX;     //move to position x
	this.toY     = toY;     //move to position y
	this.initToX = initToX; //move to position x default
	this.initToY = initToY; //move to position y default
	this.die     = die;     //boolean die
	this.dieX    = dieX;    //position x when die
	this.dieY    = dieY;    //position y when die
	this.visible = visible; //boolean visible
}

//Add method move monster
Monster.prototype.move = function() {

	if (this.x == this.toX && this.y == this.toY) {
		this.x = this.toX;
		this.y = this.toY;
		this.toX = this.initX;
		this.toY = this.initY;
	}

  this.x += (this.x < this.toX) ? speed : (this.x > this.toX) ? -speed : 0;
  this.y += (this.y < this.toY) ? speed : (this.y > this.toY) ? -speed : 0;

	//disable monster
	if (this.x == this.initX && this.y == this.initY) {
		this.visible = false;
		this.x = this.initX;
		this.y = this.initY;
		this.toX = this.initToX;
		this.toY = this.initToY;
		score -= 10;
		randomMonster();
	}
};