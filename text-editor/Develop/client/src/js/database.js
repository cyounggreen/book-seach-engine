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
export const dbPut = async (content) => {
  console.log('PUT success');
  const dbJate = await openDB('jate', 1);
  const txt = dbJate.transaction('jate', 'readwrite');
  const store = txt.objectStore('jate');
  const request = store.put({ id: 1, jate: content });
  const result = await request;
  console.log('Saved succesfully to database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const dbGet = async () => {
  console.log('GET success');
  const dbJate = await openDB('jate', 1);
  const txt = dbJate.transaction('jate', 'readonly');
  const store = txt.objectStore('jate');
  const request = store.get(1);
  const result = await request;
  console.log('result.value', result);
  return result?.value;
};

initdb();
