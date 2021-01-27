class BoardObject {

	constructor(x,y,id){
		this.x = x;
		this.y = y;
		this.cssID = id;
	}

	scale(min_x, min_y, factor) {
		return new Array(this.x*factor+min_x,this.y*factor+min_y)
	}

	createDomEl(){
		var div = document.createElement('div');
		div.id = this.cssID;
		document.getElementsByTagName('body')[0].appendChild(div);
	}

	draw(x,y,clss){
		var obj = document.getElementById(this.cssID);
		if(!obj) {
			this.createDomEl();
		}
 		obj.style.left=x+"px"
		obj.style.top=y+"px"
		if(clss){
			obj.classList.add(clss)
 		}
	}
}