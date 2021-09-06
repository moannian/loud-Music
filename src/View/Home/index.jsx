import React, { memo, useState } from 'react'
import { withRouter } from 'react-router-dom'

import { HomeRouter } from '../../Router/index'
import '@/assets/Less/Home.less'
function Home(prop) {
    const List = [{
        id: 1,
        path: '/home/recommend',
        name: '推荐'
    },
    {
        id: 2,
        path: '/home/ranking',
        name: '排行榜'
    }, {
        id: 3,
        path: '',
        name: '歌单'
    }, {
        id: 4,
        path: '',
        name: '主播电台'
    },
    {
        id: 5,
        path: '',
        name: '歌手'
    }, {
        id: 6,
        path: '',
        name: '新歌上架'
    }]
    const [current, setCurrent] = useState(0)
    const btn = (path, index) => {
        return () => {
            prop.history.push(path)
            setCurrent(index)
        }
    }
    return (
        <div className='home' >

            <header>
                <nav className='wrapper-v2'>
                    <ul>
                        {List.map((item, index) => {
                            return (

                                <li
                                    onClick={btn(item.path, index)}
                                    key={item.id}
                                    className={index === current ? 'show' : ''}
                                >
                                    <span >{item.name}</span>
                                </li>

                            )
                        })}
                    </ul>
                </nav>
            </header>

            <div className="content">
                <HomeRouter />
            </div>
        </div>
    )
}

export default withRouter(memo(Home))