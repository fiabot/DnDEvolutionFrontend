import {useState, useEffect} from 'react';
import StringList from "../CommonComponents/StringListComponent"
import NumberInput from '../CommonComponents/NumberInput';
import { getStaticEvolution } from '../API/SendToApi';
import { getMonsters, getPlayers } from '../API/GetFromApi';
import MIStage from './MIStage';
import DisplayStages from './DisplayStages';





export default MIEvolution = () => {

    let [partyNames, setPartyNames] = useState([])
    let [monsterNames, setMonsterNames] = useState([])
    let [stageSettings, setStageSettings] = useState([])
    let [endText, setEndText] = useState(<div>Waiting to submit</div>)
    let [lockedMonsters, setLockedMons] = useState([])

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

        let monsterSelect = playerOptions.length > 0 ?  <StringList 
                li={monsterNames} 
                setLi = {setMonsterNames} 
                title = "Possible Monsters" 
                noun = "monster list"
                options={monsterMan}
                />
        : <div>Loading Monsters</div>


    let evolveMonsters =() => {
        return new Promise(async (resolve, reject) =>{
            difficulties = stageSettings.map((stage) => {return stage.difficulty})
            monsterNames = stageSettings[0].possMons
            
            monsters = await getStaticEvolution(partyNames, monsterNames, difficulties, generation=generation, popsize=popsize, elistism=elistism)
            resolve(monsters)
        })
    }

    let updateLockedMonsters = (stages) => {
        setLockedMons(stages["stages"].map((stage) => stage.names))
    }

    let startEvolution = () => {
        setEndText(<div>Evolving....</div>)
        evolveMonsters().then((monsters) => {
            updateLockedMonsters(monsters)
            setEndText(<div>
                <DisplayStages stages = {monsters}/>
            </div>)
        })
    }
 
    return (<div>
        <h1>Mixed Initiative Evolution!</h1>
        {playerSelect}

    
    <MIStage setSettings={setStageSettings} settings={stageSettings} monsterMan={monsterOptions} lockedMonsterLi={lockedMonsters}  setStages={setStages} stages={stages}/>
   

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