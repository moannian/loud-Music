import React, { memo } from 'react'

import './style/index.less'
export default memo(function Login() {
    return (
        <div className='RecommendLogin'>
            <span>
                登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机
            </span>
            <button>
                <span>用户登录</span>
            </button>
        </div>
    )
})
