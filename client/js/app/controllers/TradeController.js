class TradeController{

    constructor(){
        let $ = document.querySelector.bind(document);
        this._inputData = $('#date');
        this._inputquantity = $('#quantity');
        this._inputValor = $('#price');
        this._order = '';

        this._tradeList = new Bind(
            new TradeList(),
            new TradesView($('#tradesViews')),
            'add', 'clear', 'orderBy'
        );
        
        this._message = new Bind(
            new Message(),
            new MessageView($('#messageView')),
            'text'
        );
    }

    add(event){
        event.preventDefault();
        this._tradeList.add(this._addTrade());
        this._message.text = 'Trades added successfully';
        this._clearForm();
    }

    importTrades(event){
        let service = new TradeService();
        
        Promise.all(
            [
                service.getWeekTrades(),
                service.getLastWeekTrades(),
                service.getBeforeLastWeekTrades()
            ])
            .then(trades => {
                trades.reduce((flatArray, array) => flatArray.concat(array), [])
                      .forEach(trade => this._tradeList.add(trade));
                this._message.text = 'Trades imported successfully.';})
            .catch(error => {
                this._message.text = error;
            });
    }

    clear(){
        this._tradeList.clear();
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

    orderBy(column){
        if (this._order == column){
            this._tradeList.orderBy((a, b) => b[column] - a[column]);
            this._order = 'i';
        }else{
            this._tradeList.orderBy((a, b) => a[column] - b[column]);
            this._order = column;
        }
    }
}