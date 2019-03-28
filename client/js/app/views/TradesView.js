class TradesView extends View{

    template(model){
        return `
            <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th onclick="tradeController.orderBy('date')">DATE</th>
                    <th onclick="tradeController.orderBy('quantity')">QUANTITY</th>
                    <th onclick="tradeController.orderBy('price')">PRICE</th>
                    <th onclick="tradeController.orderBy('volume')">VOLUME</th>
                </tr>
            </thead>

            <tbody>
                ${model.trades.map(n => 
                    `<tr>
                        <td>${DateHelper.dateToText(n.date)}</td>
                        <td>${n.quantity}</td>
                        <td>${n.price}</td>
                        <td>${n.volume}</td>
                    </tr>`
                ).join('')}
            </tbody>

            <tfoot>
                    <td colspan="3"></td>
                    <td>${model.trades.reduce((total, n) => total += n.volume, 0.0)}
            </tfoot>
            </table>
        `;
    }
}