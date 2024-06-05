

export default DisplayStages = ({stages, mi=false}) => {
    
    let stageEles = stages["stages"].map((ele, i) => {
        monsters = mi? ele.lockedMons.concat(ele.names) : ele.names 
        return(
        <div key = {i}>
            <h2>Stage {i + 1}</h2>
            <p>Monsters: {monsters.join(" , ")}</p>
        </div>)
    })


    return (<div>

        <h2>Fitness</h2>
        <p>{stages["fitness"]}</p>
        
        {stageEles}
        
        </div>)
}