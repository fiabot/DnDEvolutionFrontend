import {api, API_URL} from './config'

let MONSTER_ENDPOINT = API_URL + "/monsters"
let PLAYER_ENDPOINT = API_URL + "/players"

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

let formatAsOptions = (list) => {
    return list.map((el) => {return {value: el, label:el}})
}


export {getMonsters, getPlayers, formatAsOptions}