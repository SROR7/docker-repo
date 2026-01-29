const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const { Client } = require('pg');

//init app 
const port = process.env.port || 4000;
const app = express();

// connect to redis 
const REDIS_PORT = 6379;
const REDIS_HOST = 'redis';
const redisClient = redis.createClient({
    url:`redis://${REDIS_HOST}:${REDIS_PORT}`
});
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', (err) => console.log('Redis is connected...'));
redisClient.connect();



// connect postgres-DB 
const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_PORT = 5432;
const DB_HOST = 'PG-DB';

const URI =`postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:3211`
 
const client = new Client({
    connectionString: URI,
});
client
    .connect()
    .then(() => console.log('connected to Postgres-DB'))
    .catch((err) => console.log('faild to connected to Postgres-DB', err))


// // connect DB 
// const DB_USER = 'root';
// const DB_PASSWORD = 'example';
// const DB_PORT = 27017;
// const DB_HOST = 'mongo';

// const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`
// mongoose
//     .connect(URI)
//     .then(() => console.log('connect to db'))
//     .catch((err) => console.log('faild to connected to DB', err))


app.get( '/', (req, res) => {
    redisClient.set('products', 'products...')
    res.send('<h1>Hello Tresmerge!</h1>') 
});

app.get( '/data', async (req, res) => {
    const products = await redisClient.get('products');
    res.send(`<h1>Hello Tresmerge!</h1><h2>${products}<h2>`) 
});

app.listen(port, () => console.log(`server is running on port ${port}`));