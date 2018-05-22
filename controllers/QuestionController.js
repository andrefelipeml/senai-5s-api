var models = require('../models');

module.exports = class Question {
    constructor(req, res){
        this.req = req;
        this.res = res;
    }

    save(question) {
        models.Question.create(question)
        .then(res => {
            return this.res.json({status: 201, questions_id: res.id, enviroment_types_id: question.enviroment_types_id})
        })
        .catch((err) => {   
            return this.res.status(500);       
        });
    }

    saveInAssociateTable(relatedIds) {
        var idsToInsert = [];
        relatedIds.enviromentTypeId.forEach(envtypeId => {
            idsToInsert.push({questions_id: relatedIds.questionId, enviroment_types_id: envtypeId})
        });
        models.EnviromentTypeQuestion.bulkCreate(idsToInsert)
        .then(res => {
        })
        .catch((err) => {   
            return this.res.status(500);       
        });
    }

    removeAssociatedItems(questionId) {
        models.EnviromentTypeQuestion.destroy({
            where: {    
                questions_id: questionId 
            }
        })
        .then(res => {
            return this.res.json({status: 201})
        })
        .catch((err) =>{
            return this.res.json({status: 500})
        })
    }

    load() {
        models.Question.findAll({})
        .then(questions => {
            return this.res.json(questions);
        })
        .catch((error) => {
            return this.res.status(500);
        });
    }

    getRelatedItems(question) {
        models.EnviromentTypeQuestion.findAll({
            include: [{
                model: models.Question,
                require: true  
            }],
            where: {
                questions_id: question.id 
            }
        })
        .then(questions => {
            return this.res.json(questions);
        })
        .catch((error) => {
            return this.res.status(500);
        })
    }
    
    update(question) {
        models.Question.update(question,
        { 
            where: { id: question.id }
        })
        .then(res => {
            return this.res.json({status: 201})
        })
        .catch((err) => {
            return this.res.status(500).json({message: err});
        });
    }

    remove() {
        models.Question.destroy({
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