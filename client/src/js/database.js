import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  //connects to database
  const jateDB = await openDB('jate', 1);
  //creates a new transaction to the database and defines privileges for the transaction
  const tx = jateDB.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  //adds content to the database
  const request = store.put({ id: 1, value: content });
  //confirms if the transaction is successful
  const result = await request;
  console.log(result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const jateDB = await openDB('jate', 1);
  const tx = jateDB.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  //returns all data in database
  const request = store.getAll();
  result = await request;
  return result;
}

initdb();
