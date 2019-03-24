class TradingController{

    constructor(){
        let $ = document.querySelector.bind(document);
        this._inputData = $('#date');
        this._inputquantity = $('#quantity');
        this._inputValor = $('#price');

        this._tradingList = new Bind(
            new TradingList(),
            new TradingView($('#tradingViews')),
            'add', 'clear'
        );
        
        this._message = new Bind(
            new Message(),
            new MessageView($('#messageView')),
            'text'
        );
    }

    add(event){
        event.preventDefault();
        this._tradingList.add(this._addTrade());
        this._message.text = 'Trading added successfully';
        this._clearForm();
    }

    clear(){
        this._tradingList.clear();
        this._message.text = 'Trading list cleared successfully';
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