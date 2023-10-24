const express = require('express');
const mysql = require('mysql');

const app = express();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'gym',
});

app.get('/staff', (req, res) => {
  pool.query('SELECT * FROM staff', (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

app.get('/equipment', (req, res) => {
  pool.query('SELECT * FROM equipment', (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

app.get('/clients', (req, res) => {
  pool.query('SELECT * FROM clients', (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

app.get('/schedule', (req, res) => {
  pool.query('SELECT * FROM schedule', (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});