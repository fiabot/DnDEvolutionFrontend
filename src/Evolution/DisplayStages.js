

export default DisplayStages = ({stages}) => {
  
    let stageEles = stages.map((ele, i) => {return(
        <div key = {i}>
            <h2>Stage {i + 1}</h2>
            <p>Monsters: {ele.names.join(" , ")}</p>
        </div>)
    })


    return (<div>{stageEles}</div>)
}