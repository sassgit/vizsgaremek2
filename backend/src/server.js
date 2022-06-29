const express = require('express');
const config = require('config');
const morgan = require('morgan');
const cors = require('cors');
const logger = require('./logger');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load('./src/docs/swagger.yaml');

const noAuth = process.argv[2] === '--noAuth';

if (noAuth) {
  console.log('\x1b[41m\x1b[33mWARNING!!!\x1b[0m')
  console.log('\x1b[33m**********\x1b[0m')
  console.log('\x1b[31mAuthentication disabled!\x1b[0m')
  console.log('\x1b[33mAll prermission is granted to everyone!\x1b[0m')
  console.log('\x1b[31m**********\x1b[0m')
  console.log('\x1b[43m\x1b[31mWARNING!!!\x1b[0m')
}


const jwtAuth = noAuth ?
  (req, res, next) => {
    req.user = { email: '@root', password: '', role: 'root' };
    return next();
  } :
  require('./auth/jwt')(process.env.SECRET);

const app = express();
app.use(morgan('combined', { stream: logger.stream }));
app.use(cors());
app.use(express.json());

app.use(express.static('www/public'));
app.use('/images', require('./router/images')('www/images'));

app.use('/login', require('./router/login'));

app.use('/summary', jwtAuth, require('./router/summary'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const entityPaths = ['artist', 'customer', 'order', 'painting', 'photo', 'user'];
const routers = entityPaths;

entityPaths.forEach((entityName, index) => 
    app.use(`/${entityName}`, jwtAuth, require(`./router/data/${routers[index]}`)));

module.exports = app;
