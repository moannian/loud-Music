import React, {
    memo,
    useEffect,
    useState

} from 'react'

import { StorageAdd, StorageGet } from '../../../../Other/Storage'
function Ranking(props) {
    let storage = window.localStorage
    const [list, setlist] = useState([])


    useEffect(() => {
        // let m = StorageGet('PlayList')
        // setlist([...m])

    }, [])

    const c = () => {
        StorageAdd('test', 7)

    }
    const B = () => {
        storage.setItem("test", 6)

    }
    return (
        <div>
            <ul>
                {list.map((item, index) => {
                    return (
                        <div key={index} >{item.name}</div>
                    )
                })}
            </ul>
            <button onClick={c}>添加</button>
            <button onClick={B}>添加</button>
        </div>
    )
}
export default memo(Ranking)
