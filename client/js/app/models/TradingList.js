class TradingList{

    constructor(trap) {
        this.clear();
        this._trap = trap;
    }

    adiciona(_trade){
        this._trades.push(_trade);
        this._trap(this);
    }

    get trades(){
        return [].concat(this._trades);
    }

    clear(){
        this._trades = [];
        this._trap(this);
    }
}