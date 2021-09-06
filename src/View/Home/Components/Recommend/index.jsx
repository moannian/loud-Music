import React, { memo } from 'react'

import LQLoop from './components/loop'
import Hot from './components/Hot/Hot'
import NewCD from './components/NewCD/NewCD'
import Login from './components/Login/Login'
import Ranking from './components/Ranking/Ranking'

import '../../../../assets/Less/Recommend.less'

export default memo(function Recommend() {

    return (
        <div className='recommend'>
            <LQLoop />
            <div className='bottom'>
                <div className='wrapper-v2'>
                    <div className="left">
                        <Hot />
                        <NewCD />
                        <Ranking />
                    </div>
                    <div className="right">
                        <Login />
                    </div>
                </div>
            </div>
        </div>
    )
})
