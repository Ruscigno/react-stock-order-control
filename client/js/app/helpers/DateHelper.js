class DateHelper{
    
    constructor() {
        throw new Error("This class shouldn't be instanced");
    }
    static dataParaTexto(data){
        data.getDate()
        + '/' + (data.getMonth() + 1)
        + '/' + data.getFullYear(); 
    }

    static textoParaData(texto){
        return new Date(texto.split('-'));
    }
}