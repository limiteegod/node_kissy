var testPageControl = require("./TestPageControl.js");

var PageControl = function(){};

PageControl.prototype.handle = function(headNode, bodyNode, cb)
{
    console.log(bodyNode);
    var self = this;
    var cmd = headNode.cmd;
    self[cmd[0]](headNode, bodyNode, cb);
};

PageControl.prototype.test = function(headNode, bodyNode, cb)
{
    testPageControl.handle(headNode, bodyNode, cb);
};

var pageControl = new PageControl();
module.exports = pageControl;