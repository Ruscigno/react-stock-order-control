class TradeService{

    getWeekTrades(cb){
        let request = new XMLHttpRequest();
        request.open('GET', 'negociacoes/semana');
        request.onreadystatechange = () => {
            /*
                0	UNSENT	open() não foi chamado ainda.
                1	OPENED	send() não foi chamado ainda.
                2	HEADERS_RECEIVED	send() foi chamado, e cabeçalhos e status estão disponíveis.
                3	LOADING	Download; responseText contém dados parciais.
                4	DONE	A operação está concluída.
            */
            if(request.readyState == 4) {
                if (request.status == 200){
                    cb(null, JSON.parse(request.responseText)
                        .map(newTrade => new Trade(new Date(newTrade.data), newTrade.quantidade, newTrade.valor)));
                }else{
                    console.log(request.responseText);
                    cb('Error while getting Trades List from server.');
                }
            }
        };
        request.send();
    }
}