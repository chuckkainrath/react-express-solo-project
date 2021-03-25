const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const routes = require('./routes');

const { environment } = require('./config');
const isProduction = environment === 'production';


const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

// Security middleware only needed during development.
// In production, express/react resources will come from same origin
if (!isProduction) app.use(cors());

// Sets certain headers to better secure app
app.use(helmet({
  contentSecurityPolicy: false
}));

app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true,
    },
  })
);

app.use(routes);


module.exports = app;
