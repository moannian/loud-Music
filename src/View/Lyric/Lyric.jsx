import React, { memo, useEffect } from 'react'
import { useSelector } from 'react-redux'

import '../../assets/Less/Lyric.less'
import SongWord from './Components/SongWord/SongWord'


export default memo(function Lyric() {
    const { CurrentPlay } = useSelector((state) => ({
        CurrentPlay: state.Storeage.currentplay
    }))
    const Current = CurrentPlay || 0
    const pic = CurrentPlay.al || 0

    return (
        <div className='Lyric'>
            <div className='wrapper-v2'>
                <div className="lyric_left">
                    <div className='top'>
                        {/* 碟片部分 */}
                        <div className="top_left">
                            <div className="bg">
                                <div className="pic">
                                    <img src={pic.picUrl} alt="" />
                                </div>
                            </div>
                        </div>
                        {/* 歌词部分 */}
                        <div className="top_right">
                            <SongWord CurrentPlay={Current} />
                        </div>
                    </div>
                    <div className='comment'>我是评论</div>
                </div>
                <div className='lyric_right'>我是右边</div>
            </div>
        </div>
    )
})
