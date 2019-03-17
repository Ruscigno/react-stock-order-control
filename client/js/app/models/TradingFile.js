class TradingFile{

    constructor() {
        this._negociacoes = []
    }

    adiciona(_negociacao){
        this._negociacoes.push(_negociacao);
    }

    get negociacoes(){
        return [].concat(this.negociacoes);
    }
}