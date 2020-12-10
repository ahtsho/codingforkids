 function updateTranslate(x,y){
	currXY = getCurrentXYval()
	nextPosx = currXY[0]+x*100
	nextPosy = currXY[1]+y*100
	if((nextPosx>0 && nextPosx<1000)&& (nextPosy>0 && nextPosy<1000)){
		setAttribute('translate('+nextPosx+','+nextPosy+') '+getCurrentRotate())
	} else {
		alert("Sorry can't get out of my world")
	}
 }
 function updateRotate(d){
	nextD = (getCurrentDval() + d)%360
	setAttribute(getCurrentTranslate()+' rotate('+nextD+',50,50)')
 }
 function setAttribute(val){
	document.getElementById("robot").setAttribute('transform',val)
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
	if(currOrientation==0){
		updateTranslate(0,1)
	}else if(currOrientation==90||currOrientation==-270){
		updateTranslate(-1,0)
	}else if(currOrientation==180||currOrientation==-180){
		updateTranslate(0,-1)
	}else if(currOrientation==270||currOrientation==-90){
		updateTranslate(1,0)
	}
 }
 function turnR(){
	updateRotate(90)
 }
 function turnL(){
	updateRotate(-90)
 }