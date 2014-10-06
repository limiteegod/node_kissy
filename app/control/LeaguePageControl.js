var dc = require('../config/DbCenter.js');
var prop = require('../config/Prop.js');
var digestUtil = require("../util/DigestUtil.js");
var log = require("../util/McpLog.js");
var pageUtil = require("../util/PageUtil.js");
var async = require('async');

var LeaguePageControl = function(){};

LeaguePageControl.prototype.handle = function(headNode, bodyNode, cb)
{
    console.log(bodyNode);
    var self = this;
    var cmd = headNode.cmd;
    self[cmd[1]](headNode, bodyNode, cb);
};

LeaguePageControl.prototype.add = function(headNode, bodyNode, cb)
{
    var self = this;
    var backBodyNode = {title:"add", tip:"Welcome to login at my website."};
    var areaTable = dc.main.get("area");
    areaTable.find({}, {}).toArray(function(err, data){
        backBodyNode.rst = data;
        cb(null, backBodyNode);
    });
};

LeaguePageControl.prototype.detail = function(headNode, bodyNode, cb)
{
    var self = this;
    var backBodyNode = {title:"add", tip:"Welcome to login at my website."};
    async.waterfall([
        function(cb){
            var areaTable = dc.main.get("area");
            areaTable.find({}, {}).toArray(function(err, data){
                backBodyNode.rst = data;
                cb(err);
            });
        },
        function(cb){
            var leagueTable = dc.main.get("league");
            leagueTable.findOne({id:bodyNode.id}, {}, [], function(err, data){
                backBodyNode.league = data;
                cb(err);
            });
        }
    ], function (err, result) {
        cb(err, backBodyNode);
    });
};

LeaguePageControl.prototype.list = function(headNode, bodyNode, cb)
{
    var self = this;
    var backBodyNode = {title:"view leagues"};
    pageUtil.parse(bodyNode, backBodyNode);
    var leagueTable = dc.main.get("league");
    var cursor = leagueTable.find(backBodyNode.cond, {}, []).sort(backBodyNode.sort).limit(backBodyNode.skip, backBodyNode.limit);
    cursor.toArray(function(err, data){
        backBodyNode.rst = data;
        backBodyNode.count = cursor.count(function(err, count){
            backBodyNode.count = count;
            cb(null, backBodyNode);
        });
    });
};

module.exports = new LeaguePageControl();