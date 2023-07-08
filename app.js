const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config');

const orderRouter = require('./routes/order');

mongoose
    .connect(config.Mongo.uri, { dbName: config.Mongo.db })
    .then(() => {console.log(`Connected to MongoDB ${config.Mongo.db}`);})
    .catch((err) =>console.error(err, `Failed to connect to MongoDB ${mongoSecrets.DB}`));

const app = express();

app.use(bodyParser.json());

app.use('/order', orderRouter);

app.listen(3002, ()=>console.log('Server listening on port 3002'));