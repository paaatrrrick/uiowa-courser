const crypto = require('crypto');


const randomStringToHash24Bits = (inputString) => {
  return crypto.createHash('sha256').update(inputString).digest('hex').substring(0, 24);
};

module.exports = { randomStringToHash24Bits };
