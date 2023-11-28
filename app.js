const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

// router
const categoriesRouter = require('./app/api/v1/categories/routes');
const imagesRouter = require('./app/api/v1/images/routes');
const talentsRouter = require('./app/api/v1/talents/routes');
const eventsRouter = require('./app/api/v1/events/routes');
const organizerRouter = require('./app/api/v1/organizers/router');

const v1 = '/api/v1/cms';

// middlewares //harus dibawah router
const notFoundMiddleware = require('./app/middlewares/not-found');
const handleErrorMiddleware = require('./app/middlewares/handler-error');
// middlewares

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome Api Semina'
    })
});

app.use(v1, categoriesRouter);
app.use(v1, imagesRouter);
app.use(v1, talentsRouter);
app.use(v1, eventsRouter);
app.use(v1, organizerRouter);


// penggunaan middlewares dibawah router
app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);


module.exports = app;
