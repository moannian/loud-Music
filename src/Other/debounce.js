 let debounce = (fn, delay, ) => {
     let timer = null; //节流重要道具
     let targgle = true //判断是否是第一次
     let first = null
     return (...agrs) => {
         //  如果是第一次执行
         if (targgle) {
             fn.apply(this, agrs)
                 // 将第一次改为false
             targgle = false
                 //  通过即计时将第一次执行在改回来
             first = setTimeout(() => {
                     targgle = true
                 }, delay)
                 //  如果不是第一次执行
         } else {
             //  首先清除改回第一次执行的第定时器
             clearTimeout(first)
                 //  清除上一下次点击的事件
             if (timer != null) {
                 clearTimeout(timer)
             }
             timer = setTimeout(() => {
                 fn.apply(this, agrs)
                 targgle = true
             }, delay)
         }
     }
 }



 export default debounce