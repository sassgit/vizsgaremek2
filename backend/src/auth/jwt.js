const jwt = require('jsonwebtoken');

module.exports = secret => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!secret) {
      return res.sendStatus(501);
    } else if (authHeader) {
      const token = authHeader?.match(/^Bearer (.*)$/)[1];
      jwt.verify(token, secret, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        } else {
          req.user = user;
          next();
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
}