var express = require('express');
var router = express.Router();
var authController = require('../controllers/AuthController');
var userController = require('../controllers/UserController');
var jwt = require('express-jwt');

router.post('/authenticate', function(req, res) {
    new authController(req, res).authenticate();
});

router.post('/validateFirstAccess', function(req, res) {
    new authController(req, res).validateFirstAccess();
});


router.post('/users', function(req, res) {
    new userController(req, res).save(req.body);
});

router.put('/users/:id', function(req, res){
    new userController(req, res).update(req.body);
})

router.get('/users', function(req, res){
    new userController(req, res).load();
})  

router.delete('/users/:id', function(req, res){
    new userController(req, res).remove();
})

router.post('/resetPassword', function(req, res) {
    new userController(req, res).resetPassword();
});
module.exports = router;