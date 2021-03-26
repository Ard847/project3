const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {

  const authHeader = req.headers['authorization'];
  // console.log('authHeader =', authHeader);
  const token = authHeader && authHeader.split(' ')[1];

  if (token === null) return res.sendStatus(401);
 // console.log('auth.js, token =', token);

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  })
};

module.exports = auth;