"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _grpcController = require("../lib/grpcController");

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/helloworld', function (req, res, next) {
  _grpcController.helloApi.sayHello({
    name: 'world'
  }, function (err, response) {
    if (err) {
      console.error(err);
      res.status(500).json({
        message: err.message
      });
      return;
    }

    console.log('response:', response);
    res.json({
      message: response.message
    });
  });
});
router.get('/hellostream', function (req, res, next) {
  _grpcController.helloStreamApi.sayMultiHello({
    name: '바보'
  }, function (err, response) {
    if (err) {
      console.error(err);
      res.status(500).json({
        message: err.message
      });
      return;
    }

    console.log('response:', response);
    res.json({
      message: response.message
    });
  });
});
var _default = router;
exports["default"] = _default;