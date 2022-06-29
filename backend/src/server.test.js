//require('dotenv');
process.env.SECRET = 'TEST123';
process.env.EXPIRES_IN = '1m';
const app = require('./server');
const mongoose = require('mongoose');
const supertest = require('supertest');
const mockreqres = require('mock-req-res');
const config = require('config');

const Artist = require('./model/artist');
const Customer = require('./model/customer');
const Order = require('./model/order');
const Painting = require('./model/painting');
const Photo = require('./model/photo');
const User = require('./model/user');

const { host, user, pass } = config.get('database');
const dataFile = './seed/generated.test.json';
const dataSource = require(dataFile);

const data = {};

jest.setTimeout(10000);

let accessToken = '';

const buildDataBase = async () => mongoose.connect(host, { user, pass })
  .then( async conn => {
    await mongoose.connection.dropDatabase();
    data.artists = await Promise.all(dataSource.artists.map(artist => (new Artist(artist)).save()));
    data.customers = await Promise.all(dataSource.customers.map(customer => (new Customer(customer)).save()));
    data.paintings = await Promise.all(dataSource.paintings.map(painting => {
      painting.artist = data.artists[painting.artist]._id.toString();
      return (new Painting(painting)).save();
    }));
    data.Orders = await Promise.all(dataSource.orders.map(order => {
      order.customer = data.customers[order.customer]._id.toString();
      order.paintings = order.paintings.map(p => data.paintings[p]._id.toString());
      return (new Order(order)).save();
    }));
    data.users = await Promise.all(dataSource.users.map(user => (new User(user)).save()));
  })
  .catch( err => {
    console.log(err);
    process.exit(1);
  });

describe('REST API inegration tests', () => {
  beforeAll( done => {
    buildDataBase().then( () => {  
      supertest(app)
      .post('/login')
      .send({email: 'root@test.hu', password: 'root'})
      .end((err, res) => {
        expect(res.body.accessToken).toBeTruthy();
        accessToken = res.body.accessToken;
        done();
      });
    });
  });

  test('GET /summary', done => {
    supertest(app)
      .get('/summary')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .then( response => {
        const sum = response.body;
        expect(sum.allPaintings).toBe(dataSource.paintings.reduce((prev, e) =>
          prev + e.count, 0));
        expect(sum.stockPaintings).toBe(dataSource.paintings.reduce((prev, e) =>
          prev + e.stock, 0));
        expect(sum.allPaintingsPrice).toBe(dataSource.paintings.reduce((prev, e) =>
          prev + e.count * e.price, 0));
        expect(sum.stockPaintingsPrice).toBe(dataSource.paintings.reduce((prev, e) =>
          prev + e.stock * e.price, 0));
        expect(sum.soldPaintings).toBe(dataSource.orders.reduce((prev, e) =>
          prev + e.paintings.length, 0));
        expect(sum.soldPrice).toBe(dataSource.orders.reduce((prev, e) =>
          prev + e.price, 0));
        done();
      })
  });

  test('GET /artist', done => {
    supertest(app)
      .get('/artist')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .then( response => {
        const artists = response.body;
        expect(artists.length).toBe(dataSource.artists.length);
        done();
      })
  });

  test('GET /customer', done => {
    supertest(app)
      .get('/customer')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .then( response => {
        const customers = response.body;
        expect(customers.length).toBe(dataSource.customers.length);
        done();
      })
  });

  test('GET /order', done => {
    supertest(app)
      .get('/order')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .then( response => {
        const orders = response.body;
        expect(orders.length).toBe(dataSource.orders.length);
        done();
      })
  });

  test('GET /painting', done => {
    supertest(app)
      .get('/painting')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .then( response => {
        const paintings = response.body;
        expect(paintings.length).toBe(dataSource.paintings.length);
        done();
      })
  });

  test('GET /photo', done => {
    supertest(app)
      .get('/photo')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .then( response => {
        const photos = response.body;
        expect(photos.length).toBe(dataSource.photos.length);
        done();
      })
  });

  test('GET /user', done => {
    supertest(app)
      .get('/user')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .then( response => {
        const users = response.body;
        expect(users.length).toBe(dataSource.users.length);
        done();
      })
  });

  test('POST /login', done => {
    supertest(app)
      .post('/login')
      .send({email: 'root@test.hu', password: 'asdf'})
      .end((err, res) => {
        expect(res.body.accessToken).toBeFalsy();
        done();
      });
  });

  test('GET /api-docs', done => {
    supertest(app)
      .get('/api-docs/')
      .expect(200)
      .then(response => done());
  });

  afterAll( async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

});
