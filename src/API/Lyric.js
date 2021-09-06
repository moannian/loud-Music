import request from './request';


export const GETSongWord = (id) => {
    return request({
        url: `/lyric?id=${id}`
    })
}