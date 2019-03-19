class View {

    constructor(elemento) {
        this._elemento = elemento;
    }
    
    template(model){
        throw Error('The method "template" must be implemented.')
    }

    update(model){
        this._elemento.innerHTML = this.template(model);
    }
}