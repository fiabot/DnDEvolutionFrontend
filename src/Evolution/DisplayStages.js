

export default DisplayStages = ({stages}) => {
  
    let stageEles = stages["stages"].map((ele, i) => {return(
        <div key = {i}>
            <h2>Stage {i + 1}</h2>
            <p>Monsters: {ele.names.join(" , ")}</p>
        </div>)
    })


    return (<div>

        <h2>Fitness</h2>
        <p>{stages["fitness"]}</p>
        
        {stageEles}
        
        </div>)
}