var models = require('../models');

module.exports = class EvaluationController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    load() {
        models.Evaluation.findAll({
            include: [models.User, models.Enviroment]
        })
        .then(evaluations => {
            return this.res.json(evaluations);
        })
        .catch((error) => {
            return this.res.status(500);
        });
    }

    save(evaluation){
        models.Evaluation.create(evaluation)
        .then(res => {
            return this.res.json({status: 201})
        })
        .catch((err) => {
            return this.res.json({error: err})
        })
    }

    update(evaluation){
        return models.Evaluation.update(evaluation,
        { 
            where: { id: evaluation.id }
        })
        .then(res => {
            return this.res.json({status: 201})
        })
        .catch((err) => {
            return this.res.status(500).json({message: err});
        });
    }

    remove() {
        models.Evaluation.destroy({
            where: {    
                id: this.req.params.id  
            }
        })
        .then((deletedRecord) => {
            if(deletedRecord === 1)
                return this.res.json({status: 200, message: "Removido com sucesso!"});         
        })
        .catch((error) => {
            return this.res.json({status: 500, message: "Erro de servidor"}); 
        })
    }
}