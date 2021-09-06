import { STORAGE_GET, CLEARPLYLIST, CURRENT_PLAY } from '../type'


export const Storeage_get = (value) => {
    return {
        type: STORAGE_GET,
        value
    }
}
export const ClearPlayList = () => {
    return {
        type: CLEARPLYLIST
    }
}

export const CurrentPlay = (value) => {
    return {
        type: CURRENT_PLAY,
        value
    }
}