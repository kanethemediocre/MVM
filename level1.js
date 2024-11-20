function loadlevel1(){
	var floor0 = new Umb(0,30,400,30,0,1);//constructor(xx,yy,xxs,yys,hp,solid)
	floor0.c = "green";
	var crate0 = new Umb(0,-30,30,30,0,1);
	crate0.c = "brown";
	var bouncyblock0 = new Umb(-300,-130,50,50,0,2);//constructor(xx,yy,xxs,yys,hp,solid)
	bouncyblock0.c = "magenta";
	var player0 = new Umb(0,-220,40,100,100,1);
	player0.c = "blue";
	player0.publiclabel = player0.hp;
	var enemy0 = new Umb(100,-120,40,100,4,1);
	enemy0.c = "red";
	enemy0.publiclabel = enemy0.hp;

	var currentlevel = new Warehouse(4000,4000,[spawn0],1,[floor0,crate0,bouncyblock0],[player0,enemy0]);//constructor(xxs,yys,spawns,gravity,srboxes,mrboxes){
	currentlevel.itboxes = [itemgun2,itemgun3,itemgun4,itemhp20];

	var minsizex = 100;
	var maxsizex = 400;
	var miny = 0;
	var maxy = 200;
	var ythick = 128
	var xpointer = 0
	var i=0;
	while(i<128){
		var asize = minsizex+Math.floor((maxsizex-minsizex)*Math.random());
		var ay = miny + Math.floor((maxy-miny)*Math.random());
		var abox = new Umb(xpointer+asize,ay+ythick,asize,ythick,0,1);
		abox.c = "green";
		currentlevel.srboxes.push(abox);
		xpointer = xpointer + asize*2;
		//console.log("asize "+asize+" ay "+ay+" xpointer "+xpointer);
		i++;
		}	
	var stairnum = 12;
	var stairdy = 20;
	var stairdx = 20;
	var i=0;
	while(i<stairnum){//this one works
		currentlevel.srboxes.push(new Umb(stairdx*i+1000, -1*stairdy*i+stairdy*stairnum-120, stairdx, stairdy ,0 ,1 ));////constructor(xx,yy,xxs,yys,hp,solid)
		i++;
		}
	//y u no work bruh	
	currentlevel.addstairs(-500,-500,500,500,20,"orange");//	addstairs(x1,y1,x2,y2,stairdy,color){
		
		//addstairs(x1,y1,x2,y2,stairdy,color){
			
			// and y u no work either
		var x1 = 0;
		var x2 = 500;
		var y1 = 0;
		var y2 = 500;	
		var stairdy = 20;
		var color = "orange";		
		var dx = x2-x1;
		var dy = y2-y1;
		var stairnum = Math.floor(dy/stairdy);
		var stairdx = Math.floor(dx/stairnum);
		var i=0;
		while(i<stairnum){
			var nextstair = new Umb(stairdx*i+x1, stairdy*i+y1, stairdx, stairdy ,0 ,1 );//constructor(xx,yy,xxs,yys,hp,solid)
			nextstair.c = color;
			currentlevel.srboxes.push(new Umb(nextstair));
			console.log(nextstair.x+" "+nextstair.y,currentlevel.srboxes.length);
			i++;
			}
		//}	
		
		
		
	return currentlevel;
	}