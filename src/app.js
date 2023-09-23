const express = require('express');
const logger = require('morgan');
const { errorConverter, errorHandler } = require('./middlewares/error');

const v1Router = require('./routes/v1');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/v1', v1Router);

app.use(errorConverter);

app.use(errorHandler);

module.exports = app;
