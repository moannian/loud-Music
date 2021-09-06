import React, { memo, useState } from 'react'
import { withRouter } from 'react-router-dom'

import './less/index.less'
import '../../assets/css/Base.css'

import Logo from '../../assets/img/Logo.png'
function AppHeader(props) {
    const [current, setCurrent] = useState(0)
    const List = [
        {
            id: '1',
            path: '/home',
            name: "发现音乐"
        },
        {
            id: '2',
            path: '/mymiusic',
            name: "我的音乐"
        },
        {
            id: '3',
            path: '/',
            name: "朋友"
        },
        {
            id: '4',
            path: '/',
            name: "商城"
        },
        {
            id: '5',
            path: '',
            name: "音乐人"
        },
        {
            id: '6',
            path: '/',
            name: "下载客户端"
        }
    ]
    const btn = (path, index) => {
        return () => {
            props.history.push(path)
            setCurrent(index)
        }
    }
    return (
        <div className='AppHeader'>

            <div className='wrapper-v1'>
                <div className="logo">
                    <img src={Logo} alt="" />
                </div>
                <nav>
                    <ul>
                        {
                            List.map((item, index) => {
                                return (
                                    <li key={item.id} onClick={btn(item.path, index)}>
                                        <span>{item.name}</span>
                                        <div className={current === index ? 'angle' : ''}></div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>
                <div className="other">
                    <div className="search">
                        <input type="search" name="" id="" placeholder='音乐/歌手/mv' />
                        <div className='ico'></div>
                    </div>
                    <div className='btn_center'>
                        <span>创作者中心</span>
                    </div>
                    <div className='btn_login'>
                        <button>登录</button>
                    </div>
                </div>
            </div>



        </div >
    )
}

export default withRouter(memo(AppHeader))