import "./statblock.css"
import {useState, useEffect} from 'react';
import { getConditions, getSpells, getFeatures, getDamages } from "../API/GetFromApi";
import { addMonster } from "../API/SendToApi";
import Select  from 'react-select'; 



let ListControl = ({stats, setStats, property, options =[], subProp = null}) => {

    let optionsFormat = options.map((ele, idx) =>  <option key={idx} value={ele.value}>{ele.label}</option>)
    let updateValue = (value, idx) =>{
        let newStats =  { ...stats };
        subProp == null ? newStats[property][idx] = value :  newStats[subProp][property][idx] = value
        setStats(newStats)
    }

    let addValue = () =>{
        let newStats =  { ...stats };
        subProp == null ? newStats[property].push(options[0].value) :  newStats[subProp][property].push(options[0].value)
        setStats(newStats)
    }

    let removeValue = (idx) => {
        let newStats =  { ...stats };
        subProp == null ? newStats[property].splice(idx, 1) :  newStats[subProp][property].splice(idx, 1)
        setStats(newStats)
    }

    if (options.length == 0){
        return <div>Loading</div>
    }
    let output = subProp == null? stats[property].map((ele, idx) => {
        return <label className="listElement"  key={stats[property][idx] + idx}  >    <select className="selectElement" value={stats[property][idx]} onChange={(e) => updateValue(e.target.value, idx)} >{optionsFormat} </select>
            <button className="this_button" style ={{border: "none", "border-radius": 0,  "border-bottom": "#7A200D"}} onClick={() => removeValue(idx)}>X</button>
        </label> }) 
        
        
        :  stats[subProp][property].map((ele, idx) => {
            return <label key={stats[subProp][property][idx] + idx}  >     <select className="selectElement" value={stats[subProp][property][idx]} onChange={(e) => updateValue(e.target.value, idx)} >{optionsFormat} </select>
                <button className="this_button" style ={{border: "none", "border-bottom": "#7A200D"}} onClick={() => removeValue(idx)}>X</button>
            </label> })
    

    return <p>{output} <button onClick={addValue}>Add</button></p>
}

let addAction  = (stats, setStats) => {
    emptyAction = [{"type": "attack", "hit":5, "damageDice":"1d4" , "dist":3, "damageType":"slashing", "name":"attack", "attackType": "melee", "shortDist": 1, "longDist": 3, "closeDice": "2d4", "farDice": "1d4"}]
    let newStats =  { ...stats };
    newStats["actions"].push(emptyAction)
    setStats(newStats)
}

let addMultiAction  = (stats, setStats, idx) => {
    emptyAction = {"type": "attack", "hit":5, "damageDice":"1d4" , "dist":3, "damageType":"slashing", "name":"attack", "attackType": "melee", "shortDist": 1, "longDist": 3, "closeDice": "2d4", "farDice": "1d4"}
    let newStats =  { ...stats };
    newStats["actions"][idx].push(emptyAction)
    setStats(newStats)
}

let EditAttack= ({stats, setStats, idx, damages, subIdx = 0 }) => {
    let editProp = (prop, value) => {

        let newStats =  { ...stats };
        newStats["actions"][idx][subIdx][prop] = value
        setStats(newStats)

    }

    let typeSelect = <select value={stats["actions"][idx][subIdx]["type"]} onChange={(e) => editProp("type", e.target.value)}>
    <option value="attack">Attack</option>
    <option value="multiRangeAttack">Multi-Range Attack</option>
  </select>

    let attackTypeSelect = <select value={stats["actions"][idx][subIdx]["attackType"]} onChange={(e) => editProp("attackType", e.target.value)}>
    <option value="melee">Melee</option>
    <option value="ranged">Ranged</option>
    </select>

    let damageOptions = damages.map((ele, idx) =>  <option key={idx} value={ele.value}>{ele.label}</option>)
    
    if (stats["actions"][idx][subIdx]["type"] == "attack"){

    
    return <div>
        <p> <b><input className="actionName" value={stats["actions"][idx][subIdx]["name"]} onChange={(e) => editProp("name", e.target.value)}/>. 
        
            </b> <i>{attackTypeSelect} Weapon {typeSelect}. </i> 
        + <input className="tinyInput"  type="number" min="0" step="1" value={stats["actions"][idx][subIdx]["hit"]} onChange={(e) => editProp("hit", e.target.value)}/> to hit, 
        
        reach <input className="tinyInput"  type="number" min="0" step="1" value={stats["actions"][idx][0]["dist"]} onChange={(e) => editProp("dist", e.target.value)}/>0 ft, one target. 

        <i>Hit</i>  <input className="smallInput" value={stats["actions"][idx][subIdx]["damageDice"]} onChange={(e) => editProp("damageDice", e.target.value)}/> 
        <select  value={stats["actions"][idx][subIdx]["damageType"]} onChange={(e) => editProp("damageType", e.target.value)}>{damageOptions}</select> damage. 
     
        <button className="this_button" style ={{border: "none",  "marginRight":"10px", "border-bottom": "#7A200D"}} onClick={() => removeAction(stats, setStats, idx, subIdx=subIdx)}>X</button>
        </p>  
    </div>} 
    else{
        return <div>
        <p> <b><input className="actionName" value={stats["actions"][idx][subIdx]["name"]} onChange={(e) => editProp("name", e.target.value)}/>. </b> <i>{attackTypeSelect} Weapon {typeSelect}. </i> 
        + <input className="tinyInput"  type="number" min="0" step="1" value={stats["actions"][idx][subIdx]["hit"]} onChange={(e) => editProp("hit", e.target.value)}/> to hit, close reach <input className="tinyInput"  type="number" min="0" step="1" value={stats["actions"][idx][0]["shortDist"]} onChange={(e) => editProp("shortDist", e.target.value)}/>0 ft, one target. 
        <i>Hit</i>  <input className="smallInput" value={stats["actions"][idx][subIdx]["closeDice"]} onChange={(e) => editProp("closeDice", e.target.value)}/> 
        
        <select  value={stats["actions"][idx][subIdx]["damageType"]} onChange={(e) => editProp("damageType", e.target.value)}>{damageOptions}</select> damage. damage. 
        

        Far reach <input className="tinyInput"  type="number" min="0" step="1" value={stats["actions"][idx][subIdx]["longDist"]} onChange={(e) => editProp("longDist", e.target.value)}/>0 ft, one target. 
        <i>Hit</i>  <input className="smallInput"  type="number" min="0" step="1" value={stats["actions"][idx][subIdx]["farDice"]} onChange={(e) => editProp("farDice", e.target.value)}/>
        
        <select  value={stats["actions"][idx][subIdx]["damageType"]} onChange={(e) => editProp("damageType", e.target.value)}>{damageOptions}</select> damage. damage. 
        
        <button className="this_button" style ={{border: "none",  "marginRight":"10px", "border-bottom": "#7A200D"}} onClick={() => removeAction(stats, setStats, idx, subIdx=subIdx)}>X</button>
        </p> 
    </div>
    }
}

let removeAction = (stats, setStats, idx, subIdx = 0, removeAll = false) =>{
    let newStats =  { ...stats };
    if (stats["actions"][idx].length == 1 || removeAll){
        newStats["actions"].splice(idx, 1); 
  
    }
    else{
        newStats["actions"][idx].splice(subIdx, 1);
    }
    setStats(newStats)
}

let EditAction = ({stats, setStats, idx, damages}) =>{

    if (stats["actions"][idx].length == 1){
        return <div>
           <EditAttack stats={stats} setStats={setStats} idx={idx} damages={damages}/> 

           <p> &emsp; <button onClick={() => addMultiAction(stats, setStats, idx)}>+</button></p>
           
           </div>
    }else{
        return <div>
            <p><b>Multi-attack.</b>  <button className="this_button" style ={{border: "none",  "marginRight":"10px", "border-bottom": "#7A200D"}} onClick={() => removeAction(stats, setStats, idx, removeAll=true)}>X</button></p>
            <ol>
            {stats["actions"][idx].map((ele, subIdx) => {return <li> <EditAttack stats={stats} setStats={setStats} idx={idx} subIdx={subIdx} damages={damages}/> </li>} )}
            </ol>

            <p> &emsp; <button onClick={() => addMultiAction(stats, setStats, idx)}>+</button></p>
        </div>
    }

}

let ActionControl = ({stats, setStats, damages}) => {

    let actions = stats["actions"].map((ele, idx) => {
       return  <EditAction key ={idx} stats={stats} setStats={setStats} idx={idx} damages={damages}/> 
    })

    return <div className="actions">
    <h3>Actions</h3>
    {actions} 
    <button onClick={() => addAction(stats, setStats)}>Add</button>
    </div> 

}

let SpellControl = ({stats, setStats, spells}) => {
    let addSpells = () => {
        spellMan = {"spell slots":1, "rangedMod":0, "attack mod":0, "dc":10, "known spells":[], "spell mod":0}
        newStats = {...stats}
        newStats["spells"] = spellMan
        setStats(newStats) 
    }

    let removeSpells = () => {
        newStats = {...stats}
        newStats["spells"] = null
        setStats(newStats) 
    }

    let editProp = (prop, value) => {

        let newStats =  { ...stats };
        newStats["spells"][prop] = value
        setStats(newStats)

    }

    if (stats["spells"] == null){
        return <div className="actions">
        <h3>Spells</h3>
        <button onClick={addSpells}>Add</button>
        </div> 
    }else{
        return <div className="actions">
        <h3>Spells    <button className="this_button" style ={{border: "none",  "marginRight":"10px", "border-bottom": "#7A200D"}} onClick={() => removeSpells()}>X</button></h3>
        <div className="property-line first">
            <h4>Spell Casting DC</h4>
            <input className="tinyInput"  type="number" min="0" step="1" value={stats["spells"]["dc"]} onChange={(e) => editProp("dc", e.target.value)}/>
        </div> 
        <div className="property-line">
            <h4>Spell Casting Modifier</h4>
            <input className="tinyInput"  type="number" min="0" step="1" value={stats["spells"]["spell mod"]} onChange={(e) => editProp("spell mod", e.target.value)}/>
        </div> 
        <div className="property-line">
            <h4>Spell Attack Modifier</h4>
            <input className="tinyInput"  type="number" min="0" step="1" value={stats["spells"]["attack mod"]} onChange={(e) => editProp("attack mod", e.target.value)}/>
        </div> 

    
        <div className="property-line">
            <h4>Spell Slots</h4>
            <p>Level 1: <input className="tinyInput"  type="number" min="0" step="1" value={stats["spells"]["spell slots"]} onChange={(e) => editProp("spell slots", e.target.value)}/></p>
        </div> 
            <div className="property-block">
                <h4>Known Spells: </h4>
                <ListControl stats={stats} setStats={setStats} property="known spells" subProp="spells" options={spells}/>
            </div>
    </div> 
    }
}

CreateCreature= ({stats, setStats}) => {
   let [damages, setDamages] = useState([]); 
   let [conditions, setConditions] = useState([]); 
   let [spells, setSpells] = useState([]); 
   let [featuresList, setFeatures] = useState([]); 

   useEffect(() =>{
    async function getData() {
        
        setDamages(await getDamages(true)); 
        setConditions(await getConditions(true)); 
        setSpells(await getSpells(true)); 
        setFeatures(await getFeatures(true)); 

    }
    getData()
  }, [])
    
    features = <ListControl stats={stats} setStats={setStats} property="feats" options={featuresList}/>

    featureComp =
        <div className="actions">
            <h3>Features</h3>
            <h4>{features}</h4> 
        </div>


    actions = stats["actions"].map((action, i) => {
        return (  <div className="property-block" key = {action + i}>
        <h4>{action.name}.</h4>
        <p>{action.desc}</p>
    </div> )})

    actionsComp = 
        <div className="actions">
            <ActionControl stats={stats} setStats={setStats}  damages={damages}/>
        </div> 
            
    
    spellComp = <SpellControl stats={stats} setStats={setStats} spells={spells}/> 

    
    return (
        <div className="stat-block wide extra">
            <hr class="orange-border" />
            <div class="section-left">
                <div class="creature-heading">
                    <input value ={stats["name"]} onChange={(event) => setStats({...stats, name:event.target.value})}/>
                    <h2><button className={stats["make_saves"]? "not_highlighted" : "highlighted"} onClick={() => setStats({...stats, make_saves:false})}>Monster</button> <button className={stats["make_saves"]? "highlighted" : "not_highlighted"} onClick={() => setStats({...stats, make_saves:true})}>Player Character</button></h2>
                </div> 
                <svg height="5" width="100%" class="tapered-rule">
                <polyline points="0,0 600,2.5 0,5"></polyline>
            </svg>
                <div class="top-stats">
                    <div class="property-line first">
                        <h4>Armor Class</h4>
                        <input type="number" min="0" step="1" value ={stats["ac"]} onChange={(event) => setStats({...stats, ac:event.target.value})}/>
                    </div> 
                    <div class="property-line">
                        <h4>Hit Points</h4>
                        <input  type="number" min="0" step="1" value ={stats["hp"]} onChange={(event) => setStats({...stats, hp:event.target.value})}/>
                    </div> 
                    <div class="property-line last">
                        <h4>Speed</h4>
                        <input  type="number" min="0" step="1" value ={stats["speed"]} onChange={(event) => setStats({...stats, speed:event.target.value})}/>
                    </div> 
                    <svg height="5" width="100%" class="tapered-rule">
                <polyline points="0,0 600,2.5 0,5"></polyline>
            </svg>
                    <div class="abilities">
                        <div class="ability-strength">
                            <h4>STR</h4>
                            <p>(<input  type="number" min="0" step="1" value ={stats["modifiers"]["strength"]} onChange={(event) => setStats({...stats, modifiers:{...stats.modifiers, strength:event.target.value}})}/>)</p>
                        </div> 
                        <div class="ability-dexerity">
                            <h4>DEX</h4>
                            <p>(<input  type="number" min="0" step="1" value ={stats["modifiers"]["dexerity"]} onChange={(event) => setStats({...stats, modifiers:{...stats.modifiers, dexerity:event.target.value}})}/>)</p>
                        </div>
                        <div class="ability-constitution">
                            <h4>CON</h4>
                            <p>(<input  type="number" min="0" step="1" value ={stats["modifiers"]["constitution"]} onChange={(event) => setStats({...stats, modifiers:{...stats.modifiers, constitution:event.target.value}})}/>)</p>
                        </div> 
                        <div class="ability-intelligence">
                            <h4>INT</h4>
                            <p>(<input  type="number" min="0" step="1" value ={stats["modifiers"]["intelligence"]} onChange={(event) => setStats({...stats, modifiers:{...stats.modifiers, intelligence:event.target.value}})}/>)</p>
                        </div> 
                        <div class="ability-wisdom">
                            <h4>WIS</h4>
                            <p>(<input type="number" min="0" step="1" value ={stats["modifiers"]["wisdom"]} onChange={(event) => setStats({...stats, modifiers:{...stats.modifiers, wisdom:event.target.value}})}/>)</p>
                        </div>
                        <div class="ability-charisma">
                            <h4>CHA</h4>
                            <p>(<input  type="number" min="0" step="1" value ={stats["modifiers"]["charisma"]} onChange={(event) => setStats({...stats, modifiers:{...stats.modifiers, charisma:event.target.value}})}/>)</p>
                        </div> 
                    </div> 
                    <svg height="5" width="100%" class="tapered-rule">
                <polyline points="0,0 600,2.5 0,5"></polyline>
                </svg>
                    <div class="abilities">
                        <h3><i>Saving throws</i></h3>
                        <div class="ability-strength">
                            <h4>STR</h4>
                            <p>(<input  type="number" min="0" step="1" value ={stats["save_modifiers"]["strength"]} onChange={(event) => setStats({...stats, save_modifiers:{...stats.save_modifiers, strength:event.target.value}})}/>)</p>
                        </div> 
                        <div class="ability-dexerity">
                            <h4>DEX</h4>
                            <p>(<input  type="number" min="0" step="1" value ={stats["save_modifiers"]["dexerity"]} onChange={(event) => setStats({...stats, save_modifiers:{...stats.save_modifiers, dexerity:event.target.value}})}/>)</p>
                        </div>
                        <div class="ability-constitution">
                            <h4>CON</h4>
                            <p>(<input  type="number" min="0" step="1" value ={stats["save_modifiers"]["constitution"]} onChange={(event) => setStats({...stats, save_modifiers:{...stats.save_modifiers, constitution:event.target.value}})}/>)</p>
                        </div> 
                        <div class="ability-intelligence">
                            <h4>INT</h4>
                            <p>(<input  type="number" min="0" step="1" value ={stats["save_modifiers"]["intelligence"]} onChange={(event) => setStats({...stats, save_modifiers:{...stats.save_modifiers, intelligence:event.target.value}})}/>)</p>
                        </div> 
                        <div class="ability-wisdom">
                            <h4>WIS</h4>
                            <p>(<input  type="number" min="0" step="1" value ={stats["save_modifiers"]["wisdom"]} onChange={(event) => setStats({...stats, save_modifiers:{...stats.save_modifiers, wisdom:event.target.value}})}/>)</p>
                        </div>
                        <div class="ability-charisma">
                            <h4>CHA</h4>
                            <p>(<input  type="number" min="0" step="1" value ={stats["save_modifiers"]["charisma"]} onChange={(event) => setStats({...stats, save_modifiers:{...stats.save_modifiers, charisma:event.target.value}})}/>)</p>
                        </div> 
                    </div> 
                    <svg height="5" width="100%" class="tapered-rule">
                <polyline points="0,0 600,2.5 0,5"></polyline>
            </svg>
                    
                         <div class="property-line first">
                        
                         <h4>Damage Resistances</h4>
                         <ListControl stats={stats} setStats={setStats} property="resistances" options={damages} />
                     </div> 

                
                         <div class="property-line">
                        
                         <h4>Damage Immunities</h4>
                         <ListControl stats={stats} setStats={setStats} property="immunities" options={damages}/>
                     </div> 
                   
                    <div class="property-line">
                        <h4>Condition Immunities</h4>
                        <ListControl stats={stats} setStats={setStats} property="condition_immunities" options={conditions}/>
                    </div> 
        
                    <div class="property-line last">
                        <h4>{stats["makes_saves"] ? "Level" : "Challenge"}</h4>
                        <input value ={stats["level"]} onChange={(event) => setStats({...stats, level:event.target.value})}/>
                    </div> 
                </div> 
                <svg height="5" width="100%" class="tapered-rule">
                <polyline points="0,0 600,2.5 0,5"></polyline>
            
            </svg>
                {featureComp}
            </div>
            <div class="section-right">
                {actionsComp}

                {spellComp}
                
            </div> 
            <hr class="orange-border bottom" />
        </div> 


    )
}

export default CreatureManager = ({}) => {
    [stat, setStats] = useState({
        name: "Monster", 
        ac: 12, 
        hp: 0, 
        speed: 3, 
        level: 1, 
        actions:[], 
        feats: [], 
        resistances: [], 
        condition_immunities:[], 
        immunities:[], 
        make_saves: true, 
        spells:null, 
        modifiers:{charisma: 0, constitution: 0, dexerity: 0, intelligence: 0, strength: 0, wisdom:0}, 
        save_modifiers:{charisma: 0, constitution: 0, dexerity: 0, intelligence: 0, strength: 0, wisdom:0}
    })


    let submit = async () => {
        let response = await addMonster(stat); 

        if (response.status == 200){
            alert("Added Monster"); 
        }else{
            alert("Error adding monster, try again"); 
        }
    }

    return <div>
        <CreateCreature  stats={stat} setStats={setStats}/> 
        <button onClick={submit}>Add Monster</button>
    </div> 
}