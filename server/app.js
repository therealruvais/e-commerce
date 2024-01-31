const express = require("express");
const cors = require('cors')
const cookieParser = require("cookie-parser");
const ErrorHandler = require("./middleware/Error");
const bodyParser = require("body-parser");
const user = require('./controller/userCtrl')

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use('/', express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: true }));
//routes
app.use('/api/user', user)

//for error handling
app.use(ErrorHandler);

module.exports = app;
