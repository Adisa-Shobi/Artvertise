const express = require('express');
const cors = require('cors');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const indexRouter = require('./app/routes/index');
const authRouter = require('./app/routes/auth');
const dbClient = require('./app/utils/db');

const corsOptions = {
  origin: 'http://localhost:8081',
  credentials: true,
};

const { TOKEN_SECRET } = process.env;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: TOKEN_SECRET,
};

const port = process.env.PORT || 5000;
const app = express();

// Configuring CORS options
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

app.use(express.json());
passport.use(new JwtStrategy(options, async (jwtPayload, done) => {
  console.log(jwtPayload);
  await dbClient.users.findOne({ _id: jwtPayload.sub }).then(
    (user) => {
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    },
  ).catch((err) => done(err, false));
}));
app.use(passport.initialize());

app.use('/api/', indexRouter);
app.use('/api/auth', authRouter);

app.listen(port, () => {
  console.log(`Running backend server on http://localhost${port}`);
});
