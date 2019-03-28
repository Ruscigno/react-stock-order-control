class Trade {

    constructor(date, quantity, price) {
        this._date = new Date(date.getTime());
        this._quantity = quantity;
        this._price = price;
        Object.freeze(this);
    }

    get volume(){
        return this._quantity * this._price;
    }

    get date(){
        return new Date(this._date.getTime()) ;
    }

    get quantity(){
        return this._quantity;
    }

    get price(){
        return this._price;
    }
}