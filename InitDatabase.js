var log = require('./app/util/McpLog.js');
var dc = require('./app/config/DbCenter.js');
var async = require('async');
var digestUtil = require('./app/util/DigestUtil.js');
var prop = require('./app/config/Prop.js');

async.waterfall([
    function(cb){
        dc.init(function(err){
            cb(err);
        });
    },
    function(cb){
        dc.main.drop(function(err){
            cb(err);
        });
    },
    function(cb){
        dc.main.create(function(err){
            cb(err);
        });
    },
    function(cb){
        dc.mg.create(function(err){
            cb(err);
        });
    },
    function(cb){
        dc.check(function(err){
           cb(err);
        });
    }
], function (err, result) {
    log.info("end...........");
});