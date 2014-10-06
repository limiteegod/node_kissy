var async = require('async');
var dc = require('./app/config/DbCenter.js');
var prop = require('./app/config/Prop.js');
var log = require('./app/util/McpLog.js');

var Helper = function(){};

Helper.prototype.addOperation = function()
{
    async.waterfall([
        function(cb){
            dc.init(function(err){
                cb(err);
            });
        },
        function(cb){
            var operationTable = dc.main.get("operation");
            operationTable.drop(function(err, data){
                cb(null);
            });
        },
        function(cb)
        {
            var operationTable = dc.main.get("operation");
            operationTable.create(function(err, data){
                cb(err);
            });
        },
        function(cb)
        {
            var operationTable = dc.main.get("operation");
            operationTable.save({userType:prop.userType.ADMIN, id:'ADMIN_POPEDOM', name:'权限管理', url:'', hasChildren:1}, [], function(err, data){
                operationTable.save({userType:prop.userType.ADMIN, id:'ADMIN_ADD_OPERATION', parent:'ADMIN_POPEDOM', name:'新增菜单', url:''}, [], function(err, data){
                });
                operationTable.save({userType:prop.userType.ADMIN, id:'ADMIN_USER_OPERATION', parent:'ADMIN_POPEDOM', name:'用户权限', url:'', hasChildren:0}, [], function(err, data){
                });
            });
            operationTable.save({userType:prop.userType.ADMIN, id:'ADMIN_AREA', name:'地区管理', url:'', hasChildren:1}, [], function(err, data){
                operationTable.save({userType:prop.userType.ADMIN, id:'ADMIN_ADD_AREA', parent:'ADMIN_AREA', name:'添加地区', url:'admin_addArea.html', hasChildren:0}, [], function(err, data){
                });
                operationTable.save({userType:prop.userType.ADMIN, id:'ADMIN_LIST_AREA', parent:'ADMIN_AREA', name:'地区列表', url:'admin_listArea.html', hasChildren:0}, [], function(err, data){
                });
            });
            operationTable.save({userType:prop.userType.ADMIN, id:'ADMIN_LEAGUE', name:'联赛管理', url:'', hasChildren:1}, [], function(err, data){
                operationTable.save({userType:prop.userType.ADMIN, id:'ADMIN_ADD_LEAGUE', parent:'ADMIN_LEAGUE', name:'添加联赛', url:'league_add.html', hasChildren:0}, [], function(err, data){
                });
                operationTable.save({userType:prop.userType.ADMIN, id:'ADMIN_LIST_LEAGUE', parent:'ADMIN_LEAGUE', name:'联赛列表', url:'league_list.html', hasChildren:0}, [], function(err, data){
                });
            });
            operationTable.save({userType:prop.userType.ADMIN, id:'ADMIN_GAME', name:'游戏管理', url:'', hasChildren:1}, [], function(err, data){
                operationTable.save({userType:prop.userType.ADMIN, id:'ADMIN_LIST_GAME', parent:'ADMIN_GAME', name:'游戏列表', url:'game_list.html', hasChildren:0}, [], function(err, data){
                });
            });
            cb(null, "success");
        }
    ], function (err, result) {
        log.info(err);
        log.info("end...........");
    });
};

Helper.prototype.league = function()
{
    async.waterfall([
        function(cb){
            dc.init(function(err){
                cb(err);
            });
        },
        function(cb){
            var leagueTable = dc.main.get("league");
            leagueTable.drop(function(err, data){
                cb(null);
            });
        },
        function(cb)
        {
            var leagueTable = dc.main.get("league");
            leagueTable.create(function(err, data){
                cb(err);
            });
        }
    ], function (err, result) {
        log.info(err);
        log.info("end...........");
    });
};

var h = new Helper();
h.addOperation();