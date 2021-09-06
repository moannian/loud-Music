export default function Loop(current, img1, img2, img3) {
    if (current === 1) {
        return img1
    } else if (current === 2) {
        return img2
    } else if (current === 3) {
        return img3
    }
}