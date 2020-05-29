const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;

const app = express(); // returns express function from the server
app.use(morgan('dev')); // this will configure morgan to log using the dev version show infomation on the screen
app.use(bodyParser.json()); // thie middle ware handles parsing data into properties of the request for ease of use

app.all('/campsites', (req, res, next) => {// use as default for all routing method
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next(); // pass control of the application routing next relevant routing method after this one
})

app.get('/campsites', (req, res) => {
    res.end('Will send all the campsites to you');
});

app.post('/campsites', (req, res) => {
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
});

app.put('/campsites', (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /campsites');
});

app.delete('/campsites', (req, res) => {
    res.end('Deleting all campsites');
});

app.get('/campsites/:campsiteId', (req, res) => {
    res.end(`Will send details of the campsite: ${req.params.campsiteId} to you`);
});

app.post('/campsites/:campsiteId', (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`);
});

app.put('/campsites/:campsiteId', (req, res) => {
    res.write(`Updating the campsite: ${req.params.campsiteId}\n`);
    res.end(`Will update the campsite: ${req.body.name}
        with description: ${req.body.description}`);
});

app.delete('/campsites/:campsiteId', (req, res) => {
    res.end(`Deleting campsite: ${req.params.campsiteId}`);
});

app.use(express.static(__dirname + '/public')); // __dirname - special node variable, it will refer to the absolute path of the current directory of the file thats in

app.use((req, res) => { // special type of function that express call a middleware function. 3parameters request object, response object, next - function
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})