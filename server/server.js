const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

const pg = require('pg');
const Client = pg.Client;
const databaseUrl = 'postgres://localhost:5432/neighborhoods';
const client = new Client(databaseUrl);
client.connect();

app.get('/api/neighborhoods', (req, res) => {
  client.query(`
    SELECT * from neighborhoods;
  `).then(result => {
    res.send(result.rows);
  });
});

app.post('/api/neighborhoods', (req, res) => {
  const body = req.body;

  client.query(`
    INSERT INTO neighborhoods (name, city, population, founded, description)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `,
  [body.name, body.city, body.population, body.founded, body.description]
  ).then(result => {
    res.send(result.rows[0]);
  });
});

app.delete('/api/neighborhoods/:id', (req, res) => {
  console.log(req.params.id);
  res.send({ removed: true });
});

const PORT = 3000;
app.listen(PORT, () => console.log('app running on ' + PORT));