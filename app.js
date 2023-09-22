var express = require('express');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/v1', indexRouter);

app.use((req, res) => {
	res.status(404).send({ message: 'Resource not found' });
});

module.exports = app;
