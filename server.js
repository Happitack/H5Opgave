const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Creates an Express application
const app = express();

app.use(bodyParser.json());
app.use(cors());

// The port that our server will run on (localhost:3001 by default)
const port = process.env.PORT || 4000;
// Starting the server on our specified port
app.listen(port, () => console.log(`Server is running on ${port}`));

// Importing the mssql package to interact with an MS SQL database
const sql = require('mssql');

// Configuration for connecting to our database
// This is not secure and should be done differently in production
const config = {
  user: 'sa',
  password: 'password',
  server: 'localhost',
  database: 'TwinMindsDB',
  options: {
    encrypt: false,
    enableArithAbort: true 
  }
};

// Here we define the SQL commands that we want to run on server start
// This is not secure and should be done differently in production
const sqlCommands = [
  `IF NOT EXISTS (
      SELECT name FROM sys.databases WHERE name = 'TwinMindsDB'
  )
  CREATE DATABASE TwinMindsDB`,
  "USE TwinMindsDB",
  `IF NOT EXISTS (
      SELECT * FROM sys.tables WHERE name='Subscribers' AND type = 'U'
  )
  CREATE TABLE Subscribers(
      ID INT PRIMARY KEY IDENTITY(1,1),
      Email NVARCHAR(320) NOT NULL,
      SubscriptionDate DATETIME DEFAULT GETDATE()
  )`,
  `IF NOT EXISTS (
      SELECT * FROM sys.tables WHERE name='TextData' AND type = 'U'
  )
  CREATE TABLE TextData (
      ID INT IDENTITY(1,1) PRIMARY KEY,
      Page NVARCHAR(100),
      Title NVARCHAR(200),
      Subtitle NVARCHAR(200),
      Description NVARCHAR(MAX)
  )`,
  `IF NOT EXISTS (
      SELECT * FROM TextData WHERE Page = 'paranoia'
  )
  INSERT INTO TextData (Page, Title, Subtitle, Description) VALUES ('paranoia', 'Paranoia', 'The Concepts of Loneliness', 'Description...')`,
  `IF NOT EXISTS (
      SELECT * FROM TextData WHERE Page = 'projectfear'
  )
  INSERT INTO TextData (Page, Title, Subtitle, Description) VALUES ('projectfear', 'Project Fear', 'The Concepts of Loneliness', 'Description...')`
];

// Connect to SQL Server and run commands
sql.connect(config).then(pool => {
  // Execute each SQL command sequentially
  return sqlCommands.reduce((prev, command) => {
      return prev.then(() => {
          return pool.request().query(command);
      });
  }, Promise.resolve()); // Initial promise to start the chain
}).then(() => {
  console.log('Database setup successful');
}).catch(err => {
  console.error('Database setup failed', err);
}).finally(() => {
  sql.close(); // close the connection pool
});

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