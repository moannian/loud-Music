import React, { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AppTitle from '@/Components/App-title/index'
import { GETTopList } from '@/Redux/action/Recommend'
import { Storeage_get, CurrentPlay } from '@/Redux/action/Storage'


import Play from '../../../../../../assets/img/Recommend/play.png'
import Add from '../../../../../../assets/img/Recommend/add.png'
import CollectBefore from '../../../../../../assets/img/Recommend/collect-before.png'
import CollectAfter from '../../../../../../assets/img/Recommend/collect-after.png'


import './style/index.less'

// 引入方法
import { StorageAdd, StorageGet, StorageCurrent, StorageSet } from '@/Other/Storage.js'
export default memo(function Ranking() {
    const dispatch = useDispatch()
    const [total, setTotal] = useState([])
    const [Collect, setCollect] = useState([])
    const [current, setCurrent] = useState()
    const [totalCurrent, setTotalCurrent] = useState([])

    let { UpRanking, NewRanking, OrnginRanking } = useSelector((state) => ({
        UpRanking: state.Recommend.RecommendUPRanking,
        NewRanking: state.Recommend.RecommendNewRanking,
        OrnginRanking: state.Recommend.RecommendOriginRanking
    }))

    // 各种异步请求
    useEffect(() => {
        dispatch(GETTopList(0))
        dispatch(GETTopList(2))
        dispatch(GETTopList(3))
        dispatch(Storeage_get(StorageGet("PlayList")))
    }, [dispatch])
    useEffect(() => {
        setTimeout(() => {
            if (UpRanking.id && NewRanking.id && OrnginRanking.id !== undefined) {
                setTotal([UpRanking, NewRanking, OrnginRanking])

            }
        }, 10)
    })


    // 各种点击事件
    const totalCurrent_btn = (index) => {
        return () => {
            if (totalCurrent.indexOf(index) === -1) {
                setTotalCurrent([...totalCurrent, index])
            } else {
                let c = totalCurrent
                c.Remove(index)
                setTotalCurrent([...c])
            }
        }
    }
    // 收藏的点击
    const btn_collect = (index) => {
        return () => {
            if (Collect.indexOf(index) === -1) {
                setCollect([...Collect, index])
            } else {
                let c = Collect
                c.Remove(index)

                setCollect([...c])
            }
        }

    }
    // 点击播放列表
    const AddPlayList = (item) => {
        return () => {
            StorageAdd("PlayList", item)
            dispatch(Storeage_get(StorageGet("PlayList")))

        }
    }
    // 点击立即播放
    const CurrentPlayBtn = (item) => {
        return () => {
            StorageCurrent("PlayList", item)
            StorageSet("CurrentPlay", item)
            dispatch(Storeage_get(StorageGet("PlayList")))
            dispatch(CurrentPlay(StorageGet("CurrentPlay")))
        }
    }
    // 鼠标经过事件
    const mouseOver = (indexTOP) => {
        return () => {
            setCurrent(indexTOP)

        }
    }
    // 鼠标移除事假
    const mouseOut = () => {
        setCurrent(0)
    }
    return (
        <div className='Recommend_Ranking'>
            <AppTitle title='榜单' List={[]} />
            <div className="bottom">
                {/* 整体的 */}
                {total.map((item, indexTop) => {
                    return (
                        <div key={indexTop}>
                            {/* 头部的整体选项 */}
                            <div className='box'>
                                <div className='left'>
                                    <div className="pic">
                                        <img src={item.coverImgUrl} alt="" />
                                    </div>
                                </div>
                                <div className='right'>
                                    <div className="title">
                                        <span>{item.name}</span></div>
                                    <div className="ico">
                                        <div className='play'>
                                            <img src={Play} alt="" />
                                        </div>
                                        <div className='collect' onClick={totalCurrent_btn(item.id)}>
                                            <img src={totalCurrent.indexOf(item.id) === -1 ? CollectBefore : CollectAfter} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* 歌单列表 */}
                            <ul onMouseOut={mouseOut}>
                                {item.tracks.slice(0, 10).map((item, index) => {
                                    return (
                                        <li key={index} onMouseOver={mouseOver(indexTop + item.id)}>

                                            <span className='Index'>
                                                {index + 1}
                                            </span>

                                            <div className="content">
                                                <span>{item.name}</span>
                                            </div>
                                            <div className={indexTop + item.id === current ? "choose" : 'nochosse'}>
                                                <div className="play" onClick={CurrentPlayBtn(item)} >
                                                    <img src={Play} alt="" />
                                                </div>
                                                <div className="add" onClick={AddPlayList(item)}>
                                                    <img src={Add} alt="" />
                                                </div>
                                                <div className='collect' onClick={btn_collect(item.id)}>
                                                    <img src={Collect.indexOf(item.id) === -1 ? CollectBefore : CollectAfter} alt="" />
                                                </div>
                                            </div>
                                        </li>

                                    )
                                })}
                            </ul>

                            {/* 底部查看更多 */}
                            <div className='more'>
                                <span>{`查看更多>`}</span>
                            </div>
                        </div>
                    )
                })}


            </div>
        </div>
    )
})
