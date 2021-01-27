class Board {
	constructor(n) {
		this.cells = Array(n*n);
		this.create2DArray(n)
	}

	populate(listOfObjects){
		var count = 0
		for (var r = 0; r< this.matrix.length;	r++) {
			for (var c = 0; c< this.matrix[r].length; c ++) {
				this.matrix[r][c]=listOfObjects.pop();
				this.cells[count] = r+','+c;
				count++;
			}
		}
	}

	create2DArray(rows) {
		var arr = [];

		for (var i=0;i<rows;i++) {
			 arr[i] = [];
		}

		this.matrix=arr;
	}

	placeInRandPosition(obj){
		//extract random number from 0 to this.cells.length
		var rand	= this.getRandNum(this.cells.length,0);
		var xy = this.cells[rand];
		var x = xy.split(",")[0];
		var y = xy.split(",")[1];
		this.matrix[x][y] = obj;
		this.cells.splice(rand,1);// remove element at index rand
	}

	getRandNum(max,min){
		return Math.floor(Math.random() * (max - min) + min);
	}
}