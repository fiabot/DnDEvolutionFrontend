import "./statblock.css"

export default StatBlock = ({stats}) => {
   console.log(stats)
    
    features = stats["features"].map((feature) => {
        return (<div class="property-block" key={feature.name}>
                    
        <h4>{feature.name}.</h4>
        <p>{feature.desc}</p>
    </div>)})

    featureComp = features.length > 0 ?  
        <div className="actions">
            <h3>Features</h3>
            {features} 
        </div> : ""


    actions = stats["actions"].map((action, i) => {
        return (  <div className="property-block" key = {action + i}>
        <h4>{action.name}.</h4>
        <p>{action.desc}</p>
    </div> )})

    actionsComp = actions.length > 0 ?  
        <div className="actions">
            <h3>Actions</h3>
            {actions} 
        </div> : ""
            
    
    spellComp = stats["spells"] != null? 
            <div className="actions">
                <h3>Spells</h3>
                <div className="property-line first">
                    <h4>Spell Casting DC</h4>
                    <p>{stats["spells"]["dc"]}</p>
                </div> 
                <div className="property-line">
                    <h4>Spell Casting Modifier</h4>
                    <p>{stats["spells"]["spell mod"]}</p>
                </div> 
                <div className="property-line">
                    <h4>Spell Attack Modifier</h4>
                    <p>{stats["spells"]["attack mod"]}</p>
                </div> 
                <div className="property-line">
                    <h4>Spell Slots</h4>
                    <p>Level 1: {stats["spells"]["spell slots"]}</p>
                </div> 
                    <div className="property-block">
                        <h4>Cantrips (at will): </h4>
                        <p>{stats["spells"]["known spells"]["cantrips"].join(" , ")}</p>
                    </div>

                    <div className="property-block">
                        <h4>First Level ({stats["spells"]["spell slots"]} slots): </h4>
                        <p>{stats["spells"]["known spells"]["firsts"].join(" , ")}</p>
                    </div>

                    <div className="property-block">
                        <h4>Spell not yet implemented: </h4>
                        <p>{stats["spells"]["known spells"]["un_impl"].join(" , ")}</p>
                    </div>
                        
    
            </div> : ""
    console.log(spellComp)
    
    return (
        <div className="stat-block wide">
            <hr class="orange-border" />
            <div class="section-left">
                <div class="creature-heading">
                    <h1>{stats["name"]}</h1>
                    <h2>{stats["makes saves"] ? "Player Character" : "Monster"}</h2>
                </div> 
                <svg height="5" width="100%" class="tapered-rule">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>
                <div class="top-stats">
                    <div class="property-line first">
                        <h4>Armor Class</h4>
                        <p>{stats["ac"]}</p>
                    </div> 
                    <div class="property-line">
                        <h4>Hit Points</h4>
                        <p>{stats["hp"]}</p>
                    </div> 
                    <div class="property-line last">
                        <h4>Speed</h4>
                        <p>{stats["speed"]}ft.</p>
                    </div> 
                    <svg height="5" width="100%" class="tapered-rule">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>
                    <div class="abilities">
                        <div class="ability-strength">
                            <h4>STR</h4>
                            <p>({stats["modifiers"]["strength"]})</p>
                        </div> 
                        <div class="ability-dexterity">
                            <h4>DEX</h4>
                            <p>({stats["modifiers"]["dexerity"]})</p>
                        </div>
                        <div class="ability-constitution">
                            <h4>CON</h4>
                            <p>({stats["modifiers"]["constitution"]})</p>
                        </div> 
                        <div class="ability-intelligence">
                            <h4>INT</h4>
                            <p>({stats["modifiers"]["intelligence"]})</p>
                        </div> 
                        <div class="ability-wisdom">
                            <h4>WIS</h4>
                            <p>({stats["modifiers"]["wisdom"]})</p>
                        </div>
                        <div class="ability-charisma">
                            <h4>CHA</h4>
                            <p>({stats["modifiers"]["charisma"]})</p>
                        </div> 
                    </div> 
                    <svg height="5" width="100%" class="tapered-rule">
                <polyline points="0,0 400,2.5 0,5"></polyline>
                </svg>
                    <div class="abilities">
                        <h3><i>Saving throws</i></h3>
                        <div class="ability-strength">
                            <h4>STR</h4>
                            <p>({stats['save_modifiers']["strength"]})</p>
                        </div> 
                        <div class="ability-dexterity">
                            <h4>DEX</h4>
                            <p>({stats['save_modifiers']["dexerity"]})</p>
                        </div>
                        <div class="ability-constitution">
                            <h4>CON</h4>
                            <p>({stats['save_modifiers']["constitution"]})</p>
                        </div> 
                        <div class="ability-intelligence">
                            <h4>INT</h4>
                            <p>({stats['save_modifiers']["intelligence"]})</p>
                        </div> 
                        <div class="ability-wisdom">
                            <h4>WIS</h4>
                            <p>({stats['save_modifiers']["wisdom"]})</p>
                        </div>
                        <div class="ability-charisma">
                            <h4>CHA</h4>
                            <p>({stats['save_modifiers']["charisma"]})</p>
                        </div> 
                    </div> 
                    <svg height="5" width="100%" class="tapered-rule">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>
                    
                         <div class="property-line first">
                        
                         <h4>Damage Resistances</h4>
                         <p>{stats["resistances"].join(" , ")}</p>
                     </div> 

                
                         <div class="property-line">
                        
                         <h4>Damage Immunities</h4>
                         <p>{stats["immunities"].join(" , ")}</p>
                     </div> 
                   
                    <div class="property-line">
                        <h4>Condition Immunities</h4>
                        <p>{stats['condition imun'].map((el) => el.index).join(" , ")}</p>
                    </div> 
        
                    <div class="property-line last">
                        <h4>{stats["makes saves"] ? "Level" : "Challenge"}</h4>
                        <p>{stats["level"]}</p>
                    </div> 
                </div> 
                <svg height="5" width="100%" class="tapered-rule">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            
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