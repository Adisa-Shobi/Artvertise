const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { ObjectId } = require('mongodb');
const dbClient = require('../utils/db');

const { TOKEN_SECRET } = process.env;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  secretOrKey: TOKEN_SECRET,
};

module.exports = (passport) => {
  passport.use(new JwtStrategy(options, (jwtPayload, done) => {
    console.log(jwtPayload.sub);
      return dbClient.users.findOne({ _id: ObjectId(jwtPayload.sub) }).then(
      (user) => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      },
      ).catch((err) => done(err, false));
  }));
};
