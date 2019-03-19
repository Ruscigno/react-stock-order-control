class TradingView extends View{

    template(model){
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
                        <td>${n.quantity}</td>
                        <td>${n.price}</td>
                        <td>${n.volume}</td>
                    </tr>`
                ).join('')}
            </tbody>

            <tfoot>
                    <td colspan="3"></td>
                    <td>${model.negociacoes.reduce((total, n) => total += n.volume, 0.0)}
            </tfoot>
            </table>
        `;
    }
}