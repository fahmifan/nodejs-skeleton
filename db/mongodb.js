const MongoClient = require('mongodb').MongoClient;
const config = require('../config')

// Connection URL
const url = `mongodb://localhost:27017/${config.dbName()}`;

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = client
