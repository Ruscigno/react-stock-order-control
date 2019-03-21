class TradingController{

    constructor(){
        let $ = document.querySelector.bind(document);
        this._inputData = $('#date');
        this._inputquantity = $('#quantity');
        this._inputValor = $('#price');

        let self = this;
        this._tradingList = new Proxy(new TradingList(), {

            get(target, prop, receiver) {
                if (['add', 'clear'].includes(prop) && typeof(target[prop] == typeof(Function))) {
                    return function() {
                        Reflect.apply(target[prop], target, arguments);
                        self._tradingView.update(target);
                    }
                }
                return Reflect.get(target, prop, receiver);
            }
        });
        
        this._tradingView = new TradingView($('#tradingViews'));
        this._message = new Message();
        this._messageView = new MessageView($('#messageView'));
        this._messageView.update(this._message);
    }

    add(event){
        event.preventDefault();

        this._tradingList.add(this._addTrade());
        
        this._message.texto = 'Trading added successfully';
        this._messageView.update(this._message);
        
        this._clearForm();
    }

    clear(){
        this._tradingList.clear();
        this._tradingView.update(this._tradingList);

        this._message.texto = 'Trading list cleared successfully';
        this._messageView.update(this._message);
    }

    _addTrade(){
        return new Trading(
            DateHelper.textoParaData(this._inputData.value),
            this._inputquantity.value,
            this._inputValor.value);
    }
    _clearForm(){
        this._inputData.value = "";
        this._inputquantity.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }
}