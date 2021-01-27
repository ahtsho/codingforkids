class Battery extends BoardObject {
	constructor(x,y){
		super(x,y,"pila")
	}

	draw(){
		let xy = super.scale(97,150,100);
		super.draw(xy[0],xy[1],"pila")
	}
}