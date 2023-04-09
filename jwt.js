const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
    const mongoose = require('mongoose');


    mongoose.connect('mongodb+srv://healthify:healthify12345@cluster0.ov0fwob.mongodb.net/?retryWrites=true&w=majority').then(()=>{
        console.log('connected succefully');
      })

const User = await mongoose.model('tests', {client_email:String});

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "wffoewhfeowihweoigweoi1323232"
};

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
                .then(user => {
                    if (user) return done(null, user);
                    return done(null, false);
                })
                .catch(err => {
                    return done(err, false, {message: 'Server Error'});
                });
        })
    );
};