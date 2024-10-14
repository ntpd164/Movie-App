require('dotenv').config();
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars').engine;
const cors = require('cors');
const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');

// Connect to DB
db.connect();

app.use(
  cors({
    origin: ['https://movie-app-nine-neon.vercel.app', 'https://movie-app-ntpd164s-projects.vercel.app', 'https://movie-app-git-main-ntpd164s-projects.vercel.app', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'build')));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('_method'));

app.use(morgan('combined'));

// Template engine
app.engine(
  'hbs',
  handlebars({
    extname: '.hbs',
    helpers: {
      sum: (a, b) => a + b,
    },
  })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

console.log(__dirname);

// Routes init
route(app);

app.get('/test', (req, res) => {
  res.json({ message: 'Hello world' });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});


// mongodb+srv://ntpd164:QA3x5NxC9*3fWe5@cluster0.1tlq4.mongodb.net/?