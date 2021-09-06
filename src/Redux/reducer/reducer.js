// 这里必须是一个函数，否则会报错
import { combineReducers } from 'redux'

import Recommend from './Recommend'
import Storeage from './Storage'

const reducer = combineReducers({
    Recommend,
    Storeage
})
export default reducer