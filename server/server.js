const express = require('express');
const passport = require('passport');
const cookieSession = require("cookie-session");
const path = require('path');
const app = express();
const port = 3000;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./api_keys.js');


passport.use(
    new GoogleStrategy(
    {
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
        console.log('access token: ', accessToken);
        console.log('profile: ');
        console.log(profile);
        done(null, profile); // TODO add the user to the database here with upsert, or insert on conflict do nothing sql
    }
));

passport.serializeUser((user, done) => {
    console.log('serialize user is called')
    done(null, user.id); // this user is coming from the done function passed from returning from the db
})
passport.deserializeUser((id, done) => {
    console.log('deserialize user is called', id)

    // find from the database and send user data here
    done(null, id); // this user is coming from the done function passed from returning from the db
})

app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys:[keys.session.cookieKey]
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, '../build/')));

app.get('/auth/google', passport.authenticate('google', {scope: ['profile']}));

app.get("/auth/google/callback", passport.authenticate('google'), (req, res) => {
    console.log('this is the req.user');
    console.log(req.user);
    res.send("you reached the redirect URI");

});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});


app.listen(port, () => {
    console.log(`Current enviroment is: ${process.env.NODE_ENV}`);
    console.log(`Server is listening at http://localhost:${port}`);
});