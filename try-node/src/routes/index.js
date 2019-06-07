import {helloApi, helloStreamApi} from '../lib/grpcController'
import express from 'express';
var router = express.Router();


router.get('/helloworld', function(req, res, next) {

  helloApi.sayHello({name: 'world'}, (err, response) => {
    if (err) {
      console.error(err)
      res.status(500).json({message: err.message})
      return
    }
    console.log('response:', response);
    res.json({message: response.message})
  });

});


router.get('/hellostream', function(req, res, next) {

  helloStreamApi.sayMultiHello({name: '바보'}, (err, response) => {
    if (err) {
      console.error(err)
      res.status(500).json({message: err.message})
      return
    }
    console.log('response:', response);
    res.json({message: response.message})
  });

});


export default router;
