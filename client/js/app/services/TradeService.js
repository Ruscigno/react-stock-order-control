class TradeService{

    constructor() {
        this._http = new HttpService();
    }

    getWeekTrades(cb){
        return new Promise((resolve, reject) => {
            this._http
                .get('trades/week')
                .then(trades => {
                    resolve(trades.map(newTrade => new Trade(new Date(newTrade.date), newTrade.quantity, newTrade.price)))})
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
                    resolve(trades.map(newTrade => new Trade(new Date(newTrade.date), newTrade.quantity, newTrade.price)))})
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
                    resolve(trades.map(newTrade => new Trade(new Date(newTrade.date), newTrade.quantity, newTrade.price)))})
                .catch(error => {
                    console.log(error);
                    reject("Error while getting before last Week's Trades List from server.");
                });
        });
    }

    getTrades() {

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getWeekTrades(),
                this.getLastWeekTrades(),
                this.getBeforeLastWeekTrades()
            ]).then(cycleTrades => {

                let trades = cycleTrades
                    .reduce((datas, item) => datas.concat(item), [])
                    .map(data => new Trade(new Date(data.date), data.quantity, data.price));

                resolve(trades);

            }).catch(erro => reject(erro));
        });
    }

    add(trade){
        return ConnectionFactory
            .getConnection()
            .then(connection => new TradeDao(connection))
            .then(dao => dao.add(trade))
            .then(() => 'Trade added successfully')
            .catch(e => {
                console.log(e);
                throw new Error('Could not add the new Trade')
        });
    }

    listAll(){
        return ConnectionFactory
            .getConnection()
            .then(connection => new TradeDao(connection))
            .then(dao => dao.listAll())
            .catch(e => {
                console.log(e);
                throw new Error('Could not get Trades list');
        });
    }

    clear(){
        return ConnectionFactory
            .getConnection()
            .then(connection => new TradeDao(connection))
            .then(dao => dao.deleteAll())
            .then(() => 'Trades cleared successfuly')
            .catch(e => {
                console.log(e);
                throw new Error('Could not clear all trades')
            });
    }    

    import(currentList) {
        return this.getTrades()
            .then(trades => trades.filter(trade => 
                !currentList.some(realTrade =>
                    JSON.stringify(trade) == JSON.stringify(realTrade))
                )
            )
            .catch(e => {
                console.log(e);
                throw new Error('Could not find trades to import');
            })
    }
}