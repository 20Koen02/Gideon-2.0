const url = require("url");

const express = require("express");
const app = express();

const passport = require('passport');
const session = require('express-session');
const LevelStore = require('level-session-store')(session);
const Strategy = require('passport-discord').Strategy;

const helmet = require('helmet');

module.exports = async (client) => {
  // These are... internal things related to passport. Honestly I have no clue either.
  // Just leave 'em there.
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });

  /* 
  This defines the **Passport** oauth2 data. A few things are necessary here.
  
  clientID = Your bot's client ID, at the top of your app page. Please note, 
    older bots have BOTH a client ID and a Bot ID. Use the Client one.
  clientSecret: The secret code at the top of the app page that you have to 
    click to reveal. Yes that one we told you you'd never use.
  callbackURL: The URL that will be called after the login. This URL must be
    available from your PC for now, but must be available publically if you're
    ever to use this dashboard in an actual bot. 
  scope: The data scopes we need for data. identify and guilds are sufficient
    for most purposes. You might have to add more if you want access to more
    stuff from the user. See: https://discordapp.com/developers/docs/topics/oauth2  
  */
  passport.use(new Strategy({
      clientID: client.appInfo.id,
      clientSecret: client.config.dashboard.oauthSecret,
      callbackURL: client.config.dashboard.callbackURL,
      scope: ['identify', 'guilds']
    },
    (accessToken, refreshToken, profile, done) => {
      process.nextTick(() => done(null, profile));
    }));

  // Session data, used for temporary storage of your visitor's session information.
  // the `secret` is in fact a "salt" for the data, and should not be shared publicly.
  app.use(session({
    store: new LevelStore('./data/dashboard-session/'),
    secret: client.config.dashboard.sessionSecret,
    resave: false,
    saveUninitialized: false,
  }));

  // Initializes passport and session
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(helmet());

  // The domain name used in various endpoints to link between pages.
  app.locals.domain = client.config.dashboard.domain;

  // The EJS templating engine gives us more power to create complex web pages. 
  // This lets us have a separate header, footer, and "blocks" we can use in our pages.
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');

  // body-parser reads incoming JSON or FORM data and simplifies their
  // use in code.
  var bodyParser = require('body-parser');
  app.use(bodyParser.json()); // to support JSON-encoded bodies
  app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
  }));

  /** REGULAR INFORMATION PAGES */

  // Index page. If the user is authenticated, it shows their info
  // at the top right of the screen.
  app.get('/', (req, res) => {
    if(!req.isAuthenticated()) return res.redirect("/login");
    res.send(req.user);
  });
  

  app.get("/:guildid/music", (req, res) => {
    const guild = client.guilds.get(req.params.guildid);
    res.send(guild.music.queue);

  });

  /** PAGE ACTIONS RELATED TO SESSIONS */

  // The login page saves the page the person was on in the session,
  // then throws the user to the Discord OAuth2 login page.
  app.get('/login', (req, res, next) => {
      if (req.session.backURL) {
        req.session.backURL = req.session.backURL;
      } else if (req.headers.referer) {
        const parsed = url.parse(req.headers.referer);
        if (parsed.hostname === app.locals.domain) {
          req.session.backURL = parsed.path;
        }
      } else {
        req.session.backURL = '/';
      }
      next();
    },
    passport.authenticate('discord'));

  // Once the user returns from OAuth2, this endpoint gets called. 
  // Here we check if the user was already on the page and redirect them
  // there, mostly.
  app.get('/callback', passport.authenticate('discord', {
    failureRedirect: '/autherror'
  }), (req, res) => {
    res.redirect("/")
  });

  // If an error happens during authentication, this is what's displayed.
  app.get('/autherror', (req, res) => {
    res.send("AuthError");
  });

  // Destroys the session to log out the user.
  app.get('/logout', function (req, res) {
    req.session.destroy(() => {
      req.logout();
      res.redirect('/'); //Inside a callback… bulletproof!
    });
  });
  client.site = app.listen(client.config.dashboard.port);
};