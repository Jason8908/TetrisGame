<!DOCTYPE html>
<html>
	<head>
		<title>Tetris: Lite</title>
	</head>
	<link rel="icon" type="image/png" href="images/logo.png">
	<link rel="stylesheet" type="text/css" href="style.css">
	<audio id="bgm">
	  <source src="music/bgm.mp3" type="audio/mpeg">
	</audio>
	<script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
	<script type="text/javascript" src="javascript/board.js"></script>
	<script type="text/javascript">
		function start() {
			let board = new Board(window.innerWidth, window.innerHeight);
			board.create();
			window.onresize = async () => {
				board.resize(window.innerWidth, window.innerHeight);
			};
			board.makeQ();
			let blocks = [L, L1, S, S1, T, I, SQ];
			//Creating the first block
			let ran = Math.round(Math.random() * 6);
			//let block = new blocks[ran];
			let block = new blocks[ran];
			block.update();
			//Main game loop
			let loop = setInterval(async () => {
				if(!block.down()) {
				 	let sound = new Audio('music/place.mp3');
			    	sound.play();
			    	board.ableHold = true;
			    	//Updating board array.
			    	board.updateArr(block.coords, block.colour);
			    	//Checking for line clear.
			    	let arrs = board.checkArr();
			    	if(arrs) {
			    		if(arrs.length >= 4) {
			    			let sound = new Audio('music/tetris.mp3');
			    			sound.play();
			    		}
			    		else {
			    			let sound = new Audio('music/line.mp3');
			    			sound.play();
			    		};
			    		//Shifting the array
			    		board.shiftArr(arrs);
			    		//Clearing the board.
			    		board.clear();
			    		//Moving the blocks.
			    		board.update();
			    		//Updating the score.
			    		board.updateLabel('score');
			    	};
			    	//Assigning points to score.
			    	let ran2 = Math.round(1 + Math.random() * 6);
			    	let score = 13*ran2;
			    	board.add(score, 'score');
			    	//Creating a new block
			    	board.checkArr();
				 	block = new board.queue[0];
				 	for(let i = 0; i < block.coords.length; i++) {
				 		let box = document.getElementById(`${block.coords[i][0]}-${block.coords[i][1]}`);
				 		if(box.classList.contains('placed') || box.classList.contains('on')) {
				 			clearInterval(loop);
				 			board.gameOver();
				 		};
				 	};
				 	if(board.active) {
				 		board.shiftQ();
				 		block.update();
				 	};
				 };
			}, 800);
			//Key listeners
			document.addEventListener('keydown', function(event) {
			    if(event.key == "ArrowLeft") {
			    	if(!board.active) return false;
			    	block.left();
			    }
			    else if(event.key == "ArrowRight") {
			    	if(!board.active) return false;
			        block.right();
			    }
			    else if(event.key == "ArrowDown") {
			    	if(!board.active) return false;
			    	if(!block.down()) {
			    		let sound = new Audio('music/place.mp3');
			    		sound.play();
			    		board.ableHold = true;
			    		//Updating board array.
				    	board.updateArr(block.coords, block.colour);
				    	//Checking for line clear.
				    	let arrs = board.checkArr();
				    	if(arrs) {
				    		if(arrs.length >= 4) {
				    			let sound = new Audio('music/tetris.mp3');
				    			sound.play();
				    		}
				    		else {
				    			let sound = new Audio('music/line.mp3');
				    			sound.play();
				    		};
				    		//Shifting the array
				    		board.shiftArr(arrs);
				    		//Clearing the board.
				    		board.clear();
				    		//Moving the blocks.
				    		board.update();
				    		//Updating the score.
				    		board.updateLabel('score');
				    	};
				    	//Assigning points to score.
				    	let ran2 = Math.round(1 + Math.random() * 6);
				    	let score = 13*ran2;
				    	board.add(score, 'score');
				    	//Creating a new block
					 	board.checkArr();
					 	block = new board.queue[0];
					 	for(let i = 0; i < block.coords.length; i++) {
					 		let box = document.getElementById(`${block.coords[i][0]}-${block.coords[i][1]}`);
					 		if(box.classList.contains('placed') || box.classList.contains('on')) {
					 			clearInterval(loop);
					 			board.gameOver();
					 		};
					 	};
					 	if(board.active) {
					 		board.shiftQ();
					 		block.update();
					 	};
					 };
			    }
			    else if(event.key == "x") {
			    	if(!board.active) return false;
			    	block.rRight() 
			    }
			    else if(event.key == "Shift") {
			    	if(!board.ableHold) return false;
			    	let blocks = [L, L1, S, S1, T, I, SQ];
			    	let val = board.toggleHold(block);
			    	block.remove();
			    	block = null;
			    	if(val > -1) {
			    		block = new blocks[val];
			    		//Checking if the block can be placed.
			    		for(let i = 0; i < block.coords.length; i++) {
					 		let box = document.getElementById(`${block.coords[i][0]}-${block.coords[i][1]}`);
					 		if(box.classList.contains('placed') || box.classList.contains('on')) {
					 			clearInterval(loop);
					 			board.gameOver();
					 		};
					 	};
					 	if(board.active) {
					 		board.shiftQ();
					 		block.update();
					 	};
			    	}
			    	else {
			    		//Creating a new block
					 	board.checkArr();
					 	block = new board.queue[0];
					 	for(let i = 0; i < block.coords.length; i++) {
					 		let box = document.getElementById(`${block.coords[i][0]}-${block.coords[i][1]}`);
					 		if(box.classList.contains('placed') || box.classList.contains('on')) {
					 			clearInterval(loop);
					 			board.gameOver();
					 		};
					 	};
					 	if(board.active) {
					 		board.shiftQ();
					 		block.update();
					 	};
			    	};
			    }
			});
		};
	</script>
	<script type="text/javascript">
		$(document).ready(function() {
			$("#play").click(function(event) {
				/* Act on the event */
				$("#play").css("display", "none");
				$('audio#bgm')[0].play();
				$('audio#bgm')[0].loop = true;
				start();
			});
		});
	</script>
	<body id="body">
		<h1 id="play">Play!</h1>
		<div id="game"></div>
	</body>
</html>