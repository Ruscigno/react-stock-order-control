class HttpService {

    get(url) {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open('GET', url);
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
                        resolve(JSON.parse(request.responseText));
                    }else{
                        reject(request.responseText);
                    }
                }
            };
            request.send(); 
        });
    }
}