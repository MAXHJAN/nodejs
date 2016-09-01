var crypto = require('crypto');
var uuid = require('node-uuid');

/** 产生MD5码 */
exports.Md = function (params) {
	console.log("产生md5");
	var md5 = crypto.createHash('md5');
	md5.update(params);
	var d = md5.digest('hex');
	return d;
}

/** 随机产生uuid */
exports.Uuid = function () {
	var uid = uuid.v4();
	return uid;
}

exports.isPointInPolygon = function (x, y, polygon) {
	var isInside = false;
	var ESP = 1e-9;
	var count = 0;
	var linePoint1x;
	var linePoint1y;
	var linePoint2x = 180;
	var linePoint2y;

	linePoint1x = x;
	linePoint1y = y;
	linePoint2y = y;

	for (var i = 0; i < polygon.length - 1; i++) {
		var arr = new Array();
		arr = polygon[i].split(" ");
		var cx1 = parseFloat(arr[0]);
		var cy1 = parseFloat(arr[1]);
		var arrs = polygon[i + 1].split(" ");
		var cx2 = parseFloat(arrs[0]);
		var cy2 = parseFloat(arrs[1]);
		if (isPointOnLine(x, y, cx1, cy1, cx2, cy2)) {
			return true;
		}
		if (Math.abs(cy2 - cy1) < ESP) {
			continue;
		}

		if (isPointOnLine(cx1, cy1, linePoint1x, linePoint1y, linePoint2x,
			linePoint2y)) {
			if (cy1 > cy2)
				count++;
		} else if (isPointOnLine(cx2, cy2, linePoint1x, linePoint1y,
			linePoint2x, linePoint2y)) {
			if (cy2 > cy1)
				count++;
		} else if (isIntersect(cx1, cy1, cx2, cy2, linePoint1x, linePoint1y,
			linePoint2x, linePoint2y)) {
			count++;
		}
	}
	console.log(count);
	if (count % 2 == 1) {
		isInside = true;
	}

	return isInside;
}

function Multiply(px0, py0, px1, py1, px2, py2) {
	return ((px1 - px0) * (py2 - py0) - (px2 - px0) * (py1 - py0));
}

function isPointOnLine(px0, py0, px1, py1, px2, py2) {
	var flag = false;
	var ESP = 1e-9;
	if ((Math.abs(Multiply(px0, py0, px1, py1, px2, py2)) < ESP)
		&& ((px0 - px1) * (px0 - px2) <= 0)
		&& ((py0 - py1) * (py0 - py2) <= 0)) {
		flag = true;
	}
	return flag;
}

function isIntersect(px1, py1, px2, py2, px3, py3, px4, py4) {
	var flag = false;
	var d = (px2 - px1) * (py4 - py3) - (py2 - py1) * (px4 - px3);
	if (d != 0) {
		var r = ((py1 - py3) * (px4 - px3) - (px1 - px3) * (py4 - py3)) / d;
		var s = ((py1 - py3) * (px2 - px1) - (px1 - px3) * (py2 - py1)) / d;
		if ((r >= 0) && (r <= 1) && (s >= 0) && (s <= 1)) {
			flag = true;
		}
	}
	return flag;
}

exports.getDistance = function (lng1, lat1, lng2, lat2) {
	var radLat1 = toRadians(lat1);
	var radLat2 = toRadians(lat2);
	var a = radLat1 - radLat2;
	var b = toRadians(lng1) - toRadians(lng2);
	var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
	s = s * 6378137.0;// 取WGS84标准参考椭球中的地球长半径(单位:m)
	s = Math.round(s * 10000) / 10000;
	console.log("s=="+s);
	return s;
}

function toRadians(degrees) {
	var a = (degrees * Math.PI) / 180;
	return a;
}
