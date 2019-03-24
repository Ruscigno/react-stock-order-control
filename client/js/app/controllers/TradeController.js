class TradeController{

    constructor(){
        let $ = document.querySelector.bind(document);
        this._inputData = $('#date');
        this._inputquantity = $('#quantity');
        this._inputValor = $('#price');

        this._tradingList = new Bind(
            new TradeList(),
            new TradesView($('#tradingViews')),
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
        this._message.text = 'Trades added successfully';
        this._clearForm();
    }

    importTrades(event){
        let service = new TradeService();
        service.getWeekTrades((error, trades) => {
            if (error) {
                this._message.text = error;
                return;
            }

            trades.forEach(trade => this._tradingList.add(trade));
            this._message.text = 'Trades imported successfully.';
        });
    }

    clear(){
        this._tradingList.clear();
        this._message.text = 'Trade list cleared successfully';
    }

    _addTrade(){
        return new Trade(
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