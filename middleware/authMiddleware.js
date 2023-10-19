const jwt = require('jsonwebtoken');

const middleware = (req, res, next) => {

    const tokenWithBearer = req.headers.authorization;
    const token = tokenWithBearer.replace('Bearer ',"");
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
  
    // Verify the token
    jwt.verify(token, 'akshayimpero', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      }
      req.user = decoded;
      next();
    });
  }

  module.exports = middleware;