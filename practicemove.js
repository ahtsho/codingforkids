class PracticeMove extends Game {
	constructor(){
		super();
		this.pila = new Battery(super.getRandNum(0,5),super.getRandNum(0,5));
		this.pila.draw();
	}
}