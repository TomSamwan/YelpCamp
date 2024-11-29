if(process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const passportLocal = require('passport-local');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');

const User = require('./models/user');
const userRoutes = require('./routes/users');
const campgroundRoutes = require('./routes/campgrounds');
const reviewRoutes = require('./routes/reviews');

const MongoDBStore = require('connect-mongo');
const dbUrl = process.env.DB_URL;

// connect to mongoDB
mongoose.connect(dbUrl)

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
})

// express shorthand variable
const app = express();

// sets the app to use 'ejs' format files for templating
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // set's the default views directory absolutely, so that it can be accessed from anywhere

app.use(express.urlencoded({ extended: true })); // allows the app to read and use request queries
app.use(methodOverride('_method')); // enables deletion of database entries
app.use(express.static(path.join(__dirname, '/public'))); // links any CSS or JS files absolutely
app.use(mongoSanitize()); // adds security to injected query string accessing mongoDB

const store = MongoDBStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 3600,
  crypto: { secret: 'megthedog' }
});

store.on("error", function(e) {
  console.log("ERROR:", e)
})

const day = 1000 * 60 * 60 * 24;
const sessionConfig = {
  store,
  name: 'customSessionName',
  secret: 'megthedog',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    httpOnly: true,
    // secure: true,
    expires: Date.now() + 7 * day,
    maxAge: 7 * day
  }
}
app.use(session(sessionConfig));
app.use(flash());

const scriptSrcUrls = [
  "https://stackpath.bootstrapcdn.com/",
  "https://kit.fontawesome.com/",
  "https://cdnjs.cloudflare.com/",
  "https://cdn.jsdelivr.net",
  "https://cdn.maptiler.com/",
];
const styleSrcUrls = [
  "https://kit-free.fontawesome.com/",
  "https://stackpath.bootstrapcdn.com/",
  "https://fonts.googleapis.com/",
  "https://use.fontawesome.com/",
  "https://cdn.jsdelivr.net",
  "https://cdn.maptiler.com/",
];
const connectSrcUrls = [
  "https://api.maptiler.com/",
];
const fontSrcUrls = [];
app.use(
  helmet.contentSecurityPolicy({
      directives: {
          defaultSrc: [],
          connectSrc: ["'self'", ...connectSrcUrls],
          scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
          styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
          workerSrc: ["'self'", "blob:"],
          objectSrc: [],
          imgSrc: [
              "'self'",
              "blob:",
              "data:",
              "https://res.cloudinary.com/dmbtvzmaz/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT! 
              "https://images.unsplash.com/",
              "https://api.maptiler.com/"
          ],
          fontSrc: ["'self'", ...fontSrcUrls],
      },
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
  if(!['/', '/campgrounds', `/campgrounds/${campgrounds/id}`].includes(req.originalUrl)) {
    req.session.returnTo = req.originalUrl;
  }
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
})

app.use('/', userRoutes)
app.use('/campgrounds', campgroundRoutes)
app.use('/campgrounds/:id/reviews', reviewRoutes)


app.get('/', (req, res) => {
  res.render('home');
})

app.all('*', (req, res, next) => {
  next(new ExpressError('This is the ExpressError', 401))
}) // error catch handler. (if all else fails, this route will run a custom ExpressError)

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if(!err.message) err.message = 'Default error message here!';
  res.status(statusCode).render('error', { err });
})

app.listen(8080, (req, res) => {
  console.log('listening on port 8080!');
})