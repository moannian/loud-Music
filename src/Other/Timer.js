export function Timer(timer) {
    if (timer === undefined) {
        return '00:00'
    } else {
        let detail = timer / 1000
        detail = Number.parseInt(detail)
        let minute = detail / 60
        minute = Number.parseInt(minute)
        minute = minute > 9 ? minute : "0" + minute
        let second = detail % 60
        second = Number.parseInt(second)
        second = second > 9 ? second : '0' + second
        return minute + ":" + second
    }

}