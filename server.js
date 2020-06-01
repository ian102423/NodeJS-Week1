const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const campsiteRouter = require('./routes/campsiteRouter');
const promotionRouter = require('./routes/promotionRouter');

const hostname = 'localhost';
const port = 3000;

const app = express(); // returns express function from the server
app.use(morgan('dev')); // this will configure morgan to log using the dev version show infomation on the screen
app.use(bodyParser.json()); // thie middle ware handles parsing data into properties of the request for ease of use

app.use('/campsites', campsiteRouter); // providing route paths
app.use('/promotions', promotionRouter); // promotion
app.use(express.static(__dirname + '/public')); // __dirname - special node variable, it will refer to the absolute path of the current directory of the file thats in

app.use((req, res) => { // special type of function that express call a middleware function. 3parameters request object, response object, next - function
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})