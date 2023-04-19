const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const dbClient = require('./db');

const { TOKEN_SECRET } = process.env;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: TOKEN_SECRET,
};

const jwtStrategy = new JwtStrategy(options, async (jwtPayload, done) => {
    console.log("called");
  await dbClient.users.findOne({ id: jwtPayload.sub }).then(
    (user) => {
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    },
  ).catch((err) => done(err, false));
});

module.exports = { jwtStrategy, TOKEN_SECRET };
