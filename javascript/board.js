class Board {
	constructor(width, height) {
		this.width =+ width * 0.26;
		this.height =+ height * 0.95;
		this.winWidth = width;
		this.winHeight = height;
		this.board = null;
	}
	create() {
		let body = document.getElementById('body');
		//Making the main table.
		this.board = document.createElement('table');
		this.board.style.width = `${this.width}px`;
		this.board.style.height = `${this.height}px`;
		this.board.style.position = 'fixed';
		this.board.display = 'inline-block';
		this.board.style.left = '35%';
		this.board.style.top = '2%';
		this.board.style.overflow = 'hidden';
		this.board.id = 'board';
		//Table rows.
		for(let i = 0; i < 20; i++) {
			let row = document.createElement('tr');
			row.style.border = '1px solid white';
			for(let x= 0; x < 10; x++) {
				let box = document.createElement('td');
				box.id = `${i}-${x}`;
				box.style.background = '#E1E1E1';
				//Custom styles.
				box.style.border = '1px solid white';
				box.classList.add('off');
				row.appendChild(box);
			this.board.appendChild(row);
			};
		};
		//Appending the table to the body.
		body.appendChild(this.board);
	}
	resize(width, height) {
		if(!this.board) return;
		this.width =+ width * 0.26;
		this.height =+ height * 0.95;
		this.winWidth = width;
		this.winHeight = height;
		this.board = document.getElementById('board');
		this.board.style.width = `${this.width}px`;
		this.board.style.height = `${this.height}px`;
	}
}

class L{
	constructor() {
		this.coords = [[0, 4], [1, 4], [2, 4], [2, 5]];
		this.active = true;
		this.rotation = 1;
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
		};
		this.update();
		return true;
	}
	update() {
		for(let x = 0; x < 4; x++) {
			let sCoords = `${this.coords[x][0]}-${this.coords[x][1]}`;
			let box = document.getElementById(sCoords);
			box.style.background = 'orange';
			box.classList.add('on');
			box.classList.remove('off');
		};
	}
	remove() {
		for(let x = 0; x < 4; x++) {
			let sCoords = `${this.coords[x][0]}-${this.coords[x][1]}`;
			let box = document.getElementById(sCoords);
			box.style.background = '#E1E1E1';
			box.classList.add('off');
			box.classList.remove('on');
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
					for(let i = 0; i < 4; i++) temp[i][1]--;
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
				console.log('Yeet');
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
				this.update();
				this.rotation = 1;
			break;
			
		};
	}
}

class L1{
	constructor() {
		this.coords = [[0, 4], [1, 4], [2, 4], [2, 3]];
		this.active = true;
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
		};
		this.update();
		return true;
	}
	update() {
		for(let x = 0; x < 4; x++) {
			let sCoords = `${this.coords[x][0]}-${this.coords[x][1]}`;
			let box = document.getElementById(sCoords);
			box.style.background = 'blue';
			box.classList.add('on');
			box.classList.remove('off');
		};
	}
	remove() {
		for(let x = 0; x < 4; x++) {
			let sCoords = `${this.coords[x][0]}-${this.coords[x][1]}`;
			let box = document.getElementById(sCoords);
			box.style.background = '#E1E1E1';
			box.classList.add('off');
			box.classList.remove('on');
		};
	}
	checkY() {
		let y = this.coords.map(y => y[0]+1);
		for(let i = 0; i < y.length; i++) if (y[i] > 19) return false;
		for(let i = 0; i < this.coords.length; i++) {
			let box = document.getElementById(`${this.coords[i][0]+1}-${this.coords[i][1]}`);
			if(box.classList.contains('placed')) return false;
		};
		return true;
	}
	checkRight() {
		let x = this.coords.map(x => x[1]);
		for(let i = 0; i < x.length; i++) if (x[i] >= 9) return false;
		for(let i = 0; i < this.coords.length; i++) {
			let box = document.getElementById(`${this.coords[i][0]}-${this.coords[i][1]+1}`);
			if(box.classList.contains('placed')) return false;
		};
		return true;
	}
	checkLeft() {
		let x = this.coords.map(x => x[1]);
		for(let i = 0; i < x.length; i++) if (x[i] <= 0) return false;
		for(let i = 0; i < this.coords.length; i++) {
			let box = document.getElementById(`${this.coords[i][0]}-${this.coords[i][1]-1}`);
			if(box.classList.contains('placed')) return false;
		};
		return true;
	}
}

class I{
	constructor() {
		this.coords = [[0, 4], [1, 4], [2, 4], [3, 4]];
		this.active = true;
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
		};
		this.update();
		return true;
	}
	update() {
		for(let x = 0; x < 4; x++) {
			let sCoords = `${this.coords[x][0]}-${this.coords[x][1]}`;
			let box = document.getElementById(sCoords);
			box.style.background = 'cyan';
			box.classList.add('on');
			box.classList.remove('off');
		};
	}
	remove() {
		for(let x = 0; x < 4; x++) {
			let sCoords = `${this.coords[x][0]}-${this.coords[x][1]}`;
			let box = document.getElementById(sCoords);
			box.style.background = '#E1E1E1';
			box.classList.add('off');
			box.classList.remove('on');
		};
	}
	checkY() {
		let y = this.coords.map(y => y[0]+1);
		for(let i = 0; i < y.length; i++) if (y[i] > 19) return false;
		for(let i = 0; i < this.coords.length; i++) {
			let box = document.getElementById(`${this.coords[i][0]+1}-${this.coords[i][1]}`);
			if(box.classList.contains('placed')) return false;
		};
		return true;
	}
	checkRight() {
		let x = this.coords.map(x => x[1]);
		for(let i = 0; i < x.length; i++) if (x[i] >= 9) return false;
		for(let i = 0; i < this.coords.length; i++) {
			let box = document.getElementById(`${this.coords[i][0]}-${this.coords[i][1]+1}`);
			if(box.classList.contains('placed')) return false;
		};
		return true;
	}
	checkLeft() {
		let x = this.coords.map(x => x[1]);
		for(let i = 0; i < x.length; i++) if (x[i] <= 0) return false;
		for(let i = 0; i < this.coords.length; i++) {
			let box = document.getElementById(`${this.coords[i][0]}-${this.coords[i][1]-1}`);
			if(box.classList.contains('placed')) return false;
		};
		return true;
	}
}

class SQ{
	constructor() {
		this.coords = [[0, 4], [1, 4], [0, 5], [1, 5]];
		this.active = true;
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
		};
		this.update();
		return true;
	}
	update() {
		for(let x = 0; x < 4; x++) {
			let sCoords = `${this.coords[x][0]}-${this.coords[x][1]}`;
			let box = document.getElementById(sCoords);
			box.style.background = 'yellow';
			box.classList.add('on');
			box.classList.remove('off');
		};
	}
	remove() {
		for(let x = 0; x < 4; x++) {
			let sCoords = `${this.coords[x][0]}-${this.coords[x][1]}`;
			let box = document.getElementById(sCoords);
			box.style.background = '#E1E1E1';
			box.classList.add('off');
			box.classList.remove('on');
		};
	}
	checkY() {
		let y = this.coords.map(y => y[0]+1);
		for(let i = 0; i < y.length; i++) if (y[i] > 19) return false;
		for(let i = 0; i < this.coords.length; i++) {
			let box = document.getElementById(`${this.coords[i][0]+1}-${this.coords[i][1]}`);
			if(box.classList.contains('placed')) return false;
		};
		return true;
	}
	checkRight() {
		let x = this.coords.map(x => x[1]);
		for(let i = 0; i < x.length; i++) if (x[i] >= 9) return false;
		for(let i = 0; i < this.coords.length; i++) {
			let box = document.getElementById(`${this.coords[i][0]}-${this.coords[i][1]+1}`);
			if(box.classList.contains('placed')) return false;
		};
		return true;
	}
	checkLeft() {
		let x = this.coords.map(x => x[1]);
		for(let i = 0; i < x.length; i++) if (x[i] <= 0) return false;
		for(let i = 0; i < this.coords.length; i++) {
			let box = document.getElementById(`${this.coords[i][0]}-${this.coords[i][1]-1}`);
			if(box.classList.contains('placed')) return false;
		};
		return true;
	}
}

class T{
	constructor() {
		this.coords = [[0, 4], [1, 4], [1, 3], [1, 5]];
		this.active = true;
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
		};
		this.update();
		return true;
	}
	update() {
		for(let x = 0; x < 4; x++) {
			let sCoords = `${this.coords[x][0]}-${this.coords[x][1]}`;
			let box = document.getElementById(sCoords);
			box.style.background = 'purple';
			box.classList.add('on');
			box.classList.remove('off');
		};
	}
	remove() {
		for(let x = 0; x < 4; x++) {
			let sCoords = `${this.coords[x][0]}-${this.coords[x][1]}`;
			let box = document.getElementById(sCoords);
			box.style.background = '#E1E1E1';
			box.classList.add('off');
			box.classList.remove('on');
		};
	}
	checkY() {
		let y = this.coords.map(y => y[0]+1);
		for(let i = 0; i < y.length; i++) if (y[i] > 19) return false;
		for(let i = 0; i < this.coords.length; i++) {
			let box = document.getElementById(`${this.coords[i][0]+1}-${this.coords[i][1]}`);
			if(box.classList.contains('placed')) return false;
		};
		return true;
	}
	checkRight() {
		let x = this.coords.map(x => x[1]);
		for(let i = 0; i < x.length; i++) if (x[i] >= 9) return false;
		for(let i = 0; i < this.coords.length; i++) {
			let box = document.getElementById(`${this.coords[i][0]}-${this.coords[i][1]+1}`);
			if(box.classList.contains('placed')) return false;
		};
		return true;
	}
	checkLeft() {
		let x = this.coords.map(x => x[1]);
		for(let i = 0; i < x.length; i++) if (x[i] <= 0) return false;
		for(let i = 0; i < this.coords.length; i++) {
			let box = document.getElementById(`${this.coords[i][0]}-${this.coords[i][1]-1}`);
			if(box.classList.contains('placed')) return false;
		};
		return true;
	}
}

class S{
	constructor() {
		this.coords = [[0, 4], [0, 5], [1, 4], [1, 3]];
		this.active = true;
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
		};
		this.update();
		return true;
	}
	update() {
		for(let x = 0; x < 4; x++) {
			let sCoords = `${this.coords[x][0]}-${this.coords[x][1]}`;
			let box = document.getElementById(sCoords);
			box.style.background = 'lime';
			box.classList.add('on');
			box.classList.remove('off');
		};
	}
	remove() {
		for(let x = 0; x < 4; x++) {
			let sCoords = `${this.coords[x][0]}-${this.coords[x][1]}`;
			let box = document.getElementById(sCoords);
			box.style.background = '#E1E1E1';
			box.classList.add('off');
			box.classList.remove('on');
		};
	}
	checkY() {
		let y = this.coords.map(y => y[0]+1);
		for(let i = 0; i < y.length; i++) if (y[i] > 19) return false;
		for(let i = 0; i < this.coords.length; i++) {
			let box = document.getElementById(`${this.coords[i][0]+1}-${this.coords[i][1]}`);
			if(box.classList.contains('placed')) return false;
		};
		return true;
	}
	checkRight() {
		let x = this.coords.map(x => x[1]);
		for(let i = 0; i < x.length; i++) if (x[i] >= 9) return false;
		for(let i = 0; i < this.coords.length; i++) {
			let box = document.getElementById(`${this.coords[i][0]}-${this.coords[i][1]+1}`);
			if(box.classList.contains('placed')) return false;
		};
		return true;
	}
	checkLeft() {
		let x = this.coords.map(x => x[1]);
		for(let i = 0; i < x.length; i++) if (x[i] <= 0) return false;
		for(let i = 0; i < this.coords.length; i++) {
			let box = document.getElementById(`${this.coords[i][0]}-${this.coords[i][1]-1}`);
			if(box.classList.contains('placed')) return false;
		};
		return true;
	}
}

class S1{
	constructor() {
		this.coords = [[0, 4], [0, 3], [1, 4], [1, 5]];
		this.active = true;
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
		};
		this.update();
		return true;
	}
	update() {
		for(let x = 0; x < 4; x++) {
			let sCoords = `${this.coords[x][0]}-${this.coords[x][1]}`;
			let box = document.getElementById(sCoords);
			box.style.background = 'red';
			box.classList.add('on');
			box.classList.remove('off');
		};
	}
	remove() {
		for(let x = 0; x < 4; x++) {
			let sCoords = `${this.coords[x][0]}-${this.coords[x][1]}`;
			let box = document.getElementById(sCoords);
			box.style.background = '#E1E1E1';
			box.classList.add('off');
			box.classList.remove('on');
		};
	}
	checkY() {
		let y = this.coords.map(y => y[0]+1);
		for(let i = 0; i < y.length; i++) if (y[i] > 19) return false;
		for(let i = 0; i < this.coords.length; i++) {
			let box = document.getElementById(`${this.coords[i][0]+1}-${this.coords[i][1]}`);
			if(box.classList.contains('placed')) return false;
		};
		return true;
	}
	checkRight() {
		let x = this.coords.map(x => x[1]);
		for(let i = 0; i < x.length; i++) if (x[i] >= 9) return false;
		for(let i = 0; i < this.coords.length; i++) {
			let box = document.getElementById(`${this.coords[i][0]}-${this.coords[i][1]+1}`);
			if(box.classList.contains('placed')) return false;
		};
		return true;
	}
	checkLeft() {
		let x = this.coords.map(x => x[1]);
		for(let i = 0; i < x.length; i++) if (x[i] <= 0) return false;
		for(let i = 0; i < this.coords.length; i++) {
			let box = document.getElementById(`${this.coords[i][0]}-${this.coords[i][1]-1}`);
			if(box.classList.contains('placed')) return false;
		};
		return true;
	}
}