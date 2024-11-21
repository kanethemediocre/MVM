function edithud(){
		context.fillStyle = "lime";
		context.font = "16px Arial";
		context.fillText("Edit Mode On",25,16);

		context.font = "16px Arial";
		context.fillText("Adding "+boxmodes[boxmodei],25,64);
		
		context.font = "16px Arial";
		context.fillText("Color is "+editcolors[editcolori],25,96);
		context.fillStyle = editcolors[editcolori];
		context.fillRect(128,80,20,20);
		
		context.fillStyle = "lime";
		context.font = "16px Arial";
		context.fillText("HP is "+edithp,25,128);

	}
