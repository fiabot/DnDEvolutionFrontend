import { useState, useEffect } from "react";
import DisplayStatBlock from "./DisplayStatBlock"
import { getMonsters, getPlayers, getStats } from '../API/GetFromApi';

import Select  from 'react-select';

export default SearchManual = ({}) =>{
    let [options, setOptions] = useState([]) 
    const [selectedOption, setSelectedOption] = useState(null);
    let [statBlock, setStatblock] = useState(<p>Search results: </p>)
    useEffect(() =>{
        async function getData() {
            
            playerMan = await getPlayers(true); 
            monsterMan = await getMonsters(true); 
            setOptions(playerMan.concat(monsterMan))
        }
        getData()
      }, [])



    let statsPromise =(search) => {
        return new Promise(async (resolve, reject) =>{
            
            stats = await getStats(search.value)
            resolve(stats)
        })
    }

    let onSearch = (search) => {
        statsPromise(search).then((stats) => {
            setStatblock(<DisplayStatBlock stats={stats}/>)
        }
        )
    }


    let creatureSelect = options.length > 0 ?  
        <Select
        
            onChange={onSearch}
            options={options}
        />
    : <div>Loading Creature</div>

    

      return (<div>
        {creatureSelect} 
  
        <br/>
        {statBlock}
      </div>)
}