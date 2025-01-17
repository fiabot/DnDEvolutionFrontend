import {useState, useEffect} from 'react';
import StringList from "../CommonComponents/StringListComponent"
import NumberInput from '../CommonComponents/NumberInput';
import { getStaticEvolution } from '../API/SendToApi';
import { getMonsters, getPlayers } from '../API/GetFromApi';
import SetStageDifficulties from './SetStageDifficulties';
import DisplayStages from './DisplayStages';





export default StaticEvolution = () => {

    let [partyNames, setPartyNames] = useState([])
    let [monsterNames, setMonsterNames] = useState([])
    let [difficulties, setDifficulties] = useState([])
    let [endText, setEndText] = useState(<div>Waiting to submit</div>)

    let [playerOptions, setPlayerOptions] = useState([])
    let [monsterOptions, setMonsterOptions] = useState([])
    let [stages, setStages] = useState(3)
    let [generation, setGeneration] =useState(10)
    let [popsize, setPopsize] = useState(10)
    let [elistism, setElitism] = useState(3) 


      useEffect(() =>{
        async function getData() {
            
            playerMan = await getPlayers(true); 
            monsterMan = await getMonsters(true); 
            setPlayerOptions(playerMan)
            setMonsterOptions(monsterMan)
        }
        getData()
      }, [])

      let playerSelect = playerOptions.length > 0 ?  <StringList 
                li={partyNames} 
                setLi = {setPartyNames} 
                options={playerOptions}
                title = "Party Members" 
                noun = "party"
                /> 
            : <div>Loading Players</div>

        let monsterSelect = monsterOptions.length > 0 ?  <StringList 
                li={monsterNames} 
                setLi = {setMonsterNames} 
                title = "Possible Monsters" 
                noun = "monster list"
                options={monsterOptions}
                />
        : <div>Loading Monsters</div>


    let evolveMonsters =() => {
        return new Promise(async (resolve, reject) =>{
            monsters = await getStaticEvolution(partyNames, monsterNames, difficulties, generation=generation, popsize=popsize, elistism=elistism)
            resolve(monsters)
        })
    }

    let startEvolution = () => {
        setEndText(<div>Evolving....</div>)
        evolveMonsters().then((monsters) => {
            setEndText(<div>
                <DisplayStages stages = {monsters}/>
            </div>)
        })
    }
 
    return (<div>
        <h1>Evolve an encounter!</h1>
        {playerSelect}
        {monsterSelect}

    
    <SetStageDifficulties setDifficulties={setDifficulties} setStage={setStages} stages={stages}/>
   

    <div>

            <NumberInput 
                num={generation}
                setNum={setGeneration}
                prompt="Generations"
            />

            <NumberInput 
                num={popsize}
                setNum={setPopsize}
                prompt="Population size"
            />

        <NumberInput 
                num={elistism}
                setNum={setElitism}
                prompt="Number of elites"
            />
        </div>

    
        <button onClick={startEvolution}>Start Evolution!</button>

    <h1>Generated encounter:</h1>
    {endText}
    </div>)



}