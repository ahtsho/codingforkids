 var actionStack = [];
 var asteroidPositions = []
 var activePage = ""
 var pagesList = ["casa","scegli","conta","contagruppi"]
 var singlePageElementsList = ["buttons","counters", "countergroup"]
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
 function hasWon(pt){
 	for (var i = 0; i < asteroidPositions.length; i++) {
 		if(asteroidPositions[i][0]==pt[0] && asteroidPositions[i][1]==pt[1] ){
 			if(asteroidPositions[i][2].search("pila")==0){
 				return true;
 			}
 		}
 	}
 	return false;
 }
 function celebrate(){
 	document.body.classList.add("night")
 	document.getElementById("celebrate").classList.add("pyro")
 	document.getElementById("button5").style.visibility='visible'
 	charging()
 }
 function updateTranslate2(x,y,action){
	next = getNextPos(x,y)
	if(next[0]>0 && next[0]<500){
		if(next[1]>0 && next[1]<500){
			//"translate(152px, 117px) rotate(50deg)"
			if(isEmptyCell(extractDirection(next),action)){
				setTransformation('translate('+next[0]+'px,'+next[1]+'px) '+getCurrentRotate())
				xyr = getCurrentXYval()
				p[0] = xyr[0]
				p[1] = xyr[1]
				extrP = extractDirection(p)
				if(hasWon(extrP)){
					celebrate()
				}
				return true
			} else {
				shake(extractDirection(next))
			}
		} else {
			addVBounce()
		}
	} else {
		addHBounce()
	}
	return false
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
	//currOrientation = getCurrentDval()
	step = getNextStep()
	updateTranslate2(step[0],step[1],"move")
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
 function executeActionFromIcon(dir,iter){
 	if(dir.endsWith("left")){
 		for(i=0;i<iter;i++){
 			turnL()
 		}
 	} else if(dir.endsWith("right")){
 		for(i=0;i<iter;i++){
 			turnR()
 		}
 	} else if(dir.endsWith("move")){
 		for(i=0;i<iter;i++){
 			move()
 		}
 	}
 }

 function loadActions(){
 	actionStack = []
 	for(var i = 4; i > 0; i--){
 		var action = {}
 		action.name = 'my-icon-select'+i
 		action.value = document.getElementById('input'+i).value
 		actionStack.push(action);
 	}
 	playNext();
 }
 function loadGroupActions(){
	actionStack = []
	for (var row = 5; row > 0; row --){
		rowIter = Number(document.getElementById('row-input'+row).value)
		for(var iter=0; iter < rowIter; iter ++){
			for(var col = row*5+5-1; col >= row*5; col--){
		 		var action = {}
		 		n = getRequestedDirection('my-icon-select'+col).split("/")
		 		if(n[n.length-1]=="0"){
		 			//do nothing
		 		} else {
			 		action.name = n[n.length-1]
			 		action.value = 1
			 		actionStack.push(action);
			 	}
		 	}
		 }
	}
	playNext();
 }
 function playNext(){
 	action = actionStack.pop()
 	if(action){
 		executeActionFromIcon(action.name,action.value)
 	}

 }
function getRandomInt(min,max) {
	//return Math.floor(Math.random() * Math.floor(max));
	return Math.floor(Math.random() * (max - min) + min);
}
 function randPlaceBattery(){
 	randX = getRandomInt(0,5)*100+35
 	randY = getRandomInt(0,5)*100+10
 	if(document.getElementById("pila-conta")){ 
 		document.getElementById("pila-conta").setAttribute('transform','translate('+randX+','+randY+')')
 	}
 }
 function getUniqueTransformedPoints(min,max,bx,by,id){
 	pt = genNonOverlappingPt(min,max,id)
 	ptT = []
 	ptT[0] = pt[0]*100+bx
 	ptT[1] = pt[1]*100+by
 	return ptT
 }
  
 function genNonOverlappingPt(min,max,id){
 	pt = []
 	pt[0] = getRandomInt(min,max)
 	pt[1] = getRandomInt(min,max)
 	pt[2] = id
 	inserted = insertIntoTakenPositions(pt, "place")
 	counter = 0;
 	while(!inserted && counter < 10){
 		counter = counter+1
 		pt[0] = getRandomInt(min,max)
 		pt[1] = getRandomInt(min,max)
 		inserted = insertIntoTakenPositions(pt,"place")
 	}
 	if(counter >=10){
 		console.log("counter=="+counter);
 	}
 	return pt
 }
function isEmptyCell(pt,action){
	for (var i = 0; i < asteroidPositions.length; i++) {
 		if(asteroidPositions[i][0]==pt[0] && asteroidPositions[i][1]==pt[1] ){
 			//the obstacles are for now only asteroids
 			//&& asteroidPositions[i][2].search("aster")==0){
 			
 			if(action==="move" && asteroidPositions[i][2]==="pila"){
 				return true;
 			} else {
 				return false;
 			}
 			return false;
 		}
 	}
 	return true;
}
 function insertIntoTakenPositions(pt){
 	isEmpty = isEmptyCell(pt)
 	if (isEmpty){
 		asteroidPositions.push(pt)
 	}
 	return isEmpty;
 }
 function placeRobotRand(){
 	xy = [[0,0,0,-90],[0,4,180,270],[4,0,0,90],[4,4,180,90]]
 	var count = 0
 	while(count<10){
	 	i = getRandomInt(0,4)
	 	pick = xy[i]
	 	//val is like "translate(152px, 117px) rotate(50deg)"
	 	tran = updateTranslate2(pick[0],pick[1],"place")
	 	if(tran){
		 	r = getRandomInt(2,4)
		 	updateRotate2(pick[r])
		 	asteroidPositions[0]=[pick[0],pick[1],"robot"]
		 	return;
		 }
		count = count +1;
	}
 }
 function placeRandBattery(){
 	pt = getUniqueTransformedPoints(2,5,93,150,"pila")
 	placeObjectById("pila",pt[0],pt[1],"pila")
 }
 function distributeObjsRand(){
 	placeRobotRand()
 	for (var i = 1; i <=4; i++) {
 		pt = getUniqueTransformedPoints(0,5,58,140,"aster"+i)
 		placeObjectById("aster"+i,pt[0],pt[1],"asteroid");
 	}
 	//get battery as far as possible from robot
 	mpt = calculateMaxDistance()
 	pt = getUniqueTransformedPoints(mpt[0],mpt[1],93,150,"pila")
 	placeObjectById("pila",pt[0],pt[1],"pila")
 }
 function calculateMaxDistance(){
 	robP = asteroidPositions[0]
 	batPMinMax =[]
 	//battery has to stay at least 2 cells away from robot
 	//batPMinMax [xmin,ymin,xmax,ymax]
 	if(robP[0]==0){
 		batPMinMax[0] =	2
 		batPMinMax[2] =	5
 	} else {
 		batPMinMax[0] =	0
 		batPMinMax[2] =	2
 	}
 	if(robP[1]==0){
 		batPMinMax[1] =	2
 		batPMinMax[3] =	5
 	} else {
 		batPMinMax[1] =	0
 		batPMinMax[3] =	2
 	}
 	return batPMinMax;
 }
 function placeObjectById(id,x,y,clss){
 	var obj = document.getElementById(id)
 	if(obj){
 		obj.style.left=x+"px"
		obj.style.top=y+"px"
		if(clss){
			obj.classList.add(clss)
 		}
	}
 }
 function removeShakeFromAllObjects(){
 	for (var i = 0; i < asteroidPositions.length; i++) {
 		var ast = document.getElementById(asteroidPositions[i][2])
 		if(ast){
 			ast.classList.remove("shake")
 		}
 	}
 }
 
 function activate(id){
 	for(i in pagesList){
 		document.getElementById(pagesList[i]).classList.remove("active")
 	}
 	document.getElementById(id).classList.add("active")
 	activePage = id
 }
 function hide(id){
 	document.getElementById(id).style.visibility = 'hidden';
 }
 function unhide(id){
 	document.getElementById(id).style.visibility = 'visible';
 }
 function showOnly(id){
 	for(i in singlePageElementsList){
 		hide(singlePageElementsList[i])
 	}
 	unhide(id)
 }
 function showButtons(){
 	showOnly("buttons")
 }
 function showCounters(){
 	showOnly("counters")
 }
 function showGroupCounters(){
 	showOnly("countergroup")
 }
 
 function clean(){
 	for(var i = 1; i < 5; i++){
 		document.getElementById("aster"+i).classList.remove("asteroid")
 	}
 	asteroidPositions = []
 }
function casa(){
	clean()
	activate("casa")
	showButtons()
}
function conta(){
	clean()	
	activate("conta")
	loadIconSelection()
	showCounters()
	placeRobotRand()
	placeRandBattery()
}
function contagruppi(){
	clean()	
	activate("contagruppi")
	loadIconSelection()
	showGroupCounters()
}
 function scegli(){
 	clean()
	activate("scegli")
 	distributeObjsRand();
 	showButtons()
 }
 function loadIcon(id, ics){
 	if(document.getElementById(id)){
		iconSelect = new IconSelect(id);
		iconSelect.refresh(ics);
	}
 }
 function loadIconSelection(){
 	var icons = [];
 		icons.push({'iconFilePath':'iconselect/images/icons/0.svg', 'iconValue':'0'});
		icons.push({'iconFilePath':'iconselect/images/icons/move.svg', 'iconValue':'1'});
		icons.push({'iconFilePath':'iconselect/images/icons/left.svg', 'iconValue':'2'});
		icons.push({'iconFilePath':'iconselect/images/icons/right.svg', 'iconValue':'3'});
		for(var i = 0; i < 30; i++){
			loadIcon("my-icon-select"+i,icons);
		}
 }
 
