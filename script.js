 var actionStack = [];
 var asteroidPositions = [[0,0,"robot"]]
 
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
	removeAllBouncesFromBoard()
 }
 function extractDirection(pt){
 	p = []
 	p[0] = pt[0] - 52
 	p[1] = pt[1] - 17
 	if(p[0]>0){
 		p[0] = p[0]/100
 	}
 	if(p[1]>0){
 		p[1] = p[1]/100
 	}
 	return p
 }
 function updateTranslate2(x,y){
	next = getNextPos(x,y)
	if(next[0]>0 && next[0]<500){
		if(next[1]>0 && next[1]<500){
			//"translate(152px, 117px) rotate(50deg)"
			if(isEmptyCell(extractDirection(next),true)){
				setTransformation('translate('+next[0]+'px,'+next[1]+'px) '+getCurrentRotate())
			} else {
				shake(extractDirection(next))
			}
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
 	document.getElementById("maze").classList.remove("bounce-v")
 	document.getElementById("maze").classList.remove("bounce-h")
 }
 function addBounceToBoard(dir){
 	document.getElementById("maze").classList.add("bounce-"+dir)
 }
 function resetMazeClass(){
 	document.getElementById("maze").classList.add("coding")
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
 function updateRotate2(d){
	setTransformation(getCurrentTranslate()+' rotate('+(getCurrentDval() + d)%360+'deg)')
 }
 function setTransformation(val){
 	//val is like "translate(152px, 117px) rotate(50deg)"
 	document.getElementById("robot").style.transform= val
 	document.getElementById("robot").classList.add("slide")
 }
 function setAttribute(val){
	document.getElementById("robot").setAttribute('transform',val)
	document.getElementById("robot").classList.add("slide")
 }
 //"translate(x,y) rotate(d)"
 function getCurrentTransform(){
	return document.getElementById("robot").getAttribute('transform')
 }
 function getCurrentTransformFromStyle(){
 	return document.getElementById("robot").style.transform
 }
 function getCurrentXYval(){
	//xy = getCurrentTransform().split(" ")[0].replace(/translate/g,"").replace(/\(|\)/g, "").split(",")
	xy = getCurrentTransformFromStyle().replace(/translate|\(|\)|px|,/g,"").split(" ")
	xy[0] = Number(xy[0])
	xy[1] = Number(xy[1])
	return xy
 }
 function getCurrentTranslate(){
	//return getCurrentTransform().split(" ")[0]
	return getCurrentTransformFromStyle().split("rotate")[0]
 }
 function getCurrentRotate(){
	//return getCurrentTransform().split(" ")[1]
	return getCurrentTransformFromStyle().split("px)")[1]
 }
 function getCurrentDval(){
	//return Number(getCurrentTransform().split(" ")[1].replace(/rotate/g,"").replace(/\(|\)/g, "").split(",")[0])
	return Number(getCurrentRotate().replace(/\(|\)|rotate|deg/g, ""))
 }
 function move(){
	currOrientation = getCurrentDval()
	step = getNextStep()
	updateTranslate2(step[0],step[1])
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
	updateRotate2(90)
 }
 function turnL(){
	updateRotate2(-90)
 }
 function shake(pt){
 	document.getElementById(getAsteroidIdByPosition(pt)).classList.add("shake")
 }
 function shake(pt){
 	document.getElementById(getAsteroidIdByPosition(pt)).classList.add("shake")
 }
 function getAsteroidIdByPosition(pt){
 	for (var i = 0; i < asteroidPositions.length; i++) {
 		if(asteroidPositions[i][0]==pt[0] && asteroidPositions[i][1]==pt[1]){
 			return asteroidPositions[i][2];
 		}
 	}
 	return undefined
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
 		document.getElementById("robot").classList.add("zooom")
 	} else {
 		document.getElementById("robot").classList.remove("zooom")
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
 function getUniqueTransformedPoints(max,bx,by,id){
 	pt = genNonOverlappingPt(max,id)
 	ptT = []
 	ptT[0] = pt[0]*100+bx
 	ptT[1] = pt[1]*100+by
 	return ptT
 }
  
 function genNonOverlappingPt(max,id){
 	pt = []
 	pt[0] = getRandomInt(max)
 	pt[1] = getRandomInt(max)
 	pt[2] = id
 	inserted = insertIntoTakenPositions(pt)
 	while(!inserted){
 		pt[0] = getRandomInt(max)
 		pt[1] = getRandomInt(max)
 		inserted = insertIntoTakenPositions(pt)
 	}
 	return pt
 }
function isEmptyCell(pt, allow){
	for (var i = 0; i < asteroidPositions.length; i++) {
 		if(asteroidPositions[i][0]==pt[0] && asteroidPositions[i][1]==pt[1] ){
 			//the obstacles are for now only asteroids
 			//&& asteroidPositions[i][2].search("aster")==0){
 			if(asteroidPositions[i][2].search("pila")==0 && allow){
 				return true;
 			} else {
 				return false;
 			}
 		}
 	}
 	return true;
}
 function insertIntoTakenPositions(pt){
 	isEmpty = isEmptyCell(pt,false)
 	if (isEmpty){
 		asteroidPositions.push(pt)
 	}
 	return isEmpty;
 }
 function placeAsteroidsAndBatteryRand(){
 	for (var i = 1; i <=4; i++) {
 		pt = getUniqueTransformedPoints(5,58,140,"aster"+i)
 		placeObjectById("aster"+i,pt[0],pt[1]);
 	}
 	pt = getUniqueTransformedPoints(5,93,150,"pila")
 	placeObjectById("pila",pt[0],pt[1])
 }
 function placeObjectById(id,x,y){
	document.getElementById(id).style.left=x+"px"
	document.getElementById(id).style.top=y+"px"
 }
 function removeShakeFromAllObjects(){
 	for (var i = 0; i < asteroidPositions.length; i++) {
 		document.getElementById(asteroidPositions[i][2]).classList.remove("shake")
 	}
 }