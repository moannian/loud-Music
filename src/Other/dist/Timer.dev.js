"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Timer = Timer;

function Timer(timer) {
  if (timer === undefined) {
    return '00:00';
  } else {
    var detail = timer / 1000;
    detail = Number.parseInt(detail);
    var minute = detail / 60;
    minute = Number.parseInt(minute);
    minute = minute > 9 ? minute : "0" + minute;
    var second = detail % 60;
    second = Number.parseInt(second);
    second = second > 9 ? second : '0' + second;
    return minute + ":" + second;
  }
}