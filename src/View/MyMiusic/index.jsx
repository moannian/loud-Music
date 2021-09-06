import React, { memo, useState, useRef, useCallback, useEffect } from 'react'

export default memo(function Mymiusic() {
    useEffect(() => {
        fb()
    }, [])

    const [count, setCount] = useState(0)
    // 用于缓存
    let timer = useRef()
    const start = useCallback(() => {
        if (!timer.current) {
            timer.current = setInterval(() => {
                // 这里如果想更新的话，必须setcount要使用一个函数
                setCount(count => count + 1)

            }, 1000)
        }
    }, [])
    const pause = () => {
        if (timer.current) {
            clearInterval(timer.current)
            timer.current = null
        }

    }
    const reset = () => {
        pause()
        setCount(0)
    }

    const fb = useCallback(() => {
        console.log(count);
    }, [count])
    const test = useCallback(() => {

        setCount(count + 1)
    }, [count])
    return (
        <div>
            <div>计数:{count * 2}</div>
            <div onClick={start}>启动</div>
            <div onClick={pause}>暂停</div>
            <div onClick={reset}>重置</div>
            <button onClick={test}>实验</button>
        </div>
    )
})
