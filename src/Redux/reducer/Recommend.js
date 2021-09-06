// 这里必须是一个函数，否则会报错
import { GETBANNER, HOTRECOMMEND, RECOMMEND_NEWCD, RECOMNEND_UPRANKING, RECOMNEND_NEWRANKING, RECOMNEND_ORIGINRANKING } from '../type'

const obj = {
    Topbanner: [],
    HotRecommend: [],
    RecommendNewCD: [],
    RecommendUPRanking: {},
    RecommendNewRanking: {},
    RecommendOriginRanking: {}

}

const reducers = (state = obj, action) => {

    switch (action.type) {
        case GETBANNER:
            return {...state, Topbanner: action.Topbanners }

        case HOTRECOMMEND:
            return {...state, HotRecommend: action.value }

        case RECOMMEND_NEWCD:
            return {...state, RecommendNewCD: action.value }
        case RECOMNEND_UPRANKING:
            return {...state, RecommendUPRanking: action.value }

        case RECOMNEND_NEWRANKING:
            return {...state, RecommendNewRanking: action.value }
        case RECOMNEND_ORIGINRANKING:
            return {...state, RecommendOriginRanking: action.value }
        default:
            return state
    }

}
export default reducers