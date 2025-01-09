import {api, API_URL} from './config'

let MONSTER_ENDPOINT = API_URL + "/monsters"
let PLAYER_ENDPOINT = API_URL + "/players"
let STATS_ENDPOINT = API_URL + "/stats"
let DAMAGE_ENDPOINT = API_URL + "/damageTypes"
let CONDITION_ENDPOINT = API_URL + "/conditions"
let SPELL_ENDPOINT = API_URL + "/spells"
let FEATURE_ENDPOINT = API_URL + "/features"

let getMonsters= async (asOptions = false) => {
    response = await api.get(MONSTER_ENDPOINT)

    if(asOptions){
        return(formatAsOptions(response.data))
    }else{
        return response.data 
    }

    
}

let getPlayers= async (asOptions = false) => {
    response = await api.get(PLAYER_ENDPOINT)

    if(asOptions){
        return(formatAsOptions(response.data))
    }else{
        return response.data 
    }
}

let getDamages= async (asOptions = false) => {
    response = await api.get(DAMAGE_ENDPOINT)

    if(asOptions){
        return(formatAsOptions(response.data))
    }else{
        return response.data 
    }
}

let getConditions= async (asOptions = false) => {
    response = await api.get(CONDITION_ENDPOINT)

    if(asOptions){
        return(formatAsOptions(response.data))
    }else{
        return response.data 
    }
}

let getSpells= async (asOptions = false) => {
    response = await api.get(SPELL_ENDPOINT)

    console.log(response.data)

    if(asOptions){
        return(formatAsOptions(response.data))
    }else{
        return response.data 
    }
}

let getFeatures = async (asOptions = false) => {
    response = await api.get(FEATURE_ENDPOINT)

    if(asOptions){
        return(formatAsOptions(response.data))
    }else{
        return response.data 
    }
}

let getStats= async (name) => {
    response = await api.get(STATS_ENDPOINT, {params:{name:name}})

    return response.data 
}

let formatAsOptions = (list) => {
    return list.map((el) => {return {value: el, label:el}})
}


export {getMonsters, getPlayers, getDamages, getFeatures, getSpells, getConditions, formatAsOptions, getStats}