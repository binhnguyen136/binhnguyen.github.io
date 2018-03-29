
containCanvas.addEventListener("click", function(e) {
	var xPosition = e.pageX - this.offsetLeft;
	var yPosition = e.pageY - this.offsetTop;
	score -= 5;
	heart--;

	//if monster visible call clickMonster
	for(var i = 0; i < 8; i++){
		if (monster[i].visible) {
			clickMonster(xPosition, yPosition, monster[i]);
		}
	}
});

menuCanvas.addEventListener("click", function(e){
	//Position mouse
	var xPosition = e.pageX - this.offsetLeft;
	var yPosition = e.pageY - this.offsetTop;

	//boom explosion
	if(xPosition > 430 && xPosition < 485 && yPosition > 25 && yPosition < 80) {
		killAll();
	}

	//pause
	if(xPosition > 380 && xPosition < 420 && yPosition > 35 && yPosition < 75) {
		if(running == true) {
			running = false;
		}
		else if(running == false) {
			running = true;
			main();
		}
	}

	//restart
	if(xPosition > 320 && xPosition < 360 && yPosition > 35 && yPosition < 75) {
		resetGame();
	}	
});
