var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var authenticationRouter = require("./routes/authentication");
var userRouter = require("./routes/user.route");
var restaurantRouter = require("./routes/restaurant.route");
var cartRouter = require("./routes/cart.route");
var foodRouter = require("./routes/food.route");
var bookmarkRouter = require("./routes/bookmark.route");

const MongoDB = require("./services/mongodb.service");
const bodyParser = require('body-parser');
const stripe = require('stripe')('sk_test_51NUsHtGqRB2ZDWnDO8N8lONchM6ptsPWuQkR07cjyHxP8PAy5hRfJXwToQTBnEbWv7XEqa822Qc3YbTaECFMOfp500Lw2OXDgq');

MongoDB.connectToMongoDB()

var app = express();

app.use(bodyParser.json());
app.post('/payment-sheet', async (req, res) => {
  const {amount, currency} = req.body;
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    {customer: customer.id},
    {apiVersion: '2022-11-15'}
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: currency,
    customer: customer.id,
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("static"));

app.use('*', require("./services/authentication.service").tokenVerification);

app.use('/', indexRouter);
app.use('/api', authenticationRouter);
app.use('/api/user', userRouter);
app.use('/api/restaurant', restaurantRouter);
app.use('/api/cart', cartRouter);
app.use('/api/food', foodRouter);
app.use('/api/bookmark', bookmarkRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
