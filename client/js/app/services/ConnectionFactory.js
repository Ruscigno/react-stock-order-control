var ConnectionFactory = (function(){
  const stores = ['trades'];
  const version = 6;
  const dbName = 'aluraframe';
  
  var connection = null;
  var close = null;

  return class ConnectionFactory {

    constructor() {
      throw new Error('This is a static class');
    }

    static getConnection() {
      return new Promise((resolve, reject) => {
        let openRequest = window.indexedDB.open(dbName, version);
        
        openRequest.onupgradeneeded = e => {
          ConnectionFactory._createStore(e.target.result)
        }
        
        openRequest.onsuccess = e => {
          if (!connection) {
            connection = e.target.result;
            close = connection.close.bind(connection);
            connection.close = function(){
              throw new Error('You cannot close this connection directly');
            }
          }
          resolve(connection);
        }
        
        openRequest.onerror = e => {
          console.log(e.target.error);
          reject(e.target.error.name);
        }
      });
    }
    
    static _createStore(connection){
      stores.forEach(store => {
        if(connection.objectStoreNames.contains(store))
          connection.deleteObjectStore(store);
        
        connection.createObjectStore(store, {autoIncrement: true});
      });
    }
    
    static closeConnection(){
      if(connection){
        //Reflect.apply(close, connection, []);
        close(); //using bind
        connection = null;
      }  
    }
  }
})();