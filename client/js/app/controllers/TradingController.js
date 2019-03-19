class TradingController{

    constructor(){
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._listaNegociaoes = new TradingList();
        
        this._tradingView = new TradingView($('#tradingViews'));
        this._tradingView.update(this._listaNegociaoes);
        
        this._message = new Message();
        this._messageView = new MessageView($('#messageView'));
        this._messageView.update(this._message);
    }

    adicionar(event){
        event.preventDefault();

        this._listaNegociaoes.adiciona(this._criaTrading());
        this._tradingView.update(this._listaNegociaoes);
        
        this._message.texto = 'Trading added successfully';
        this._messageView.update(this._message);
        
        this._limpaForm();
    }

    _criaTrading(){
        return new Trading(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value);
    }
    _limpaForm(){
        this._inputData.value = "";
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }
}