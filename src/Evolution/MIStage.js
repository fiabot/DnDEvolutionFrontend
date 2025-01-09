import {useState, useEffect} from 'react';
import NumberInput from '../CommonComponents/NumberInput';
import StringList from "../CommonComponents/StringListComponent"

let StageSettings=({title, i , monsterMan, lockedMonsterLi, settings, setSettings}) => {
    let [difficulty, setDifficulty] = useState(0) 
    let [lockedMon, setLockedMons] = useState([])
    let [possMons, setPossMons] = useState([])
    let [minMons, setMinMons] = useState(3)
    let [maxMons, setMaxMons] = useState(5) 
    let [overwrite, setOverwrite] = useState([])
    useEffect(() =>{
        setSettings(prevState => {
            const newState = [...prevState]
            newState[i] = {difficulty:difficulty, 
            lockedMons: lockedMon, possMons: possMons, minMons:minMons, maxMons:maxMons}
            return newState
          })
    }, [difficulty, lockedMon, possMons, minMons, maxMons])

    useEffect(() => {
        if (lockedMonsterLi.length > 0){
            setOverwrite(lockedMonsterLi[i])
        }
        
    }, [lockedMonsterLi[i]])


    return (
        <div className='section'>
            <h2>
                {title}
            </h2>

            <StringList 
                li={lockedMon} 
                setLi = {setLockedMons} 
                title = "Locked Monsters" 
                noun = "Monsters in stage"
                options={monsterMan}
                overwrite={overwrite}
                />

            <StringList 
                li={possMons} 
                setLi = {setPossMons} 
                title = "Possible Monsters" 
                noun = "possible monsters"
                options={monsterMan}
                />

            <NumberInput 
                num={difficulty}
                setNum={setDifficulty}
                prompt="ideal difficulty"
            />

            <NumberInput 
                num={minMons}
                setNum={setMinMons}
                prompt="Min monsters to add"
            />

            <NumberInput 
                num={maxMons}
                setNum={setMaxMons}
                prompt="Max monsters to add"
            />
        </div>)}


export default SetStageSettings = ({monsterMan, lockedMonsterLi, settings, setSettings, stages, setStages}) => {
    
    //let [diffStates, setDiffStates] = useState([])
    

   
    let eles = []
    let states = []
    for (var i=0; i < stages; i++) {
        //let [newstate ,setNewState] = useState(0)
        let title = "Stage " + (i + 1)
        let el  = <StageSettings title = {title} i ={i} monsterMan={monsterMan} lockedMonsterLi={lockedMonsterLi} setSettings={setSettings} settings={settings} key = {title}/>
        eles= [...eles, el]
    }

    stageEles = eles


    let addStage = () =>{
        setStages(stages + 1)
    }

    let removeStage = () =>{
        setStages(stages - 1)
        setSettings((previousArr) => (previousArr.slice(0, -1)));
    }
    
 

    if (stageEles){
        return (<div>{stageEles}
            <button onClick ={addStage}>Add Stage</button>
            <button onClick ={removeStage}>Remove Stage</button>
        </div>)
    }else{
        return "loading"
    }
}