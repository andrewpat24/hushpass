require('dotenv').load();

// Express
const express = require('express');
const app = express(); 
const bodyParser = require('body-parser');

// CORS
// const cors = require('cors');
// app.use(cors());

// PORT
const PORT = process.env.PORT || 5000; 
app.listen( PORT );

// Body Parser
app.use(bodyParser.urlencoded({   extended: true }));
app.use(bodyParser.json());

// Mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true});
require('./models/Users');
require('./models/Documents');

// Session 
const cookieSession = require('cookie-session');
app.use(
    cookieSession({
        maxAge: (30 * 24 * 60 * 60 * 1000), 
        keys: [process.env.COOKIE_KEY]
    })
);

// Passport
const passport = require('passport');
require('./services/passport');
app.use(passport.initialize());
app.use(passport.session());

// TODO: Set default server route prefix 

// Routes 
const authRouter = require('./routes/auth');
const uploadRouter = require('./routes/db');

app.use('/api/auth', authRouter);
app.use('/api/db/', uploadRouter);

// Prod Client Routes
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build')); 
    app.use('*', express.static('client/build')); 
}