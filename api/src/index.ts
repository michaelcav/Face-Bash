import express from 'express';
import mysql from 'mysql';
const app = express();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '84744810',
  database: 'test',
})

app.get('/', (req, res) => {
  res.json('hello this is backend')
})

app.listen(8800, ()=> {
  console.log('conected dbd')
})