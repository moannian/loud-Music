function animate(obj, target, width, second = 20) {
    clearInterval(obj.timer)
    obj.timer = setInterval(() => {

        let step = (target - obj.offsetLeft) / second;
        if (step > 0) {
            step = Math.ceil(step)

        } else {
            step = Math.floor(step)
        }
        if (obj.offsetLeft === target) {
            clearInterval(obj.timer)
        }
        if (obj.offsetLeft === -obj.offsetWidth + width) {
            obj.style.left = 0
        }
        if (obj.offsetLeft > width - 1) {
            obj.style.left = -obj.offsetWidth + 2 * width + 'px'
        }
        obj.style.left = obj.offsetLeft + step + 'px';


    }, 10);
}
export default animate