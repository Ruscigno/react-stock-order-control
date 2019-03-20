class TradingController{

    constructor(){
        let $ = document.querySelector.bind(document);
        this._inputData = $('#date');
        this._inputquantity = $('#quantity');
        this._inputValor = $('#price');

        this._tradingView = new TradingView($('#tradingViews'));
        
        this._tradingList = new TradingList(model => this._tradingView.update(model));

        this._message = new Message();
        this._messageView = new MessageView($('#messageView'));
        this._messageView.update(this._message);
    }

    add(event){
        event.preventDefault();

        this._tradingList.adiciona(this._addTrade());
        
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