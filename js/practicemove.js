class PracticeMove extends Game {
	constructor(){
		super(new Board(5,5),new Robot(getRandNum(0,5),getRandNum(0,5),getRandNum(0,4)*90));

		this.board.place(this.robot)
		this.robot.draw();

		this.pila = new Battery(getRandNum(0,5),getRandNum(0,5));
		let i = 0;
		while(!this.board.placeAlone(this.pila)){
			if(i>10)
				break;
			this.pila = new Battery(getRandNum(0,5),getRandNum(0,5));
			console.log("trying to place pila for "+ i++)
		}
		this.pila.draw();
	}
}