import React, { memo, useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { withRouter } from 'react-router-dom'

import './less/index.less'

// 引入图片
import Prev from '../../assets/img/Comment/prev.png'
import Stop from '../../assets/img/Comment/stop.png'
import Next from '../../assets/img/Comment/next.png'
import Play from '../../assets/img/Comment/play.png'
import Share from '../../assets/img/AppPlay/share.png'
import Screen from '../../assets/img/AppPlay/screen.png'
import CollectBefore from '../../assets/img/Comment/collect-before.png'
import CollectAfter from '../../assets/img/Comment/collect-after.png'
import Voice from '../../assets/img/AppPlay/voice.png'
import LoopONe from '../../assets/img/AppPlay/loopOne.png'
import Order from '../../assets/img/AppPlay/order.png'
import Random from '../../assets/img/AppPlay/random.png'
import PlayList from '../../assets/img/AppPlay/playList.png'
import Link from '../../assets/img/AppPlay/link.png'
import Down from '../../assets/img/AppPlay/down.png'
import Delete from '../../assets/img/AppPlay/delete.png'
import Current from '../../assets/img/AppPlay/current.png'


// 引入函数
import Loop from '@/Other/Loop.js'
import { StorageGet, StoreageDelete, StorageClear, StorageSet } from '../../Other/Storage'
import ImgSize from '../../Other/ImgSize'
import { Timer } from '../../Other/Timer';
import { PLay } from '../../Other/Play';



// 引入Redux
import { Storeage_get, ClearPlayList, CurrentPlay } from '@/Redux/action/Storage'



function AppPlay(props) {

    // useState
    //#region 
    const Dispatch = useDispatch()
    const [show, setShow] = useState(true)
    const [play, setPlay] = useState(false)
    const [loop, setLoop] = useState(1)
    const [List, setList] = useState([])
    const [showPlayList, setPlatList] = useState(false)
    const [currentTime, setCurrentTime] = useState()
    const [touchPlay, setTouchPLay] = useState(-1)//触发播放 【0是播放】
    const [isChange, setChange] = useState()

    const [count, setCount] = useState(0)
    //#endregion

    const Ref = useRef()
    const process = useRef()//进度条
    const ParentRef = useRef()
    const DotRef = useRef()
    const boxRef = useRef()//最外面的进度条
    const audioRef = useRef();
    let PlayTimer = useRef()
    let V = useRef(0)
    let timer = null



    let { Storeage, Currentplay } = useSelector((state) => ({
        Storeage: state.Storeage.list,
        Currentplay: state.Storeage.currentplay
    }), shallowEqual)
    // redux快速刷新的问题
    let duration = Currentplay.dt || 0
    useEffect(() => {
        if (Storeage.length !== 0) {
            setList([...Storeage])
        } else {
            setList([])
        }
    }, [Storeage])

    useEffect(() => {
        if (Ref.current.children !== 0) {
            Ref.current.style.height = (Ref.current.children.length - 1) * 4 + 'vh'
        }
    }, [Storeage])
    useEffect(() => {

        Dispatch(CurrentPlay(StorageGet("CurrentPlay")))
    }, [Storeage])
    // 鼠标移动事件
    const MouseEnter = () => {
        if (timer != null) {
            clearTimeout(timer)
        }
        setShow(true)
    }
    const MouseLeave = () => {
        // timer = setTimeout(() => {
        //     setShow(false)
        //     clearTimeout(timer)
        // }, 2000)

    }
    // 控制播放
    useEffect(() => {
        if (touchPlay !== 0) {
            return audioRef.current.pause();
        }
        else if (touchPlay === 0) {
            setPlay(true)
            audioRef.current.src = PLay(Currentplay.id)
            audioRef.current.play();
            setChange(true);
        }
    }, [touchPlay])
    // 控制进度条
    useEffect(() => {
        if (isChange === true) {
            PlayTimer.current = setInterval(() => {
                process.current.style.width = Math.floor((boxRef.current.offsetWidth - DotRef.current.offsetWidth / 2) / parseInt(Currentplay.dt / 1000) * audioRef.current.currentTime) + 'px';
                if (audioRef.current.currentTime > Currentplay.dt / 1000 - 0.2) {
                    if (loop === 1) {
                        return PlayBtn()
                    } else if (loop === 2) {
                        return NextBtn()
                    }
                }
            }, 1000)
            console.log(1);
        }

        if (isChange === false) {
            clearInterval(PlayTimer.current)
        }
        return (() => {
            clearInterval(PlayTimer.current)
        })
    }, [isChange])
    // 各种点击事件
    const PlayBtn = () => {

        if (play === false) {
            setTouchPLay(2)
            setTimeout(() => { setTouchPLay(0) }, 10)
        } else {
            setTouchPLay(2)
        }
        setPlay(!play)
    }
    // 上一首
    const PrevBtn = () => {
        if (Storeage.length === 0) {
            alert('请添加歌曲')
        } else {
            let index = Storeage.findIndex((item) => { return item.id === Currentplay.id })

            if (index < 1) {
                index = Storeage.length
            }
            let m = Storeage[index - 1]
            StorageSet("CurrentPlay", m)
            Dispatch(CurrentPlay(StorageGet("CurrentPlay")))
            ParentRef.current.scrollTop = Ref.current.children[0].offsetHeight * (index - 1)
            setTouchPLay(3)
            setTimeout(() => {
                setTouchPLay(0)
            }, 10)
        }

    }
    // 下一首
    const NextBtn = () => {
        if (Storeage.length === 0) {
            alert('请添加歌曲')
        } else {
            let index = Storeage.findIndex((item) => { return item.id === Currentplay.id })
            if (index >= Ref.current.children.length - 1) {
                index = 0
            } else {
                index = index + 1
            }
            let m = Storeage[index]
            StorageSet("CurrentPlay", m)
            Dispatch(CurrentPlay(StorageGet("CurrentPlay")))
            setTouchPLay(1)
            setTimeout(() => {
                setTouchPLay(0)
            }, 10)
        }
    }
    // 控制循环的点击
    const LoopBtn = () => {
        if (loop === 3) {
            return setLoop(1)
        }
        setLoop(loop + 1)
    }
    // 控制当前播放的歌曲
    const CurrentPlayBtn = (e, item) => {
        e.stopPropagation();
        StorageSet('CurrentPlay', item)
        Dispatch(CurrentPlay(StorageGet("CurrentPlay")))
    }

    // 删除列表播放
    const DeleteBtn = (index) => {
        return () => {
            StoreageDelete("PlayList", index)
            Dispatch(Storeage_get(StorageGet("PlayList")))

        }
    }
    // 清除播放列表
    const clearBtn = (e) => {
        e.stopPropagation();
        StorageClear()
        Dispatch(ClearPlayList())
    }
    // 显示与影藏列表
    const playListBtn = () => {
        setPlatList(!showPlayList)
    }

    // 进度条
    const dotBtn = (e) => {
        let LeftX = e.clientX - process.current.offsetWidth
        setChange(false)
        let move = function (e) {
            if (e.pageX - LeftX <= 0) {
                process.current.style.width = 0
            } else if (e.pageX - LeftX >= boxRef.current.offsetWidth - DotRef.current.offsetWidth / 2) {
                process.current.style.width = boxRef.current.offsetWidth - DotRef.current.offsetWidth / 2 + 'px'
                return boxRef.current.removeEventListener('mousemove', move)
            }
            process.current.style.width = e.pageX - LeftX + 'px'


        }
        boxRef.current.addEventListener('mousemove', move)
        document.addEventListener('mouseup', () => {
            boxRef.current.removeEventListener('mousemove', move)
            V.current = (process.current.offsetWidth / 2) - 1


            audioRef.current.currentTime = (process.current.offsetWidth / (boxRef.current.offsetWidth - DotRef.current.offsetWidth / 2)) * (duration / 1000)


            setChange(true)


        })
    }

    const timerupdata = (e) => {
        setCurrentTime(e.target.currentTime * 1000)
    }

    // 跳转路由
    const Junp = (e) => {
        e.defaultPrevented = true;
        props.history.push('/LQLyric')
    }



    return (
        <div className='AppPlay' onMouseEnter={MouseEnter} onMouseLeave={MouseLeave}>
            <div className={show ? 'showPlay' : ''}>
                <div className='wrapper-v2'>
                    <div className='operate'>
                        <div>
                            <div className="prev" onClick={PrevBtn}>
                                <img src={Prev} alt="" />
                            </div>
                        </div>
                        <div>
                            <div className="play" onClick={PlayBtn}>
                                <img src={play ? Stop : Play} alt="" />
                            </div>
                        </div>
                        <div>
                            <div className='next' onClick={NextBtn}>
                                <img src={Next} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className='schedule'>
                        <div className="left">
                            <img src={ImgSize(StorageGet('CurrentPlay').al.picUrl, 34, 34)} alt="" onClick={e => { Junp(e) }} />
                        </div>
                        <div className="right">
                            <div className='top'>
                                <span style={{ color: 'white' }}>{Currentplay.name}</span>
                                <span style={{ color: '#423d3dfb' }}>{StorageGet('CurrentPlay').ar[0].name}</span>
                            </div>
                            <div className='bottom'>
                                <div className="process" ref={boxRef}>
                                    <div className="cover" ref={process}>
                                        <div className="dot" onMouseDown={(e) => { return dotBtn(e) }} ref={DotRef}></div>
                                    </div>
                                </div>
                                <div className="timer"><span>{Timer(currentTime)}/{Timer(duration)}</span></div>
                            </div>
                        </div>
                    </div>
                    <div className='choose'>
                        <div >
                            <div className='screen'>
                                <img src={Screen} alt="" />
                            </div>
                        </div>
                        <div>
                            <div className='collect'>
                                <img src={CollectBefore} alt="" />
                            </div>
                        </div>
                        <div >
                            <div className='share'>
                                <img src={Share} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className='other'>
                        <div>
                            <div className='voice'>
                                <img src={Voice} alt="" />
                            </div>
                        </div>
                        <div>
                            <div className='loop' onClick={LoopBtn}>
                                <img src={Loop(loop, LoopONe, Order, Random)} alt="" />
                            </div>
                        </div>
                        <div>
                            <div className='playList' onClick={playListBtn}>
                                <img src={PlayList} alt="" />
                                <div className={showPlayList ? 'mask' : 'close'}>
                                    <div className='List'>
                                        <header>
                                            <div className="left">
                                                <span>播放列表</span>
                                            </div>
                                            <div className="right">
                                                <span>收藏全部</span>
                                                <span onClick={(e) => { return clearBtn(e) }}>清除</span>
                                            </div>
                                        </header>
                                        <div className='wrapper' ref={ParentRef}>
                                            <ul ref={Ref}>
                                                {List.map((item, index) => {
                                                    return (
                                                        <li key={index} onClick={(e) => { CurrentPlayBtn(e, item) }}>
                                                            <div className="current">
                                                                {item.id === Currentplay.id ? <img src={Current} alt="" /> : ''}
                                                            </div>
                                                            <div className="song">
                                                                <span>{item.name}</span>
                                                            </div>
                                                            <div className="ico">
                                                                <div className='add'>
                                                                    <img src={CollectBefore} alt="" />
                                                                </div>
                                                                <div className='share'>
                                                                    <img src={Share} alt="" />
                                                                </div>
                                                                <div className='down'>
                                                                    <img src={Down} alt="" />
                                                                </div>
                                                                <div className='delete' onClick={DeleteBtn(index)}>
                                                                    <img src={Delete} alt="" />
                                                                </div>
                                                            </div>
                                                            <div className="sonename">
                                                                <span>{item.ar[0].name}</span>
                                                            </div>
                                                            <div className="time">
                                                                <span>04：24</span>
                                                            </div>
                                                            <div className="link">
                                                                <img src={Link} alt="" />
                                                            </div>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className='lyrics'>
                                        <header>
                                            <span>{Currentplay.name}</span>
                                        </header>
                                        <div className="content">
                                            <span style={{ color: 'red' }}>{count}</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <audio ref={audioRef} onTimeUpdate={timerupdata} />
                </div>
            </div>


        </div >
    )
}

export default withRouter(memo(AppPlay))