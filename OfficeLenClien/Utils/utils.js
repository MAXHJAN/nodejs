var crypto = require('crypto');
var uuid = require('node-uuid');

/** 产生MD5码 */
exports.Md = function(params) {
	console.log("产生md5");
	var md5 = crypto.createHash('md5');
	md5.update(params);
	var d = md5.digest('hex');
	return d;
}

/** 随机产生uuid */
exports.Uuid = function() {
	var uid = uuid.v4();
	return uid;
}
