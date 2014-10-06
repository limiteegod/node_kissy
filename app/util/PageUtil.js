var PageUtil = function(){};

PageUtil.prototype.parse = function(bodyNode, backBodyNode)
{
    var skip = bodyNode.skip;
    if(skip == undefined)
    {
        backBodyNode.skip = 0;
    }
    else
    {
        backBodyNode.skip = parseInt(skip);
    }
    var limit = bodyNode.limit;
    if(limit == undefined)
    {
        backBodyNode.limit = 20;
    }
    else
    {
        backBodyNode.limit = parseInt(limit);
    }
    var sort = bodyNode.sort;
    if(sort == undefined)
    {
        backBodyNode.sort = {id:1};
    }
    else
    {
        backBodyNode.sort = JSON.parse(sort);
    }
    var cond = bodyNode.cond;
    if(cond == undefined)
    {
        backBodyNode.cond = {};
    }
    else
    {
        backBodyNode.cond = JSON.parse(cond);
    }
};

module.exports = new PageUtil();