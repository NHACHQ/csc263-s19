var rectangles = [[10,320,200],[40,100,400],[50,130,120],[120,270,300],[150,180,400],[230,250,320],
						[170,300,90], [350,550,200],[390,430,250],[500,650,150]];
var rectColours=[];
var edge;
var startButton;
const x1=0;
const x2=1;
const h = 2;

var Heap = function(rects){
	var that = {};
	var heap_=rects || [];
	LEFT = function(idx){
		return idx*2+1;
	}
	RIGHT = function(idx){
		return idx*2+2;
	}
	PARENT = function(idx){
		return floor((idx-1)/2);
	}
	that.maxHeapify = function(idx,gt,sz){
		var largest=idx;
		var left = LEFT(idx);
		var right= RIGHT(idx);
		var n = sz || heap_.length; 
		if(left < n && gt(heap_[left],heap_[largest])){
			largest=left;
		}
		if(right < n && gt(heap_[right],heap_[largest])){
			largest=right;
		}
		if(largest!=idx){
			var tmp=heap_[idx];
			heap_[idx]=heap_[largest];
			heap_[largest]=tmp;
			that.maxHeapify(largest,gt);
		}
	}
	that.buildMaxHeap = function(gt){
		for(var i=floor((heap_.length-1)/2);i>=0;i--){
			that.maxHeapify(i,gt);
		}
	}
	that.extractMax=function(gt){
		var rc;
		if(heap_.length > 0){
			rc=heap_[0];
			var last = heap_.pop();
			if(heap_.length > 0){
				heap_[0]=last;
				that.maxHeapify(0,gt);
			}
		}
		return rc;
	}
	that.max=function(){
		return heap_[0];
	}

	that.push=function(v,gt){
		var curr=heap_.length;
		var found=false;
		while(curr!=0 && !found){
			var p=PARENT(curr);
			if(gt(v,heap_[p])){
				heap_[curr]=heap_[p];
				curr=p;
			}
			else{
				found=true;
			}
		}
		heap_[curr]=v;
	}
	that.getHeap=function(){
		return heap_;
	}
	that.size = function(){
		return heap_.length;
	}
	return that;
}

function cmpX(a,b){
	return (a[0] < b[0]);
}
function cmpH(a,b){
	return (a[1] > b[1]);
}
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
		var corners=[];
		ptlist_=[];

		//put all the corners of the bars into one big array.  The x coordinate of each point
		//is only place possible xpositions of the final set (the h coordinate doesn't have to come)
		//from same point though... - n steps
		for(var i=0;i<rects.length;i++){
			corners.push([rects[i][0],rects[i][2],0,i]);
			corners.push([rects[i][1],rects[i][2],1,i]);
		}

		//put all of these into a heap.  Note that though the heap is called a max heap
		//the cmpX function prioritizes smaller values so effectively it is a min heap.
		//n steps
		points=Heap(corners);
		points.buildMaxHeap(cmpX);


		//create an empty list.  This list contains the rectangles that are currently active
		//that is, these are the rectangles where we have ecountered the x1 point but not
		//yet ecountered the x2 point.  Note that only the top of the heap is guaranteed for this
		//to be true - constant
		active=Heap();
		currHeight=0;
		var top;



		//this loop extracts one point at a time from points.  Thus, it will run 2n times
		while(points.size() > 0){
			//get left most remaining point current point
			var pt=points.extractMax(cmpX);

			//if it is a starting point
			if(pt[2]==0){
				//add it to list of points
				active.push(pt,cmpH);

				//check to see if the tallest active point is taller and if it is
				//push the point into the the final ptlist
				top=active.max();
				if(top[1] != currHeight){
					ptlist_.push([pt[0],top[1]]);
					currHeight=top[1];
				}
			}
			//else if it is an ending point
			else{
				//check the top point in the heap
				top=active.max();
				//extract the top point if it belongs to the same rectangle as the current point
				//also extract any rectangles that are no longer valid (but may have been blocked)
				//by taller points.
				//after this loop, we guarantee that the point at the top of the heap is tallest active
				//point left
				while(active.size() > 0 && ((top[3]==pt[3]) || (rects[top[3]][1] <=pt[0]))){
					active.extractMax(cmpH);
					top=active.max();					
				}

				//if the heap is empty, the effectively the height is now 0, push a point in
				if(active.size() == 0){
					if(currHeight!=0){
						ptlist_.push([pt[0],0]);
						currHeight=0;
					}
				}
				//else if heap isn't empty
				else{
					top=active.max();
					//if the height has changed, add it to the output list
					if(currHeight!=top[1]){
						ptlist_.push([pt[0],top[1]]);
						currHeight=top[1];						
					}
					//set the current height
					currHeight=active.max()[1];
				}
			}
		}


//		ptlist_=[[10,200],[40,400],[100,120],[120,300],[150,400],[180,300],[230,320],[250,300],
//					[270,90],[300,0],[350,200],[390,250],[430,200],[550,150],[650,0]];
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