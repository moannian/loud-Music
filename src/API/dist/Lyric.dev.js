"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GETSongWord = void 0;

var _request = _interopRequireDefault(require("./request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var GETSongWord = function GETSongWord(id) {
  return (0, _request["default"])({
    url: "/lyric?id=".concat(id)
  });
};

exports.GETSongWord = GETSongWord;