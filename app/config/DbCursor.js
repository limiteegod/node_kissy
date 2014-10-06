var dbPool = require('./DbPool.js');
var dateUtil = require('../util/DateUtil.js');
var log = require('../util/McpLog.js');

var DbCurser = function(table, options, baseSql, conditionStr){
    var self = this;
    self.table = table;
    self.baseSql = baseSql;
    self.conditionStr = conditionStr;
    self.options = options;
};

DbCurser.prototype.limit = function(start, size)
{
    var self = this;
    var sql = " limit " + start + "," + size;
    self.baseSql += sql;
    return self;
};

DbCurser.prototype.sort = function(data)
{
    var self = this;
    var count = 0;
    var sql = " order by ";
    for(var key in data)
    {
        if(count > 0)
        {
            sql += ",";
        }
        if(data[key] > 0)
        {
            sql += key;
        }
        else
        {
            sql += key + " desc";
        }
        count++;
    }
    if(count > 0)
    {
        self.baseSql += sql;
    }
    return self;
};

DbCurser.prototype.toArray = function(cb)
{
    var self = this;
    var sql = self.baseSql;
    if(self.conditionStr)
    {
        sql += " where " + self.conditionStr;
    }
    log.info(sql);
    var conn = self.table.db.pool.getConn();
    conn.execute(sql, self.options, function(err, data){
        log.info(data);
        cb(err, data);
    });
};

DbCurser.prototype.count = function(cb)
{
    var self = this;
    var sql = "select count(*) as num from " + self.table.name;
    if(self.conditionStr)
    {
        sql += " where " + self.conditionStr;
    }
    log.info(sql);
    var conn = self.table.db.pool.getConn();
    conn.execute(sql, self.options, function(err, data){
        if(data && data.length > 0)
        {
            cb(null, data[0].num);
        }
        else
        {
            cb(err, data);
        }
    });
};

module.exports = DbCurser;