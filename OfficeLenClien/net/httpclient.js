var http = require('http');
var server = "221.4.63.94";
var port = 8880;
var token="5EBF706933B9605AB0FCD44B79AA4BF7";

// 获取省份列表
exports.getProvience = function(countryid, callback) {
	var body = {
		"cmd" : 10001,
		"name" : "",
		"net" : 0,
		"countryUuid" : countryid,
		"pageIndex" : 1,
		"pageSize" : 50
	};

	var bodyString = JSON.stringify(body);

	var headers = {
		'Content-Type' : 'application/json',
		'Content-Length' : bodyString.length,
		'token' : token
	};
	var options = {
		host : server,
		port : port,
		path : '/ChihiroIndoorOpen/open/handler/v1.0.1/provience',
		method : 'POST',
		headers : headers
	};
	var responseString = '';
	var req = http.request(options, function(res) {
		res.setEncoding('utf-8');
		res.on('data', function(data) {
			responseString += data;
		});

		res.on('end', function() {
			console.log('-----resBody=', responseString);
			callback(responseString);

		});

		req.on('error', function(e) {
			console.log('-----error-------', e);
		});
	});
	req.write(bodyString);
	req.end();
}

// 获取城市列表
exports.getCity = function(provienceid, callback) {
	var body = {
		"cmd" : 10001,
		"name" : "",
		"net" : 0,
		"provienceUuid" : provienceid,
		"pageIndex" : 1,
		"pageSize" : 50
	};

	var bodyString = JSON.stringify(body);

	var headers = {
		'Content-Type' : 'application/json',
		'Content-Length' : bodyString.length,
		'token' : token
	};
	var options = {
		host : server,
		port : port,
		path : '/ChihiroIndoorOpen/open/handler/v1.0.1/city',
		method : 'POST',
		headers : headers
	};
	var responseString = '';
	var req = http.request(options, function(res) {
		res.setEncoding('utf-8');
		res.on('data', function(data) {
			responseString += data;
		});

		res.on('end', function() {
			console.log('-----resBody=', responseString);
			callback(responseString);

		});

		req.on('error', function(e) {
			console.log('-----error-------', e);
		});
	});
	req.write(bodyString);
	req.end();
}

// 建筑物类型
exports.getBuildingtype = function(callback) {
	var body = {
		"cmd" : 10001,
		"name" : "",
		"net" : 0,
		"pageIndex" : 1,
		"pageSize" : 50
	};

	var bodyString = JSON.stringify(body);

	var headers = {
		'Content-Type' : 'application/json',
		'Content-Length' : bodyString.length,
		'token' : token
	};
	var options = {
		host : server,
		port : port,
		path : '/ChihiroIndoorOpen/open/handler/v1.0.1/buildingtype',
		method : 'POST',
		headers : headers
	};
	var responseString = '';
	var req = http.request(options, function(res) {
		res.setEncoding('utf-8');
		res.on('data', function(data) {
			responseString += data;
		});

		res.on('end', function() {
			console.log('-----resBody=', responseString);
			callback(responseString);

		});

		req.on('error', function(e) {
			console.log('-----error=', e);
		});
	});
	req.write(bodyString);
	req.end();
}

// 获取建筑物列表
exports.getBuilding = function(callback) {

	var body = {
		"cmd" : 10001,
		"name" : "",
		"net" : 0,
		"cityUuid" : "11e5-a9fe-5716d712-9e35-39a6f156570b",
		"pageIndex" : 1,
		"pageSize" : 50,
		"lat" : 23.133218,
		"lon" : 113.270857
	};

	var bodyString = JSON.stringify(body);

	var headers = {
		'Content-Type' : 'application/json',
		'Content-Length' : bodyString.length,
		'token' : token
	};
	var options = {
		host : server,
		port : port,
		path : '/ChihiroIndoorOpen/open/handler/v1.0.1/building',
		method : 'POST',
		headers : headers
	};
	var responseString = '';
	var req = http.request(options, function(res) {
		res.setEncoding('utf-8');
		res.on('data', function(data) {
			responseString += data;
		});

		res.on('end', function() {
			console.log('-----resBody=', responseString);
			callback(responseString);

		});

		req.on('error', function(e) {
			console.log('-----error=', e);
		});
	});
	req.write(bodyString);
	req.end();
}

// 获取单元列表
exports.getUnit = function(data, callback) {
	console.log(data.buildingUuid);
	var body = {
		"cmd" : 10001,
		"net" : 0,
		"pageIndex" : 1,
		"pageSize" : 20,
		"cityUuid" : "11e5-a9fe-5716d712-9e35-39a6f156570b",
		"buildingUuid" : data.buildingUuid,
		"lat" : data.lat,
		"lon" : data.lon
	};

	var bodyString = JSON.stringify(body);

	var headers = {
		'Content-Type' : 'application/json',
		'Content-Length' : bodyString.length,
		'token' : token
	};
	var options = {
		host : server,
		port : port,
		path : '/ChihiroIndoorOpen/open/handler/v1.0.1/unit',
		method : 'POST',
		headers : headers
	};
	var responseString = '';
	var req = http.request(options, function(res) {
		res.setEncoding('utf-8');
		res.on('data', function(data) {
			responseString += data;
		});

		res.on('end', function() {
			console.log('-----resBody=', responseString);
			callback(responseString);

		});

		req.on('error', function(e) {
			console.log('-----error=', e);
		});
	});
	req.write(bodyString);
	req.end();
}

//获取多边形
exports.getPoin = function(uuid,distance,callback) {
	console.log("uuid="+uuid);
	var body = {
		"cmd" : 10003,
		"net" : 0,
		"uuid" : uuid,
		"distance" : distance
	};

	var bodyString = JSON.stringify(body);

	var headers = {
		'Content-Type' : 'application/json',
		'Content-Length' : bodyString.length,
		'token' : token
	};

	var options = {
		host : server,
		port : port,
		path : '/ChihiroIndoorOpen/open/handler/v1.0.1/unit',
		method : 'POST',
		headers : headers
	};

	var req = http.request(options, function(res) {
		res.setEncoding('utf-8');

		var responseString = '';

		res.on('data', function(data) {
			responseString += data;
		});

		res.on('end', function() {
			// 这里接收的参数是字符串形式,需要格式化成json格式使用
			// var resultObject = JSON.parse(responseString);     
			console.log('-----resBody-----', responseString);
			var aa=JSON.parse(responseString);		
			callback(aa.polygon);
		});

		req.on('error', function(e) {
			// TODO: handle error.
			console.log('-----error=', e);
		});
	});
	req.write(bodyString);
	req.end();
}