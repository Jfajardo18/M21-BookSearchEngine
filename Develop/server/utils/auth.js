const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

const authMiddleware = ({ req }) => {
  let token = req.headers.authorization || '';

  if (token) {
    token = token.split(' ').pop().trim();
  try {
    const { data } = jwt.verify(token, process.env.JWT_SECRET, { maxAge: '2h' });
    req.user = data;
  } catch {
    console.log('Invalid token');
    throw new AuthenticationError('Invalid token');
  }
  }
  return req;
};

module.exports = authMiddleware;
