import express from 'express';
const app = express();
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import session from 'express-session';
import passport from 'passport';
import 'dotenv/config';
import blogRouter from './routes/blogRouter.js';

const port = process.env.PORT || 3000;

// Adapter to use views directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Needs to pase incoming body data first
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Then set up sessions and passport
app.use(session({ secret: 'mario', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Global middleware to access local variable as user
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

app.use('/', blogRouter);

app.listen(port, (error) => {
    if (error) {
        throw error;
    }

    console.log(`Listening on port ${port}...`)
})