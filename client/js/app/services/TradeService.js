class TradeService{

    constructor() {
        this._http = new HttpService();
    }

    getWeekTrades(cb){
        return new Promise((resolve, reject) => {
            this._http
                .get('trades/week')
                .then(trades => {
                    resolve(trades.map(newTrade => new Trade(new Date(newTrade.data), newTrade.quantidade, newTrade.valor)))})
                .catch(error => {
                    console.log(error);
                    reject("Error while getting Week's Trades List from server.");
                });
        });
    }


    getLastWeekTrades(cb){
        return new Promise((resolve, reject) => {
            this._http
                .get('trades/last')
                .then(trades => {
                    resolve(trades.map(newTrade => new Trade(new Date(newTrade.data), newTrade.quantidade, newTrade.valor)))})
                .catch(error => {
                    console.log(error);
                    reject("Error while getting last Week's Trades List from server.");
                });
        });
    }

    getBeforeLastWeekTrades(cb){
        return new Promise((resolve, reject) => {
            this._http
                .get('trades/before-last')
                .then(trades => {
                    resolve(trades.map(newTrade => new Trade(new Date(newTrade.data), newTrade.quantidade, newTrade.valor)))})
                .catch(error => {
                    console.log(error);
                    reject("Error while getting before last Week's Trades List from server.");
                });
        });
    }
}