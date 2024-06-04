import {api, STATIC_EVOLVE_ENDPOINT} from './config' 

let getStaticEvolution = async (party, monsters, ideal_diff, generation= 10, popsize=10, elistism= 5) => {

    request = {"party": party, "monsters": monsters, "difficulty": ideal_diff, "generations": generation, "popsize": popsize, "elitism":elistism} 

    response = await api.post(STATIC_EVOLVE_ENDPOINT, request)

    return response.data 
}

export {getStaticEvolution}