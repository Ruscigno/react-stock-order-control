class DateHelper{
    
    constructor() {
        throw new Error("This class shouldn't be instanced");
    }
    static dateToText(date){
        return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
    }

    static textToDate(text){
        if(!/\d{2}\/\d{2}\/\d{4}/.test(text)) {
            throw new Error('Date should be in formart: dd/mm/yyyy');
        }
        return new Date(...text.split('/').reverse().map((item, index) => item - index % 2));
    }

    static textToDateInternational(text){
        if (!/\d{4}-\d{2}-\d{2}/.test(text)){
            throw new Error('Date should be in formart: yyyy-mm-dd');
        }
        return new Date(text.split('-'));
    }
}