import React, { useEffect, useState } from "react";


const color=(value)=>{
    if(value===-1)
       return "black";
    if(value===1)
       return  "blue" ;
    return "white";
    
  }

  const positions = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0],
  ];



export default function Grid3(props){
    const{size,seed,speed,shape,aliveWalls,runningState}=props;
    const [initialState, setInitialState] = useState(null); //מניעת הפעלת אפקט ראשוני
    const [gameOver, setGameOver] = useState(0);
  
    const InitGrid=()=>{
        console.log("InitGrid");
        console.log(shape.value);
        console.log(size.value);
        let sizeSeed=size.value/(size.value*seed.value);
        const mgrid=[];
        for(let i=0;i<size.value;i++){
          const row=[];
          for(let j=0;j<size.value;j++){
              let sizeSeed=size.value/(size.value*seed.value);
              let num=Math.floor(Math.random()*sizeSeed);
              switch(shape.value){
                  case "Rectangle":
                      row.push(num>sizeSeed?0:num);
                      break;
                  case "Diamond":
                      ( j < size.value/2 && ( i < (size.value/2 - 1 - j) || i > (size.value/2 + j) ) || 
                      ( j > size.value/2 && ( i < (j - size.value/2) || i > (size.value/2 + (size.value - j) - 1)))) ? row.push(-1): row.push(num>=sizeSeed?0:num);
                      break;
                  case "Cross":
                      let crossSize = size.value / 3;
                      (i < crossSize || i > size.value - crossSize - 1) && (j < crossSize || j > size.value - crossSize - 1) ? row.push(-1) : row.push(num<sizeSeed?num:0);
                      break;
                  case "Circular":
                      let radius = size.value / 2.0; 
                      let center = radius - 0.5;
                      Math.pow(i - center, 2) + Math.pow(j - center, 2) > Math.pow(radius, 2) ? row.push(-1) : row.push(num>=sizeSeed?0:num);
                      break;
                  case "Ring":
                      let outerRadius = size.value / 2.0; 
                      let centerr = outerRadius - 0.5;
                      let innerRadius = size.value / 3.0;
                      (Math.pow(i - centerr, 2) + Math.pow(j - centerr, 2) > Math.pow(outerRadius, 2)) ||
                      (Math.pow(i - centerr, 2) + Math.pow(j - centerr, 2) < Math.pow(innerRadius, 2))
                      ? row.push(-1): row.push(num>=sizeSeed?0:num);
                      break;
              }
          }
          mgrid.push(row);
        }
      return mgrid;  
      }

  const [grid, setGrid] = useState(() => {
        return InitGrid() })
  const [prevGrid,setPrevGrid]=useState([])

   useEffect(() => {
    if (initialState === null) 
        setInitialState(1)
    else
        {
            setGrid(InitGrid())
            setGameOver(0);   
        } 
    },
     [size,seed,speed,shape,aliveWalls])

     
    let intervalId = null;
    if (intervalId === null && runningState) {
      intervalId=setTimeout(() => {
            console.log("interval");
            runSimulation();
        },speed.value);
    }

    useEffect(() => {
        if (!runningState) {
            return () => {
                clearTimeout(intervalId);
                intervalId = null;
            };
        }
        
    }, [runningState]);
    

    const runSimulation = () => {
        let gridCopy = JSON.parse(JSON.stringify(grid));
        for (let i = 0; i < size.value; i++) {
          for (let j = 0; j < size.value; j++) {
            let neighbors = 0;
    
            positions.forEach(([x, y]) => {
              const newI = i + x;
              const newJ = j + y;
    
              if (newI >= 0 && newI < size.value && newJ >= 0 && newJ < size.value && (grid[newI][newJ]!=-1 ||aliveWalls)) {
                neighbors += grid[newI][newJ];
              }
            });
            
            if(grid[i][j]!=-1)
            {
              if (neighbors < 2 || neighbors > 3) {
                gridCopy[i][j] = 0;
              } else if (grid[i][j] === 0 && neighbors === 3) {
                gridCopy[i][j] = 1;
              }
            }
          }
        }
        if (JSON.stringify(prevGrid) === JSON.stringify(gridCopy)) { //check if the game is over
            console.log("Game Over");
            setGameOver(1);
        }
        else 
           { 
            setPrevGrid([...grid]);
            setGrid([...gridCopy]);
           }
      };
      return (
          <>
                   <div style={{
    display: "grid",
    gridTemplateColumns: `repeat(${size.value}, ${600/size.value}px)`,
    width: "fit-content",
  }}>
          {grid?
            grid.map((rows, i) =>
            rows.map((col, k) => (
              <div key={`${i}-${k}`} 
              onClick={() => {
                let newGrid = JSON.parse(JSON.stringify(grid));
                newGrid[i][k] = grid[i][k] ==-1? -1 : grid[i][k]==1?0:1;
                setGrid(newGrid);
              }}
                style={{
                  width: 600/size.value,
                  height: 600/size.value,
                  backgroundColor: color(grid[i][k]) ,
                  border: "1px solid #595959",
                }}
              />
            ))
          ):""
          }
        </div>
        {gameOver?
        <h3 style={{color:"blue", textAlign: "center"}}>Game Over!</h3>:""}
          </>
      )
}




