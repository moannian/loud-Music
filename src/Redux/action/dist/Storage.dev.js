"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CurrentPlay = exports.ClearPlayList = exports.Storeage_get = void 0;

var _type = require("../type");

var Storeage_get = function Storeage_get(value) {
  return {
    type: _type.STORAGE_GET,
    value: value
  };
};

exports.Storeage_get = Storeage_get;

var ClearPlayList = function ClearPlayList() {
  return {
    type: _type.CLEARPLYLIST
  };
};

exports.ClearPlayList = ClearPlayList;

var CurrentPlay = function CurrentPlay(value) {
  return {
    type: _type.CURRENT_PLAY,
    value: value
  };
};

exports.CurrentPlay = CurrentPlay;