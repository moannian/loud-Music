import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AppTitle from '@/Components/App-title/index'
import { GETHOTRecommend } from '@/Redux/action/Recommend'
import ImgSize from '../../../../../../Other/ImgSize'

import './style/index.less'


import Play from '@/assets/img/Recommend/play.png'
import Headset from '@/assets/img/Recommend/headset.png'
export default memo(function Hot() {

    const List = [
        {
            id: 1,
            name: '华语'
        },
        {
            id: 2,
            name: '流行'
        },
        {
            id: 3,
            name: '摇滚'
        },
        {
            id: 4,
            name: '民谣'
        },
        {
            id: 5,
            name: '电子'
        }

    ]
    const dispatch = useDispatch()
    const { HotRecommend } = useSelector((state) => ({
        HotRecommend: state.Recommend.HotRecommend
    }))
    useEffect(() => {
        dispatch(GETHOTRecommend())

    }, [dispatch])
    return (
        <div className='RecommendHot'>
            <AppTitle title='热门推荐' List={List} />
            <div className='bottom'>
                {HotRecommend.map((item) => {
                    return (
                        <div className='box' key={item.id}>
                            <div className="pic">
                                <img src={ImgSize(item.picUrl, 140, 140)} alt="" />
                                <div className="play">
                                    <div className="headset">
                                        <img src={Headset} alt="" />
                                    </div>
                                    <div className='count'>
                                        <span>{item.playCount > 100000 ? parseInt(item.playCount / 10000) + '万' : item.playCount}</span>
                                    </div>
                                    <div className='playc'>
                                        <img src={Play} alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="name">
                                <span>{item.name}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
})
