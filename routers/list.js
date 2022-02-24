const express = require('express');

const listController = require('../controllers/list');
const router = express.Router();

router.get('/', listController.gettotalList);

router.get('/list', listController.getList);

router.get('/count', listController.getCount);

router.get('/search', listController.getSearch);

router.get('/searchking', listController.getSearchKing);

module.exports = router;