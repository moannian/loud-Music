import { STORAGE_GET, CLEARPLYLIST, CURRENT_PLAY } from '../type'
let obj = {
    list: [],
    currentplay: {}
}


const Storeage = (state = obj, action) => {
    switch (action.type) {
        case STORAGE_GET:
            return {...state, list: action.value }
        case CLEARPLYLIST:
            return {...state, list: [] }
        case CURRENT_PLAY:
            return {...state, currentplay: action.value }
        default:
            return state
    }

}
export default Storeage