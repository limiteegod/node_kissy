var async = require('async');
var log = require('../util/McpLog.js');
var digestUtil = require("../util/DigestUtil.js");
var dc = require('../config/DbCenter.js');
var ec = require('../config/ErrCode.js');
var prop = require('../config/Prop.js');
var uniqueIdService = require('../service/UniqueIdService.js');
var digestService = require('../service/DigestService.js');

var UserControl = function(){
    var self = this;
    self.cmd = {'A01':0, 'A02':1};
    self.cmdArray = [{id:0, code:'A01', fromType:prop.digestFromType.DB, des:"用户登陆"},
        {id:1, code:'A02', des:''}];
};

UserControl.prototype.handle = function(headNode, bodyStr, userCb)
{
    var self = this;
    async.waterfall([
        //是否是支持的cmd
        function(cb)
        {
            var cmd = self.cmd[headNode.cmd];
            if(cmd == undefined)
            {
                cb(ec.E9000);
            }
            else
            {
                cb(null);
            }
        },
        //校验头的用户类型是否合法
        function(cb)
        {
            var userTypeId = prop.userType[headNode.userType];
            if(userTypeId == undefined)
            {
                cb(ec.E9005);
            }
            else
            {
                cb(null);
            }
        },
        //获得密钥
        function(cb)
        {
            var cmd = self.cmdArray[self.cmd[headNode.cmd]];
            digestService.getKey({fromType:cmd.fromType, userId:headNode.userId}, function(err, key){
                headNode.key = key;
                cb(err, key);
            });
        },
        //先解密
        function(key, cb)
        {
            var decodedBodyStr = digestUtil.check(headNode, key, bodyStr);
            try {
                var bodyNode = JSON.parse(decodedBodyStr);
                cb(null, bodyNode);
            }
            catch (err)
            {
                cb(ec.E9003);
            }
        },
        //check the param
        function(bodyNode, cb){
            var method = 'check' + headNode.cmd;
            self[method](null, headNode, bodyNode, function(err){
                cb(err, bodyNode);
            });
        },
        //业务处理
        function(bodyNode, cb){
            var cmd = 'handle' + headNode.cmd;
            self[cmd](null, headNode, bodyNode, cb);
        }
    ], function (err, bodyNode) {
        userCb(err, bodyNode);
    });
};

/**
 * 用户登陆
 * @param user
 * @param headNode
 * @param bodyNode
 * @param cb
 */
UserControl.prototype.checkA01 = function(user, headNode, bodyNode, cb)
{
    var self = this;
    log.info(bodyNode);
    cb(null);
};

/**
 * 用户登陆
 * @param user
 * @param headNode
 * @param bodyNode
 * @param cb
 */
UserControl.prototype.handleA01 = function(user, headNode, bodyNode, cb)
{
    var stInfoTable = dc.mg.get("stInfo");
    stInfoTable.findOne({_id:headNode.userId}, {}, [], function(err, data){
        if(data)
        {
            var newSt = data.st;
            var now = new Date();
            if(now.getTime() - data.lastActiveTime > prop.loginExpiredSeconds*1000)
            {
                //expired
                newSt = digestUtil.createUUID();
            }
            stInfoTable.update({_id:headNode.userId}, {$set:{lastActiveTime:new Date().getTime(), st:newSt}},
            [], function(err, data){
                cb(null, {uniqueId:bodyNode.uniqueId, st:newSt});
            });
        }
        else
        {
            var st = digestUtil.createUUID();
            stInfoTable.save({_id:headNode.userId, st:st, lastActiveTime:new Date().getTime()}, [], function(err, data){
                cb(null, {uniqueId:bodyNode.uniqueId, st:st});
            });
        }
    });
};

var userControl = new UserControl();
module.exports = userControl;