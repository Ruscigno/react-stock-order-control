/* Código simplório, apenas para fornecer o serviço para a aplicação */
var api = {}

var currentDate = new Date();
var lastDate = new Date();
lastDate.setDate(currentDate.getDate() - 7);
var beforeDate = new Date();
beforeDate.setDate(currentDate.getDate() - 14);

var trades = [
      { date : currentDate, quantity : 1, price : 150},
      { date : currentDate, quantity : 2, price : 250},
      { date : currentDate, quantity : 3, price : 350},
      { date : lastDate, quantity : 1, price : 450},
      { date : lastDate, quantity : 2, price : 550},
      { date : lastDate, quantity : 3, price : 650},
      { date : beforeDate, quantity : 1, price : 750},
      { date : beforeDate, quantity : 2, price : 950},
      { date : beforeDate, quantity : 3, price : 950}
    ];


api.weekList = function(req, res) {
    var currentTrades = trades.filter(function(trade) {
        return trade.date > lastDate;
    });
    res.json(currentTrades);
};

api.lastList = function(req, res) {
   var lastTrades = trades.filter(function(trade) {
        return !(trade.date > lastDate) && !(trade.date < lastDate);
    });
	setTimeout(function() {
		res.json(lastTrades);	
	}, 500);
    
};

api.beforeLastList = function(req, res) {

   var beforeLastTrades = trades.filter(function(trade) {
        return trade.date < lastDate;
    });
    res.json(beforeLastTrades);
    
};

api.addTrade = function(req, res) {
    console.log(req.body);
    req.body.date = new Date(req.body.date.replace(/-/g,'/'));
    trades.push(req.body);
    res.status(200).json("Trade received");
};



module.exports = api;