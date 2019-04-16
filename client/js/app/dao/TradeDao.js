class TradeDao {

  constructor(connection) {
    this._connection = connection;
    this._store = 'trades';
  }

  add(trade) {
    return new Promise((resolve, reject) => {
      
      let request = this
        ._connection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .add(trade);

      request.onsuccess = e => {
        resolve();
      };

      request.onerror = e => {
        console.log(e.target.error);
        reject('Could not add the trade');
      };
    });
  }

  listAll() {
    return new Promise((resolve, reject) => {
      let cursor = this._connection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .openCursor();

      let trades = [];

      cursor.onsuccess = e => {
        let current = e.target.result;

        if (current) {
          let data = current.value;
          trades.push(new Trade(data._date, data._quantity, data._price));
          current.continue();
        } else {
          resolve(trades);
        }
      }

      cursor.onerror = e => {
        console.log(e.target.error.name);
        reject('Could not list the trades');
      }
    });
  }

  deleteAll(){
    return new Promise((resolve, reject) => {
      let request = this._connection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .clear();

      request.onsuccess = e => resolve('All trades removed successfully');

      request.onerror = e => {
        console.log(e.target.error);
        resolve("Could not remove the trade's list");
      };
    });
  }
}