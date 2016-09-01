
var http=require('http');

var body = {
 	"cmd": 10003,
    "net": 0,
	"uuid":"11e5-a9ff-2dfa215c-9e35-39a6f156570b",
	"distance":5.0
};

  

var bodyString = JSON.stringify(body);

var headers = {
  'Content-Type': 'application/json',
  'Content-Length': bodyString.length,
  'token':"5EBF706933B9605AB0FCD44B79AA4BF7"
};


var options = {
  host: '221.4.63.94',
  port: 8880,
  path: '/ChihiroIndoorOpen/open/handler/v1.0.1/unit',
  method: 'POST',
  headers: headers
};

var req=http.request(options,function(res){
	res.setEncoding('utf-8');

  	var responseString = '';

  	res.on('data', function(data) {
    	responseString += data;
  	});

  	res.on('end', function() {
  	//这里接收的参数是字符串形式,需要格式化成json格式使用
    //	var resultObject = JSON.parse(responseString);
    	console.log('-----resBody-----',responseString);
  	});

  	req.on('error', function(e) {
  		// TODO: handle error.
  		console.log('-----error-------',e);
	});
});
req.write(bodyString);
req.end();
//EAE59B0824BF287E4C83D20E040FC16C
//11e5-a9fe-56e0d2cb-9e35-39a6f156570b
//-----resBody----- {"cmd":10001,"items":[{"abbreviation":"BJ","name":"北京市","pinYin":"beijing","typeName":"直辖市","uuid":"11e5-a9fe-56eb330e-9
//e35-39a6f156570b"},{"abbreviation":"GD","name":"广东省","pinYin":"guangdong","typeName":"省份","uuid":"11e5-a9fe-56f0ff73-9e35-39a6f156570b"},{"
//abbreviation":"SH","name":"上海市","pinYin":"shanghai","typeName":"直辖市","uuid":"11e5-a9fe-5702b2c4-9e35-39a6f156570b"}],"model":"provience","
//resultCode":0,"resultMsg":"请求处理成功","totalNum":3}
//-----resBody----- {"cmd":10001,"items":[{"abbreviation":"GZ","lat":23.133218,"lon":113.270857,"name":"广州市","pinYin":"guangzhou","uuid":"11e5-a9fe-5716d712-9e35-39a6f156570b"},{"abbreviation":"SZ","lat":22.560027,"lon":114.123718,"name":"
//深圳市","pinYin":"shenzhen","uuid":"11e5-a9fe-5717c173-9e35-39a6f156570b"}],"mod
//el":"city","resultCode":0,"resultMsg":"请求处理成功","totalNum":2}

http.request=(function(_request){
    return function(options,callback){
        var timeout=options['timeout'],
            timeoutEventId;
        var req=_request(options,function(res){
            res.on('end',function(){
                clearTimeout(timeoutEventId);
                console.log('response end...');
            });
            
            res.on('close',function(){
                clearTimeout(timeoutEventId);
                console.log('response close...');
            });
            
            res.on('abort',function(){
                console.log('abort...');
            });
            
            callback(res);
        });
        
        //超时
        req.on('timeout',function(){
            req.res && req.res.abort();
            req.abort();
        });
        
        //如果存在超时
        timeout && (timeoutEventId=setTimeout(function(){
            req.emit('timeout',{message:'have been timeout...'});
        },timeout));
        return req;
    };
    
})(http.request)