var read = require('co-read');

module.exports = function* (stream, opts) {
  opts = opts || {};
  var limit = opts.limit || Infinity;
  var body = [];
  var length = 0;
  var data;
  while(data = yield read(stream)) {
    if(length >= limit) {
      break;
    } else if(length + data.length > limit) {
      body.push(data.slice(0, limit - length));
    } else {
      body.push(data);
    }
    length += data.length;
  }
  return Buffer.concat(body, length);
};
