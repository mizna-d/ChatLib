'use strict';
const log = console.log
log('Express server')

const express = require('express')
const app = express();

const path = require('path');
const { dirname } = require('path');

// Setting up a static directory for the files in /pub
// using Express middleware.
// Don't put anything in /pub that you don't want the public to have access to!
app.use(express.static(path.join(__dirname, '/pub')))

// Let's make some express 'routes'
// Express has something called a Router, which 
// takes specific HTTP requests and handles them
// based on the HTTP method and URL

// Let's make a route for an HTTP GET request to the 
// 'root' of our app (i.e. top level domain '/')

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/pub/homepage.html');
})

app.get('/communityExample', (req, res) => {
	res.sendFile(__dirname + '/pub/catExample.html');
})

app.get('/businessExample', (req, res) => {
	res.sendFile(__dirname + '/pub/businessExample.html');
})

// app.get('/educationExample', (req, res) => {
// 	res.sendFile(__dirname + '/pub/Website/examples/educationExample/.html');
// })

app.get('/documentation', (req, res) => {
	res.sendFile(__dirname + '/pub/documentation.html');
})


// Error codes
app.get('/problem', (req, res) => {
	res.status(500).send('There was a problem on the server')
})


// will use an 'environmental variable', process.env.PORT, for deployment.
const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
})  