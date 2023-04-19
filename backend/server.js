const express = require('express');
const cors = require('cors');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const jwt = require('jsonwebtoken');
const indexRouter = require('./app/routes/index');
const authRouter = require('./app/routes/auth');
const dbClient = require('./app/utils/db');
const { ObjectId } = require('mongodb');

const corsOptions = {
  origin: 'http://localhost:3000',
};

const { TOKEN_SECRET } = process.env;

const port = process.env.PORT || 5001;
const app = express();

//passport.use(new JwtStrategy(options, async (jwtPayload, done) => {
//  console.log(jwtPayload);
//  await dbClient.users.findOne({ _id: jwtPayload.sub }).then(
//    (user) => {
//      if (user) {
//        return done(null, user);
//      }
//      return done(null, false);
//    },
//  ).catch((err) => done(err, false));
//}));
require('./app/config/passport')(passport);
app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({extended: true}))

// Configuring CORS options
app.use(cors());
app.options('*', cors(corsOptions));

app.use('/api/', indexRouter);
app.use('/api/auth', authRouter);

app.listen(port, () => {
  console.log(`Running backend server on http://localhost${port}`);
});
