import React, { memo } from 'react'

import "./Less/index.less"

import author from '@/assets/img/AppFooter/author.png'
import one from '@/assets/img/AppFooter/one.png'
import award from '@/assets/img/AppFooter/award.png'
import Vawrd from '@/assets/img/AppFooter/v-award.png'
export default memo(function AppFooter() {
    const List = [{
        id: 1,
        url: author,
        name: '用户认证'
    }, {
        id: 2,
        url: one,
        name: '独立音乐人'
    }, {
        id: 3,
        url: award,
        name: '赞赏'
    }, {
        id: 4,
        url: Vawrd,
        name: '视频奖励'
    }]
    const protocal = [{
        id: 1,
        name: "服务条款"
    }, {
        id: 2,
        name: "隐私政策"
    }, {
        id: 3,
        name: "儿童隐私政策"
    }, {
        id: 4,
        name: "版权投诉指引"
    }, {
        id: 5,
        name: '意见反馈'
    }]
    return (
        <div className='AppFooter'>
            <div className='wrapper-v2'>
                <div className="left_content">
                    <div className='protocal'>
                        <ul>
                            {protocal.map((item, index) => {
                                return (
                                    <li key={item.id}><span>{item.name} </span></li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className='declarant'>
                        <div>
                            <span>网易公司版权所有©1997-2021&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;杭州乐读科技有限公司运营：浙网文[2021] 1186-054号</span>
                        </div>
                        <div>
                            <span>违法和不良信息举报电话：0571-89853516&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;举报邮箱：ncm5990@163.com</span>
                        </div>
                        <div>
                            <span>粤B2-20090191-18 &nbsp;&nbsp; 工业和信息化部备案管理系统网站&nbsp;&nbsp;  浙公网安备 33010902002564号</span>
                        </div>
                    </div>
                </div>
                <div className="right_content">
                    <ul>
                        {
                            List.map((item) => {
                                return (
                                    <li key={item.id}>
                                        <img src={item.url} alt="" />
                                        <span>
                                            {item.name}
                                        </span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div >
    )
})
