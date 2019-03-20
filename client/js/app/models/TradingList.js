class TradingList{

    constructor(context, trap) {
        this.clear();
        this._trap = trap;
        this._context = context;
    }

    adiciona(_trade){
        this._trades.push(_trade);
        Reflect.apply(this._trap, this._context, [this]);
    }

    get trades(){
        return [].concat(this._trades);
    }

    clear(){
        this._trades = [];
        Reflect.apply(this._trap, this._context, [this]);
    }
}