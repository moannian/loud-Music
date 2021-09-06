function ImgSize(url, width, height) {

    let newURL = url + '?param=' + width + 'y' + height
    return newURL
}
export default ImgSize