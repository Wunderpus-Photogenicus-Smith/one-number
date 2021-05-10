const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const plaid = require('plaid');
const port = 3000;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./api_keys.js');
require('dotenv').config();
const { User, Item, Account, Security, Holding } = require('./dbmodel');

const client = new plaid.Client({
  clientID: process.env.PLAID_CLIENT_ID,
  secret: process.env.PLAID_SECRET,
  env: plaid.environments.sandbox,
});

function handleError(errorMessage) {
  console.error(errorMessage);
}

app.post('/plaid_token_exchange', async (req, res) => {
  const { publicTOken } = req.body;
  const { access_token } = await client
    .exchangePublicToken(publicToken)
    .catch(handleError);
  const { accounts, item } = await client
    .getAccounts(access_token)
    .catch(handleError);
  console.log({
    accounts,
    item,
  });
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey],
  })
);

app.use(express.static(path.join(__dirname, '../build/')));

app.use(passport.initialize());
app.use(passport.session());

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
);

isUserAuthenticated = (req, res, next) => {
  if (req.user) {
    console.log('req user, logged in');
    console.log(req.user);
    // return db_controller.getUser(req, res, next);
    res.locals.user = req.user;
    next();
  } else {
    // res.redirect('/');

    next();
  }
};

// Secret route
app.get('/secret', isUserAuthenticated, (req, res) => {
  // recieved in res.locals.user from isUserAuthenticated which is just a long google ID
  console.log('inside of secret, res.locals is', res.locals.user);
  if (res.locals.user) res.send(res.locals.user);
  else {
    res.send('no user found');
  }
});

app.get(
  '/auth/google/callback',
  passport.authenticate('google'),
  (req, res) => {
    console.log('this is the req.user');
    console.log(req.user);
    res.send('you reached the redirect URI');
  }
);

app.get('/auth/logout', (req, res) => {
  req.logout();
  res.send(req.user);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './../build/index.html'));
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ google_id: profile.id }).then((currentUser) => {
        if (currentUser) {
          //if we already have a record with the given profile ID
          done(null, currentUser);
        } else {
          //if not, create a new user
          new User({
            google_id: profile.id,
            display_name: profile.displayName,
          })
            .save()
            .then((newUser) => {
              done(null, newUser);
            });
        }
      });
      console.log('access token: ', accessToken);
      console.log('profile: ');
      console.log(profile);
      done(null, profile); // TODO add the user to the database here with upsert, or insert on conflict do nothing sql
    }
  )
);

passport.serializeUser((user, done) => {
  console.log('serialize user is called');
  done(null, user.id); // this user is coming from the done function passed from returning from the db
});
passport.deserializeUser((id, done) => {
  console.log('deserialize user is called', id);

  // find from the database and send user data here
  done(null, id); // this user is coming from the done function passed from returning from the db
});

app.listen(port, () => {
  console.log(`Current enviroment is: ${process.env.NODE_ENV}`);
  console.log(`Current enviroment is: ${process.env.PLAID_CLIENT_ID}`);
  console.log(`Server is listening at http://localhost:${port}`);
});
