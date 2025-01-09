
import {useState, useEffect} from 'react';
import "./styles.css"
import Select, { MultiValue } from 'react-select';
import { MultiSelect } from "react-multi-select-component";

let addToList = (li, setLi, ele) => {
    setLi([... li, ele])
} 



export default StringList = ({li, setLi, title, noun, options, overwrite = null}) => {

    const [text, setText] = useState('');
    const [selected, setSelected] = useState([]);
    const [li2, setLi2] = useState([]); 
    
    let submitText = () => {
        addToList(li, setLi, text)
        setText("")
    }

    if (overwrite != null){
    
        useEffect(() => {
            console.log(overwrite)
            if (overwrite.length > 0){
                setSelected(overwrite.map((el) => {return {value: el, label:el}}))
            }
          
        }, [overwrite])
    }



    useEffect(() => {
        setLi(li => selected.map((el) => el.value)) 
        //console.log(selected.map((el) => el.value))
    }, [selected])

 

    return (<div >
        <h3>{title}</h3>
        <div className='listInputContainer'> 
        <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
        className='listSelect'
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