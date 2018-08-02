var jwt = require("jsonwebtoken");
var mysql = require('mysql')
var bcrypt = require('bcrypt');
var models  = require('../models');

module.exports = class AuthController {
    constructor(req, res){
        this._req = req;
        this._res = res;
    }

    async authenticate(){
        console.log('/authenticateNormal')
        var email = this._req.body.email;
        var password = this._req.body.password;

        try {
            const data = await models.User.findOne({
                where: {
                    email: email
                }           
            });

            if(data){
               var isAuthenticated =  bcrypt.compareSync(password, data.password);

                if(isAuthenticated){
                    var user = ({
                        id: data.id,
                        email: email,
                        userName: data.userName,
                        name: data.name,
                        profile: data.profile
                    })
                    var token = jwt.sign(user, process.env.SECRET_KEY, {
                        expiresIn: '12h'
                    });
                    
                    this._res.json({
                        token: token,
                        isAuth: true
                    });
                    
                }else
                    this._res.status(401).send("Dados incorretos");
                
            } else 
                this._res.status(401).send("Usuário não encontrado");
			
        } catch(err) {
            this._res.status(500).send("Ocorreu um erro ao tentar realizar o login" + err);
        }    
    }

    async authenticateApp(){
        console.log('/authenticateapp',)
        var email = this._req.body.email;
        var password = this._req.body.password;
        console.log('email',email, '      senha',password);
        try {
            const data = await models.User.findOne({
                where: {
                    email: email
                }           
            });

            console.log('data.profile: ', data.profile);

            if(data){
                var isAuthenticated =  bcrypt.compareSync(password, data.password);

                if(isAuthenticated){
                    if(data.profile > 1){
                        var user = ({
                            id: data.id,
                            email: email,
                            userName: data.userName,
                            name: data.name,
                            profile: data.profile
                        })
                        var token = jwt.sign(user, process.env.SECRET_KEY, {
                            expiresIn: '12h'
                        });
                        
                        this._res.json({
                            token: token,
                            isAuth: true
                        });
                     }else {
                        this._res.status(401).send("Usuário não permitido");
                     }
                    
                }else
                    this._res.status(401).send("Dados incorretos");
                
            } else 
                this._res.status(401).send("Usuário não encontrado");
			
        } catch(err) {
            this._res.status(500).send("Ocorreu um erro ao tentar realizar o login" + err);
        }    
    }
}