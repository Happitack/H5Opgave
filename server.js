const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Creates an Express application
const app = express();

app.use(bodyParser.json());
app.use(cors());

// The port that our server will run on (localhost:3001 by default)
const port = process.env.PORT || 3001;
// Starting the server on our specified port
app.listen(port, () => console.log(`Server is running on ${port}`));

// Importing the mssql package to interact with an MS SQL database
const sql = require('mssql');

// Configuration for connecting to our database
const config = {
  user: 'sa',
  password: 'password',
  server: 'localhost',
  database: 'TwinMindsDB',
  options: {
    encrypt: false 
  }
};

// Connecting to the database
sql.connect(config)
.then(() => console.log('Database connected'))
.catch(err => console.log('Database connection failed', err));

// Defining a route for a POST request to /subscribe. This is where the client will send the email to be subscribed.
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

// Defines a route for a GET request to /textdata. This is where the client will fetch the text data for the header.
app.get('/textdata/:page', (req, res) => {
  const page = req.params.page;
  const request = new sql.Request();
  request.input('page', sql.NVarChar(50), page);
  request.query("SELECT Title, Subtitle, Description FROM TextData WHERE Page = @page", (err, result) => {
    if (err) {
      console.error('SQL error', err);
      res.status(500).send({ error: 'Could not fetch text data' });
    } else {
      res.send(result.recordset);
    }
  });
});