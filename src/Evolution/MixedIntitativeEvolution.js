import {useState, useEffect} from 'react';
import StringList from "../CommonComponents/StringListComponent"
import NumberInput from '../CommonComponents/NumberInput';
import { getStaticEvolution, getMIEvolution } from '../API/SendToApi';
import { getMonsters, getPlayers } from '../API/GetFromApi';
import MIStage from './MIStage';
import DisplayStages from './DisplayStages';
import "./evolution.css"




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

      let playerSelect = playerOptions.length > 0 ? <div className='section'> <h2>Select Party Members</h2> <StringList 
                li={partyNames} 
                setLi = {setPartyNames} 
                options={playerOptions}
                title = "Party Members" 
                noun = "party"
                /> 
                </div>
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
            
            monsters = await getMIEvolution(partyNames, stageSettings, generation=generation, popsize=popsize, elistism=elistism)
            resolve(monsters)
        })
    }

    let updateLockedMonsters = (stages) => {
        setLockedMons(stages["stages"].map((stage) =>{return stage.lockedMons.concat(stage.names)}))
    }

    let startEvolution = () => {
        setEndText(<div>Evolving....</div>)
        evolveMonsters().then((monsters) => {
            updateLockedMonsters(monsters)
            setEndText(<div>
                <DisplayStages stages = {monsters} mi={true}/>
            </div>)
        })
    }
 
    return (<div className='stat-block wide'>
         <hr class="orange-border" />
        <h1>Mixed Initiative Evolution!</h1>
        
        {playerSelect}

    
    <MIStage setSettings={setStageSettings} settings={stageSettings} monsterMan={monsterOptions} lockedMonsterLi={lockedMonsters}  setStages={setStages} stages={stages}/>
   

    <div className='section'>

        <h2>Evolution Settings</h2>

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

    
    <div className='section'>

   

    <h2>Generated encounter</h2>
    
    {endText}
    </div>
    <hr class="orange-border bottom" />
    </div>)



}