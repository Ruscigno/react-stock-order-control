class TradingView {

    constructor(elemento) {
        this._elemento = elemento;
    }
    
    _template(model){
        return `
            <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATE</th>
                    <th>QUANTITY</th>
                    <th>PRICE</th>
                    <th>VOLUME</th>
                </tr>
            </thead>

            <tbody>
                ${model.negociacoes.map(n => 
                    `<tr>
                        <td>${DateHelper.dataParaTexto(n.data)}</td>
                        <td>${n.quantidade}</td>
                        <td>${n.valor}</td>
                        <td>${n.volume}</td>
                    </tr>`
                ).join('')}
            </tbody>

            <tfoot>
                    <td colspan="3"></td>
                    <td>${
                        (function(){
                            let total = 0;
                            model.negociacoes.forEach(n => total += n.volume);
                            return total;
                        })()
                    }
            </tfoot>
            </table>
        `;
    }
    
    update(model){
        this._elemento.innerHTML = this._template(model);
    }
}