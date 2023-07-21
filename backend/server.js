const express = require('express');
const cors = require('cors');
const passport = require('passport');
const indexRouter = require('./app/routes/index');
const authRouter = require('./app/routes/auth');
const paymentStripeRouter = require('./app/routes/paymentStripe');



const corsOptions = {
  origin: 'https://artvertise.onrender.com',
};

const { TOKEN_SECRET } = process.env;

const port = process.env.PORT || 5000;
const app = express();

// Passport strategy initialized
require('./app/config/passport')(passport);
app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({extended: true}))

// Configuring CORS options
app.use(cors());
app.options('*', cors(corsOptions));

// Initialize Passport Authentication
const jwtAuth = passport.authenticate('jwt', { session: false });

app.get('/', (req, res) => {
  res.send('Welcome to Artvertise');
});
app.use('/api/', indexRouter);
app.use('/api/auth', authRouter);
app.use(paymentStripeRouter);

app.listen(port, () => {
  console.log(`Running backend server on http://localhost:${port}`);
});
