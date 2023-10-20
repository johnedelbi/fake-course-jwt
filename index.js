import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import userRoutes from './routes/user.js';
import storeRoutes from './routes/store.js';

// configure dotenv
dotenv.config();
const PORT = process.env.PORT || 3005;

// construct path
const __filename = fileURLToPath(import.meta.url);
const PATH = dirname(__filename);

// initialize express
const app = express();

// parse body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// session
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true
        }
    })
);

// set up template engine
app.set('view engine', 'ejs');
app.set('views', path.join(PATH, 'views'));

// server static folder
app.use(express.static(path.join(PATH, 'public')));

// use routes
app.use(userRoutes);
app.use(storeRoutes);

// handle 404
app.use('*', (req, res) => {
    res.status(404).render('404', {
        title: 'Page not found',
        message: `This page doesn't existed`
    });
});

app.listen(PORT, () => {
    console.log(`Server is up and running on port : ${PORT}`);
});
