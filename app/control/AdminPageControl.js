var dc = require('../config/DbCenter.js');
var prop = require('../config/Prop.js');
var digestUtil = require("../util/DigestUtil.js");
var log = require("../util/McpLog.js");

var AdminPageControl = function(){};

AdminPageControl.prototype.handle = function(headNode, bodyNode, cb)
{
    console.log(bodyNode);
    var self = this;
    var cmd = headNode.cmd;
    self[cmd[1]](headNode, bodyNode, cb);
};


AdminPageControl.prototype.login = function(headNode, bodyNode, cb)
{
    var self = this;
    var backBodyNode = {title:"login", tip:"Welcome to login at my website."};
    cb(null, backBodyNode);
};

AdminPageControl.prototype.showUserType = function(headNode, bodyNode, cb)
{
    var self = this;
    var backBodyNode = {title:"show user type"};
    var userTypeTable = db.get("userType");
    userTypeTable.find({}, {name:1}).toArray(function(err,data){
        backBodyNode.rst = data;
        //backBodyNode.data = JSON.parse(digestUtil.check({digestType:'3des-empty'}, null, bodyNode.data));
        cb(null, backBodyNode);
    });
};

AdminPageControl.prototype.selectOperation = function(headNode, bodyNode, cb)
{
    var self = this;
    var backBodyNode = {title:"select operation"};
    var operationTable = db.get("operation");
    operationTable.find({}, {name:1, url:1, parentId:1}).toArray(function(err,data){
        backBodyNode.rst = data;
        backBodyNode.data = JSON.parse(digestUtil.check({digestType:'3des-empty'}, digestUtil.getEmptyKey(), bodyNode.data));
        cb(null, backBodyNode);
    });
};

AdminPageControl.prototype.selectUserType = function(headNode, bodyNode, cb)
{
    var self = this;
    var backBodyNode = {title:"select user type"};
    var userTypeTable = db.get("userType");
    userTypeTable.find({}, {name:1}).toArray(function(err,data){
        backBodyNode.rst = data;
        var fromData = JSON.parse(digestUtil.check({digestType:'3des-empty'}, digestUtil.getEmptyKey(), bodyNode.data));
        if(fromData[0])
        {
            backBodyNode.selectedId = fromData[0]._id;
        }
        else
        {
            backBodyNode.selectedId = backBodyNode.rst[0]._id;
        }
        cb(null, backBodyNode);
    });
};

AdminPageControl.prototype.showOperation = function(headNode, bodyNode, cb)
{
    var self = this;
    var backBodyNode = {title:"show operation"};
    var operationTable = db.get("operation");
    operationTable.find({parentId:{$lt:0}}, {name:1, parentId:1, hasChildren:1}).toArray(function(err,data){
        if(err) cb(err, {});
        backBodyNode.rst = data;
        cb(null, backBodyNode);
    });
};

AdminPageControl.prototype.addOperation = function(headNode, bodyNode, cb)
{
    cb(null, {});
};

AdminPageControl.prototype.addArea = function(headNode, bodyNode, cb)
{
    cb(null, {});
};

/**
 * 地区列表
 * @param headNode
 * @param bodyNode
 * @param cb
 */
AdminPageControl.prototype.listArea = function(headNode, bodyNode, cb)
{
    var self = this;
    var skip = bodyNode.skip;
    if(skip == undefined)
    {
        skip = 0;
    }
    else
    {
        skip = parseInt(skip);
    }
    var limit = bodyNode.limit;
    if(limit == undefined)
    {
        limit = 20;
    }
    else
    {
        limit = parseInt(limit);
    }
    var sort = bodyNode.sort;
    if(sort == undefined)
    {
        sort = {id:1};
    }
    else
    {
        sort = JSON.parse(sort);
    }
    var cond = bodyNode.cond;
    if(cond == undefined)
    {
        cond = {};
    }
    else
    {
        cond = JSON.parse(cond);
    }
    var backBodyNode = {title:"view areas", skip:skip, limit:limit};
    var areaTable = dc.main.get("area");
    var cursor = areaTable.find(cond, {}, []).sort(sort).limit(skip, limit);
    cursor.toArray(function(err, data){
        backBodyNode.rst = data;
        backBodyNode.count = cursor.count(function(err, count){
            backBodyNode.count = count;
            cb(null, backBodyNode);
        });
    });
};

AdminPageControl.prototype.setOperation = function(headNode, bodyNode, cb)
{
    var self = this;
    cb(null, {});
};

AdminPageControl.prototype.index = function(headNode, bodyNode, cb)
{
    var self = this;
    cb(null, {});
};

AdminPageControl.prototype.top = function(headNode, bodyNode, cb)
{
    var self = this;
    cb(null, {});
};

AdminPageControl.prototype.left = function(headNode, bodyNode, cb)
{
    var self = this;
    var backBodyNode = {title:"左边页"};
    var operationTable = dc.main.get("operation");
    operationTable.find({userType:prop.userType.ADMIN}, {}).toArray(function(err, data)
    {
        log.info(data);
        if(data)
        {
            backBodyNode.rst = data;
        }
        cb(null, backBodyNode);
    });
};

AdminPageControl.prototype.main = function(headNode, bodyNode, cb)
{
    var self = this;
    cb(null, {});
};

var adminPageControl = new AdminPageControl();
module.exports = adminPageControl;