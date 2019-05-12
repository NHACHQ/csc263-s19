var rectangles = [[10,90,200],[40,100,400],[50,130,120],[120,270,300],[150,180,400],[230,250,320],
						[170,300,90], [350,550,200],[390,430,250],[500,650,150]];
var rectColours=[];
var edge;
var startButton;

var Edge = function(){
	var that={};
	var ptlist_;
	var lines=[[0,0,0,0]];

	//next point we are headed to.
	var curr_=0;
	//direction
	var xdir_=1;
	var ydir_=0;

	//Want to check if your algorithm works?  
	//replace this stub function setEdges which is
	//hardcoding the solution with your own.  This function receives the list of
	//rectangles when the start button gets pressed and sets up the ptlist_ 
	that.setEdges = function(rects){
		ptlist_=[[10,200],[40,400],[100,120],[120,300],[150,400],[180,300],[230,320],[250,300],
					[270,90],[300,0],[350,200],[390,250],[430,200],[550,150],[650,0]];
	}
	that.draw = function(){
		push();
		stroke(255,0,0);
		fill(255,0,0);
		strokeWeight(3);
		var last = lines.length-1;
		if(ptlist_!=undefined){
			if(!(lines[last][2]==displayWidth && lines[last][3]==0)){
				if(xdir_==1){

					if(ptlist_[curr_][0] == lines[last][2]){
						xdir_=0;
						ydir_=(ptlist_[curr_][1]-lines[last][3])/abs(ptlist_[curr_][1]-lines[last][3]);	
						lines.push([lines[last][2],lines[last][3],lines[last][2],lines[last][3]]);
					}
				}
				else{
					if(ptlist_[curr_][1] == lines[last][3]){
						xdir_=1;
						ydir_=0;
						ellipseMode(CENTER);
						lines.push([ptlist_[curr_][0],ptlist_[curr_][1],ptlist_[curr_][0],ptlist_[curr_][1]]);
						curr_++;
						if(curr_ == ptlist_.length){
							ptlist_.push([displayWidth+1,0]);
						}
					}
				}
				last = lines.length-1;
				lines[last][2]+=xdir_;
				lines[last][3]+=ydir_;
			}

			for(var i=0;i<lines.length;i++){
				line(lines[i][0],lines[i][1],lines[i][2],lines[i][3]);
			}
			
			for(var i=0;i<min(curr_,ptlist_.length);i++){
				push();
				ellipseMode(CENTER);
				if(dist(ptlist_[i][0],ptlist_[i][1],mouseX,mouseY)<=5){
					ellipse(ptlist_[i][0],ptlist_[i][1],10,10);
				}
				else{
					ellipse(ptlist_[i][0],ptlist_[i][1],5,5);					
				}
				pop();
				push();
				strokeWeight(1);
				if(dist(ptlist_[i][0],ptlist_[i][1],mouseX,mouseY)<=5){
					stroke(255,0,0);
					fill(255,0,0);
				}
				else{
					stroke(0,0,0);
					fill(0,0,0);					
				}
				textSize(14);
				text('pt ' + (i) + ' : (' + ptlist_[i][0] + ' , ' + ptlist_[i][1]+ ')', 700,200+i*18);
				pop(); 			
			}
		}
		pop();
	}
	return that;
};
function startLine(){
	edge.setEdges(rectangles);
}
function setup() {
	startButton=createButton("Start");
    startButton.mousePressed(startLine);
	createCanvas(900,500);

	for(var i=0;i<rectangles.length;i++){
		var r=random(0,235);
		var g=random(0,235);
		var b=random(0,235);
		rectColours.push(color(r,g,b,150));
	}
	edge=Edge();

}
function draw() {
	//wipe previous frame
	background(255,255,255);

	for(var i=0;i<rectangles.length;i++){
		push();
		textSize(14);
		if((mouseX >=500 && mouseX <=650) && (mouseY >250+(i-1)*20 && mouseY <= 250+(i)*20)){
			strokeWeight(2);
			fill(red(rectColours[i])+10,green(rectColours[i])+10,blue(rectColours[i])+10,200);
		}
		else{		
			fill(rectColours[i]);
		}
		text('rect ' + (i) + ' : (' + rectangles[i][0] + ' , ' + rectangles[i][1] + ' , ' + rectangles[i][2]+ ')', 500,250+i*20);
		rect(rectangles[i][0],0,rectangles[i][1]-rectangles[i][0],rectangles[i][2]);
		pop();
	}
	edge.draw();

}