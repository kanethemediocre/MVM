document.addEventListener("mousemove", mouseMoveHandler, false);
function mouseMoveHandler(e) {
    mx =  e.clientX +windowmousexoffset;//myplayer.mousexoffset;
	my =  e.clientY +windowmouseyoffset;//+myplayer.mouseyoffset;
	mdir = -1*Math.atan2(mx-canvas.width/6,my-canvas.height/2)+Math.PI/2;
} 
document.addEventListener("mousedown", mouseDownHandler, false);
function mouseDownHandler(e) {
	mousestate = e.buttons;
	if (editmode){
		editx1 = mx + viewx;
		edity1 = my + viewy;
		}
	}
document.addEventListener("mouseup", mouseUpHandler, false);
function mouseUpHandler(e) {
    mousestate = e.buttons;
	if (editmode){
		
		//console.log("itried2edit");
		editx2 = mx + viewx;
		edity2 = my + viewy;
		var xsize = Math.floor(Math.abs( (editx1-editx2)/2));
		var ysize = Math.floor(Math.abs((edity1-edity2)/2));
		var xcenter = Math.floor( (editx1+editx2)/2);
		var ycenter = Math.floor( (edity1+edity2)/2);
		var newbox = new Umb(xcenter,ycenter,xsize,ysize,edithp,1);
		newbox.c = editcolors[editcolori];
		if (boxmodei==0){
			currentlevel.srboxes.push(newbox);
			}
		else if (boxmodei==1){
			newbox.ai="randomwalk";
			newbox.publiclabel = newbox.hp;
			currentlevel.mrboxes.push(newbox);
			
			}
		else if (boxmodei==2){
			newbox.label = "+";
			newbox.publiclabel = newbox.label + " " + newbox.hp;
			currentlevel.bmboxes.push(newbox);
			}
		else if (boxmodei==3){
			newbox.publiclabel = "^";
			currentlevel.mmboxes.push(newbox);
			
			}
		else if (boxmodei==4){
			newbox.label = "hp20";
			newbox.publiclabel = "+20";
			currentlevel.itboxes.push(newbox);
			}
		//console.log(newbox.xs+" "+newbox.ys);
		}

	
	}
document.addEventListener("wheel", mouseWheelHandler, {passive: false});
function mouseWheelHandler(e) {
    e.preventDefault();
    e.stopPropagation();
	return false;
}

