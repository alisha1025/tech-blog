const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { sequelize } = require('./models');  

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session management middleware
const sessionStore = new SequelizeStore({
  db: sequelize
});

app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000  // 24 hours
  }
}));

// Middleware for authentication
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  } else {
    res.redirect('/login');
  }
};

// Middleware for logging requests
const requestLogger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
};

// Middleware for handling 404 errors
const notFoundHandler = (req, res, next) => {
  res.status(404).render('404', { title: '404 Not Found' }); 
};

// Middleware for handling general errors
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500', { title: '500 Internal Server Error' }); 
};

// Use middleware
app.use(requestLogger);
app.use('/protected', isAuthenticated);  

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
