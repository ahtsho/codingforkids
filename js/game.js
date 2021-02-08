class Game {
	constructor(board, moveableObj){
		this.board = board;
		this.robot = moveableObj;
	}

	move(){
		let nextStep = this.robot.calculateNextMove();
		if(this.board.canMoveTo(this.robot,nextStep[0],nextStep[1])) {
			let prev = {'x':this.robot.x,'y':this.robot.y};
			this.robot.move();
			this.board.moveFromTo(prev,this.robot);
			this.robot.draw();
		}
	}
}


