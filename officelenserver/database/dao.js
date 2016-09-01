var conn = require('./db').connection;
var util = require('../Util/utils');

/**登录实现 */
exports.login = function (username, passwd, callback) {
    var sql = "select * from user where username='" + username + "'";
    conn.query(sql, function (err, result) {
        console.log(result);
        if (err) {
            console.log("查询失败" + err);
            var obj = {
                "code": Number(- 1),
                "msg": "fail",
                "data": ""
            };
            callback(JSON.stringify(obj));
            return;
        }
        if (result == '') {
            console.log("没有用户");
            var obj = {
                "code": Number(- 1),
                "msg": "not_user",
                "data": ""
            };
            callback(JSON.stringify(obj));
            return;
        }
        if (passwd != result[0].passwd) {
            console.log("密码错误");
            var obj = {
                "code": Number(- 1),
                "msg": "passwd_error",
                "data": ""
            };
            callback(JSON.stringify(obj));
            return;
        }
        var token = new Date().getTime() + "-" + username;
        var time = new Date().getTime();
        sql = "update user set token = ?,last_login_time=? where user_id = ?";
        var parameterss = [token, time, result[0].user_id];
        conn.query(sql, parameterss,
            function (err, result) {
                if (err) {

                    return;
                }
                console.log('受影响' + result.affectedRows + '行');
                var tokenobj = { "token": token };
                var obj = {
                    "code": Number(0),
                    "msg": "success",
                    "data": tokenobj
                };
                callback(JSON.stringify(obj));
                console.log("查询成功");
                return;
            });
    });
}
/**注册实现 */
exports.register = function (username, passwd, callback) {
    var sql = "select * from user where username='" + username + "'";
    var str = "";
    conn.query(sql, function (err, result) {
        if (result != '') {
            console.log("用户名重复");
            var obj = {
                "code": Number(- 1),
                "msg": "repeat",
                "data": ""
            };
            callback(JSON.stringify(obj));
            return;
        }
        sql = 'insert into user(user_id,username,passwd) values(?,?,?)';
        var md5 = util.Md(username + passwd + new Date().getTime());
        var parameter = [md5, username, passwd];
        conn.query(sql, parameter, function (err, result) {
            if (err) {
                console.log("注册失败");
                var obj = {
                    "code": Number(- 1),
                    "msg": "fail",
                    "data": ""
                };
                callback(JSON.stringify(obj));
                return;
            }
            console.log("注册成功");
            var obj = {
                "code": Number(0),
                "msg": "success",
                "data": ""
            };
            callback(JSON.stringify(obj));
            console.log("结束");
        });
    });
}

exports.userMonsterList = function (token, callback) {
    var sql = "select user_id from  user where token='" + token + "'";
    var u_id;
    conn.query(sql, function (err, result) {
        console.log(result);
        if (err || result == '') {
            var obj = {
                "code": Number(- 1),
                "msg": "fail",
                "data": ""
            };
            callback(JSON.stringify(obj));
            return;
        }
        u_id = result[0].user_id;
        sql = "select user_id,monster.monster_id,count,monster_name,description,imagesmall_path,image_path,levels,score from usermonster,monster where usermonster.monster_id=monster.monster_id and user_id='" + u_id + "'";
        conn.query(sql, function (err, result) {
            console.log(result);
            if (err) {
                var obj = {
                    "code": Number(- 1),
                    "msg": "fail",
                    "data": ""
                };
                callback(JSON.stringify(obj));
                return;
            }
            var obj = {
                "code": Number(0),
                "msg": "success",
                "data": result
            };
            callback(JSON.stringify(obj));
            return;
        });
    });
}
//得到位置，推送广告
exports.pushAdvert = function (lat, lon, building, callback) {

    var sql = "select * from advertisers where poi_building='" + building + "'";
    conn.query(sql, function (err, result) {
        console.log("---------1");
        console.log(result);
        if (err) {
            var obj = {
                "code": Number(- 1),
                "msg": "fail",
                "data": ""
            };
            callback(JSON.stringify(obj));
            return;
        }
          console.log("---------2");
        if (result == '') {
            var obj = {
                "code": Number(- 1),
                "msg": "fail",
                "data": ""
            };
            callback(JSON.stringify(obj));
            return;
        }
          console.log("---------3");
        var len = result.length;
        var arr = new Array();
        var uuids = new Array();
        for (var i = 0; i < len; i++) {
            arr = result[i].poi_position.split(", ");
            var isInside = util.isPointInPolygon(lon, lat, arr);//判断是否在多边形内
              console.log("---------4"+isInside);
            if (isInside) {
                uuids.push(result[i].monster_id);
            }
        }
      console.log("---------5");
        if (uuids.length < 1) {
            var obj = {
                "code": Number(- 1),
                "msg": "fail",
                "data": ""
            };
            callback(JSON.stringify(obj));
            return;
        }
          console.log("---------6");
       
        console.log("str==" + uuids);
        var obj = {
            "code": Number(0),
            "msg": "success",
            "data": uuids
        };
        callback(JSON.stringify(obj));
        return;

    });
}

//获取商铺信息
exports.getArdert = function (lat, lon, building, callback) {

    var sql = "select * from advertisers where poi_building='" + building + "'";
    conn.query(sql, function (err, result) {
           console.log(result);
        if (err) {
            console.log("------------------err");
            var obj = {
                "code": Number(-1),
                "msg": "fail",
                "data": ""
            };
            callback(JSON.stringify(obj));
            return;
        }
        console.log("------------------1");
        if (result == '') {
            var obj = {
                "code": Number(-1),
                "msg": "fail",
                "data": ""
            };
            callback(JSON.stringify(obj));
            return;
        }
        console.log("------------------2");
        var arr = new Array();
        var arrs = new Array();
        var monsters = new Array();
        for (var i = 0; i < result.length; i++) {
            arr[i] = util.getDistance(lon, lat, result[i].lon, result[i].lat);
        }
        arrs = arr;
        arr.sort();
        var m=0;
        for (var j = 0; j < arr.length; j++) {
            if (j < 7) {
                for (var n = 0; n < arrs.length; n++) {
                    if (arr[j] == arrs[n]) {
                        monsters[m]=result[n].monster_id;
                        m=m+1;
                        console.log("---------------xc=" + monsters);
                        break;
                    }
                }
            } else
                break;
        }
        console.log("------------------3" + monsters);
        if(monsters.length<1){
             var obj = {
                    "code": Number(-1),
                    "msg": "fail",
                    "data": ""
                };
                callback(JSON.stringify(obj));
                return;
        }
        getSplist(monsters, function (str) {

            if (str == "err") {
                var obj = {
                    "code": Number(-1),
                    "msg": "fail",
                    "data": ""
                };
                callback(JSON.stringify(obj));
                return;
            }
            console.log("------------------4");
            var obj = {
                "code": Number(0),
                "msg": "success",
                "data": str
            };
            console.log("------------------5" + str);
            callback(JSON.stringify(obj));
        });

    });


}

function getSplist(arr, callback) {
    var sql = "select monster.monster_id,monster_name,description,image_path,levels,score,poi_uuid,lon,lat from monster,advertisers where monster.monster_id=advertisers.monster_id and monster.monster_id in";
    var sqls = "'" + arr[0] + "'";
    for (var i = 1; i < arr.length; i++) {
        sqls = sqls + ",'" + arr[i] + "'";
    }
    sql = sql +"("+sqls+")";
    console.log("------------------6" + sql);
    conn.query(sql, function (err, result) {
        if (err) {
            callback("err");
            return;
        } else {
            callback(result);
            return;
        }
    });
}