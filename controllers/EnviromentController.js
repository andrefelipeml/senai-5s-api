var models = require('../models');

module.exports = class EnviromentController {
    constructor(req, res){
        this.req = req;
        this.res = res;
    }

    save(enviroment){
        models.Enviroment.create(enviroment)    
        .then(res => {
            return this.res.json({status: 201})
        })
        .catch((err) => {       
            return this.res.status(500).json({message: err});
        });
    }

    load(){ 
        models.Enviroment.findAll({
            include: [models.Unit, models.User, models.EnviromentType]
        })
        .then(enviroments => {
            return this.res.json(enviroments);  
        })
        .catch((error) => {
            return this.res.status(500);
        });
    }

    update(enviroment){
        return models.Enviroment.update(enviroment,
        { 
            where: { id: enviroment.id }
        })
        .then(res => {
            return this.res.json({status: 201})
        })
        .catch((err) => {
            return this.res.status(500).json({message: err});
        });
    }

    remove(){
        models.Enviroment.destroy({
            where: {
                id: this.req.params.id  
            }
        })
        .then((deletedRecord) => {
            if(deletedRecord === 1)
                return this.res.json({status: 200, message: "Removido com sucesso!"});         
            else
                return this.res.json({status: 404, message: "Registro não encontrado!"}); 
        })
        .catch((error) => {
            return this.res.json({status: 500, message: "Erro de servidor"}); 
        })
    }
}