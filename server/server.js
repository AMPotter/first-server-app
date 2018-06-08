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
  client
    .query(
      `
    SELECT n.id,
    q.id as "quadrantId",
    q.name || '(' || q.direction || ')' as "quadrantName",
    description,
    population,
    founded
  from neighborhoods n
  join quadrants q
  on n.quadrant_id = q.id
  order by n.name;
  `
    )
    .then(result => {
      res.send(result.rows);
    });
});

app.post('/api/neighborhoods', (req, res) => {
  const body = req.body;

  client
    .query(
      `
    INSERT INTO neighborhoods (name, quadrant_id, population, founded, description)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `,
      [
        body.name,
        body.quadrantId,
        body.population,
        body.founded,
        body.description
      ]
    )
    .then(result => {
      res.send(result.rows[0]);
    });
});

app.put('/api/neighborhoods/:id', (req, res) => {
  const body = req.body;

  client
    .query(
      `
      update neighborhoods
      set
        name = $1,
        quadrant_id = $2,
        population = $3,
        founded = $4,
        description = $5
      where id = $6
      returning *;
    `,
      [
        body.name,
        body.quadrantId,
        body.population,
        body.founded,
        body.description,
        req.params.id
      ]
    )
    .then(result => {
      res.send(result.rows[0]);
    });
});

app.delete('/api/neighborhoods/:id', (req, res) => {
  client
    .query(
      `
    delete from neighborhoods where id=$1;
  `,
      [req.params.id]
    )
    .then(() => {
      res.send({ removed: true });
    });
});

app.get('/api/quadrants', (req, res) => {
  client
    .query(
      `
    select * from quadrants;
  `
    )
    .then(result => {
      res.send(result.rows);
    });
});

const PORT = 3000;
app.listen(PORT, () => console.log('app running on ' + PORT));
