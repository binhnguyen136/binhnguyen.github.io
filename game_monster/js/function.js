
/**
 * Determine the monster clicked to define monster, blood, sound, score,..
 * @param {currX} position mouse x
 * @param {currY} position mouse y
 * @param {monster} object monster
 */
function clickMonster(currX, currY, monster) {
	//Determine monster have clicked
	if (currX >= monster.x && currX <= monster.x + monsterImageSize.width && currY >= monster.y && currY <= monster.y + monsterImageSize.height) {
		score += 10;
		heart++;
		//define monster died 
		monster.visible = false;
		monster.die = true;
		monster.dieX = currX;
		monster.dieY = currY;
		monster.x = monster.initX;
		monster.y = monster.initY;
		monster.toX = monster.initToX;
		monster.toY = monster.initToY;

		//blood position
		var blood = {};
		blood.x = monster.dieX;
		blood.y = monster.dieY;

		//list blood
		bloodList[bloodList.length] = blood;

		if (bloodList.length > 5) {
			bloodList.splice(0, 1);
		}

		//level
		var levelBefore = level;
		level = Math.floor((score - 100) / 100);
		if (level < levelBefore) {
			level = levelBefore;
		}
/*		if (level > 0) {
			monsterImage = monsterJakeImage;
		}*/
		if (level > 3) {
			level = 3;
		}
		for (li = 0; li <= level; li++) {
			randomMonster();
		}
		//randomMonster();
		changeMonster(level);
		increaseSpeed(level);

		//sound
		if(running){
			swordrawSound.play();
		}
		
	}
}

/**
 * Kill all Monster current
 */
function killAll() {
	if (boomNum > 0 && end == false) {
		boomNum--;
		explosionReady = true;

		for(var i = 0; i < 8; i++){
			if (monster[i].visible == true) {
				monster[i].visible = false;
				score += 10;
			}
		}
		setTimeout(function() {
			randomMonster();
			explosionReady = false;
		}, 1000);		
		//sound boom 
		bombSound.play();
	}
}

//Define speed Monster
function increaseSpeed(level) {
	speed = speedArr[level];
}

/**
 * Change Monster with param level
 * param {level}
 */
function changeMonster(level) {
	switch(level) {
		case 1: 
		monsterImage = monsterScaryImage;
		break;
		case 2:
		monsterImage = monsterJakeImage; 
		break;
		case 3:
		monsterImage = monsterSeaImage;
		break;
		case 4:
		monsterImage = monsterSeaImage;
		break;
		default: 
		break;
	}
}

/*-----  show monster randomly  ------*/
function randomMonster() {
	var random = Math.floor((Math.random() * 8) + 0);

	if (!monster[random].visible) {
		monster[random].visible = true;
		monster[random].die = false;
	}

}

/*------------  render background, items, monster, score  --------------*/
function render() {

	/*----------  Menu canvas  ----------*/
	//background menu
	ctxMenu.drawImage(mnImage, 0, 0);
	//Boom
	ctxMenu.drawImage(boomImage, 430, 25, 55, 55);
	//Pause
	ctxMenu.drawImage(pauseImage, 380, 35, 40, 40);	
	//Restart
	ctxMenu.drawImage(restartImage, 320, 35, 40, 40);
	//heart img
	var xH = 90;
	for(h = 1; h <= heart; h++) {
		ctxMenu.drawImage(heartImage, xH, 15);
		xH += 34;
	}
	ctxMenu.font = "25px Arial";
	ctxMenu.fillStyle = "#FFF";
	//Heart
	ctxMenu.fillText("Heart:", 10, 35);
	//Score
	ctxMenu.fillText("Score: " + score, 10, 70);
	//Number Boom
	ctxMenu.fillText(boomNum, 465, 40);

	/*----------  End Menu canvas  ----------*/

	/*----------  Contain canvas  ----------*/
	//background
	ctx.drawImage(bgImage, 0, 0);

	//boom no
	if(explosionReady) {
		ctx.drawImage(explosionImage, 100, 100, 300, 300);
	}

	//list blood
	if (bloodList.length > 0) {
		for (bi = 0; bi < bloodList.length; bi++) {
			ctx.drawImage(bloodImage, bloodList[bi].x - 50, bloodList[bi].y - 50);
		}
	}

	//level
	ctx.fillStyle = "#F1F1F1";
	ctx.font = "24px Arial";
	ctx.fillText("Level: " + (level + 1), 25, 32);

	//monster
	for(var i = 0; i < 8; i++){
		if (monster[i].visible)
			ctx.drawImage(monsterImage, monster[i].x, monster[i].y, 100, 100);
	}
	/*----------  End Contain canvas  ----------*/

}

/**
 * Update Game
 *
 */
function update() {
	for(var i = 0; i < 8; i++){
		if (monster[i].visible)
			monster[i].move();
	}
}

/**
 * Reset Game
 * set all to begin game
 */
function resetGame() {
	for(var i = 0; i < 8; i++){
		initMonster(monster[i]);
	}

	level = 0;
	end = false;
	running = true;
	score = 100;
	heart = 3;
	monsterImage = monsterTerrozaImage;
	highScore = sessionStorage.getItem("highscore");
	boomNum = 3;
	bloodList = [];

	monster1.visible = true;
	main();
}

/**
 * Set game over
 *
 */
function overGame() {
	end = true;
	running = false;
	gameoverSound.play();
}

/**
 * Init Monster with default property  
 *
 */
function initMonster(monster) {
	monster.x = monster.initX;
	monster.y = monster.initY;
	monster.toX = monster.initToX;
	monster.toY = monster.initToY;
	speed = speedArr[0];
	monster.die = false;
	monster.dieX = 0;
	monster.visible = false;
}
