class TradingController{

    constructor(){
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
    }

    adicionar(event){
        event.preventDefault();

        let trading = new Trading(
            new Date(this._inputData.value.split('-')),
            this._inputQuantidade.value,
            this._inputValor.value);

        console.log(trading._data);
    }
}