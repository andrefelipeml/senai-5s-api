var express = require('express');
var router = express.Router();
var utilController = require('../controllers/UtilController');
var models = require('../models');

router.get('/util/:id', function(req, res){
    new utilController(req, res).loadById(models.User, req.params.id);
})

module.exports = router;