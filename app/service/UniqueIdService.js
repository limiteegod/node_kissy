var dc = require('../config/DbCenter.js');

var UniqueIdService = function(){};

/**
 * check msg is exists or not
 * @param uniqueId
 */
UniqueIdService.prototype.exists = function(uniqueId, cb)
{
    var table = dc.mg.get("uniqueId");
    table.save({_id:uniqueId}, [], function(err, data){
        cb(err, data);
    });
};

module.exports = new UniqueIdService();