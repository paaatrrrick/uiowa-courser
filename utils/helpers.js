const mongoose = require('mongoose');
const crypto = require('crypto');


function convertToObjectId(value) {
  if (typeof value === 'string') {
    return new mongoose.Types.ObjectId(value);
  }
  return value;
}

const randomStringToHash24Bits = (inputString) => {
  return crypto.createHash('sha256').update(inputString).digest('hex').substring(0, 24);
}

function replaceStringInsideStringWithNewString(str, sub, newSub) {
  if (!sub || !newSub || !str) return str;
  if (sub === newSub) return str;

  let index = str.indexOf(sub);
  let replaced = '';

  while (index !== -1) {
    replaced += str.substring(0, index) + newSub;
    str = str.substring(index + sub.length);
    index = str.indexOf(sub);
  }

  return replaced + str;
}

function arrayToString (array) {
  var string = "";
  for (let i = 0; i < array.length; i++) {
    string += array[i];
    if (i !== array.length - 1) {
      string += ", ";
    }
  }
  return string;
};

module.exports = {
  replaceStringInsideStringWithNewString,
  arrayToString,
  convertToObjectId,
  randomStringToHash24Bits
};