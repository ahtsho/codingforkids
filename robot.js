class Robot extends BoardObject {
	constructor(x,y,d){
		super(x,y)
		this.d = d;
	}

	move(max_x, max_y, min_x, min_y){
		// get current orientation
		switch(this.d) {
			case 0:
				this.y++;
				break;
			case (90 || 270):
				this.x--; 
				break;
			case (180 || -180):
				this.y--;
				break;
			case (270 || -90):
				this.x++;
				break; 
			default:
				console.log("can't move this way ",this.d)
		}
	}

	turnLeft(){
		this.d -=90%360;
	}

	turnRight(){
		this.d +=90%360;
	}

	log(){
		console.log("Robot x = "+this.x+", y = "+this.y+", deg = "+this.d)
	}

	draw(){
		let xy = super.scale(52,17,100);
		document.getElementById("robot").style.transform= "translate("+xy[0]+"px, "+xy[1]+"px) rotate("+this.d+"deg)";
		document.getElementById("robot").classList.add("slide")
	}
}