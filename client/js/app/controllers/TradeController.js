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

        ConnectionFactory
            .getConnection()
            .then(con => new TradeDao(con))
            .then(dao => dao.listAll())
            .then(trades => 
                trades.forEach(trade => 
                    this._tradeList.add(trade)))
            .catch(e => this._message.text = e);
    }

    add(event){

        event.preventDefault();

        ConnectionFactory
            .getConnection()
            .then(connection => {
                let trade = this._addTrade();
            
                new TradeDao(connection)
                    .add(trade)
                    .then(() => {
                        this._tradeList.add(trade)
                        this._message.text = 'Trade added successfully';
                        this._clearForm();
                    });
        })
        .catch(e => this._message.text = e);
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
        ConnectionFactory
            .getConnection()
            .then(con => new TradeDao(con))
            .then(dao => dao.deleteAll())
            .then(message => {
                this._message.text = message;
                this._tradeList.clear();
            });
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