//Init object monster form class Monster
var monster1 = new Monster(0,   0,   0,   0,   120, 120, 120, 120, false, 0, 0, true);
var monster2 = new Monster(210, 0,   210, 0,   210, 120, 210, 120, false, 0, 0, false);
var monster3 = new Monster(420, 0,   420, 0,   300, 120, 300, 120, false, 0, 0, false);
var monster4 = new Monster(0,   210, 0,   210, 120, 210, 120, 210, false, 0, 0, false);
var monster5 = new Monster(420, 210, 420, 210, 300, 210, 300, 210, false, 0, 0, false);
var monster6 = new Monster(0,   420, 0,   420, 120, 300, 120, 300, false, 0, 0, false);
var monster7 = new Monster(210, 420, 210, 420, 210, 300, 210, 300, false, 0, 0, false);
var monster8 = new Monster(420, 420, 420, 420, 300, 300, 300, 300, false, 0, 0, false);

//Array monster object
var monster = [monster1, monster2, monster3, monster4, monster5, monster6, monster7, monster8];


function run() {
	if (heart < 0 || score < 0) {
		overGame();
	}
	var now = Date.now();
	var differentTime = now - lastUpdateTime;
	if (differentTime >= TICKS) {
		update();
		render();
		lastUpdateTime = now;
	}

	if (running) {
		requestAnimationFrame(run);
	} else if (!running && !end) {
		ctx.fillStyle = "#F1F1F1";
		ctx.font = "30px Arial";
		ctx.fillText("PAUSE", 200, 250);
	} else if (!running && end) {
		if (score > highScore) {
			highScore = score;
			sessionStorage.setItem("highscore", score);

			ctx.fillStyle = "#F1F1F1";
			ctx.font = "35px Arial bold";
			ctx.fillText("NEW HIGHSCORE: " + highScore, 100, 290);
		} else {
			ctx.fillStyle = "#F1F1F1";
			ctx.font = "35px Arial bold";
			ctx.fillText("SCORE: " + score, 150, 290);
		}
		//ctx.drawImage(overImage, 0, 0, 500, 500);
		ctx.fillStyle = "#ff0000";
		ctx.font = "50px Arial bold";
		ctx.fillText("GAME OVER", 120, 250);
	}

}
run();