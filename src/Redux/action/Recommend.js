import { GETBANNER, HOTRECOMMEND, RECOMMEND_NEWCD, RECOMNEND_UPRANKING, RECOMNEND_NEWRANKING, RECOMNEND_ORIGINRANKING } from '../type'

// 引入网络请求
import { Topbanner, HotRecommend, RecommendNewCD, TopList } from '@/API/recommend'
// 同步请求
const changeBanners = (value) => {
    return {
        type: GETBANNER,
        Topbanners: value.banners.slice(0, 5)
    }
}

const RecommendNewCd = (value) => {
    return {
        type: RECOMMEND_NEWCD,
        value
    }
}

const RecommendUPRanking = (value) => {
    return {
        type: RECOMNEND_UPRANKING,
        value
    }
}
const RecommendNewRanking = (value) => {
    return {
        type: RECOMNEND_NEWRANKING,
        value
    }
}
const RecommendOriginRanking = (value) => {
        return {
            type: RECOMNEND_ORIGINRANKING,
            value
        }
    }
    // 异步

const HOTRecommend = (value) => {
    return {
        type: HOTRECOMMEND,
        value
    }
}

export const getTopbannerAction = () => {
    return dispatch => {
        Topbanner().then(res => {
            dispatch(changeBanners(res))

        })
    }
}

export const GETHOTRecommend = () => {
    return dispatch => {
        HotRecommend(8).then(res => {
            dispatch(HOTRecommend(res.result))

        })
    }
}
export const GETRecommendNewCD = () => {
    return dispatch => {
        RecommendNewCD(10).then(res => {
            dispatch(RecommendNewCd(res.albums))
            console.log(res.albums);
        })
    }
}
export const GETTopList = (limit) => {
    return dispatch => {
        TopList(limit).then(res => {
            if (limit === 3) {
                dispatch(RecommendUPRanking(res.playlist))
            } else if (limit === 0) {
                dispatch(RecommendNewRanking(res.playlist))
            } else if (limit === 2) {
                dispatch(RecommendOriginRanking(res.playlist))
            }

        })
    }
}