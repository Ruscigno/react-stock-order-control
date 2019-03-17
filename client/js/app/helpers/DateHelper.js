class DateHelper{
    
    constructor() {
        throw new Error("This class shouldn't be instanced");
    }
    static dataParaTexto(data){
        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
    }

    static textoParaData(texto){
        if (!/\d{4}-\d{2}-\d{2}/.test(texto)){
            throw new Error('Should be in formart: yyyy-mm-dd');
        }
        return new Date(texto.split('-'));
    }
}