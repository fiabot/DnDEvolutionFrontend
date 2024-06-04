import {useState, useEffect} from 'react';
import NumberInput from '../CommonComponents/NumberInput';

let StageDifficulty =({title, i , setDifficulties}) => {
    let [difficulty, setDifficulty] = useState(0) 
    useEffect(() =>{
        setDifficulties(prevState => {
            const newState = [...prevState]
            newState[i] = difficulty
            return newState
          })
    }, [difficulty])


    return (
        <div>
            <h2>
                {title}
            </h2>
            <NumberInput 
                num={difficulty}
                setNum={setDifficulty}
                prompt="ideal difficulty"
            />
        </div>)
} 

export default SetStageDifficulty = ({setDifficulties, stages, setStage}) => {
    
    //let [diffStates, setDiffStates] = useState([])
    

   
    let eles = []
    let states = []
    let difficulties = []
    for (var i=0; i < stages; i++) {
        //let [newstate ,setNewState] = useState(0)
        let title = "Stage " + (i + 1)
        let el  = <StageDifficulty title = {title} i ={i} setDifficulties = {setDifficulties} key = {title}/>
        eles= [...eles, el]
        ///states = [... states, newstate]
        difficulties = [...difficulties, 0]
    }

    stageEles = eles
    useEffect(() => {
        setDifficulties(difficulties)
    }, [stages])

    let addStage = () =>{
        setStage(stages + 1)
    }

    let removeStage = () =>{
        setStage(stages - 1)
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