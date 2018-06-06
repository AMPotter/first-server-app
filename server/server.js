const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

// eslint-disable-next-line
const neighborhoods = require('./data/neighborhoods');

const fs = require('fs');
const dataPath = 'data/neighborhoods.json';

app.get('/api/neighborhoods', (req, res) => {
  const raw = fs.readFileSync(dataPath);
  const data = JSON.parse(raw);
  res.send(data);
});

app.post('/api/neighborhoods', (req, res) => {
  console.log(req.method, req.url, req.body);
  const raw = fs.readFileSync(dataPath);
  const data = JSON.parse(raw);
  data.push(req.body);
  fs.writeFileSync(dataPath, JSON.stringify(data));
  res.send(req.body);
});

app.use((req, res) => {
  console.log(req.method, req.url, req.body.name);
  res.send({ error: 'path not found' });
});

const PORT = 3000;

app.listen(PORT, () => console.log('app running on ' + PORT));