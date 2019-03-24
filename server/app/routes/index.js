/* Código simplório, apenas para fornecer o serviço para a aplicação */

var api = require('../api');

module.exports  = function(app) {
    
    app.route('/trades/week')
        .get(api.weekList);
        
    app.route('/trades/last')
        .get(api.lastList);
        
    app.route('/trades/before-last')
        .get(api.beforeLastList);  
        
    app.route('/trades')
        .post(api.addTrade);          
};