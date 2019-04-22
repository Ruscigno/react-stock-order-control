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

        this._service = new TradeService();
        this._init();
    }
    
    _init(){
        this._service
            .listAll()
            .then(trades => 
                trades.forEach(trade => 
                    this._tradeList.add(trade)))
            .catch(e => this._message.text = e);
    
        setInterval(() => {
            this.importTrades();
        }, 3000);
    }

    add(event){
        event.preventDefault();

        let trade = this._addTrade();

        this._service
            .add(trade)
            .then(message => {
                this._tradeList.add(trade);
                this._message.text = message
                this._clearForm();
            })
            .catch(e => this._message.text = e);
    }

    importTrades(event){
        this._service
            .getTrades()
            .then(trades => trades.filter(trade => 
                !this._tradeList.trades.some(realTrade =>
                    JSON.stringify(trade) == JSON.stringify(realTrade))
                )
            )
            .then(trades => trades.forEach(trade => {
                this._tradeList.add(trade);
                this._message.text = 'Trades imported successfully.';
            }))
            .catch(error => this._message.text = error);
    }

    clear(){
        this._service
            .clear()
            .then(message => {
                this._message.text = message;
                this._tradeList.clear();
            })
            .catch(e => this._message.text = e);
    }

    _addTrade(){
        return new Trade(
            DateHelper.textToDate(this._inputData.value),
            parseInt(this._inputquantity.value),
            parseInt(this._inputValor.value));
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