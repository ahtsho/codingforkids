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
		var obj = document.getElementById(this.cssID);
		if(!obj) {
			var div = document.createElement('div');
			div.id = this.cssID;
			document.getElementById('boardobjs').appendChild(div);
			obj = document.getElementById(this.cssID);
		}
		return obj;
	}

	bounce(dir){
		var el = document.getElementById('maze');
		if(el){
			el.classList.add("bounce-"+dir);
		}
	}

	shake(){
		var el = document.getElementById(this.cssID);
		if(el){
			el.classList.add("shake");
		}
	}

	removeShake(){
		var el = document.getElementById(this.cssID);
		if(el){
			el.classList.remove("shake");
		}
	}

	draw(x,y,clss,d){
		var obj = this.createDomEl();
		if(clss!=='robot') {
	 		obj.style.left=x+"px"
			obj.style.top=y+"px"
		} else {
			obj.style.transform= "translate("+x+"px, "+y+"px) rotate("+d+"deg)";
			obj.style.left="0px"
			obj.style.top="0px"
			obj.classList.add("slide")
		}
		if(clss){
			obj.classList.add(clss)
 		}
	}
}