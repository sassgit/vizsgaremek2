const fsp = require('fs').promises;
const { argv } = require('process');
const mongoose = require('mongoose');
const config = require('config');

const Artist = require('../model/artist');
const Customer = require('../model/customer');
const Order = require('../model/order');
const Painting = require('../model/painting');
const Photo = require('../model/photo');
const User = require('../model/user');

const database = config.get('database');
const dataFile = argv[2] || './generated.json';

const data = require(dataFile);

const { host, user, pass } = config.get('database');

mongoose.connect(host, { user, pass })
  .then( async conn => {
    //console.log('Db connection is successful, start upload!');
    const artists = await Promise.all(data.artists.map(artist => (new Artist(artist)).save()));
    const customers = await Promise.all(data.customers.map(customer => (new Customer(customer)).save()));
    const paintings = await Promise.all(data.paintings.map(painting => {
      painting.artist = artists[painting.artist]._id.toString();
      return (new Painting(painting)).save();
    }));
    const Orders = await Promise.all(data.orders.map(order => {
      order.customer = customers[order.customer]._id.toString();
      order.paintings = order.paintings.map(p => paintings[p]._id.toString());
      return (new Order(order)).save();
    }));
    const users = await Promise.all(data.users.map(user => (new User(user)).save()));
    mongoose.connection.close();
  })
  .catch( err => {
    console.log(err);
    process.exit(1);
  });