class Asteroid extends BoardObject {
	constructor(x,y,id){
		super(x,y,id);
	}

	draw(){
		let xy = super.scale(60,145,100);
		super.draw(xy[0],xy[1],"asteroid")
	}
}