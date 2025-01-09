

export default DisplayStages = ({stages, mi=false}) => {
    
    let stageEles = stages["stages"].map((ele, i) => {
        monsters = mi? ele.lockedMons.concat(ele.names) : ele.names 
        return(
        <div key = {i}>
            <h3>Stage {i + 1}</h3>
            <p>Monsters: {monsters.join(" , ")}</p>
            <svg height="5" width="100%" class="tapered-rule">
                <polyline points="0,0 1000,5 0,5"></polyline>
            </svg>
        </div>)
    })


    return (<div>

        <h3>Fitness</h3>
        {mi?  <p>{stages["fitness"]}</p> :  <p>Balance: {stages["fitness"][0]},  Difficulty:{stages["fitness"][1] }</p> } 
        <svg height="5" width="100%" class="tapered-rule">
                <polyline points="0,0 1000,5 0,5"></polyline>
            </svg>

            
        
        {stageEles}
        
        </div>)
}