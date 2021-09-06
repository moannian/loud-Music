import React, { memo, useEffect } from 'react'

import './style/index.less'

// 引入图片
import One from '@/assets/img/Lyric/one.png'
import CollectBefore from '@/assets/img/Comment/collect-before.png'
import Play from '@/assets/img/Comment/play.png'
import Share from '@/assets/img/AppPlay/share.png'
import Down from '@/assets/img/AppPlay/down.png'
import Add from '@/assets/img/Recommend/add.png'
import Comment from '@/assets/img/Lyric/comment.png'


// 引入API
import { GETSongWord } from '../.../../../../../API/Lyric'
export default memo(function SongWord(props) {
    let { CurrentPlay } = props
    let singer = CurrentPlay.ar || 0;
    let singer_name = singer[0] || 0
    useEffect(() => {
        GETSongWord(CurrentPlay.id).then(res => {
            console.log(res);
        })
    }, [props])
    return (
        <div className='SongWord'>
            {/* 歌名 */}
            <div className="songName">
                <div className="songName_pic">
                    <img src={One} alt="" />
                </div>
                <span>{CurrentPlay.name}</span>
            </div>
            {/* 歌手 */}
            <div className='singer'>
                <span>歌手：<a href="#">{singer_name.name}</a></span>
            </div>
            {/* 所属专辑 */}
            <div className='album'>
                <span>所属专辑：李权</span>
            </div>
            <div className='ico'>
                <div className='play'>
                    <div className="left">
                        <div className="pic">
                            <img src={Play} alt="" />
                        </div>
                        <span>播放</span>
                    </div>
                    <div className="right">
                        <div className="pic">
                            <img src={Add} alt="" />
                        </div>
                    </div>
                </div>
                <div className='gether'>
                    <div className="pic">
                        <img src={CollectBefore} alt="" />
                    </div>
                    <span>收藏</span>
                </div>
                <div className='share'>
                    <div className="pic">
                        <img src={Share} alt="" />
                    </div>
                    <span>分享</span>
                </div>
                <div className='down'>
                    <div className="pic">
                        <img src={Down} alt="" />
                    </div>
                    <span>下载</span>
                </div>
                <div className='comment'>
                    <div className="pic">
                        <img src={Comment} alt="" />
                    </div>
                    <span>评论</span>
                </div>
            </div>
        </div>
    )
})
