var numRows;
var numCols;
var walls;
var showCells;

function createAllWalls(maxRow,maxCol){
	var walls=[];
	var k=0;
	//create all the vertical walls
	for(var i =0 ;i <maxRow;i++){
		for(var j=0;j < maxCol-1;j++){
			walls.push([((j+1)+(maxCol*i)),((j+2) + (maxCol*i))]);
		}
	}

	for(var i = 0;i < maxCol; i++){
		for(var j=0;j < maxRow-1;j++){
			walls.push([((j*maxCol+1)+(i)),(((j+1)*maxCol + 1)+(i))]);
		}
	}
	return walls;
}
function drawWalls(walls, maxRow, maxCol){
	var x;
	var y;
	var k=1;

	for(var i=0; i<walls.length;i++){
		x=((walls[i][0]-1)%maxCol)+1;
		y=(int((walls[i][0]-1)/maxCol));
		//vertical line
		if(walls[i][0]+1 == walls[i][1]){
			line(x*50,y*50,x*50,(y+1)*50);
		}
		//horizontal line
		else{
			line((x-1)*50,(y+1)*50,x*50,(y+1)*50);
		}
	}
	if(showCells){
		for(var i=0;i<maxRow;i++){
			for(var j=0;j<maxCol;j++){
				num=""+k;
				text(k,(j*50)+5, (i*50)+15);
				k++;
			}
		}
	}
}
function makeMaze(walls, numRows, numCols){
	//put your code here

}

function setup(){
	rowLabel=createDiv("row: ");
	rowSlider = createSlider(1, 20, 10);
	colLabel=createDiv("col: ");
	colSlider = createSlider(1, 16, 8);
	rowLabel.position(1,10);
	rowSlider.position(50,10);
	colLabel.position(200,10);
	colSlider.position(250,10);

	button = createButton('makeMaze');
	button.mousePressed(setSize);
	button.position(400,10);

	button2 = createButton('show cell numbers');
	button2.mousePressed(setNumbers);
	button2.position(500,10);

	c=createCanvas(1000,800);
	c.position(1,50);
	showCells=true;
	noLoop();

}
function setSize(){
	numRows=rowSlider.value();
	numCols=colSlider.value();
	walls=createAllWalls(numRows,numCols);
	makeMaze(walls,numRows,numCols);
	loop();
}
function setNumbers(){
	showCells=!showCells;
}
function draw(){
	background(0,0);
	rect(0,0,numCols*50,numRows*50);
	drawWalls(walls,numRows,numCols);

}