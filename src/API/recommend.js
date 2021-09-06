import request from './request'

export const Topbanner = () => {
    return request({
        url: "/banner"
    })
}

export const HotRecommend = (number) => {
    return request({
        url: `/personalized?limit=${number}`
    })
}

export const RecommendNewCD = (limit) => {
    return request({
        url: `/top/album?offset=0&limit=${limit}`
    })
}
export const TopList = (limit) => {
    return request({
        url: `/top/list?idx=${limit}`
    })
}