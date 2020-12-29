 var actionStack = [];
 function updateTranslate(x,y){
	next = getNextPos(x,y)
	if(next[0]>0 && next[0]<500){
		if(next[1]>0 && next[1]<500){
			setAttribute('translate('+next[0]+','+next[1]+') '+getCurrentRotate())
		} else {
			addVBounce()
		}
	} else {
		addHBounce()
	}
 }
 function addVBounce(){
 	removeAllBouncesFromBoard()
 	addBounceToBoard('v')
 }
 function addHBounce(){
	removeAllBouncesFromBoard()
 	addBounceToBoard('h')
 }
 function removeAllBouncesFromBoard(){
 	document.getElementById("board").classList.remove("bounce-v")
 	document.getElementById("board").classList.remove("bounce-h")
 }
 function addBounceToBoard(dir){
 	document.getElementById("board").classList.add("bounce-"+dir)
 }
 function getNextPos(x,y){
 	currXY = getCurrentXYval()
	nextPosx = currXY[0]+x*100
	nextPosy = currXY[1]+y*100
	nextPos=[nextPosx,nextPosy]
	return nextPos;
 }
 function updateRotate(d){
	nextD = (getCurrentDval() + d)%360
	setAttribute(getCurrentTranslate()+' rotate('+nextD+',50,50)')
 }
 function setAttribute(val){
	document.getElementById("robot").setAttribute('transform',val)
	document.getElementById("robot").classList.add("slide")
 }
 //"translate(x,y) rotate(d)"
 function getCurrentTransform(){
	return document.getElementById("robot").getAttribute('transform')
 }
 function getCurrentXYval(){
	xy = getCurrentTransform().split(" ")[0].replace(/translate/g,"").replace(/\(|\)/g, "").split(",")
	xy[0] = Number(xy[0])
	xy[1] = Number(xy[1])
	return xy
 }
 function getCurrentTranslate(){
	return getCurrentTransform().split(" ")[0]
 }
 function getCurrentRotate(){
	return getCurrentTransform().split(" ")[1]
 }
 function getCurrentDval(){
	return Number(getCurrentTransform().split(" ")[1].replace(/rotate/g,"").replace(/\(|\)/g, "").split(",")[0])
 }
 function move(){
	currOrientation = getCurrentDval()
	step = getNextStep()
	updateTranslate(step[0],step[1])
 }
 function getNextStep(){
 	step = []
 	currOrientation = getCurrentDval()
	if(currOrientation==0){
		step[0]=0
		step[1]=1
	}else if(currOrientation==90||currOrientation==-270){
		step[0]=-1
		step[1]=0
	}else if(currOrientation==180||currOrientation==-180){
		step[0]=0
		step[1]=-1
	}else if(currOrientation==270||currOrientation==-90){
		step[0]=1
		step[1]=0
	}
	return step
 }
 function turnR(){
	updateRotate(90)
 }
 function turnL(){
	updateRotate(-90)
 }
 function moveToCharge(){
 	step = getNextStep()
 	next = getNextPos(step[0],step[1])
 	if((next[0]==1 && next[1]==201) ||
 	(next[0]==101 && (next[1]==101 || next[1]==401)) ||
 	(next[0]==201 && (next[1]==1 || next[1]==301)) ||
 	(next[0]==301 && next[1]==201) ||
 	(next[0]==401 && next[1]==101)){
 		document.getElementById("board").classList.add("shake")
 	} else {
 		document.getElementById("board").classList.remove("shake")
 		move();
 		charging();
 	}
 }
 function charging(){
 	if(getCurrentXYval()[0]==401 && getCurrentXYval()[1]==1){
 		console.log("HURRA'!!! Batteria in carica!")
 	}
 }
 function getRequestedDirection(cmd){
 	return document.getElementById(cmd).getElementsByClassName("selected-icon")[0].innerHTML.split(".svg")[0]
 }
 function executeActionFromIcon(icon,iter){
 	if(getRequestedDirection(icon).endsWith("left")){
 		for(i=0;i<iter;i++){
 			turnL()
 		}
 	} else if(getRequestedDirection(icon).endsWith("right")){
 		for(i=0;i<iter;i++){
 			turnR()
 		}
 	} else {
 		for(i=0;i<iter;i++){
 			move()
 		}
 	}
 }
 function loadActions(){
 	actionStack.push({'my-icon-select5':document.getElementById("input5").value})
 	actionStack.push({'my-icon-select4':document.getElementById("input4").value})
 	actionStack.push({'my-icon-select3':document.getElementById("input3").value})
 	actionStack.push({'my-icon-select2':document.getElementById("input2").value})
 	actionStack.push({'my-icon-select1':document.getElementById("input1").value})

 	playNext();
 }
 function playNext(){
 	actIter = actionStack.pop()
 	for(x in actIter){
 		executeActionFromIcon(x,actIter[x])
 	}
 }
function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}
 function randPlaceBattery(){
 	randX = getRandomInt(5)*100+35
 	randY = getRandomInt(5)*100+10
 	if(document.getElementById("pila-conta")){ 
 		document.getElementById("pila-conta").setAttribute('transform','translate('+randX+','+randY+')')
 	}
 }