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
const authCMSRouter = require('./app/api/v1/auth/router');
const ordersRouter = require('./app/api/v1/orders/router');
const participantsRouter = require('./app/api/v1/participants/router');
const paymentsRouter = require('./app/api/v1/payments/router');

const v1 = '/api/v1';

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

app.use(`${v1}/cms`, categoriesRouter);
app.use(`${v1}/cms`, imagesRouter);
app.use(`${v1}/cms`, talentsRouter);
app.use(`${v1}/cms`, eventsRouter);
app.use(`${v1}/cms`, organizerRouter);
app.use(`${v1}/cms`, authCMSRouter);
app.use(`${v1}/cms`, ordersRouter);
app.use(`${v1}/cms`, paymentsRouter);
app.use(v1, participantsRouter);



// penggunaan middlewares dibawah router
app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);


module.exports = app;
