var TestPageControl = function(){};

TestPageControl.prototype.handle = function(headNode, bodyNode, cb)
{
    console.log(bodyNode);
    var self = this;
    var cmd = headNode.cmd;
    self[cmd[1]](headNode, bodyNode, cb);
};

TestPageControl.prototype.table = function(headNode, bodyNode, cb)
{
    var self = this;
    var backBodyNode = {title:"table"};
    cb(null, backBodyNode);
};

var testPageControl = new TestPageControl();
module.exports = testPageControl;