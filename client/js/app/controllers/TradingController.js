class TradingController{

    constructor(){
        let $ = document.querySelector.bind(document);
        this._inputData = $('#date');
        this._inputquantity = $('#quantity');
        this._inputValor = $('#price');
        this._tradingList = new TradingList();
        
        this._tradingView = new TradingView($('#tradingViews'));
        this._tradingView.update(this._tradingList);
        
        this._message = new Message();
        this._messageView = new MessageView($('#messageView'));
        this._messageView.update(this._message);
    }

    add(event){
        event.preventDefault();

        this._tradingList.adiciona(this._addTrade());
        this._tradingView.update(this._tradingList);
        
        this._message.texto = 'Trading added successfully';
        this._messageView.update(this._message);
        
        this._clearForm();
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