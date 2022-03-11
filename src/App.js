import logo from './logo.svg';
import './App.css';
import React,{useState} from 'react'
import Select from 'react-select';
import Grid3 from './Grid';


const optionsSize = [
  { value: 6, label: '6 x 6' }, 
  { value: 8, label: '8 x 8' },
  { value: 10, label: '10 x 10' },
  { value: 20, label: '20 x 20' },
  { value:30, label: '30 x 30' },
  { value: 50, label: '50 x 50' },
  { value: 50, label: '75 x 75' },
  { value: 100, label: '100 x 100' },
];
const seeds=[
{ value: 0.1, label: 'Low' },
{ value: 0.3, label: 'Medium' },
{ value: 0.5, label: 'Large' },
]

const speeds=[
{ value: 8888888, label: 'Stop' },
{ value: 2000, label: 'Very Slow' },
{ value: 1000, label: 'Slow' },
{ value: 500, label: 'Normal' },
{ value: 200, label: ' Fast' },
{ value: 0, label: 'Very Fast' },
]

const optionsMode = [
{ value: 'Rectangle', label: 'Rectangle' },
{ value: 'Diamond', label: 'Diamond' },
{ value: 'Cross', label: 'Cross' },
{ value: 'Circular', label: 'Circular' },
{ value: 'Ring', label: 'Ring' },
];

const walls=[
{ value: false, label: 'Not Active' },
{ value: true, label: 'Alive' },
]

const policies=[
{ value: 'ConWay', label: 'ConWay' },
{ value: 'Hyperactive:', label: 'Hyperactive:' },
{ value: 'High Life', label: 'High Life' },
{ value: 'Spontaneous', label: 'Spontaneous' },
]

function App() {
  const [size,setSize]=useState({ value: 10, label: '10 x 10' });
  const [seed,setSeed]=useState({ value:0.3, label: 'Medium' });
  const [speed,setSpeed]=useState({ value: 500, label: 'Normal' });
  const [shape,setShape]=useState({ value: 'Cross', label: 'Cross' });
  const [aliveWalls,setAliveWalls]=useState({ value: false, label: 'Not Active' });
  const [policy,setPolicy]=useState({ value: 'ConWay', label: 'ConWay' });
  const [start,setStart]=useState(false);
  return (
    <div className="App">
      <h1 >Game Of Life</h1>
      <div id="content">
      <div id="selects">
      <div >
        <label>Size:</label>
        <Select defaultValue={size}
                onChange={setSize}
                options={optionsSize}
                className="select"/>
        </div>
      <div>
        <label>Seed:</label>
        <Select
          defaultValue={seed}
          onChange={setSeed}
          options={seeds}
          className="select"
        />
      </div>
     <div>
      <label>Speed:</label>
      <Select
          defaultValue={speed}
          onChange={setSpeed}
          options={speeds}
          className="select"
        />
     </div>
     <div>
      <label>Shape:</label>
        <Select
          defaultValue={shape}
          onChange={setShape}
          options={optionsMode}
          className="select"/>
     </div>
     <div>
      <label>Walls:</label>
                <Select
          defaultValue={aliveWalls}
          onChange={setAliveWalls}
          options={walls}
          className="select"

        />
     </div>
     {/* <div>
      <label>Policy :</label>
      <Select
          defaultValue={policy}
          onChange={setPolicy}
          options={policies}
          className="select"
        />
      </div> */}
      <button onClick={()=>{setStart(!start)}}>{start?"Stop":"Start"}</button>
     </div>
       <div id="grid">
       <Grid3 size={size} speed={speed}  seed={seed} shape={shape} aliveWalls={aliveWalls} runningState={start}/>
       </div>
      </div>
    </div>
  );
}
export default App;
