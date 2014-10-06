var ErrCode = function()
{
    var self = this;
    self.E0000 = {repCode:"0000", description:"系统处理成功"};
    self.E0001 = {repCode:"0001", description:"参数错误"};
    self.E0002 = {repCode:"0002", description:"user not exists"};
    self.E0003 = {repCode:"0003", description:"wrong name or wrong password."};
    self.E0004 = {repCode:"0004", description:"message has expired"};
    self.E0005 = {repCode:"0005", description:"user not login"};
    self.E9000 = {repCode:"9000", description:'不支持的cmd'};
    self.E9001 = {repCode:"9001", description:'用户不存在'};
    self.E9002 = {repCode:"9002", description:'密钥来源错误'};
    self.E9003 = {repCode:"9003", description:'密钥错误'};
    self.E9004 = {repCode:"9004", description:'登陆超时'};
    self.E9005 = {repCode:"9005", description:'不支持的用户类型'};
    self.E9999 = {repCode:"9999", description:"系统内部错误"};
};
module.exports = new ErrCode();