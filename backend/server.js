const express = require('express');
const cors = require('cors');
const indexRouter = require('./app/routes/index');
const authRouter = require('./app/routes/auth');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwtStrategy = require('./app/utils/config');

const corsOptions = {
    origin: "http://localhost:8081",
    credentials: true,
}

const port = process.env.PORT || 5000;
const app = express();

// Configuring CORS options
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

passport.use('jwt', jwtStrategy);
app.use(passport.initialize());

app.use(express.json());
app.use('/api/', indexRouter);
app.use('/api/auth', authRouter);


app.listen(port, () => {
    console.log(`Running backend server on http://localhost${port}`)
});
