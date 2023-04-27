const express = require('express');
const cors = require('cors');
const passport = require('passport');
const indexRouter = require('./app/routes/index');
const authRouter = require('./app/routes/auth');
const paymentStripeRouter = require('./app/routes/paymentStripe');



const corsOptions = {
  origin: 'http://localhost:3000',
};

const { TOKEN_SECRET } = process.env;

const port = process.env.PORT || 5001;
const app = express();

// Passport strategy initialized
require('./app/config/passport')(passport);
app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({extended: true}))

// Configuring CORS options
app.use(cors());
app.options('*', cors(corsOptions));

app.use('/api/', indexRouter);
app.use('/api/auth', authRouter);
app.use(paymentStripeRouter);

app.listen(port, () => {
  console.log(`Running backend server on http://localhost${port}`);
});
