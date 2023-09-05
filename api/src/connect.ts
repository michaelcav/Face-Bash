import mysql from 'mysql'

export const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '84744810',
  database: 'social',
})

