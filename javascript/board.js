let boardColour = '#B9B9B9';
let gColour = 'grey';

class Board {
	constructor(width, height) {
		this.width =+ width * 0.26;
		this.height =+ height * 0.98;
		this.winWidth = width;
		this.winHeight = height;
		this.board = null;
		this.boardArr = [];
		this.score = 0;
		this.queue = [];
		this.active = true;
		this.held = null;
		this.ableHold = true;
	}
	create() {
		let game = document.getElementById('game');
		//Making the main table.
		this.board = document.createElement('table');
		this.board.style.width = `${this.width}px`;
		this.board.style.height = `${this.height}px`;
		this.board.style.position = 'fixed';
		this.board.display = 'inline-block';
		this.board.style.left = '29%';
		this.board.style.top = '1%';
		this.board.style.overflow = 'hidden';
		this.board.id = 'board';
		//Table rows.
		for(let i = 0; i < 20; i++) {
			let row = document.createElement('tr');
			row.style.border = '1px solid white';
			for(let x= 0; x < 10; x++) {
				let box = document.createElement('td');
				box.id = `${i}-${x}`;
				box.style.background = boardColour;
				//Custom styles.
				box.style.border = '1px solid white';
				box.classList.add('off');
				row.appendChild(box);
			this.board.append(row);
			};
		};
		//Filling the board array.
		for(let i = 0; i < 20; i++) {
			let add = [];
			for(let x = 0; x < 10; x++) add.push(0);
			this.boardArr.push(add);
		};
		//Creating Score
		let scoreTitle = document.createElement('h1');
		scoreTitle.id = 'score';
		scoreTitle.innerHTML = '0'; 
		
		//Creating held
		let heldTitle = document.createElement('h1');
		heldTitle.id = 'heldTitle';
		heldTitle.innerHTML = 'Hold'; 
		//Held Image.
		let held = document.createElement('img');
		held.id = 'held';
		//Help Div
		let heldDiv = document.createElement('div');
		heldDiv.id = 'heldDiv';
		heldDiv.appendChild(heldTitle);
		heldDiv.appendChild(held);
		//Appending the table to the body.
		game.appendChild(heldDiv);
		game.appendChild(this.board);
		game.appendChild(scoreTitle);
	}
	resize(width, height) {
		if(!this.board) return;
		this.width =+ width * 0.26;
		this.height =+ height * 0.98;
		this.winWidth = width;
		this.winHeight = height;
		this.board = document.getElementById('board');
		this.board.style.width = `${this.width}px`;
		this.board.style.height = `${this.height}px`;
	}
	updateArr(coords, t) {
		for(let i = 0; i < coords.length; i++) this.boardArr[coords[i][0]][coords[i][1]] = t;
	}
	checkArr() {
		let out = [];
		for(let i = 0; i < this.boardArr.length; i++) {
			if(!(this.boardArr[i].includes(0))) out.push(i);
		};
		out = (out.length < 1 ? false:out);
		return out;
	}
	clear() {
		for(let i = 0; i < 20; i++) {
			for(let x = 0; x < 10; x++) {
				let sCoords = `${i}-${x}`;
				let box = document.getElementById(sCoords);
				box.style.background = boardColour;
				box.classList.add('off');
				box.classList.remove('on');
				box.classList.remove('placed');
			};
		};
	}
	update() {
		for(let i = 0; i < 20; i++) {
			for(let x = 0; x < 10; x++) {
				let sCoords = `${i}-${x}`;
				let box = document.getElementById(sCoords);
				if(this.boardArr[i][x] != 0) {
					box.classList.remove('off');
					box.classList.add('on');
					box.classList.add('placed');
					box.style.background = this.boardArr[i][x];
				}
				else {
					box.classList.add('off');
					box.classList.remove('on');
					box.classList.remove('placed');
				};
			};
		};
	}
	shiftArr(i) {
		for(let x = 0; x < i.length; x++) {
			//Removing the empty lines.
			this.boardArr.splice(i[x], 1);
			//Creating and adding empty lines.
			let add = [];
			for(let x = 0; x < 10; x++) add.push(0);
			this.boardArr.unshift(add);
		};
		this.score += 100 + (250*i.length);
	}
	updateLabel(id) {
		let label = document.getElementById(id);
		if(!label) return false;
		label.innerHTML = `${this.score}`;
	}
	add(amount, label) {
		this.score += amount;
		this.updateLabel(label);
	}
	makeQ() {
		let blocks = [L, L1, S, S1, T, I, SQ];
		let images = ['l.PNG', 'l1.PNG', 's.PNG', 's1.PNG', 't.PNG', 'i.PNG', 'sq.PNG'];
		//Creating the queue
		while(this.queue.length < 3) {
			let ran = Math.round(Math.random() * 6);
			if(this.queue.length > 1) if(this.queue.includes(blocks[ran])) continue;
			this.queue.push(blocks[ran]);
		};
		//Getting game board
		let game = document.getElementById('game');
		let div = document.createElement('div');
		//Creating next
		let nextTitle = document.createElement('h1');
		nextTitle.id = 'nextTitle';
		nextTitle.innerHTML = 'Up Next'; 
		//Apending Next.
		div.appendChild(nextTitle);
		//Filling with images.
		for(let i = 0; i < 3; i++) {
			let image = document.createElement('img');
			image.id = `block${i}`;
			image.src = `images/${images[blocks.indexOf(this.queue[i])]}`;
			//Apending the images.
			div.appendChild(image);
			div.id = 'next';
			for(let i = 0; i < 11; i++) {
				let br = document.createElement('br');
				div.appendChild(br);
			} 
		}
		game.appendChild(div);
	}
	shiftQ() {
		let images = ['l.PNG', 'l1.PNG', 's.PNG', 's1.PNG', 't.PNG', 'i.PNG', 'sq.PNG'];
		//Removing the first element of the queue.
		this.queue.splice(0, 1);
		let blocks = [L, L1, S, S1, T, I, SQ];
		let blocksStr = [document.getElementById("block0"), document.getElementById("block1"), document.getElementById("block2")];
		//Updating the queue
		while(1) {
			let ran = Math.round(Math.random() * 6);
			if(this.queue.length > 1) if(this.queue.includes(blocks[ran])) continue;
			this.queue.push(blocks[ran]);
			break;
		};
		blocksStr[0].src = blocksStr[1].src;
		blocksStr[1].src = blocksStr[2].src;
		blocksStr[2].src = `images/${images[blocks.indexOf(this.queue[2])]}`;
	}
	gameOver() {
		if(!this.active) return false;
		this.active = false;
		//Stopping music.
		$('audio#bgm')[0].pause();
		//Playing game over sound.
		let sound = new Audio('music/gameOver.mp3');
		sound.play();
		//Making Game Over text.
		let text = document.createElement('h1');
		let game = document.getElementById('game');
		text.id = 'gameOverTxt';
		text.innerHTML = 'Game Over!';
		//Appending text.
		game.appendChild(text);
	}
	toggleHold(block) {
		let blocks = [L, L1, S, S1, T, I, SQ];
		let images = ['l.PNG', 'l1.PNG', 's.PNG', 's1.PNG', 't.PNG', 'i.PNG', 'sq.PNG']; 
		if(!this.held) {
			this.held = blocks[block.order];
			let path = `images/${images[block.order]}`;
			let img = document.getElementById('held');
			img.src = path;
			this.ableHold = false;
			return -1;
		};
		let val = this.held;
		this.held = blocks[block.order];
		let path = `images/${images[block.order]}`;
		let img = document.getElementById('held');
		img.src = path;
		this.ableHold = false;
		return blocks.indexOf(val);
	}
}

class L{
	constructor() {
		this.coords = [[0, 4], [1, 4], [2, 4], [2, 5]];
		this.gCoords = [[0, 4], [1, 4], [2, 4], [2, 5]];
		this.active = true;
		this.rotation = 1;
		this.colour = 'orange';
		this.order = 0;

	}
	insta() {
		this.ghost();
		this.remove();
		for(let i = 0; i < this.coords.length; i++) {
			for(let x = 0; x < this.coords[i].length; x++) {
				this.coords[i][x] = this.gCoords[i][x];
				let sCoords = `${this.coords[i][0]}-${this.coords[i][1]}`;
				let box = document.getElementById(sCoords);
				box.classList.remove('off');
				box.classList.add('on');
				box.classList.add('placed');
			};
		};
		this.update();
	}
	ghost() {
		for(let i = 0; i < this.coords.length;i++) {
			for(let x = 0; x < this.coords[i].length; x++) {
				this.gCoords[i][x] = this.coords[i][x];
			};
		};
		let able = true;
		while(able) {
			for(let i = 0; i < this.gCoords.length; i++) {
				let box = document.getElementById(`${this.gCoords[i][0]+1}-${this.gCoords[i][1]}`);
				if(!box) able = false;
				if(box) if(box.classList.contains('placed')) able = false;
			};
			if(able) for(let i = 0; i < this.gCoords.length;i++) this.gCoords[i][0]++;
		};
	}
	down() {
		let y = this.coords.map(y => y[0]);
		if(y.includes(19) || !this.active || !this.checkY()) {
			this.active = false;
			for(let x = 0; x < 4; x++) {
				let sCoords = `${this.coords[x][0]}-${this.coords[x][1]}`;
				let box = document.getElementById(sCoords);
				box.classList.add('placed');
			};
			return false;
		};
		for(let x = 0; x < 4; x++) {
			this.remove();
			this.coords[x][0]++;
		};
		this.update();
		return true;
	}
	left() {
		let x = this.coords.map(x => x[1]);
		if(x.includes(0) || !this.active) return false;
		if(!this.checkLeft()) return false;
		for(let x = 0; x < 4; x++) {
			this.remove();
			this.coords[x][1]--;
			this.ghost();
		};
		this.update();
		return true;
	}
	right() {
		let x = this.coords.map(x => x[1]);
		if(x.includes(9) || !this.active) return false;
		if(!this.checkRight()) return false;
		for(let x = 0; x < 4; x++) {
			this.remove();
			this.coords[x][1]++;
			this.ghost();
		};
		this.update();
		return true;
	}
	update() {
		//Updating ghost block
		for(let x = 0; x < 4; x++) {
			let sCoords = `${this.gCoords[x][0]}-${this.gCoords[x][1]}`;
			let box = document.getElementById(sCoords);
			box.style.background = gColour;
		};
		//Updating block
		for(let x = 0; x < 4; x++) {
			let sCoords = `${this.coords[x][0]}-${this.coords[x][1]}`;
			let box = document.getElementById(sCoords);
			box.style.background = this.colour;
			box.classList.add('on');
			box.classList.remove('off');
		};
	}
	remove() {
		for(let x = 0; x < 4; x++) {
			let sCoords = `${this.coords[x][0]}-${this.coords[x][1]}`;
			let box = document.getElementById(sCoords);
			box.style.background = boardColour;
			box.classList.add('off');
			box.classList.remove('on');
		};
		//Updating ghost block
		for(let x = 0; x < 4; x++) {
			let sCoords = `${this.gCoords[x][0]}-${this.gCoords[x][1]}`;
			let box = document.getElementById(sCoords);
			box.style.background = boardColour;
		};
	}
	checkY(coords, rotate) {
		if(!coords) coords = this.coords;
		let y = coords.map(y => y[0]);
		for(let i = 0; i < y.length; i++) if (y[i] >= 19) {
			if(!rotate) return false;
			if(y[i] > 19) return false;
		};
		for(let i = 0; i < coords.length; i++) {
			for(let x = 0; x < 2; x++) {
				if(x > 0 && rotate) continue;
				let box = document.getElementById(`${coords[i][0]+x}-${coords[i][1]}`);
				if(box) if(box.classList.contains('placed')) return false;
			};
		};
		return true;
	}
	checkRight(coords, rotate) {
		if(!coords) coords = this.coords;
		let x = coords.map(x => x[1]);
		for(let i = 0; i < x.length; i++) if (x[i] >= 9) {
			if(!rotate) return false;
			if(x[i] > 9) return false;
		};
		for(let i = 0; i < coords.length; i++) {
			for(let x = 0; x < 2; x++) {
				if(x > 0 && rotate) continue;
				let box = document.getElementById(`${coords[i][0]}-${coords[i][1]+x}`);
				if(box) if(box.classList.contains('placed')) return false;
			};
		};
		return true;
	}
	checkLeft(coords, rotate) {
		if(!coords) coords = this.coords;
		let x = coords.map(x => x[1]);
		for(let i = 0; i < x.length; i++) if (x[i] <= 0) {
			if(!rotate) return false;
			if(x[i] < 0) return false;
		};
		for(let i = 0; i < coords.length; i++) {
			for(let x = 0; x < 2; x++) {
				if(x > 0 && rotate) continue;
				let box = document.getElementById(`${coords[i][0]}-${coords[i][1]-x}`);
				if(box) if(box.classList.contains('placed')) return false;
			};
		};
		return true;
	}
	rRight() {
		switch(this.rotation) {
			case 1:
				this.remove();
				//block movements
				var temp = [[],[],[],[]];
				for(let i = 0; i < this.coords.length;i++) {
					for(let x = 0; x < this.coords[i].length; x++) {
						temp[i][x] = this.coords[i][x];
					};
				};
				temp [0][1]+=2;
				temp [1][0]--;
				temp [1][1]++;
				temp [2][0]-=2;
				temp [3][1]--;
				temp [3][0]--;
				if(!this.checkRight(temp, true)) {
					for(let x = 0; x < 2; x++) {
						for(let i = 0; i < 4; i++) temp[i][1]--;
						if(this.checkRight(temp, true)) break;
					};
					if(!this.checkLeft(temp, true)) {
						for(let i = 0; i < 4; i++) temp[i][0]++;
						if(this.checkLeft(temp, true) && this.checkRight(temp, true)) {
							this.rotation ++;
							this.coords = temp;
						};
					}
					else {
						this.coords = temp;
						this.rotation ++;
					};					
				}
				else {
					this.coords = temp;
					this.rotation ++;
				};
				//updating blocks
				this.ghost();
				this.update();
			break;
			case 2:
				this.remove();
				//block movements
				var temp = [[],[],[],[]];
				for(let i = 0; i < this.coords.length;i++) {
					for(let x = 0; x < this.coords[i].length; x++) {
						temp[i][x] = this.coords[i][x];
					};
				};
				temp[0][0]+=2;
				temp[1][0]++;
				temp[1][1]++;
				temp[2][1]+=2;
				temp[3][0]--;
				temp[3][1]++;
				//updating blocks
				if(!this.checkY(temp, true)) {
					for(let i = 0; i < 4; i++) temp[i][0]--;
					if(this.checkLeft(temp, true) && this.checkRight(temp, true)) {
						this.coords = temp;
						this.rotation++;
					};
				}
				else {
					this.coords = temp;
					this.rotation++;
				}
				this.ghost();		
				this.update();
			break;
			case 3:
				this.remove();
				//block movements
				var temp = [[],[],[],[]];
				for(let i = 0; i < this.coords.length;i++) {
					for(let x = 0; x < this.coords[i].length; x++) {
						temp[i][x] = this.coords[i][x];
					};
				};
				temp [0][1]-=2;
				temp [1][1]--;
				temp [1][0]++;
				temp [2][0]+=2;
				temp [3][1]++;
				temp [3][0]++;
				if(!this.checkLeft(temp, true)) {
					for(let x = 0; x < 2; x++) {
						for(let i = 0; i < 4; i++) temp[i][1]++;
						if(this.checkLeft(temp, true)) break;
					};
					if(!this.checkRight(temp, true)) {
						for(let i = 0; i < 4; i++) temp[i][0]--;
						if(this.checkLeft(temp, true) && this.checkRight(temp, true)) {
							this.rotation ++;
							this.coords = temp;
						};
					}
					else {
						this.coords = temp;
						this.rotation ++;
					};					
				}
				else {
					this.coords = temp;
					this.rotation ++;
				};
				//updating blocks
				this.ghost();
				this.update();
			break;
			case 4:
				this.remove();
				//block movements
				this.coords[0][0]-=2;
				this.coords[1][1]--;
				this.coords[1][0]--;
				this.coords[2][1]-=2;
				this.coords[3][1]--;
				this.coords[3][0]++;
				//updating blocks
				this.ghost();
				this.update();
				this.rotation = 1;
			break;
			
		};
	}
}

class L1{
	constructor() {
		this.coords = [[0, 4], [1, 4], [2, 4], [2, 3]];
		this.gCoords = [[0, 4], [1, 4], [2, 4], [2, 3]];
		this.active = true;
		this.rotation = 1;
		this.colour = 'blue';
		this.order = 1;
	}
	insta() {
		this.ghost();
		this.remove();
		for(let i = 0; i < this.coords.length; i++) {
			for(let x = 0; x < this.coords[i].length; x++) {
				this.coords[i][x] = this.gCoords[i][x];
				let sCoords = `${this.coords[i][0]}-${this.coords[i][1]}`;
				let box = document.getElementById(sCoords);
				box.classList.remove('off');
				box.classList.add('on');
				box.classList.add('placed');
			};
		};
		this.update();
	}
	ghost() {
		for(let i = 0; i < this.coords.length;i++) {
			for(let x = 0; x < this.coords[i].length; x++) {
				this.gCoords[i][x] = this.coords[i][x];
			};
		};
		let able = true;
		while(able) {
			for(let i = 0; i < this.gCoords.length; i++) {
				let box = document.getElementById(`${this.gCoords[i][0]+1}-${this.gCoords[i][1]}`);
				if(!box) able = false;
				if(box) if(box.classList.contains('placed')) able = false;
			};
			if(able) for(let i = 0; i < this.gCoords.length;i++) this.gCoords[i][0]++;
		};
	}
	down() {
		let y = this.coords.map(y => y[0]);
		if(y.includes(19) || !this.active || !this.checkY()) {
			this.active = false;
			for(let x = 0; x < 4; x++) {
				let sCoords = `${this.coords[x][0]}-${this.coords[x][1]}`;
				let box = document.getElementById(sCoords);
				box.classList.add('placed');
			};
			return false;
		};
		for(let x = 0; x < 4; x++) {
			this.remove();
			this.coords[x][0]++;
		};
		this.update();
		return true;
	}
	left() {
		let x = this.coords.map(x => x[1]);
		if(x.includes(0) || !this.active) return false;
		if(!this.checkLeft()) return false;
		for(let x = 0; x < 4; x++) {
			this.remove();
			this.coords[x][1]--;
			this.ghost();
		};
		this.update();
		return true;
	}
	right() {
		let x = this.coords.map(x => x[1]);
		if(x.includes(9) || !this.active) return false;
		if(!this.checkRight()) return false;
		for(let x = 0; x < 4; x++) {
			this.remove();
			this.coords[x][1]++;
			this.ghost();
		};
		this.update();
		return true;
	}
	update() {
		//Updating ghost block
		for(let x = 0; x < 4; x++) {
			let sCoords = `${this.gCoords[x][0]}-${this.gCoords[x][1]}`;
			let box = document.getElementById(sCoords);
			box.style.background = gColour;
		};
		for(let x = 0; x < 4; x++) {
			let sCoords = `${this.coords[x][0]}-${this.coords[x][1]}`;
			let box = document.getElementById(sCoords);
			box.style.background = this.colour;
			box.classList.add('on');
			box.classList.remove('off');
		};
	}
	remove() {
		for(let x = 0; x < 4; x++) {
			let sCoords = `${this.coords[x][0]}-${this.coords[x][1]}`;
			let box = document.getElementById(sCoords);
			box.style.background = boardColour;
			box.classList.add('off');
			box.classList.remove('on');
		};
		//Updating ghost block
		for(let x = 0; x < 4; x++) {
			let sCoords = `${this.gCoords[x][0]}-${this.gCoords[x][1]}`;
			let box = document.getElementById(sCoords);
			box.style.background = boardColour;
		};

	}
	checkY(coords, rotate) {
		if(!coords) coords = this.coords;
		let y = coords.map(y => y[0]);
		for(let i = 0; i < y.length; i++) if (y[i] >= 19) {
			if(!rotate) return false;
			if(y[i] > 19) return false;
		};
		for(let i = 0; i < coords.length; i++) {
			for(let x = 0; x < 2; x++) {
				if(x > 0 && rotate) continue;
				let box = document.getElementById(`${coords[i][0]+x}-${coords[i][1]}`);
				if(box) if(box.classList.contains('placed')) return false;
			};
		};
		return true;
	}
	checkRight(coords, rotate) {
		if(!coords) coords = this.coords;
		let x = coords.map(x => x[1]);
		for(let i = 0; i < x.length; i++) if (x[i] >= 9) {
			if(!rotate) return false;
			if(x[i] > 9) return false;
		};
		for(let i = 0; i < coords.length; i++) {
			for(let x = 0; x < 2; x++) {
				if(x > 0 && rotate) continue;
				let box = document.getElementById(`${coords[i][0]}-${coords[i][1]+x}`);
				if(box) if(box.classList.contains('placed')) return false;
			};
		};
		return true;
	}
	checkLeft(coords, rotate) {
		if(!coords) coords = this.coords;
		let x = coords.map(x => x[1]);
		for(let i = 0; i < x.length; i++) if (x[i] <= 0) {
			if(!rotate) return false;
			if(x[i] < 0) return false;
		};
		for(let i = 0; i < coords.length; i++) {
			for(let x = 0; x < 2; x++) {
				if(x > 0 && rotate) continue;
				let box = document.getElementById(`${coords[i][0]}-${coords[i][1]-x}`);
				if(box) if(box.classList.contains('placed')) return false;
			};
		};
		return true;
	}
	rRight() {
		switch(this.rotation) {
			case 1:
				this.remove();
				//block movements
				var temp = [[],[],[],[]];
				for(let i = 0; i < this.coords.length;i++) {
					for(let x = 0; x < this.coords[i].length; x++) {
						temp[i][x] = this.coords[i][x];
					};
				};
				temp [0][0]+=2;
				temp [1][0]++;
				temp [1][1]--;
				temp [2][1]-=2;
				temp [3][1]--;
				temp [3][0]--;
				if(!this.checkLeft(temp, true)) {
					for(let x = 0; x < 2; x++) {
						for(let i = 0; i < 4; i++) temp[i][1]++;
						if(this.checkLeft(temp, true)) break;
					};
					if(!this.checkRight(temp, true)) {
						for(let i = 0; i < 4; i++) temp[i][0]--;
						if(this.checkLeft(temp, true) && this.checkRight(temp, true)) {
							this.rotation = 2;
							this.coords = temp;
						};
					}
					else {
						this.coords = temp;
						this.rotation = 2;
					};					
				}
				else {
					this.coords = temp;
					this.rotation = 2;
				};
				this.ghost();
				this.update();
			break;
			case 2:
				this.remove();
				//block movements
				var temp = [[],[],[],[]];
				for(let i = 0; i < this.coords.length;i++) {
					for(let x = 0; x < this.coords[i].length; x++) {
						temp[i][x] = this.coords[i][x];
					};
				};
				temp[0][1]-=2;
				temp[1][1]--;
				temp[1][0]--;
				temp[2][0]-=2;
				temp[3][0]--;
				temp[3][1]++;
				this.coords = temp;
				this.rotation = 3;
				this.ghost();		
				this.update();
			break;
			case 3:
				this.remove();
				//block movements
				var temp = [[],[],[],[]];
				for(let i = 0; i < this.coords.length;i++) {
					for(let x = 0; x < this.coords[i].length; x++) {
						temp[i][x] = this.coords[i][x];
					};
				};
				temp [0][0]-=2;
				temp [1][0]--;
				temp [1][1]++;
				temp [2][1]+=2;
				temp [3][0]++;
				temp [3][1]++;
				if(!this.checkRight(temp, true)) {
					for(let x = 0; x < 2; x++) {
						for(let i = 0; i < 4; i++) temp[i][1]--;
						if(this.checkRight(temp, true)) break;
					};
					if(!this.checkLeft(temp, true)) {
						for(let i = 0; i < 4; i++) temp[i][0]++;
						if(this.checkLeft(temp, true) && this.checkRight(temp, true)) {
							this.rotation = 4;
							this.coords = temp;
						};
					}
					else {
						this.coords = temp;
						this.rotation = 4;
					};					
				}
				else {
					this.coords = temp;
					this.rotation = 4;
				};
				//updating blocks
				this.ghost();
				this.update();
			break;
			case 4:
				this.remove();
				//block movements
				var temp = [[],[],[],[]];
				for(let i = 0; i < this.coords.length;i++) {
					for(let x = 0; x < this.coords[i].length; x++) {
						temp[i][x] = this.coords[i][x];
					};
				};
				temp [0][1]+=2;
				temp [1][0]++;
				temp [1][1]++;
				temp [2][0]+=2;
				temp [3][0]++;
				temp [3][1]--;
				//updating blocks
				if(!this.checkY(temp, true)) {
					for(let i = 0; i < 4; i++) temp[i][0]--;
					if(this.checkLeft(temp, true) && this.checkRight(temp, true)) {
						this.coords = temp;
						this.rotation = 1;
					};
				}
				else {
					this.coords = temp;
					this.rotation = 1;
				}
				this.ghost();
				this.update();
			break;
			
		};
	}
}

class I{
	constructor() {
		this.coords = [[0, 4], [1, 4], [2, 4], [3, 4]];
		this.gCoords = [[0, 4], [1, 4], [2, 4], [3, 4]];
		this.active = true;
		this.rotation = 1;
		this.colour = 'cyan';
		this.order = 5;
	}
	insta() {
		this.ghost();
		this.remove();
		for(let i = 0; i < this.coords.length; i++) {
			for(let x = 0; x < this.coords[i].length; x++) {
				this.coords[i][x] = this.gCoords[i][x];
				let sCoords = `${this.coords[i][0]}-${this.coords[i][1]}`;
				let box = document.getElementById(sCoords);
				box.classList.remove('off');
				box.classList.add('on');
				box.classList.add('placed');
			};
		};
		this.update();
	}
	ghost() {
		for(let i = 0; i < this.coords.length;i++) {
			for(let x = 0; x < this.coords[i].length; x++) {
				this.gCoords[i][x] = this.coords[i][x];
			};
		};
		let able = true;
		while(able) {
			for(let i = 0; i < this.gCoords.length; i++) {
				let box = document.getElementById(`${this.gCoords[i][0]+1}-${this.gCoords[i][1]}`);
				if(!box) able = false;
				if(box) if(box.classList.contains('placed')) able = false;
			};
			if(able) for(let i = 0; i < this.gCoords.length;i++) this.gCoords[i][0]++;
		};
	}
	down() {
		let y = this.coords.map(y => y[0]);
		if(y.includes(19) || !this.active || !this.checkY()) {
			this.active = false;
			for(let x = 0; x < 4; x++) {
				let sCoords = `${this.coords[x][0]}-${this.coords[x][1]}`;
				let box = document.getElementById(sCoords);
				box.classList.add('placed');
			};
			return false;
		};
		for(let x = 0; x < 4; x++) {
			this.remove();
			this.coords[x][0]++;
		};
		this.update();
		return true;
	}
	left() {
		let x = this.coords.map(x => x[1]);
		if(x.includes(0) || !this.active) return false;
		if(!this.checkLeft()) return false;
		for(let x = 0; x < 4; x++) {
			this.remove();
			this.coords[x][1]--;
			this.ghost();
		};
		this.update();
		return true;
	}
	right() {
		let x = this.coords.map(x => x[1]);
		if(x.includes(9) || !this.active) return false;
		if(!this.checkRight()) return false;
		for(let x = 0; x < 4; x++) {
			this.remove();
			this.coords[x][1]++;
			this.ghost();
		};
		this.update();
		return true;
	}
	update() {
		//Updating ghost block
		for(let x = 0; x < 4; x++) {
			let sCoords = `${this.gCoords[x][0]}-${this.gCoords[x][1]}`;
			let box = document.getElementById(sCoords);
			box.style.background = gColour;
		};
		for(let x = 0; x < 4; x++) {
			let sCoords = `${this.coords[x][0]}-${this.coords[x][1]}`;
			let box = document.getElementById(sCoords);
			box.style.background = this.colour;
			box.classList.add('on');
			box.classList.remove('off');
		};
	}
	remove() {
		for(let x = 0; x < 4; x++) {
			let sCoords = `${this.coords[x][0]}-${this.coords[x][1]}`;
			let box = document.getElementById(sCoords);
			box.style.background = boardColour;
			box.classList.add('off');
			box.classList.remove('on');
		};
		//Updating ghost block
		for(let x = 0; x < 4; x++) {
			let sCoords = `${this.gCoords[x][0]}-${this.gCoords[x][1]}`;
			let box = document.getElementById(sCoords);
			box.style.background = boardColour;
		};
	}
	checkY(coords, rotate) {
		if(!coords) coords = this.coords;
		let y = coords.map(y => y[0]);
		for(let i = 0; i < y.length; i++) if (y[i] >= 19) {
			if(!rotate) return false;
			if(y[i] > 19) return false;
		};
		for(let i = 0; i < coords.length; i++) {
			for(let x = 0; x < 2; x++) {
				if(x > 0 && rotate) continue;
				let box = document.getElementById(`${coords[i][0]+x}-${coords[i][1]}`);
				if(box) if(box.classList.contains('placed')) return false;
			};
		};
		return true;
	}
	checkRight(coords, rotate) {
		if(!coords) coords = this.coords;
		let x = coords.map(x => x[1]);
		for(let i = 0; i < x.length; i++) if (x[i] >= 9) {
			if(!rotate) return false;
			if(x[i] > 9) return false;
		};
		for(let i = 0; i < coords.length; i++) {
			for(let x = 0; x < 2; x++) {
				if(x > 0 && rotate) continue;
				let box = document.getElementById(`${coords[i][0]}-${coords[i][1]+x}`);
				if(box) if(box.classList.contains('placed')) return false;
			};
		};
		return true;
	}
	checkLeft(coords, rotate) {
		if(!coords) coords = this.coords;
		let x = coords.map(x => x[1]);
		for(let i = 0; i < x.length; i++) if (x[i] <= 0) {
			if(!rotate) return false;
			if(x[i] < 0) return false;
		};
		for(let i = 0; i < coords.length; i++) {
			for(let x = 0; x < 2; x++) {
				if(x > 0 && rotate) continue;
				let box = document.getElementById(`${coords[i][0]}-${coords[i][1]-x}`);
				if(box) if(box.classList.contains('placed')) return false;
			};
		};
		return true;
	}
	rRight() {
		switch(this.rotation) {
			case 1:
				this.remove();
				//block movements
				var temp = [[],[],[],[]];
				for(let i = 0; i < this.coords.length;i++) {
					for(let x = 0; x < this.coords[i].length; x++) {
						temp[i][x] = this.coords[i][x];
					};
				};
				temp [0][0]+=3;
				temp [0][1]++;
				temp [1][0]+=2;
				temp [2][0]++;
				temp [2][1]--;
				temp [3][1]-=2;
				if(!this.checkLeft(temp, true)) {
					for(let x = 0; x < 2; x++) {
						for(let i = 0; i < 4; i++) temp[i][1]++;
						if(this.checkLeft(temp, true)) break;
					};
					if(!this.checkRight(temp, true)) {
						for(let i = 0; i < 4; i++) temp[i][0]--;
						if(this.checkLeft(temp, true) && this.checkRight(temp, true)) {
							this.rotation = 2;
							this.coords = temp;
						};
					};				
				};
				if(!this.checkRight(temp, true)) {
					for(let x = 0; x < 2; x++) {
						for(let i = 0; i < 4; i++) temp[i][1]--;
						if(this.checkRight(temp, true)) break;
					};
					if(!this.checkLeft(temp, true)) {
						for(let i = 0; i < 4; i++) temp[i][0]++;
						if(this.checkLeft(temp, true) && this.checkRight(temp, true)) {
							this.rotation = 2;
							this.coords = temp;
						};
					}
					else {
						this.coords = temp;
						this.rotation = 2;
					};					
				}
				else {
					this.coords = temp;
					this.rotation = 2;
				};
				this.ghost();
				this.update();
			break;
			case 2:
				this.remove();
				//block movements
				var temp = [[],[],[],[]];
				for(let i = 0; i < this.coords.length;i++) {
					for(let x = 0; x < this.coords[i].length; x++) {
						temp[i][x] = this.coords[i][x];
					};
				};
				temp[0][1]-=2;
				temp[1][1]--;
				temp[1][0]--;
				temp[2][0]-=2;
				temp[3][0]-=3;
				temp[3][1]++;
				this.coords = temp;
				this.rotation++;
				this.ghost();		
				this.update();
			break;
			case 3:
				this.remove();
				//block movements
				var temp = [[],[],[],[]];
				for(let i = 0; i < this.coords.length;i++) {
					for(let x = 0; x < this.coords[i].length; x++) {
						temp[i][x] = this.coords[i][x];
					};
				};
				temp [0][1]--;
				temp [1][0]++;
				temp [2][0]+=2;
				temp [2][1]++;
				temp [3][0]+=3;
				temp [3][1]+=2;
				if(!this.checkLeft(temp, true)) {
					for(let x = 0; x < 2; x++) {
						for(let i = 0; i < 4; i++) temp[i][1]++;
						if(this.checkLeft(temp, true)) break;
					};
					if(!this.checkRight(temp, true)) {
						for(let i = 0; i < 4; i++) temp[i][0]--;
						if(this.checkLeft(temp, true) && this.checkRight(temp, true)) {
							this.rotation = 4;
							this.coords = temp;
						};
					};				
				};
				if(!this.checkRight(temp, true)) {
					for(let x = 0; x < 2; x++) {
						for(let i = 0; i < 4; i++) temp[i][1]--;
						if(this.checkRight(temp, true)) break;
					};
					if(!this.checkLeft(temp, true)) {
						for(let i = 0; i < 4; i++) temp[i][0]++;
						if(this.checkLeft(temp, true) && this.checkRight(temp, true)) {
							this.rotation = 4;
							this.coords = temp;
						};
					}
					else {
						this.coords = temp;
						this.rotation = 4;
					};					
				}
				else {
					this.coords = temp;
					this.rotation = 4;
				};
				//updating blocks
				this.ghost();
				this.update();
			break;
			case 4:
				this.remove();
				//block movements
				var temp = [[],[],[],[]];
				for(let i = 0; i < this.coords.length;i++) {
					for(let x = 0; x < this.coords[i].length; x++) {
						temp[i][x] = this.coords[i][x];
					};
				};
				temp [0][0]-=3;
				temp [0][1]+=2;
				temp [1][0]-=2;
				temp [1][1]++;
				temp [2][0]--;
				temp [3][1]--;
				if(!this.checkRight(temp, true)) {
					for(let x = 0; x < 2; x++) {
						for(let i = 0; i < 4; i++) temp[i][1]--;
						if(this.checkRight(temp, true)) break;
					};
					if(!this.checkLeft(temp, true)) {
						for(let i = 0; i < 4; i++) temp[i][0]++;
						if(this.checkLeft(temp, true) && this.checkRight(temp, true)) {
							this.rotation = 1;
							this.coords = temp;
						};
					};					
				};
				if(!this.checkLeft(temp, true)) {
					for(let x = 0; x < 2; x++) {
						for(let i = 0; i < 4; i++) temp[i][1]++;

						if(this.checkLeft(temp, true)) break;
					};
					if(!this.checkRight(temp, true)) {
						for(let i = 0; i < 4; i++) temp[i][0]--;
						if(this.checkLeft(temp, true) && this.checkRight(temp, true)) {
							this.rotation = 1;
							this.coords = temp;
						};
					}
					else {
						this.coords = temp;
						this.rotation = 1;
					};					
				}
				else {
					this.coords = temp;
					this.rotation = 1;
				};
				this.ghost();
				this.update();
			break;
			
		};
	}
}

class SQ{
	constructor() {
		this.coords = [[0, 4], [1, 4], [0, 5], [1, 5]];
		this.gCoords = [[0, 4], [1, 4], [0, 5], [1, 5]];
		this.active = true;
		this.rotation = 1;
		this.colour = 'yellow';
		this.order = 6;
	}
	insta() {
		this.ghost();
		this.remove();
		for(let i = 0; i < this.coords.length; i++) {
			for(let x = 0; x < this.coords[i].length; x++) {
				this.coords[i][x] = this.gCoords[i][x];
				let sCoords = `${this.coords[i][0]}-${this.coords[i][1]}`;
				let box = document.getElementById(sCoords);
				box.classList.remove('off');
				box.classList.add('on');
				box.classList.add('placed');
			};
		};
		this.update();
	}
	ghost() {
		for(let i = 0; i < this.coords.length;i++) {
			for(let x = 0; x < this.coords[i].length; x++) {
				this.gCoords[i][x] = this.coords[i][x];
			};
		};
		let able = true;
		while(able) {
			for(let i = 0; i < this.gCoords.length; i++) {
				let box = document.getElementById(`${this.gCoords[i][0]+1}-${this.gCoords[i][1]}`);
				if(!box) able = false;
				if(box) if(box.classList.contains('placed')) able = false;
			};
			if(able) for(let i = 0; i < this.gCoords.length;i++) this.gCoords[i][0]++;
		};
	}
	down() {
		let y = this.coords.map(y => y[0]);
		if(y.includes(19) || !this.active || !this.checkY()) {
			this.active = false;
			for(let x = 0; x < 4; x++) {
				let sCoords = `${this.coords[x][0]}-${this.coords[x][1]}`;
				let box = document.getElementById(sCoords);
				box.classList.add('placed');
			};
			return false;
		};
		for(let x = 0; x < 4; x++) {
			this.remove();
			this.coords[x][0]++;
		};
		this.update();
		return true;
	}
	left() {
		let x = this.coords.map(x => x[1]);
		if(x.includes(0) || !this.active) return false;
		if(!this.checkLeft()) return false;
		for(let x = 0; x < 4; x++) {
			this.remove();
			this.coords[x][1]--;
			this.ghost();
		};
		this.update();
		return true;
	}
	right() {
		let x = this.coords.map(x => x[1]);
		if(x.includes(9) || !this.active) return false;
		if(!this.checkRight()) return false;
		for(let x = 0; x < 4; x++) {
			this.remove();
			this.coords[x][1]++;
			this.ghost();
		};
		this.update();
		return true;
	}
	update() {
		//Updating ghost block
		for(let x = 0; x < 4; x++) {
			let sCoords = `${this.gCoords[x][0]}-${this.gCoords[x][1]}`;
			let box = document.getElementById(sCoords);
			box.style.background = gColour;
		};
		for(let x = 0; x < 4; x++) {
			let sCoords = `${this.coords[x][0]}-${this.coords[x][1]}`;
			let box = document.getElementById(sCoords);
			box.style.background = this.colour;
			box.classList.add('on');
			box.classList.remove('off');
		};
	}
	remove() {
		for(let x = 0; x < 4; x++) {
			let sCoords = `${this.coords[x][0]}-${this.coords[x][1]}`;
			let box = document.getElementById(sCoords);
			box.style.background = boardColour;
			box.classList.add('off');
			box.classList.remove('on');
		};
		//Updating ghost block
		for(let x = 0; x < 4; x++) {
			let sCoords = `${this.gCoords[x][0]}-${this.gCoords[x][1]}`;
			let box = document.getElementById(sCoords);
			box.style.background = boardColour;
		};

	}
	checkY(coords, rotate) {
		if(!coords) coords = this.coords;
		let y = coords.map(y => y[0]);
		for(let i = 0; i < y.length; i++) if (y[i] >= 19) {
			if(!rotate) return false;
			if(y[i] > 19) return false;
		};
		for(let i = 0; i < coords.length; i++) {
			for(let x = 0; x < 2; x++) {
				if(x > 0 && rotate) continue;
				let box = document.getElementById(`${coords[i][0]+x}-${coords[i][1]}`);
				if(box) if(box.classList.contains('placed')) return false;
			};
		};
		return true;
	}
	checkRight(coords, rotate) {
		if(!coords) coords = this.coords;
		let x = coords.map(x => x[1]);
		for(let i = 0; i < x.length; i++) if (x[i] >= 9) {
			if(!rotate) return false;
			if(x[i] > 9) return false;
		};
		for(let i = 0; i < coords.length; i++) {
			for(let x = 0; x < 2; x++) {
				if(x > 0 && rotate) continue;
				let box = document.getElementById(`${coords[i][0]}-${coords[i][1]+x}`);
				if(box) if(box.classList.contains('placed')) return false;
			};
		};
		return true;
	}
	checkLeft(coords, rotate) {
		if(!coords) coords = this.coords;
		let x = coords.map(x => x[1]);
		for(let i = 0; i < x.length; i++) if (x[i] <= 0) {
			if(!rotate) return false;
			if(x[i] < 0) return false;
		};
		for(let i = 0; i < coords.length; i++) {
			for(let x = 0; x < 2; x++) {
				if(x > 0 && rotate) continue;
				let box = document.getElementById(`${coords[i][0]}-${coords[i][1]-x}`);
				if(box) if(box.classList.contains('placed')) return false;
			};
		};
		return true;
	}
	rRight() {
		//Placeholder
	}
}

class T{
	constructor() {
		this.coords = [[0, 4], [1, 4], [1, 3], [1, 5]];
		this.gCoords = [[0, 4], [1, 4], [1, 3], [1, 5]];
		this.active = true;
		this.rotation = 1;
		this.colour = 'purple';
		this.order = 4;
	}
	insta() {
		this.ghost();
		this.remove();
		for(let i = 0; i < this.coords.length; i++) {
			for(let x = 0; x < this.coords[i].length; x++) {
				this.coords[i][x] = this.gCoords[i][x];
				let sCoords = `${this.coords[i][0]}-${this.coords[i][1]}`;
				let box = document.getElementById(sCoords);
				box.classList.remove('off');
				box.classList.add('on');
				box.classList.add('placed');
			};
		};
		this.update();
	}
	ghost() {
		for(let i = 0; i < this.coords.length;i++) {
			for(let x = 0; x < this.coords[i].length; x++) {
				this.gCoords[i][x] = this.coords[i][x];
			};
		};
		let able = true;
		while(able) {
			for(let i = 0; i < this.gCoords.length; i++) {
				let box = document.getElementById(`${this.gCoords[i][0]+1}-${this.gCoords[i][1]}`);
				if(!box) able = false;
				if(box) if(box.classList.contains('placed')) able = false;
			};
			if(able) for(let i = 0; i < this.gCoords.length;i++) this.gCoords[i][0]++;
		};
	}
	down() {
		let y = this.coords.map(y => y[0]);
		if(y.includes(19) || !this.active || !this.checkY()) {
			this.active = false;
			for(let x = 0; x < 4; x++) {
				let sCoords = `${this.coords[x][0]}-${this.coords[x][1]}`;
				let box = document.getElementById(sCoords);
				box.classList.add('placed');
			};
			return false;
		};
		for(let x = 0; x < 4; x++) {
			this.remove();
			this.coords[x][0]++;
		};
		this.update();
		return true;
	}
	left() {
		let x = this.coords.map(x => x[1]);
		if(x.includes(0) || !this.active) return false;
		if(!this.checkLeft()) return false;
		for(let x = 0; x < 4; x++) {
			this.remove();
			this.coords[x][1]--;
			this.ghost();
		};
		this.update();
		return true;
	}
	right() {
		let x = this.coords.map(x => x[1]);
		if(x.includes(9) || !this.active) return false;
		if(!this.checkRight()) return false;
		for(let x = 0; x < 4; x++) {
			this.remove();
			this.coords[x][1]++;
			this.ghost();
		};
		this.update();
		return true;
	}
	update() {
		//Updating ghost block
		for(let x = 0; x < 4; x++) {
			let sCoords = `${this.gCoords[x][0]}-${this.gCoords[x][1]}`;
			let box = document.getElementById(sCoords);
			box.style.background = gColour;
		};
		for(let x = 0; x < 4; x++) {
			let sCoords = `${this.coords[x][0]}-${this.coords[x][1]}`;
			let box = document.getElementById(sCoords);
			box.style.background = this.colour;
			box.classList.add('on');
			box.classList.remove('off');
		};
	}
	remove() {
		for(let x = 0; x < 4; x++) {
			let sCoords = `${this.coords[x][0]}-${this.coords[x][1]}`;
			let box = document.getElementById(sCoords);
			box.style.background = boardColour;
			box.classList.add('off');
			box.classList.remove('on');
		};
		//Updating ghost block
		for(let x = 0; x < 4; x++) {
			let sCoords = `${this.gCoords[x][0]}-${this.gCoords[x][1]}`;
			let box = document.getElementById(sCoords);
			box.style.background = boardColour;
		};

	}
	checkY(coords, rotate) {
		if(!coords) coords = this.coords;
		let y = coords.map(y => y[0]);
		for(let i = 0; i < y.length; i++) if (y[i] >= 19) {
			if(!rotate) return false;
			if(y[i] > 19) return false;
		};
		for(let i = 0; i < coords.length; i++) {
			for(let x = 0; x < 2; x++) {
				if(x > 0 && rotate) continue;
				let box = document.getElementById(`${coords[i][0]+x}-${coords[i][1]}`);
				if(box) if(box.classList.contains('placed')) return false;
			};
		};
		return true;
	}
	checkRight(coords, rotate) {
		if(!coords) coords = this.coords;
		let x = coords.map(x => x[1]);
		for(let i = 0; i < x.length; i++) if (x[i] >= 9) {
			if(!rotate) return false;
			if(x[i] > 9) return false;
		};
		for(let i = 0; i < coords.length; i++) {
			for(let x = 0; x < 2; x++) {
				if(x > 0 && rotate) continue;
				let box = document.getElementById(`${coords[i][0]}-${coords[i][1]+x}`);
				if(box) if(box.classList.contains('placed')) return false;
			};
		};
		return true;
	}
	checkLeft(coords, rotate) {
		if(!coords) coords = this.coords;
		let x = coords.map(x => x[1]);
		for(let i = 0; i < x.length; i++) if (x[i] <= 0) {
			if(!rotate) return false;
			if(x[i] < 0) return false;
		};
		for(let i = 0; i < coords.length; i++) {
			for(let x = 0; x < 2; x++) {
				if(x > 0 && rotate) continue;
				let box = document.getElementById(`${coords[i][0]}-${coords[i][1]-x}`);
				if(box) if(box.classList.contains('placed')) return false;
			};
		};
		return true;
	}
	rRight() {
		switch(this.rotation) {
			case 1:
				this.remove();
				//block movements
				var temp = [[],[],[],[]];
				for(let i = 0; i < this.coords.length;i++) {
					for(let x = 0; x < this.coords[i].length; x++) {
						temp[i][x] = this.coords[i][x];
					};
				};
				temp [0][0]++;
				temp [0][1]++;
				temp [2][0]--;
				temp [2][1]++;
				temp [3][1]--;
				temp [3][0]++;
				if(!this.checkY(temp, true)) {
					for(let x = 0; x < 2; x++) {
						for(let i = 0; i < 4; i++) temp[i][0]--;
						if(this.checkY(temp, true)) break;
					};
					if(this.checkLeft(temp, true) && this.checkRight(temp, true)) {
						this.rotation = 2;
						this.coords = temp;
					};				
				}
				else {
					this.rotation = 2;
					this.coords = temp;
				};
				this.ghost();
				this.update();
			break;
			case 2:
				this.remove();
				//block movements
				var temp = [[],[],[],[]];
				for(let i = 0; i < this.coords.length;i++) {
					for(let x = 0; x < this.coords[i].length; x++) {
						temp[i][x] = this.coords[i][x];
					};
				};
				temp [0][0]++;
				temp [0][1]--;
				temp [2][0]++;
				temp [2][1]++;
				temp [3][1]--;
				temp [3][0]--;
				if(!this.checkLeft(temp, true)) {
					for(let x = 0; x < 2; x++) {
						for(let i = 0; i < 4; i++) temp[i][1]++;
						if(this.checkLeft(temp, true)) break;
					};
					if(!this.checkRight(temp, true)) {
						for(let i = 0; i < 4; i++) temp[i][0]--;
						if(this.checkLeft(temp, true) && this.checkRight(temp, true)) {
							this.rotation = 3;
							this.coords = temp;
						};
					}
					else {
						this.coords = temp;
						this.rotation = 3;
					};				
				}
				else {
					this.coords = temp;
					this.rotation = 3;	
				};
				this.ghost();
				this.update();
			break;
			case 3:
				this.remove();
				//block movements
				var temp = [[],[],[],[]];
				for(let i = 0; i < this.coords.length;i++) {
					for(let x = 0; x < this.coords[i].length; x++) {
						temp[i][x] = this.coords[i][x];
					};
				};
				temp [0][0]--;
				temp [0][1]--;
				temp [2][0]++;
				temp [2][1]--;
				temp [3][1]++;
				temp [3][0]--;
				if(!this.checkLeft(temp, true)) {
					for(let x = 0; x < 2; x++) {
						for(let i = 0; i < 4; i++) temp[i][1]++;
						if(this.checkLeft(temp, true)) break;
					};
					if(!this.checkRight(temp, true)) {
						for(let i = 0; i < 4; i++) temp[i][0]--;
						if(this.checkLeft(temp, true) && this.checkRight(temp, true)) {
							this.rotation = 4;
							this.coords = temp;
						};
					};				
				};
				if(!this.checkRight(temp, true)) {
					for(let x = 0; x < 2; x++) {
						for(let i = 0; i < 4; i++) temp[i][1]--;
						if(this.checkRight(temp, true)) break;
					};
					if(!this.checkLeft(temp, true)) {
						for(let i = 0; i < 4; i++) temp[i][0]++;
						if(this.checkLeft(temp, true) && this.checkRight(temp, true)) {
							this.rotation = 4;
							this.coords = temp;
						};
					}
					else {
						this.coords = temp;
						this.rotation = 4;
					};					
				}
				else {
					this.coords = temp;
					this.rotation = 4;
				};
				//updating blocks
				this.ghost();
				this.update();
			break;
			case 4:
				this.remove();
				//block movements
				var temp = [[],[],[],[]];
				for(let i = 0; i < this.coords.length;i++) {
					for(let x = 0; x < this.coords[i].length; x++) {
						temp[i][x] = this.coords[i][x];
					};
				};
				temp [0][0]--;
				temp [0][1]++;
				temp [2][0]--;
				temp [2][1]--;
				temp [3][1]++;
				temp [3][0]++;
				if(!this.checkRight(temp, true)) {
					for(let x = 0; x < 2; x++) {
						for(let i = 0; i < 4; i++) temp[i][1]--;
						if(this.checkRight(temp, true)) break;
					};
					if(!this.checkLeft(temp, true)) {
						for(let i = 0; i < 4; i++) temp[i][0]++;
						if(this.checkLeft(temp, true) && this.checkRight(temp, true)) {
							this.rotation = 1;
							this.coords = temp;
						};
					};					
				};
				if(!this.checkLeft(temp, true)) {
					for(let x = 0; x < 2; x++) {
						for(let i = 0; i < 4; i++) temp[i][1]++;

						if(this.checkLeft(temp, true)) break;
					};
					if(!this.checkRight(temp, true)) {
						for(let i = 0; i < 4; i++) temp[i][0]--;
						if(this.checkLeft(temp, true) && this.checkRight(temp, true)) {
							this.rotation = 1;
							this.coords = temp;
						};
					}
					else {
						this.coords = temp;
						this.rotation = 1;
					};					
				}
				else {
					this.coords = temp;
					this.rotation = 1;
				};
				this.ghost();
				this.update();
			break;
			
		};
	}
}

class S{
	constructor() {
		this.coords = [[0, 5], [0, 4], [1, 4], [1, 3]];
		this.gCoords = [[0, 5], [0, 4], [1, 4], [1, 3]];
		this.active = true;
		this.rotation = 1;
		this.colour = 'lime';
		this.order = 2;
	}
	insta() {
		this.ghost();
		this.remove();
		for(let i = 0; i < this.coords.length; i++) {
			for(let x = 0; x < this.coords[i].length; x++) {
				this.coords[i][x] = this.gCoords[i][x];
				let sCoords = `${this.coords[i][0]}-${this.coords[i][1]}`;
				let box = document.getElementById(sCoords);
				box.classList.remove('off');
				box.classList.add('on');
				box.classList.add('placed');
			};
		};
		this.update();
	}
	ghost() {
		for(let i = 0; i < this.coords.length;i++) {
			for(let x = 0; x < this.coords[i].length; x++) {
				this.gCoords[i][x] = this.coords[i][x];
			};
		};
		let able = true;
		while(able) {
			for(let i = 0; i < this.gCoords.length; i++) {
				let box = document.getElementById(`${this.gCoords[i][0]+1}-${this.gCoords[i][1]}`);
				if(!box) able = false;
				if(box) if(box.classList.contains('placed')) able = false;
			};
			if(able) for(let i = 0; i < this.gCoords.length;i++) this.gCoords[i][0]++;
		};
	}
	down() {
		let y = this.coords.map(y => y[0]);
		if(y.includes(19) || !this.active || !this.checkY()) {
			this.active = false;
			for(let x = 0; x < 4; x++) {
				let sCoords = `${this.coords[x][0]}-${this.coords[x][1]}`;
				let box = document.getElementById(sCoords);
				box.classList.add('placed');
			};
			return false;
		};
		for(let x = 0; x < 4; x++) {
			this.remove();
			this.coords[x][0]++;
		};
		this.update();
		return true;
	}
	left() {
		let x = this.coords.map(x => x[1]);
		if(x.includes(0) || !this.active) return false;
		if(!this.checkLeft()) return false;
		for(let x = 0; x < 4; x++) {
			this.remove();
			this.coords[x][1]--;
			this.ghost();
		};
		this.update();
		return true;
	}
	right() {
		let x = this.coords.map(x => x[1]);
		if(x.includes(9) || !this.active) return false;
		if(!this.checkRight()) return false;
		for(let x = 0; x < 4; x++) {
			this.remove();
			this.coords[x][1]++;
			this.ghost();
		};
		this.update();
		return true;
	}
	update() {
		//Updating ghost block
		for(let x = 0; x < 4; x++) {
			let sCoords = `${this.gCoords[x][0]}-${this.gCoords[x][1]}`;
			let box = document.getElementById(sCoords);
			box.style.background = gColour;
		};
		for(let x = 0; x < 4; x++) {
			let sCoords = `${this.coords[x][0]}-${this.coords[x][1]}`;
			let box = document.getElementById(sCoords);
			box.style.background = this.colour;
			box.classList.add('on');
			box.classList.remove('off');
		};
	}
	remove() {
		for(let x = 0; x < 4; x++) {
			let sCoords = `${this.coords[x][0]}-${this.coords[x][1]}`;
			let box = document.getElementById(sCoords);
			box.style.background = boardColour;
			box.classList.add('off');
			box.classList.remove('on');
		};
		//Updating ghost block
		for(let x = 0; x < 4; x++) {
			let sCoords = `${this.gCoords[x][0]}-${this.gCoords[x][1]}`;
			let box = document.getElementById(sCoords);
			box.style.background = boardColour;
		};

	}
	checkY(coords, rotate) {
		if(!coords) coords = this.coords;
		let y = coords.map(y => y[0]);
		for(let i = 0; i < y.length; i++) if (y[i] >= 19) {
			if(!rotate) return false;
			if(y[i] > 19) return false;
		};
		for(let i = 0; i < coords.length; i++) {
			for(let x = 0; x < 2; x++) {
				if(x > 0 && rotate) continue;
				let box = document.getElementById(`${coords[i][0]+x}-${coords[i][1]}`);
				if(box) if(box.classList.contains('placed')) return false;
			};
		};
		return true;
	}
	checkRight(coords, rotate) {
		if(!coords) coords = this.coords;
		let x = coords.map(x => x[1]);
		for(let i = 0; i < x.length; i++) if (x[i] >= 9) {
			if(!rotate) return false;
			if(x[i] > 9) return false;
		};
		for(let i = 0; i < coords.length; i++) {
			for(let x = 0; x < 2; x++) {
				if(x > 0 && rotate) continue;
				let box = document.getElementById(`${coords[i][0]}-${coords[i][1]+x}`);
				if(box) if(box.classList.contains('placed')) return false;
			};
		};
		return true;
	}
	checkLeft(coords, rotate) {
		if(!coords) coords = this.coords;
		let x = coords.map(x => x[1]);
		for(let i = 0; i < x.length; i++) if (x[i] <= 0) {
			if(!rotate) return false;
			if(x[i] < 0) return false;
		};
		for(let i = 0; i < coords.length; i++) {
			for(let x = 0; x < 2; x++) {
				if(x > 0 && rotate) continue;
				let box = document.getElementById(`${coords[i][0]}-${coords[i][1]-x}`);
				if(box) if(box.classList.contains('placed')) return false;
			};
		};
		return true;
	}
	rRight() {
		switch(this.rotation) {
			case 1:
				this.remove();
				//block movements
				var temp = [[],[],[],[]];
				for(let i = 0; i < this.coords.length;i++) {
					for(let x = 0; x < this.coords[i].length; x++) {
						temp[i][x] = this.coords[i][x];
					};
				};
				temp [0][0]+=2;
				temp [1][1]++;
				temp [1][0]++;
				temp [3][0]--;
				temp [3][1]++;
				if(!this.checkY(temp, true)) {
					for(let x = 0; x < 2; x++) {
						for(let i = 0; i < 4; i++) temp[i][0]--;
						if(this.checkY(temp, true)) break;
					};
					if(this.checkLeft(temp, true) && this.checkRight(temp, true)) {
						this.rotation = 2;
						this.coords = temp;
					};				
				}
				else {
					this.rotation = 2;
					this.coords = temp;
				};
				this.ghost();
				this.update();
			break;
			case 2:
				this.remove();
				//block movements
				var temp = [[],[],[],[]];
				for(let i = 0; i < this.coords.length;i++) {
					for(let x = 0; x < this.coords[i].length; x++) {
						temp[i][x] = this.coords[i][x];
					};
				};
				temp [0][1]-=2;
				temp [1][1]--;
				temp [1][0]++;
				temp [3][1]++;
				temp [3][0]++;
				if(!this.checkLeft(temp, true)) {
					for(let x = 0; x < 2; x++) {
						for(let i = 0; i < 4; i++) temp[i][1]++;
						if(this.checkLeft(temp, true)) break;
					};
					if(!this.checkRight(temp, true)) {
						for(let i = 0; i < 4; i++) temp[i][0]--;
						if(this.checkLeft(temp, true) && this.checkRight(temp, true)) {
							this.rotation = 3;
							this.coords = temp;
						};
					}
					else {
						this.coords = temp;
						this.rotation = 3;
					};				
				}
				else {
					this.coords = temp;
					this.rotation = 3;
				};
				this.ghost();
				this.update();
			break;
			case 3:
				this.remove();
				//block movements
				var temp = [[],[],[],[]];
				for(let i = 0; i < this.coords.length;i++) {
					for(let x = 0; x < this.coords[i].length; x++) {
						temp[i][x] = this.coords[i][x];
					};
				};
				temp [0][0]-=2;
				temp [1][1]--;
				temp [1][0]--;
				temp [3][1]--;
				temp [3][0]++;
				if(!this.checkLeft(temp, true)) {
					for(let x = 0; x < 2; x++) {
						for(let i = 0; i < 4; i++) temp[i][1]++;
						if(this.checkLeft(temp, true)) break;
					};
					if(!this.checkRight(temp, true)) {
						for(let i = 0; i < 4; i++) temp[i][0]--;
						if(this.checkLeft(temp, true) && this.checkRight(temp, true)) {
							this.rotation = 4;
							this.coords = temp;
						};
					};				
				};
				if(!this.checkRight(temp, true)) {
					for(let x = 0; x < 2; x++) {
						for(let i = 0; i < 4; i++) temp[i][1]--;
						if(this.checkRight(temp, true)) break;
					};
					if(!this.checkLeft(temp, true)) {
						for(let i = 0; i < 4; i++) temp[i][0]++;
						if(this.checkLeft(temp, true) && this.checkRight(temp, true)) {
							this.rotation = 4;
							this.coords = temp;
						};
					}
					else {
						this.coords = temp;
						this.rotation = 4;
					};					
				}
				else {
					this.coords = temp;
					this.rotation = 4;
				};
				//updating blocks
				this.ghost();
				this.update();
			break;
			case 4:
				this.remove();
				//block movements
				var temp = [[],[],[],[]];
				for(let i = 0; i < this.coords.length;i++) {
					for(let x = 0; x < this.coords[i].length; x++) {
						temp[i][x] = this.coords[i][x];
					};
				};
				temp [0][1]+=2;
				temp [1][1]++;
				temp [1][0]--;
				temp [3][1]--;
				temp [3][0]--;
				if(!this.checkRight(temp, true)) {
					for(let x = 0; x < 2; x++) {
						for(let i = 0; i < 4; i++) temp[i][1]--;
						if(this.checkRight(temp, true)) break;
					};
					if(!this.checkLeft(temp, true)) {
						for(let i = 0; i < 4; i++) temp[i][0]++;
						if(this.checkLeft(temp, true) && this.checkRight(temp, true)) {
							this.rotation = 1;
							this.coords = temp;
						};
					};					
				};
				if(!this.checkLeft(temp, true)) {
					for(let x = 0; x < 2; x++) {
						for(let i = 0; i < 4; i++) temp[i][1]++;

						if(this.checkLeft(temp, true)) break;
					};
					if(!this.checkRight(temp, true)) {
						for(let i = 0; i < 4; i++) temp[i][0]--;
						if(this.checkLeft(temp, true) && this.checkRight(temp, true)) {
							this.rotation = 1;
							this.coords = temp;
						};
					}
					else {
						this.coords = temp;
						this.rotation = 1;
					};					
				}
				else {
					this.coords = temp;
					this.rotation = 1;
				};
				this.ghost();
				this.update();
			break;
			
		};
	}
}

class S1{
	constructor() {
		this.coords = [[0, 3], [0, 4], [1, 4], [1, 5]];
		this.gCoords = [[0, 3], [0, 4], [1, 4], [1, 5]];
		this.active = true;
		this.rotation = 1;
		this.colour = 'red';
		this.order = 3;
	}
	insta() {
		this.ghost();
		this.remove();
		for(let i = 0; i < this.coords.length; i++) {
			for(let x = 0; x < this.coords[i].length; x++) {
				this.coords[i][x] = this.gCoords[i][x];
				let sCoords = `${this.coords[i][0]}-${this.coords[i][1]}`;
				let box = document.getElementById(sCoords);
				box.classList.remove('off');
				box.classList.add('on');
				box.classList.add('placed');
			};
		};
		this.update();
	}
	ghost() {
		for(let i = 0; i < this.coords.length;i++) {
			for(let x = 0; x < this.coords[i].length; x++) {
				this.gCoords[i][x] = this.coords[i][x];
			};
		};
		let able = true;
		while(able) {
			for(let i = 0; i < this.gCoords.length; i++) {
				let box = document.getElementById(`${this.gCoords[i][0]+1}-${this.gCoords[i][1]}`);
				if(!box) able = false;
				if(box) if(box.classList.contains('placed')) able = false;
			};
			if(able) for(let i = 0; i < this.gCoords.length;i++) this.gCoords[i][0]++;
		};
	}
	down() {
		let y = this.coords.map(y => y[0]);
		if(y.includes(19) || !this.active || !this.checkY()) {
			this.active = false;
			for(let x = 0; x < 4; x++) {
				let sCoords = `${this.coords[x][0]}-${this.coords[x][1]}`;
				let box = document.getElementById(sCoords);
				box.classList.add('placed');
			};
			return false;
		};
		for(let x = 0; x < 4; x++) {
			this.remove();
			this.coords[x][0]++;
		};
		this.update();
		return true;
	}
	left() {
		let x = this.coords.map(x => x[1]);
		if(x.includes(0) || !this.active) return false;
		if(!this.checkLeft()) return false;
		for(let x = 0; x < 4; x++) {
			this.remove();
			this.coords[x][1]--;
			this.ghost();
		};
		this.update();
		return true;
	}
	right() {
		let x = this.coords.map(x => x[1]);
		if(x.includes(9) || !this.active) return false;
		if(!this.checkRight()) return false;
		for(let x = 0; x < 4; x++) {
			this.remove();
			this.coords[x][1]++;
			this.ghost();
		};
		this.update();
		return true;
	}
	update() {
		//Updating ghost block
		for(let x = 0; x < 4; x++) {
			let sCoords = `${this.gCoords[x][0]}-${this.gCoords[x][1]}`;
			let box = document.getElementById(sCoords);
			box.style.background = gColour;
		};
		for(let x = 0; x < 4; x++) {
			let sCoords = `${this.coords[x][0]}-${this.coords[x][1]}`;
			let box = document.getElementById(sCoords);
			box.style.background = this.colour;
			box.classList.add('on');
			box.classList.remove('off');
		};
	}
	remove() {
		for(let x = 0; x < 4; x++) {
			let sCoords = `${this.coords[x][0]}-${this.coords[x][1]}`;
			let box = document.getElementById(sCoords);
			box.style.background = boardColour;
			box.classList.add('off');
			box.classList.remove('on');
			box.classList.remove('placed');
		};
		//Updating ghost block
		for(let x = 0; x < 4; x++) {
			let sCoords = `${this.gCoords[x][0]}-${this.gCoords[x][1]}`;
			let box = document.getElementById(sCoords);
			box.style.background = boardColour;
		};
	}
	checkY(coords, rotate) {
		if(!coords) coords = this.coords;
		let y = coords.map(y => y[0]);
		for(let i = 0; i < y.length; i++) if (y[i] >= 19) {
			if(!rotate) return false;
			if(y[i] > 19) return false;
		};
		for(let i = 0; i < coords.length; i++) {
			for(let x = 0; x < 2; x++) {
				if(x > 0 && rotate) continue;
				let box = document.getElementById(`${coords[i][0]+x}-${coords[i][1]}`);
				if(box) if(box.classList.contains('placed')) return false;
			};
		};
		return true;
	}
	checkRight(coords, rotate) {
		if(!coords) coords = this.coords;
		let x = coords.map(x => x[1]);
		for(let i = 0; i < x.length; i++) if (x[i] >= 9) {
			if(!rotate) return false;
			if(x[i] > 9) return false;
		};
		for(let i = 0; i < coords.length; i++) {
			for(let x = 0; x < 2; x++) {
				if(x > 0 && rotate) continue;
				let box = document.getElementById(`${coords[i][0]}-${coords[i][1]+x}`);
				if(box) if(box.classList.contains('placed')) return false;
			};
		};
		return true;
	}
	checkLeft(coords, rotate) {
		if(!coords) coords = this.coords;
		let x = coords.map(x => x[1]);
		for(let i = 0; i < x.length; i++) if (x[i] <= 0) {
			if(!rotate) return false;
			if(x[i] < 0) return false;
		};
		for(let i = 0; i < coords.length; i++) {
			for(let x = 0; x < 2; x++) {
				if(x > 0 && rotate) continue;
				let box = document.getElementById(`${coords[i][0]}-${coords[i][1]-x}`);
				if(box) if(box.classList.contains('placed')) return false;
			};
		};
		return true;
	}
	rRight() {
		switch(this.rotation) {
			case 1:
				this.remove();
				//block movements
				var temp = [[],[],[],[]];
				for(let i = 0; i < this.coords.length;i++) {
					for(let x = 0; x < this.coords[i].length; x++) {
						temp[i][x] = this.coords[i][x];
					};
				};
				temp [0][1]+=2;
				temp [1][1]++;
				temp [1][0]++;
				temp [3][0]++;
				temp [3][1]--;
				if(!this.checkY(temp, true)) {
					for(let x = 0; x < 2; x++) {
						for(let i = 0; i < 4; i++) temp[i][0]--;
						if(this.checkY(temp, true)) break;
					};
					if(this.checkLeft(temp, true) && this.checkRight(temp, true)) {
						this.rotation = 2;
						this.coords = temp;
					};				
				}
				else {
					this.rotation = 2;
					this.coords = temp;
				};
				this.ghost();
				this.update();
			break;
			case 2:
				this.remove();
				//block movements
				var temp = [[],[],[],[]];
				for(let i = 0; i < this.coords.length;i++) {
					for(let x = 0; x < this.coords[i].length; x++) {
						temp[i][x] = this.coords[i][x];
					};
				};
				temp [0][0]+=2;
				temp [1][1]--;
				temp [1][0]++;
				temp [3][1]--;
				temp [3][0]--;
				if(!this.checkLeft(temp, true)) {
					for(let x = 0; x < 2; x++) {
						for(let i = 0; i < 4; i++) temp[i][1]++;
						if(this.checkLeft(temp, true)) break;
					};
					if(!this.checkRight(temp, true)) {
						for(let i = 0; i < 4; i++) temp[i][0]--;
						if(this.checkLeft(temp, true) && this.checkRight(temp, true)) {
							this.rotation = 3;
							this.coords = temp;
						};
					};				
				};
				if(!this.checkRight(temp, true)) {
					for(let x = 0; x < 2; x++) {
						for(let i = 0; i < 4; i++) temp[i][1]--;
						if(this.checkRight(temp, true)) break;
					};
					if(!this.checkLeft(temp, true)) {
						for(let i = 0; i < 4; i++) temp[i][0]--;
						if(this.checkLeft(temp, true) && this.checkRight(temp, true)) {
							this.rotation = 3;
							this.coords = temp;
						};
					}
					else {
						this.coords = temp;
						this.rotation = 3;
					};				
				}
				else {
					this.coords = temp;
					this.rotation = 3;
				};
				this.ghost();
				this.update();
			break;
			case 3:
				this.remove();
				//block movements
				var temp = [[],[],[],[]];
				for(let i = 0; i < this.coords.length;i++) {
					for(let x = 0; x < this.coords[i].length; x++) {
						temp[i][x] = this.coords[i][x];
					};
				};
				temp [0][1]-=2;
				temp [1][1]--;
				temp [1][0]--;
				temp [3][1]++;
				temp [3][0]--;
				if(!this.checkLeft(temp, true)) {
					for(let x = 0; x < 2; x++) {
						for(let i = 0; i < 4; i++) temp[i][1]++;
						if(this.checkLeft(temp, true)) break;
					};
					if(!this.checkRight(temp, true)) {
						for(let i = 0; i < 4; i++) temp[i][0]--;
						if(this.checkLeft(temp, true) && this.checkRight(temp, true)) {
							this.rotation = 4;
							this.coords = temp;
						};
					};				
				};
				if(!this.checkRight(temp, true)) {
					for(let x = 0; x < 2; x++) {
						for(let i = 0; i < 4; i++) temp[i][1]--;
						if(this.checkRight(temp, true)) break;
					};
					if(!this.checkLeft(temp, true)) {
						for(let i = 0; i < 4; i++) temp[i][0]++;
						if(this.checkLeft(temp, true) && this.checkRight(temp, true)) {
							this.rotation = 4;
							this.coords = temp;
						};
					}
					else {
						this.coords = temp;
						this.rotation = 4;
					};					
				}
				else {
					this.coords = temp;
					this.rotation = 4;
				};
				this.ghost();
				//updating blocks
				this.update();
			break;
			case 4:
				this.remove();
				//block movements
				var temp = [[],[],[],[]];
				for(let i = 0; i < this.coords.length;i++) {
					for(let x = 0; x < this.coords[i].length; x++) {
						temp[i][x] = this.coords[i][x];
					};
				};
				temp [0][0]-=2;
				temp [1][1]++;
				temp [1][0]--;
				temp [3][1]++;
				temp [3][0]++;
				if(!this.checkRight(temp, true)) {
					for(let x = 0; x < 2; x++) {
						for(let i = 0; i < 4; i++) temp[i][1]--;
						if(this.checkRight(temp, true)) break;
					};
					if(!this.checkLeft(temp, true)) {
						for(let i = 0; i < 4; i++) temp[i][0]++;
						if(this.checkLeft(temp, true) && this.checkRight(temp, true)) {
							this.rotation = 1;
							this.coords = temp;
						};
					};					
				};
				if(!this.checkLeft(temp, true)) {
					for(let x = 0; x < 2; x++) {
						for(let i = 0; i < 4; i++) temp[i][1]++;

						if(this.checkLeft(temp, true)) break;
					};
					if(!this.checkRight(temp, true)) {
						for(let i = 0; i < 4; i++) temp[i][0]--;
						if(this.checkLeft(temp, true) && this.checkRight(temp, true)) {
							this.rotation = 1;
							this.coords = temp;
						};
					}
					else {
						this.coords = temp;
						this.rotation = 1;
					};					
				}
				else {
					this.coords = temp;
					this.rotation = 1;
				};
				this.ghost();
				this.update();
			break;
		};
	}
}