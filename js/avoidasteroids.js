class AvoidAsteroids extends Game {
	constructor(){
		super(new Board(5,5),new Robot(getRandNum(0,5),getRandNum(0,5), getRandNum(0,4)*90));

		this.board.place(this.robot)
		this.robot.draw();

		this.pila = new Battery(getRandNum(0,5),getRandNum(0,5));
		let i = 0;
		while(!this.board.placeAlone(this.pila)){
			this.pila = new Battery(getRandNum(0,5),getRandNum(0,5));
			console.log("trying to place pila for "+ i++)
		}
		this.pila.draw();

		this.asters = new Array();
		for (var j = 0; j < 5; j++) {
			this.asters[j] = new Asteroid(getRandNum(0,5),getRandNum(0,5),j)
			while(!this.board.placeAlone(this.asters[j])){
				this.asters[j] = new Asteroid(getRandNum(0,5),getRandNum(0,5),j)
				console.log("trying to place pila for "+ i++)
			}
			this.asters[j].draw();
		}
	}
}