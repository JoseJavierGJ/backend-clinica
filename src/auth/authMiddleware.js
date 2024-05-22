const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({
      message: 'No authorization header provided'
    });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({
      message: 'Invalid authorization format. Format is Authorization: Bearer [token]'
    });
  }

  const token = parts[1];
  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        message: 'Forbidden, invalid or expired token',
        error: err.message
      });
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
