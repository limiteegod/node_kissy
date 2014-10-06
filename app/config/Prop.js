var target = 'dev';

var argv = process.argv;
var kvs = {};
for(var key in argv)
{
    if(key > 1)
    {
        var kv = argv[key].split("=");
        kvs[kv[0]] = kv[1];
    }
}
if(kvs.target)
{
    target = kvs.target;
}

//runtime target
exports.target = target;

//暂时支持3种密钥来源
exports.digestFromType = {"NONE":0, "DB":1, "CACHE":2};
exports.digestFromTypeArray = [
    {id:0, code:'NONE', des:"无"},
    {id:1, code:'DB', des:"数据库"},
    {id:2, code:'CACHE', des:"缓存"}
];

exports.userType = {"CUSTOMER":0, "ADMIN":1};
exports.userTypeArray = [{id:0, code:'CUSTOMER', des:"普通用户"},
    {id:1, code:'ADMIN', des:"系统管理员"}];

exports.dbType = {"mysql":0, "oracle":1, "mongodb":2};
exports.dbTypeArray = [{id:0, code:'mysql', des:"mysql"},
    {id:1, code:'oracle', des:"oracle"},
    {id:2, code:'mongodb', des:"mongodb"}];

//config db basic type
var dbs = [{
    config:{'url':'mongodb://127.0.0.1:27017/football'},
    type:exports.dbType.mongodb
},{
    config:{
        'host':'localhost',
        'user':'root',
        'password':'123456',
        'port':3306,
        'database':'football'
    },
    type:exports.dbType.mysql
}];
exports.dbs = dbs;

//if user hasn't operation in half a hour, the key will be expired.
exports.loginExpiredSeconds = 30*60;



