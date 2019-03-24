/* Código simplório, apenas para fornecer o serviço para a aplicação */
var api = {}

var currentDate = new Date();
var lastDate = new Date();
lastDate.setDate(currentDate.getDate() - 7);
var beforeDate = new Date();
beforeDate.setDate(currentDate.getDate() - 14);

var trades = [
      { data : currentDate, quantidade : 1, valor : 150},
      { data : currentDate, quantidade : 2, valor : 250},
      { data : currentDate, quantidade : 3, valor : 350},
      { data : lastDate, quantidade : 1, valor : 450},
      { data : lastDate, quantidade : 2, valor : 550},
      { data : lastDate, quantidade : 3, valor : 650},
      { data : beforeDate, quantidade : 1, valor : 750},
      { data : beforeDate, quantidade : 2, valor : 950},
      { data : beforeDate, quantidade : 3, valor : 950}
    ];


api.weekList = function(req, res) {
    var currentTrades = trades.filter(function(trade) {
        return trade.data > lastDate;
    });
    res.json(currentTrades);
};

api.lastList = function(req, res) {
   
   var lastTrades = trades.filter(function(trade) {
        return trade.data < currentDate && trade.data > beforeDate;
    });
	setTimeout(function() {
		res.json(lastTrades);	
	}, 500);
    
};

api.beforeLastList = function(req, res) {

   var beforeLastTrades = trades.filter(function(trade) {
        return trade.data < lastDate;
    });
    res.json(beforeLastTrades);
    
};

api.addTrade = function(req, res) {

   console.log(req.body);
   req.body.data = new Date(req.body.data.replace(/-/g,'/'));
   trades.push(req.body);
   res.status(200).json("Trade received");
};



module.exports = api;