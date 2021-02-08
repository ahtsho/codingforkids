class Asteroid extends BoardObject {
	constructor(x,y,i){
		super(x,y,"aster"+i);
	}

	draw(){
		let xy = super.scale(60,145,100);
		super.draw(xy[0],xy[1],"asteroid")
	}

	shake(){
		super.shake();
	}
}