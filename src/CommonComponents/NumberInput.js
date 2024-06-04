import {useState} from 'react';
import "./styles.css"



export default NumberInput = ({num, setNum, prompt}) => {


    return (<div className='numInputContainer'>

        {prompt}
         <input 
        className = "numInput"
        onChange={e => setNum(e.target.value)}  
        value={num}
        
      />

    </div>)

}