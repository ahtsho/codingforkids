class Robot extends BoardObject {
	constructor(x,y,d){
		super(x,y,'robot');
		this.d = d;
	}

	calculateNextMove(){
		switch(this.d) {
			case 0:
				return [0,1];
			case 90:
			case -270:
				return [-1,0];
			case 180:
			case -180:
				return [0,-1];
			case 270: 
			case -90:
				return [1,0];
			default:
				console.log("can't move this way ",this.d)
		}
	}

	move(){
		let step = this.calculateNextMove();
		this.x += step[0];
		this.y += step[1];
	}

/*
r.d = 0   => face down
r.d = 90  => face left
r.d = 180 => turns left face up 
r.d = 270 => turns left face right

r.d = -90 => face right
r.d = -180 => turns right face up
r.d = -270 => turns right face left
*/
	turnLeft(){
		this.d =(this.d-90)%360;
	}

	turnRight(){
		this.d =(this.d+90)%360;
	}

	log(){
		console.log("Robot x = "+this.x+", y = "+this.y+", deg = "+this.d)
	}

	bounce(dir){
		super.bounce(dir);
	}

	draw(){
		let xy = super.scale(61,160,100);
		super.draw(xy[0],xy[1],"robot",this.d)
		/*
		var obj = super.createDomEl()
		let xy = super.scale(52,17,100);
		obj.style.transform= "translate("+xy[0]+"px, "+xy[1]+"px) rotate("+this.d+"deg)";
		obj.classList.add("slide")
		*/
	}
}