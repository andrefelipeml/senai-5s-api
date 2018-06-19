var models = require('../models');

module.exports = class EnviromentTypeController {
    constructor(req, res){
        this.req = req;
        this.res = res;
    }

    save(enviromentType){
        models.EnviromentType.create(enviromentType)    
        .then(res => {
            return this.res.status(201).json({
                type: 'success', message: 'Tipo de ambiente salvo com sucesso!'
            })
        })
        .catch((error) => {   
            return this.res.status(500).json({
                message: 'Ocorreu um erro ao tentar salvar', errorDetails: error
            });
        });
    }

    load(){ 
        models.EnviromentType.findAll({})
        .then(enviromentTypes => {
            return this.res.json(enviromentTypes);
        })
        .catch((error) => {
            return this.res.status(500).json({errorDetails: error});
        });
    }

    update(enviromentType){
        return models.EnviromentType.update(enviromentType,
        { 
            where: { id: enviromentType.id }
        })
        .then(res => {
            return this.res.status(200).json({
                type: 'success', message: 'Tipo de ambiente salvo com sucesso!'
            })
        })
        .catch((error) => {
            return this.res.status(500).json({
                type: 'error', message: 'Ocorreu um erro ao tentar atualizar!', errorDetails: error
            });
        });
    }

    remove(){
        models.EnviromentType.destroy({
            where: {
                id: this.req.params.id  
            }
        })
        .then((deletedRecord) => {
            if(deletedRecord)
                return this.res.status(200).json({
                    type: 'success', message: "Removido com sucesso!"
                });         
            else
                return this.res.status(404).json({
                    type: 'error', message: "Registro não encontrado!"
                }); 
        })
        .catch((error) => {
            return this.res.status(500).json({
                type: 'warning',
                message: "Não é possível remover um tipo de ambiente que está vinculado a um ambiente",
                errorDetails: error
            }); 
        })
    }

    removeAssociatedItems(enviromentTypeId) {
        models.EnviromentTypeQuestion.destroy({
            where: {    
                enviroment_types_id: enviromentTypeId 
            }
        })
        .then(res => {
            return this.res.status(200).json({type: 'success', msg: 'Tipos de ambientes foram removidos!'});
        })
        .catch((error) =>{
            return this.res.status(500).json({errorDetails: error})
        })
    }
}