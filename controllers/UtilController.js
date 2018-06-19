var models = require('../models');

module.exports = class UtilController {
    constructor(req, res){
        this.req = req;
        this.res = res;
    }

    loadById(model, id) {
        model.findOne({
            where: {
                id: id
            },
            attributes: ['id']
        })
        .then(result => {
            return this.res.json(result);  
        })
        .catch((error) => {
            return this.res.status(500).json({errorDetails: error});
        });
    }
}