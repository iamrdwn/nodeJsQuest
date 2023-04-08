import sqlite3 from 'sqlite3';
import path from 'path';

const DBSOURCE = new URL('../../app.db', import.meta.url).pathname;


const db = new sqlite3.Database(DBSOURCE, err => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log('Connected to the SQLite database.');
    // db.run(/* your initial database setup queries here */);
  }
});


export default db;
