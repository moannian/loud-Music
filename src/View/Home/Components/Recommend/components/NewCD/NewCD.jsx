import React, { memo, useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { GETRecommendNewCD } from '../../../../../../Redux/action/Recommend'
import AppTitle from '@/Components/App-title/index'
import animate from '@/Other/animate'

import Prev from '@/assets/img/Recommend/prev.png'
import next from '@/assets/img/Recommend/next.png'
import NewCDbg from '@/assets/img/Recommend/NewCD.png'
import './style/index.less'
export default memo(function NewCD() {
    const dispatch = useDispatch()
    const Ref = useRef()

    const { RecommendNewCD } = useSelector((state) => ({
        RecommendNewCD: state.Recommend.RecommendNewCD
    }), shallowEqual)


    const newCD = [1, 2]
    let [current, setCurrent] = useState(0);



    // 获取网络请求
    useEffect(() => {
        dispatch(GETRecommendNewCD())

    }, [dispatch])
    // 自动获取UL的长度
    useEffect(() => {
        if (RecommendNewCD.length !== 0) {  // 自动设置ul的长度
            let clone = Ref.current.children[0].cloneNode(true)
            Ref.current.appendChild(clone)
            Ref.current.style.width = ((newCD.length + 1) * 55) + 'vw';
        }

    }, [RecommendNewCD])

    // 按钮点击
    const left_btn = () => {
        animate(Ref.current, -(Ref.current.offsetWidth / (newCD.length + 1)) * (current - 1), (Ref.current.offsetWidth / (newCD.length + 1)), 5)
        setCurrent(current - 1)
        if (current < 1) {
            setCurrent(newCD.length - 1)
        }
    }
    const right_btn = () => {
        animate(Ref.current, -(Ref.current.offsetWidth / (newCD.length + 1)) * (current + 1), (Ref.current.offsetWidth / (newCD.length + 1)), 5)
        setCurrent(current + 1)
        if (current === newCD.length - 1) {
            setCurrent(0)
        }
    }
    return (
        <div className='recommendNewCD'>
            <AppTitle title='新碟上架' List={[]} />
            <div className='bottom'>
                <div className="box">
                    <ul ref={Ref} className='m'>
                        {newCD.map((item, index) => {
                            return (
                                <li key={index}>

                                    { RecommendNewCD.slice(index * 5, (index + 1) * 5).map((item, index) => {
                                        return (
                                            <div key={index}>
                                                <div className="pic">
                                                    <img src={item.blurPicUrl} alt="" />
                                                </div>
                                                <div className="cover">
                                                    <img src={NewCDbg} alt="" />
                                                </div>
                                                <div className='music'><span>{item.name}</span></div>
                                                <div className='name'><span>{item.artist.name}</span></div>
                                            </div>
                                        )
                                    })}


                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="left-btn" onClick={left_btn}>
                    <img src={Prev} alt="" />
                </div>
                <div className="right-btn" onClick={right_btn}>
                    <img src={next} alt="" />
                </div>
            </div>
        </div >
    )
})
