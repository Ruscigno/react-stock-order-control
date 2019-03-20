class TradingList{

    constructor() {
        this.clear();
    }

    adiciona(_trade){
        this._trades.push(_trade);
    }

    get trades(){
        return [].concat(this._trades);
    }

    clear(){
        this._trades = [];
    }
}