class Trading {

    constructor(data, quantity, price) {
        this._data = new Date(data.getTime());
        this._quantity = quantity;
        this._price = price;
        Object.freeze(this);
    }

    get volume(){
        return this._quantity * this._price;
    }

    get data(){
        return new Date(this._data.getTime()) ;
    }

    get quantity(){
        return this._quantity;
    }

    get price(){
        return this._price;
    }
}