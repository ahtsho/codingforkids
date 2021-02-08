class Board {
	constructor(n,m) {
		this.bwidth = n;
		this.blength = m;
		this.rowz = [];
		for (var r=0;r<this.bwidth;r++) {
			this.rowz[r] = [];
			for (var c=0;c<this.blength;c++) {
				this.rowz[r][c]='';
			}
		}
		this.cleanAfterParty();
		this.cleanAll();
	}
	// 0 to 4
	isWithinBorders(obj,x,y){
		if(obj.x+x < 0){
			obj.bounce('h');
			return false;
		}
		if(obj.x+x > this.bwidth-1){
			obj.bounce('h');
			return false;
		}
		if(obj.y+y < 0){
			obj.bounce('v');
			return false;
		}
		if(obj.y+y > this.blength-1){
			obj.bounce('v');
			return false;
		}
		return true;
	}

	isCellEmpty(i,j){
		if(!this.rowz[i][j]){
			return true;
		}
		var obj = this.rowz[i][j];
		obj.shake();
		return false;
	}

	canMoveTo(obj,x,y){
		if(this.isWithinBorders(obj,x,y)){
			if(obj instanceof Robot && this.rowz[obj.x+x][obj.y+y] instanceof Battery){
				this.celebrate()
				return true;
			} else {
				return this.isCellEmpty(obj.x+x,obj.y+y);
			}
		} 
		return false;
	}

	placeAlone(obj){
		if(this.isWithinBorders(obj,obj.x,obj.y)){
			if(this.isCellEmpty(obj.x,obj.y)){
				this.rowz[obj.x][obj.y] = obj;
				return true;
			} else {
				console.log("cell is taken by ",this.rowz[obj.x][obj.y]);
			}
		}
		console.log("Trying to get out of boundery");
		return false;
	}

	moveFromTo(prev, curr){
		this.rowz[prev.x][prev.y] = '';
		this.place(curr);
	}

	place(obj){
		this.rowz[obj.x][obj.y]=obj
	}

	cleanAfterParty(){
		document.body.classList.remove("night")
		document.getElementById("celebrate").classList.remove("pyro")
		document.getElementById("button5").style.visibility='hidden'
	}

	cleanAll(){
		document.getElementById('boardobjs').innerHTML = '';
	}

	celebrate(){
		document.body.classList.add("night")
		document.getElementById("celebrate").classList.add("pyro")
		document.getElementById("button5").style.visibility='visible'
	}

}