require('dotenv').config();
const express = require('express');
const config = require('config');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = require('./server');

const port = process.env.PORT || 3000;

const { host, user, pass } = config.get('database');

mongoose.connect(host, { user, pass })
  .then(conn => {
    console.log('Db connection is successful!');
    app.listen(port, () => console.log(`Server is listening at port ${port}`));
  })
  .catch( err => {
    console.log(err);
    process.exit(1);
  });
  