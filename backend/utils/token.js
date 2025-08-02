const jwt = require('jsonwebtoken');


const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_SECRET, {
    expiresIn: '7d',
  });
};

const generateResetToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, { 
    expiresIn: '15m'
   });
};

module.exports = { generateToken, generateRefreshToken, generateResetToken };