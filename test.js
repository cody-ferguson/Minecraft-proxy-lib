var crypto = require('crypto');
var assert = require('assert');

function mcHexDigest(str) {
  var hash = new Buffer.from(crypto.createHash('sha1').update(str).digest(), 'binary');
  // check for negative hashes
  var negative = hash.readInt8(0) < 0;
  if (negative) performTwosCompliment(hash);
  var digest = hash.toString('hex');
  // trim leading zeroes
  digest = digest.replace(/^0+/g, '');
  if (negative) digest = '-' + digest;
  return digest;

}

function print(...args){console.log(...args)}
function performTwosCompliment(buffer) {
  var carry = true;
  var i, newByte, value;
  for (i = buffer.length - 1; i >= 0; --i) {
    value = buffer.readUInt8(i);
    newByte = ~value & 0xff;
    if (carry) {
      carry = newByte === 0xff;
      buffer.writeUInt8(newByte + 1, i);
    } else {
      buffer.writeUInt8(newByte, i);
    }
  }
}

print(mcHexDigest('Notch') == "4ed1f46bbe04bc756bcb17c0c7ce3e4632f06a48")
assert.strictEqual(mcHexDigest('jeb_'), "-7c9d5b0044c130109a5d7b5fb5c317c02b4e28c1");
assert.strictEqual(mcHexDigest('simon'), "88e16a1019277b15d58faf0541e11910eb756f6");