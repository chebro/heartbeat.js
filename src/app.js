#!/bin/node

const path = require('path');
const express = require('express');
const app = express();

const mainRouter = require('./routes/mainRouter');
const statsRouter = require('./routes/statsRouter');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('trust proxy', true);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/', mainRouter);
app.use('/stats', statsRouter);

app.use((req, res) => {
	console.log(
		`${new Date().toLocaleString('en-GB')} - Invalid request from ${req.ip} - ${
			req.originalUrl
		}`
	);
	res.status(404).json({
		status: 'fail',
		message: '404 Page Not Found',
	});
});

module.exports = app;
