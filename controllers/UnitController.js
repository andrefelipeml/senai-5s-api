var models = require('../models');

module.exports = class UnitController {
    constructor(req, res){
        this.req = req;
        this.res = res;
    }

    save(unit){
        models.Unit.create(unit)    
        .then(res => {
            return this.res.status(201).json({
                type: 'success', message: 'Unidade salva com sucesso'
            })
        })
        .catch((error) => {   
            return this.res.status(500).json({
                type: 'error', message: 'Ocorreu um erro ao tentar salvar', errorDetails: error
            });
        });
    }

    load(){ 
        models.Unit.findAll({})
        .then(units => {
            return this.res.json(units);
        })
        .catch((error) => {
            return this.res.status(500).json({
                message: 'Ocorreu um erro ao tentar carregar as unidades', errorDetails: error
            });
        });
    }

    update(unit){
        return models.Unit.update(unit,
        { 
            where: { id: unit.id }
        })
        .then(res => {
            return this.res.status(200).json({type: 'success', message: 'Unidade salva com sucesso!'})
        })
        .catch((err) => {
            return this.res.status(500).json({
                type: 'error', message: 'Ocorreu um erro ao atualizar a unidade', errorDetails: err
            });
        });
    }

    remove(){
        models.Unit.destroy({
            where: {    
                id: this.req.params.id  
            }
        })
        .then((deletedRecord) => {
            if(deletedRecord)
                return this.res.status(200).json({
                    type: 'success', message: "Unidade removida com sucesso!"
                });         
            else
                return this.res.status(404).json({
                    type: 'error', message: "Registro não encontrado!"
                }); 
        })
        .catch((error) => {
            return this.res.status(500).json({
                type: 'error', message: 'Erro de servidor', errorDetails: error
            }); 
        })
    }
}