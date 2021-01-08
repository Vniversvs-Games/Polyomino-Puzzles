const centralGrid=document.querySelector(".the-grid");
const rowtest=document.querySelector(".row-test")

let directions = [[1,0], [0, 1], [-1,0], [0,-1]];
let rotationMatrix90 = [[0,-1],[1,0]];
let rotationMatrix180 = [[-1,0],[0,-1]];
let rotationMatrix270 = [[0,-1],[1,0]];

let findNextCell = function(cellposition, direction){
    return [cellposition[0]+direction[0], cellposition[1]+direction[1]];
}

function cell(row, position, State, divPosition){
    this.row=row;
    this.position=position;
    this.State=State;
    this.divPosition = divPosition;
    this.getGridPosition = [this.row.position, this.position];
    // deixa a changeState?
    this.changeState=function(){
        this.State=1-this.State;
        this.div.innerHTML = this.State;
        // this.innerHTML=this.State;
        // console.log(this.State);
    }

    this.getState = function(){
        return this.State;
    }

    this.createDiv = function(){
        let state=this.getState();
        let gridPos=this.getGridPosition;
        console.log(state);
        let cellDiv = document.createElement("div");
        cellDiv.className="cell";
        cellDiv.classList.add(this.position);
        cellDiv.innerHTML=this.State;
        cellDiv.addEventListener("click", function(){
            state=1-state;
            // console.log(state);
            // let a = this.getGridPosition();
            // console.log(gridPos);
            this.State=state;
            cellDiv.innerHTML=this.State;
        });
        return cellDiv;    
    }

    let cellDiv=this.createDiv();

    this.div = cellDiv;

    this.divstyle = function(div){
        div.style.position = "absolute";
        div.style.left=this.divPosition+"px";
        // div.style.top=divPosition[1]+"px";    }
    }

    this.getRow = function(){
        return this.row;
    }

    this.divstyle(this.div);
}

function gridRow(position, size, divPosition){
    this.position=position;
    this.size=size;
    this.divPosition = divPosition;
    let rowDiv=document.createElement("div");
    rowDiv.className="row";
    rowDiv.classList.add(position.toString());
    // this.rowDiv=rowDiv;
    this.div=rowDiv;
    this.cells = []
    
    this.addCell = function(position){
        let divPosition = position*30;
        divPosition=divPosition.toString();
        newCell = new cell(this, position, 0, divPosition);
        this.cells.push(newCell);
        this.div.appendChild(newCell.div);
    }

    this.getCell = function(position){
        return this.cells[position-1];
    }

    this.fillRow = function(){
        let i=1;
        let pos=30;
        
        while(i<=size){
            // console.log(i)
            this.addCell(i, pos.toString());
            i+=1;
            pos+=30;
            // console.log(i);
            // console.log(pos);
        }
    }

    this.fillRow();
    this.getCell =  function(position){
        return this.cells[position-1];
    }

    this.divStyle = function(div){
        div.style.position="absolute";
        div.style.top=this.divPosition+"px";
    }

    this.divStyle(this.div);
}

function GridObject(parameters){
    this.parameters=parameters;
    // console.log(parameters[0]);
    // console.log(parameters[1]);
    let gridDiv = document.createElement("div");
    gridDiv.classList.add("central-grid");
    this.gridDiv = gridDiv;
    centralGrid.appendChild(this.gridDiv)
    // gridDiv.style.color="red";
    // gridDiv.innerHTML="0"
    this.gridDiv = gridDiv;
    this.rows = [];
    this.addRow=function(position){
        let divPosition=position*30;
        divPosition=divPosition.toString();
        newRow = new gridRow(position, this.parameters[1], divPosition); 
        this.rows.push(newRow);
        this.gridDiv.appendChild(newRow.div);
        // gridDiv.style.position="absolute";
        // centralGrid.appendChild(gridDiv);
    }

    this.getRow = function(position){
        return this.rows[position-1];
    }

    this.getCell = function(parameters){
        return this.getRow(parameters[0]).getCell(parameters[1]);
    }

    this.fillGrid = function(){
        let i = 1;
        while(i<=this.parameters[0]){
            this.addRow(i);
            i+=1;
            // console.log("banana");
        }
    }
    this.fillGrid();

}

// matrices must be defined row by row.




let innerProduct = function(vector1, vector2){
    let sum = 0;
    var nelem;
    for(nelem=0; nelem < vector1.length; nelem++){
        sum+=vector1[nelem]*vector2[nelem];
    }
    return sum;
}

let applyMatrix = function(matrix, vector){
    resultVector=[];
    var rownum;
    for(rownum=0; rownum<vector.length; rownum++){
        resultVector.push(innerProduct(matrix[rownum], vector));
    }
    return resultVector;
}

let rotation = function(degrees){
    if(degrees === 90){
        return [[[1,0], [0,1]], ["u", "l"], ["l", "d"], ["d", "r"]];
    } else if(degrees === 180){
        return [["r", "l"], ["u", "d"], ["l", "r"], ["d", "u"]];
    } else if (degrees === 270){
        return [["r", "d"], ["u", "r"], ["l", "u"], ["d", "l"]];
    }
}

let rotateOne = function(direction, degrees){
    let answer1 = rotation(degrees);
    // console.log(answer1);
    i=0;
    while(i<4){
        if(direction===answer1[i][0]){
            return answer1[i][1];
        }
        i+=1;
    }
}

// console.log(rotateOne("r", 90))

let reflection = function(grid){
}

let rotateSequence = function(sequence, degrees){
    newSeq = [];
    sequence.forEach
}


function polyomino(sequence,symmetries){
    this.sequence=sequence;
    this.symmetries=symmetries;

    this.getSize = function(){

    }

    this.transform = function(matrixTransform){
        newSeq = [];
        var j;
        for(j=0; j<this.sequence.length; j++){
            newSeq.push(applyMatrix(matrixTransform, this.sequence[j]));
        }   
        return newSeq;
    }

    this.findCells = function(clickedCell){
        occupiedCells=[gameGrid.getCell(clickedCell)];
        // let seq = this.sequence;
        // console.log(seq);
        i=0;
        while(i<this.sequence.length){
            let nextCell = findNextCell(clickedCell, this.sequence[i]);
            // console.log(nextCell);
            // console.log(gameGrid.getCell(nextCell));
            occupiedCells.push(gameGrid.getCell(nextCell));
            // console.log(occupiedCells);
            // console.log(nextCell.getGridPosition);
            clickedCell=nextCell;
            i+=1;
        }
        return occupiedCells;
    }

    

    this.place = function(clickedCell){
        let cells=this.findCells(clickedCell);
        console.log(cells.length);
        var j;
        for(j=0; j<cells.length; j++){
            // console.log(gameGrid.getCell(cells[j]));
            // console.log(j);
        // cells[j].changeState();
            console.log(cells[j].State);
            cells[j].changeState();
            console.log(cells[j].State);
        }
        // let cellPos = cell.getGridPosition();
    }
}


const gameGrid = new GridObject([8, 9]);

const triL1 = new polyomino(sequence=[[0, 1], [1, 0]], symmetries=0);
// console.log(triL1.sequence);
let clickedCell = [3,3];
triL1.place(clickedCell);

// console.log(triL1.findCells(clickedCell));

// console.log(triL1.transform(rotationMatrix180))

// const triL1 = polyomino(["r", "d"]);
// const triL1 = polyomino(["d", "l"]);
// const triL1 = polyomino(["l", "u"]);








// console.log(gameGrid.getCell([3,5]).getGridPosition);


// newRow = new gridRow(1, 8, 1);
// rowtest.appendChild(newRow.div);




// console.log(newRow.getCell(1).State);
// newRow.getCell(1).changeState();
// console.log(newRow.getCell(1).State);
// console.log(centralGrid.rows);
// console.log(centralGrid.rows[0].cells);
// console.log(centralGrid.rows[1].cells);
// console.log(centralGrid);


















