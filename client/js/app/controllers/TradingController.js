class TradingController{

    constructor(){
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._listaNegociaoes = new TradingList();
    }

    adicionar(event){
        event.preventDefault();

        this._listaNegociaoes.adicionar(_criaTrading());
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