import passport from 'passport';
import passportJwt from 'passport-jwt';
import passportLocal from 'passport-local';
import User from '../models/user.model/user.model';
var FacebookStrategy = require('passport-facebook').Strategy;
const JwtStrategy = passportJwt.Strategy;
const LocalStrategy = passportLocal.Strategy;
const { ExtractJwt } = passportJwt;
import 'dotenv/config'

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}, (payload, done) => {
    User.findOne({_id: payload.sub, deleted : false,activated: true })
    .then(user => {
        if (!user)
            return done(null, false);

        return done(null, user)
    }).catch(err => {
        console.log('Passport Error: ', err);
        return done(null, false);
    })
}
));

passport.use(new LocalStrategy({
    usernameField: 'email'
}, (email, password, done) => {

    User.findOne({ email,deleted:false }).then(user => {
        if (!user)
            return done(null, false);

        // Compare Passwords
        user.isValidPassword(password, function (err, isMatch) {
            if (err) return done(err);
            if (!isMatch) return done(null, false, { error: 'Invalid Credentials' });

            return done(null, user);
        })

    });
}));

passport.use(new FacebookStrategy({
    clientID: '2030001723966035', //FACEBOOK_APP_ID,
    clientSecret:'46ce3cad21a27bf4be3b95c4c85aedab', //FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback",// when the auth is ok route to this
    profileFields: ['id', 'picture', 'email' , 'firstname','lastname']
  },
  function(accessToken, refreshToken, profile, cb) {

    var user = {
        email : profile.email,
        picture: profile.picture,
        firstname : profile.firstname ,
        lastname:profile.lastname
    }
    return cb(err, user);
  }
));

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignIn = passport.authenticate('local', { session: false });
const facebookSignUp = passport.authenticate('facebook');
const facebookSignUp2 =  passport.authenticate('facebook',{failureRedirect:'/facebookerror'});
export { requireAuth, requireSignIn , facebookSignUp , facebookSignUp2 };
