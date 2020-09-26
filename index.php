<!DOCTYPE html>
<html>
	<head>
		<title>Tetris: Lite</title>
	</head>
	<link rel="icon" type="image/png" href="images/logo.png">
	<link rel="stylesheet" type="text/css" href="style.css">
	<script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
	<script type="text/javascript" src="javascript/board.js"></script>
	<script type="text/javascript">
		function start() {
			let board = new Board(window.innerWidth, window.innerHeight);
			board.create();
			window.onresize = async () => {
				board.resize(window.innerWidth, window.innerHeight);
			};

			let blocks = [L, L1, S, S1, T, I, SQ];
			//Creating the first block
			let ran = Math.round(1 + Math.random() * 6);
			//let block = new blocks[ran];
			let block = new L;
			block.update();
			//Main game loop
			setInterval(async () => {
				console.log(block.rotation);
				// if(!block.down()) {
				// 	let ran = Math.round(1 + Math.random() * 6);
				// 	block = new L;
				// 	block.update();
				// }
			}, 400);
			//Key listeners
			document.addEventListener('keydown', function(event) {
			    if(event.key == "ArrowLeft") {
			        block.left();
			    }
			    else if(event.key == "ArrowRight") {
			        block.right();
			    }
			    else if(event.key == "ArrowDown") {
			    	if(!block.down()) {
			    		block = new L;
			    		block.update();
			    	}
			    }
			    else if(event.key == "x") {
			    	block.rRight();
			    }
			});
		};
		/*
		setInterval(async () => {
			for(let x = 0; x < 20; x++) {
				for(let y = 0; y < 10; y++) {
					let box = document.getElementById(`${x}-${y}`);
					let color = '#';
					for(let i = 0; i < 6; i++) {
						let ran = Math.round(1 + Math.random() * 8);
						color += `${ran}`;
					}
					box.style.background = color;
				}
			}
		}, 400);
		*/
	</script>
	<audio id="bgm">
	  <source src="music/bgm.mp3" type="audio/mpeg">
	</audio>
	<script type="text/javascript">
		$(document).ready(function() {
			$("#play").click(function(event) {
				/* Act on the event */
				$("#play").css("display", "none");
				$('audio#bgm')[0].play();
				start();
			});
		});
	</script>
	<body id="body">
		<img src="images/play.png" id="play">
	</body>
</html>