import React, { memo, useEffect, useState, useRef } from 'react'

import animate from '@/Other/animate'
import request from '../../../../../../API/request'



import download from '@/assets/img/Recommend/download.png'
import prev from '@/assets/img/Recommend/prev.png'
import next from '@/assets/img/Recommend/next.png'


import './Less/index.less'

export default memo(function Loop() {

    const Ref = useRef()

    let [bgpic, setBgpic] = useState({
        imageUrl: ''
    })

    let [current, setCurrent] = useState(0);
    let [pic, setPic] = useState([])
    let obj = {}


    // 实现自动播放功能
    useEffect(() => {
        obj.timer = setInterval(() => {
            animate(Ref.current, -(Ref.current.offsetWidth / (pic.length + 1)) * (current + 1), (Ref.current.offsetWidth / (pic.length + 1)))
            setCurrent(current + 1)
            if (current === pic.length - 1) {

                setCurrent(0)
            }
        }, 4000)
        // 退出时销毁
        return () => clearInterval(obj.timer)
    });
    // 设置大的高斯模糊的背景图片
    useEffect(() => {
        if (Ref.current.children.length !== 0) {
            setBgpic({ imageUrl: Ref.current.children[current].children[0].src + '?imageView&blur=40x20' })
        }
    }, [current])
    // 发送网络请求
    useEffect(() => {
        request({
            url: '/banner'
        }).then(res => {
            let data = res.banners.slice(0, 5)
            setPic([...data])
            // console.log(bgpic.imageUrl + '?imageView&blur=40x20');
            console.log(data[0].imageUrl);

            setBgpic({ imageUrl: data[0].imageUrl + '?imageView&blur=40x20' })

        })
    }, [])

    useEffect(() => {
        if (pic.length !== 0) {  // 自动设置ul的长度
            Ref.current.style.width = ((pic.length + 1) * 62.4) + 'vw';
            let clone = Ref.current.children[0].cloneNode(true)
            Ref.current.appendChild(clone)
        }
    }, [pic.length])

    // 实现轮播跳转
    const leftBtn = () => {
        animate(Ref.current, -(Ref.current.offsetWidth / (pic.length + 1)) * (current - 1), (Ref.current.offsetWidth / (pic.length + 1)), 5)
        setCurrent(current - 1)
        if (current < 1) {
            setCurrent(pic.length - 1)
        }
    }
    // 右按钮
    const RightBtn = () => {
        clearTimeout(obj.timer)
        animate(Ref.current, -(Ref.current.offsetWidth / (pic.length + 1)) * (current + 1), (Ref.current.offsetWidth / (pic.length + 1)), 5)
        setCurrent(current + 1)
        if (current === pic.length - 1) {
            setCurrent(0)
        }
    }
    // 点击小圆点快速跳转
    const junp = (index) => {
        return () => {
            clearTimeout(obj.timer)
            setCurrent(index)
            document.querySelector('.m').style.left = -((Ref.current.offsetWidth / (pic.length + 1)) * index) + 'px'

        }
    }

    return (
        <div className='loop'>
            <img src={bgpic.imageUrl} alt="" className='bigbg' />
            <div className='wrapper-v2'>
                <div className="left">

                    <ul ref={Ref}>
                        {pic.map((item, index) => {
                            return (
                                <li key={index}>
                                    <img src={item.imageUrl} alt="" />
                                </li>
                            )
                        })}
                    </ul>
                    <div className="dot">
                        {pic.map((item, index) => {
                            return (
                                <span key={index} className={current === index ? 'current' : ''} onClick={junp(index)}></span>
                            )
                        })}
                    </div>
                </div>
                <div className="right">
                    <img src={download} alt="" />
                </div>
                <button className='left-btn' onClick={leftBtn}>
                    <img src={prev} alt="" />
                </button>
                <button className='right-btn' onClick={RightBtn}>
                    <img src={next} alt="" />
                </button>
            </div>

        </div>
    )
})
