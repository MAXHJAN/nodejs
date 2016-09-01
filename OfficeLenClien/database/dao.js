var conn = require('./db').connection;
var util = require('../Utils/utils');
var httpconnection = require('../net/httpclient');

exports.login = function (username, passwd, callback) {
	var sql = "select * from companys where company_name='" + username + "'";
	conn.query(sql, function (err, result) {
		if (err) {
			var obj = {
				"msg": "fail",
				"data": ""
			}
			callback(JSON.stringify(obj));
			return;
		}
		if (result == '') {
			var obj = {
				"msg": "not_user",
				"data": ""
			}
			callback(JSON.stringify(obj));
			return;
		}
		if (passwd != result[0].passwd) {
			var obj = {
				"msg": "passwd_error",
				"data": ""
			}
			callback(JSON.stringify(obj));
			return;
		}
		var id = result[0].company_id;
		console.log("id-=" + id);
		var obj = {
			"msg": "success",
			"data": id
		}
		callback(JSON.stringify(obj));
	});
}
exports.register = function (username, passwd, email, phone, callback) {
	var sql = "select * from companys where company_name='" + username + "'";
	conn
		.query(
		sql,
		function (err, result) {
			if (err) {
				callback("fail");
				return;
			}
			if (result != '') {
				callback("repeat");
				return;
			}
			sql = 'insert into companys(company_id,company_name,passwd,email,phone) values(?,?,?,?,?)';
			var md5 = util.Md(username + passwd
				+ new Date().getTime());
			var parameter = [md5, username, passwd, email, phone];
			conn.query(sql, parameter, function (err, result) {
				if (err) {
					callback("fail");
					return;
				}
				console.log("==" + result.affectedRows);
				callback("success");
			});
		});

}

exports.getList = function (company_id, callback) {
	var sql = "select * from monster,advertisers where advertiser='" + company_id + "' and monster.monster_id=advertisers.monster_id";
	conn.query(sql, function (err, result) {
		callback(result);
	});
}

exports.saveAdvert = function (data, callback) {
	console.log(data);
	var monster_id = util.Uuid();
	var levels = parseInt(data.levels);
	var score = parseInt(data.score);
	var distance = parseFloat(data.distance);
	var sql = 'insert into monster(monster_id,monster_name,description,imagesmall_path,image_path,levels,score) values(?,?,?,?,?,?,?)';
	var parameters = [monster_id, data.name, data.description, data.image,
		data.image, levels, score];
	console.log(parameters);
	conn.query(sql, parameters, function (err, result) {
		if (err) {
			callback("fail");
			console.log("----fail" + err);
			return;
		}
		httpconnection.getPoin(data.uuid, distance, function (result) {
			
			var len = result.length - 2;
			console.log("polygon=" + result.substring(10, len));
		  savepoin(data.user, data.buildUuid, data.uuid, result.substring(10, len), distance, monster_id, function (result) {
				console.log(result);
				if (result == "ok") {
					callback("success");
					return;
				} else {
					callback("fail");
					return;
				}
			});

		});
	});

}

// 保存多边形信息
function savepoin(advertiser, poi_building, poi_uuid, poi_position, parameter, monster_id,callback) {
	var latlons = average(poi_position);
	console.log("latlon====" + latlons[0]);
	var sql = "insert into advertisers(advertiser,poi_city,poi_building,poi_uuid,poi_position,parameter,monster_id,lon,lat) values(?,?,?,?,?,?,?,?,?)";
	var parameter = [advertiser, '11e5-a9fe-5716d712-9e35-39a6f156570b',
		poi_building, poi_uuid, poi_position, parameter, monster_id, latlons[0], latlons[1]];
	conn.query(sql, parameter, function (err, result) {
		console.log("----------1");
		if (err) {
			console.log("-----------2");
			callback("err");
			return ;
		} else {
			console.log("----------3");
			callback("ok");
			return;
		}
	});
}

function average(a) {
	var arrs = new Array();
	var latlons = new Array();
	var lat = 0.0;
	var lon = 0.0;
	arrs = a.split(", ");
	console.log("arrs==" + arrs);
	for (var i = 0; i < arrs.length; i++) {
		var latlon = new Array();
		latlon = arrs[i].split(" ");
		console.log("latlon==" + latlon);
		lon += parseFloat(latlon[0]);
		lat += parseFloat(latlon[1]);
	}
	latlons[0] = parseFloat(lon / arrs.length);
	latlons[1] = parseFloat(lat / arrs.length);
	console.log("latlons=--" + latlons);
    return latlons;
}

