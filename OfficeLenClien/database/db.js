var mysql=require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'officelen',
    port: 3306
});
//创建一个connection
conn.connect(function(err){
    if(err){       
        console.log('[query] - :'+err);
        return;
    }
    console.log('[connection connect]  succeed!');
    }); 
exports.connection=conn;
