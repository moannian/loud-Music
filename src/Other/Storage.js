// 添加
let storage = window.localStorage
export function StorageAdd(name, content) {

    let has = StorageGet("PlayList").some((value) => { return value.id === content.id })
    if (has === false) {
        return storage.setItem(name, JSON.stringify([...JSON.parse(storage.getItem(name)), content]))
    }
    return
}
// 获取
export function StorageGet(name) {

    return JSON.parse(storage.getItem(name))
}
// 设置
export function StorageSet(name, value) {

    return storage.setItem(name, JSON.stringify(value))
}

// 删除
export function StoreageDelete(name, index) {
    let arr = JSON.parse(storage.getItem(name))
    arr.splice(index, 1)
    return storage.setItem(name, JSON.stringify([...arr]))
}

// 立即播放
export function StorageCurrent(name, content) {

    let current = StorageGet(name).findIndex((value) => {
        return value.id === content.id
    })
    if (current === -1) {
        return storage.setItem(name, JSON.stringify([content, ...JSON.parse(storage.getItem(name))]))


    } else {
        StoreageDelete("PlayList", current)
        return storage.setItem(name, JSON.stringify([content, ...JSON.parse(storage.getItem(name))]))

    }

}

// 清除全部
export function StorageClear(name) {
    return storage.setItem('PlayList', JSON.stringify([]))
}

// 上一首