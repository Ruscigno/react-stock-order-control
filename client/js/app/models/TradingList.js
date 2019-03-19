class TradingList{

    constructor() {
        this._trades = []
    }

    adiciona(_trade){
        this._trades.push(_trade);
    }

    get trades(){
        return [].concat(this._trades);
    }
}