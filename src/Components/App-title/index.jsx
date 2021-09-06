import React, { memo } from 'react'
import PropType from 'prop-types'

import './style/index.less'
function Title(props) {
    const { title, List } = props

    return (
        <div className='AppTitle'>
            <div className="title">
                <h2>{title}</h2>
            </div>
            <div className="classly">
                {List.map((item, index) => {
                    return (
                        <li key={item.id}><span>{item.name}</span></li>
                    )
                })}
            </div>
            <div className="other">
                <span>更多</span>

            </div>
        </div>
    )
}

// 使用Prop-types在外面引入
Title.prototype = {
    title: PropType.string.isRequired,
    List: PropType.array
}


export default memo(Title)