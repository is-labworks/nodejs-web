const express = require('express');
const session = require('express-session');
const authRoutes = require('./routes/auth');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/sessionAuth', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(session({
    secret: 'mycecretkey',
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/sessionAuth',
        collectionName: 'sessions'
    }),
    cookie: { 
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 
    }
}));

app.use('/auth', authRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});