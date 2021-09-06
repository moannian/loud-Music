"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StorageAdd = StorageAdd;
exports.StorageGet = StorageGet;
exports.StorageSet = StorageSet;
exports.StoreageDelete = StoreageDelete;
exports.StorageCurrent = StorageCurrent;
exports.StorageClear = StorageClear;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// 添加
var storage = window.localStorage;

function StorageAdd(name, content) {
  var has = StorageGet("PlayList").some(function (value) {
    return value.id === content.id;
  });

  if (has === false) {
    return storage.setItem(name, JSON.stringify([].concat(_toConsumableArray(JSON.parse(storage.getItem(name))), [content])));
  }

  return;
} // 获取


function StorageGet(name) {
  return JSON.parse(storage.getItem(name));
} // 设置


function StorageSet(name, value) {
  return storage.setItem(name, JSON.stringify(value));
} // 删除


function StoreageDelete(name, index) {
  var arr = JSON.parse(storage.getItem(name));
  arr.splice(index, 1);
  return storage.setItem(name, JSON.stringify(_toConsumableArray(arr)));
} // 立即播放


function StorageCurrent(name, content) {
  var current = StorageGet(name).findIndex(function (value) {
    return value.id === content.id;
  });

  if (current === -1) {
    return storage.setItem(name, JSON.stringify([content].concat(_toConsumableArray(JSON.parse(storage.getItem(name))))));
  } else {
    StoreageDelete("PlayList", current);
    return storage.setItem(name, JSON.stringify([content].concat(_toConsumableArray(JSON.parse(storage.getItem(name))))));
  }
} // 清除全部


function StorageClear(name) {
  return storage.setItem('PlayList', JSON.stringify([]));
} // 上一首