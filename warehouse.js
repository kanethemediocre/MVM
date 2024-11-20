class Warehouse{
	constructor(xxs,yys,spawns,gravity,srboxes,mrboxes){
		this.xs = xxs;
		this.ys = yys;
		this.spawns = spawns;
		this.gravity = gravity;
		this.srboxes = srboxes; //static rigid boxes
		this.mrboxes = mrboxes; //moving rigid boxes
		this.bboxes = [];//bullet boxes 
		this.bmboxes = [];//bullet modifier boxes 
		this.mmboxes = []; //motion modifier boxes (modifies bullets, players motions)
		this.itboxes = [];//items
		}
	saveaslist(){
		var srboxeslist = [];
		var i=0;
		while(i<this.srboxes.length){
			srboxeslist.push(this.srboxes[i].saveaslist());
			i++;
			}
		var mrboxeslist = [];
		var i=0;
		while(i<this.mrboxes.length){
			mrboxeslist.push(this.mrboxes[i].saveaslist());
			i++;
			}
		var bboxeslist = [];
		var i=0;
		while(i<this.bboxes.length){
			bboxeslist.push(this.bboxes[i].saveaslist());
			i++;
			}
		var bmboxeslist = [];
		var i=0;
		while(i<this.bmboxes.length){
			bmboxeslist.push(this.bmboxes[i].saveaslist());
			i++;
			}
		var mmboxeslist = [];
		var i=0;
		while(i<this.mmboxes.length){
			mmboxeslist.push(this.mmboxes[i].saveaslist());
			i++;
			}
		var itboxeslist = [];
		var i=0;
		while(i<this.itboxes.length){
			itboxeslist.push(this.itboxes[i].saveaslist());
			i++;
			}
		var list = [this.xs,this.ys,this.spawns,this.gravity,srboxeslist,mrboxeslist,bboxeslist,bmboxeslist,mmboxeslist,itboxeslist];
		return list;
		}
	restorefromlist(list){
		this.xs = list[0];
		this.ys = list[1];
		this.spawns = list[2];
		this.gravity = list[3];
		var i=0;
		while(i<list[4].length){
			var boxlist = list[4][i];
			var abox = new Umb(200,400,16,16,1,1);//the values are irrelevant
			abox.restorefromlist(boxlist);
			this.srboxes.push(abox);
			i++;
			}
		console.log(i);
		var i=0;
		while(i<list[5].length){
			var boxlist = list[5][i];
			var abox = new Umb(200,400,16,16,1,1);//the values are irrelevant
			abox.restorefromlist(boxlist);
			this.mrboxes.push(abox);
			i++;
			}		
			console.log(i);
		var i=0;
		while(i<list[6].length){
			var boxlist = list[6][i];
			var abox = new Umb(200,400,16,16,1,1);//the values are irrelevant
			abox.restorefromlist(boxlist);
			this.bboxes.push(abox);
			i++;
			}	
			console.log(i);
		var i=0;
		while(i<list[7].length){
			var boxlist = list[7][i];
			var abox = new Umb(200,400,16,16,1,1);//the values are irrelevant
			abox.restorefromlist(boxlist);
			this.bmboxes.push(abox);
			i++;
			}	
			console.log(i);
		var i=0;
		while(i<list[8].length){
			var boxlist = list[8][i];
			var abox = new Umb(200,400,16,16,1,1);//the values are irrelevant
			abox.restorefromlist(boxlist);
			this.mmboxes.push(abox);
			i++;
			}	
			console.log(i);
		var i=0;
		while(i<list[9].length){
			var boxlist = list[9][i];
			var abox = new Umb(200,400,16,16,1,1);//the values are irrelevant
			abox.restorefromlist(boxlist);
			this.itboxes.push(abox);
			i++;
			}	
			console.log(i);
		}	
	
	updateall(){
		
		var i=0;
		while(i<this.mrboxes.length){
			this.mrboxes[i].vy = this.mrboxes[i].vy + this.gravity;
			this.mrboxes[i].x = this.mrboxes[i].x + this.mrboxes[i].vx;
			this.mrboxes[i].y = this.mrboxes[i].y + this.mrboxes[i].vy; 
			this.mrboxes[i].drag();
			if (this.mrboxes[i].hp==0){this.mrboxes[i].y = -100000;}
			else if (this.mrboxes[i].hp<0){
				this.mrboxes[i].hp = this.mrboxes[i].maxhp;
				this.mrboxes[i].publiclabel = this.mrboxes[i].hp;
				}
			if (this.mrboxes[i].ai=="randomwalk"){
				//console.log(this.mrboxes[i].xdir);
				this.mrboxes[i].vx = this.mrboxes[i].vx + this.mrboxes[i].xdir*0.5;
				if ((time+i)%20==0){
					this.mrboxes[i].xdir = Math.floor(Math.random()*3) - 1;//-1, 0, or 1
					}
				}
	
			i++;
			}
		var i=0;
		while(i<this.bboxes.length){
			this.bboxes[i].x = this.bboxes[i].x + this.bboxes[i].vx;
			this.bboxes[i].y = this.bboxes[i].y + this.bboxes[i].vy; 
			i++;
			}
		//bullet modifier boxes and motion modifier boxes are assumed static for now, but if that changes,
		//their updates will go here.
		}
	
	collideall(){
		var i=0;
		while(i<this.mrboxes.length){//Check all moving rigid boxes (mostly characters)
			var j=0;
			this.mrboxes[i].grounded = false;
			while(j<this.srboxes.length){//against all static rigid boxes (walls, terrain)
				var totalxs = this.mrboxes[i].xs+this.srboxes[j].xs;
				var dx = this.mrboxes[i].x-this.srboxes[j].x;
				if (Math.abs(dx)<totalxs){
					var totalys = this.mrboxes[i].ys+this.srboxes[j].ys;
					var dy = this.mrboxes[i].y-this.srboxes[j].y;
					if (Math.abs(dy)<totalys){//A collision happened!
						this.mrboxes[i].terraincollide(this.srboxes[j]);
						//Some kind of collision goes here
						}
					}
				j++;
				}
			var j=0;
			while(j<this.bboxes.length){//against all static rigid boxes (walls, terrain)
				var totalxs = this.mrboxes[i].xs+this.bboxes[j].xs;
				var dx = this.mrboxes[i].x-this.bboxes[j].x;
				if (Math.abs(dx)<totalxs){
					var totalys = this.mrboxes[i].ys+this.bboxes[j].ys;
					var dy = this.mrboxes[i].y-this.bboxes[j].y;
					if (Math.abs(dy)<totalys){//bullet hits character
						this.mrboxes[i].hp = this.mrboxes[i].hp - this.bboxes[j].hp;
						this.mrboxes[i].publiclabel = this.mrboxes[i].hp;
						this.bboxes[j].hp = 0;
						}
					}
				j++;
				}			
			var j=0;
			while(j<this.mmboxes.length){//against all movement modifiersn)
				var totalxs = this.mrboxes[i].xs+this.mmboxes[j].xs;
				var dx = this.mrboxes[i].x-this.mmboxes[j].x;
				if (Math.abs(dx)<totalxs){
					var totalys = this.mrboxes[i].ys+this.mmboxes[j].ys;
					var dy = this.mrboxes[i].y-this.mmboxes[j].y;
					if (Math.abs(dy)<totalys){//A collision happened!
						this.mrboxes[i].vy = this.mrboxes[i].vy + this.mmboxes[i].hp;//hp is used to define acceleration here.  It's fine.
						//need to add provision for more diverse movement modifiers

						}
					}
				j++;
				}			
			var j=0;
			while((i==0)&&(j<this.itboxes.length)){//Just the 1st mrbox against all the item boxes
				//var player = mrboxes[i];
				var totalxs = this.mrboxes[i].xs+this.itboxes[j].xs;
				var dx = this.mrboxes[i].x-this.itboxes[j].x;
				if (Math.abs(dx)<totalxs){
					var totalys = this.mrboxes[i].ys+this.itboxes[j].ys;
					var dy = this.mrboxes[i].y-this.itboxes[j].y;
					if (Math.abs(dy)<totalys){//A collision happened!
						//player picks up item
						if (this.itboxes[j].label=="hp20"){
							this.mrboxes[i].hp = this.mrboxes[i].hp + 20;
							if (this.mrboxes[i].hp>this.mrboxes[i].maxhp){ this.mrboxes[i].hp = this.mrboxes[i].maxhp; }
							this.mrboxes[i].publiclabel = this.mrboxes[i].hp;
							this.itboxes.splice(i,1);
							}
						else if (this.itboxes[j].label=="g2"){
							hasweapons[2] = true;//global scope shame
							this.itboxes.splice(i,1);
							}
						else if (this.itboxes[j].label=="g3"){
							hasweapons[3] = true;
							this.itboxes.splice(i,1);
							}
						else if (this.itboxes[j].label=="g4"){
							hasweapons[4] = true;
							this.itboxes.splice(i,1);
							}
						}
					}
				j++;
				}				
			i++;
			}
		var i=0;
		while(i<this.bboxes.length){//Check all bullet boxes
			var j=0;
			while(j<this.srboxes.length){//against all static rigid boxes (walls, terrain)
				var totalxs = this.bboxes[i].xs+this.srboxes[j].xs;
				var dx = this.bboxes[i].x-this.srboxes[j].x;
				if (Math.abs(dx)<totalxs){
					var totalys = this.bboxes[i].ys+this.srboxes[j].ys;
					var dy = this.bboxes[i].y-this.srboxes[j].y;
					if (Math.abs(dy)<totalys){//Bullet strikes wall collision
						if ((this.bboxes[i].solid==2)||(this.srboxes[j].solid==2)){//elastic bullets
							var overlapx = totalxs - Math.abs(dx);
							var overlapy = totalys - Math.abs(dy);
							//console.log(overlapy)
							if (overlapx<overlapy){//resolve by modifying x
								//if ((overlapy<maxstep)&&(dy<0)){this.bboxes[i].y = this.bboxes[i].y - overlapy;}
								//else{
									if (dx>0){//this feels avoidable but ok
										this.bboxes[i].x = this.bboxes[i].x + overlapx;
										}
									else {
										this.bboxes[i].x = this.bboxes[i].x - overlapx;
										}
									//this.vx = -1*this.vx;
									//}
								this.bboxes[i].vx = -1*this.bboxes[i].vx;
								}
							else{//resolve by modifying y
								if (dy>0){//this feels avoidable but ok
									this.bboxes[i].y = this.bboxes[i].y + overlapy;
									}
								else {
									this.bboxes[i].y = this.bboxes[i].y - overlapy;
									this.bboxes[i].grounded = true;
									}
								this.bboxes[i].vy = -1*this.bboxes[i].vy;
								}						
							this.bboxes[i].vy = -1*this.bboxes[i].vy;
							//bounce collision here
							}
						else{//On inelastic materials, just kill the bullet.
							this.bboxes[i].hp = 0;
							this.bboxes[i].vx = 0;
							}
						}
					}
				j++;
				}
			var inmod = false;
			var j=0
			while(j<this.bmboxes.length){//against all bullet modifier boxes
				var totalxs = this.bboxes[i].xs+this.bmboxes[j].xs;
				var dx = this.bboxes[i].x-this.bmboxes[j].x;
				if (Math.abs(dx)<totalxs){
					var totalys = this.bboxes[i].ys+this.bmboxes[j].ys;
					var dy = this.bboxes[i].y-this.bmboxes[j].y;
					if (Math.abs(dy)<totalys){//Bullet entered modifier
						inmod = true;
						if (this.bboxes[i].label == "0"){
						//console.log("*tried 0");
							if (this.bmboxes[j].label == "*"){
								//console.log("*tried");
								this.bboxes[i].hp = this.bboxes[i].hp * this.bmboxes[j].hp;
								}
							if (this.bmboxes[j].label == "/"){
								var result = this.bboxes[i].hp / this.bmboxes[j].hp;
								if (result==Math.floor(result)){//division successful!
									this.bboxes[i].hp = result;
									}
								else{
									this.bboxes[i].hp = 0;
									}
								}
							else if (this.bmboxes[j].label == "+"){
								this.bboxes[i].hp = this.bboxes[i].hp + this.bmboxes[j].hp;
								}
							else if (this.bmboxes[j].label == "-"){
								this.bboxes[i].hp = this.bboxes[i].hp - this.bmboxes[j].hp;
								}
							this.bboxes[i].publiclabel = this.bboxes[i].hp;
							//Bullet is in bullet modifier box
							//Need to modify bullet hp according to value and function of 
							}
						}
					}
				j++;
				}
			if (inmod==true){ this.bboxes[i].label = "1"; }
			else { this.bboxes[i].label = "0"; }
			var j=0
			while(j<this.mmboxes.length){//against all motion modifier boxes (walls, terrain)
				var totalxs = this.bboxes[i].xs+this.mmboxes[j].xs;
				var dx = this.bboxes[i].x-this.mmboxes[j].x;
				if (Math.abs(dx)<totalxs){
					var totalys = this.bboxes[i].ys+this.mmboxes[j].ys;
					var dy = this.bboxes[i].y-this.mmboxes[j].y;
					if (Math.abs(dy)<totalys){//Bullet is in motion modifier box
						this.bboxes[i].vy = this.bboxes[i].vy + this.mmboxes[i].hp;//hp is used to define acceleration here.  It's fine.
						//need to add provision for more diverse movement modifiers
						}
					}
				j++;
				}
			if (this.bboxes[i].hp<=0){
				this.bboxes.splice(i,1);
				}
			else{
				i++
				}
			}
		}
	drawall(viewx,viewy){
		var i=0;
		while(i<this.srboxes.length){
			this.srboxes[i].drawboxfill(viewx,viewy);
			i++;
			}
		var i=0;
		while(i<this.mrboxes.length){
			//console.log("itriedtodrawmrboxes");
			this.mrboxes[i].drawboxoutline(viewx,viewy);
			this.mrboxes[i].drawlabel(viewx,viewy);
			i++;
			}	
		var i=0;
		while(i<this.bboxes.length){
			//console.log("itriedtodrawmrboxes");
			this.bboxes[i].drawboxoutline(viewx,viewy);
			this.bboxes[i].drawlabel(viewx,viewy);
			//console.log(this.bboxes[i].publiclabel);
			i++;
			}	
		var i=0;
		while(i<this.bmboxes.length){
			//console.log("itriedtodrawmrboxes");
			this.bmboxes[i].drawboxoutline(viewx,viewy);
			this.bmboxes[i].drawlabel(viewx,viewy);
			//console.log(this.bboxes[i].publiclabel);
			i++;
			}	
		var i=0;
		while(i<this.itboxes.length){
			//console.log("itriedtodrawmrboxes");
			this.itboxes[i].drawboxoutline(viewx,viewy);
			this.itboxes[i].drawlabel(viewx,viewy);
			//console.log(this.bboxes[i].publiclabel);
			i++;
			}	
		}
	addstairs(x1,y1,x2,y2,stairdy,color){
		var dx = x2-x1;
		var dy = y2-y1;
		var stairnum = Math.floor(dy/stairdy);
		var stairdx = Math.floor(dx/stairnum);
		var i=0;
		while(i<stairnum){
			var nextstair = new Umb(stairdx*i+x1, stairdy*i+y1, stairdx, stairdy ,0 ,1 );//constructor(xx,yy,xxs,yys,hp,solid)
			nextstair.c = color;
			this.srboxes.push(new Umb(nextstair));
			console.log(nextstair.x+" "+nextstair.y,this.srboxes.length);
			i++;
			}
		}
	}