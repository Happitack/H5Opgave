const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server is running on ${port}`));

const sql = require('mssql');

const config = {
  user: 'sa',
  password: 'password',
  server: 'localhost',
  database: 'TwinMindsDB',
  options: {
    encrypt: false 
  }
};

sql.connect(config)
.then(() => console.log('Database connected'))
.catch(err => console.log('Database connection failed', err));

app.post('/subscribe', (req, res) => {
  const email = req.body.email;

  const request = new sql.Request();
  request.input('email', sql.NVarChar(320), email);
  request.query(`INSERT INTO Newsletter (Email, SubscriptionDate) VALUES (@email, GETDATE())`, (err, result) => {
      if (err) {
          console.error('SQL error', err);
          res.status(500).send({ error: 'Could not subscribe email' });
      } else {
          res.send({ message: 'Email subscribed successfully!' });
      }
  });
});

app.get('/textdata', (req, res) => {
  const request = new sql.Request();
  request.query("SELECT Title, Subtitle, Description FROM TextData WHERE Page = 'header'", (err, result) => {
    if (err) {
      console.error('SQL error', err);
      res.status(500).send({ error: 'Could not fetch text data' });
    } else {
      res.send(result.recordset[0]);
    }
  });
});