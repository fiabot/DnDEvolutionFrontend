
import {useState, useEffect} from 'react';
import "./styles.css"
import Select, { MultiValue } from 'react-select';
import { MultiSelect } from "react-multi-select-component";

let addToList = (li, setLi, ele) => {
    setLi([... li, ele])
} 



export default StringList = ({li, setLi, title, noun, options}) => {

    const [text, setText] = useState('');
    const [selected, setSelected] = useState([]);
    const [li2, setLi2] = useState([]); 
    
    let submitText = () => {
        addToList(li, setLi, text)
        setText("")
    }

    useEffect(()=>{
        console.log("li: " + li)
        setLi(li2)
    }, [li2])

    useEffect(() => {
        console.log(selected)
        //console.log(setLi)
        setLi(li => selected.map((el) => el.value)) 
        //console.log(selected.map((el) => el.value))
    }, [selected])

 

    return (<div>
        <h2>{title}</h2>
        <div className='listInputContainer'> 
        <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
      />
        {/*<Select
        isMulti
        onChange={onSelectedChange}
        name="noun"
        options={options}

    />*/}
      </div>
      <p>{noun} : {li.join(" , ")}</p>
    </div>)

}