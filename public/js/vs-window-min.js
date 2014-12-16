KISSY.add("vs-window", ["./node", "./base"], function(S, require) {
    var Node = require("./node");
    var Base = require("./base");
    var Json = require("./json");
    function VsWindow(container, config) {
        var self = this;
        if (!(self instanceof VsWindow)) {
            return new VsWindow(container, config);
        }
        /**
         * 容器元素
         * @type {Element}
         */
        self.container = container = S.one(container);
        if (!container) return;
        VsWindow.superclass.constructor.call(self, config);
        self._init();
    };

    S.extend(VsWindow, Base);

    VsWindow.ATTRS = {
        width:{
            value:310
        },
        height:{
            value:310
        },
        title:{
            value:''
        },
        url:{
            value:'pages/admin/operation/selectParent.html'
        },
        model: {
            value:true
        },
        controlBt:{
            value:[{name:'确定', cb:null}, {name:'取消', cb:null}, {name:'关闭', cb:null}]
        },
        html: {
            value:''
        },
        //是否正在校验子页面的数据
        checking: {
            value:false
        }
    };

    S.augment(VsWindow, {
        _init:function()
        {
            var self = this;
            var wId = CurSite.createUUID();
            self.set("wId", wId);   //设置frame的唯一id
            var body = Node.one("body");
            var bodyWidth = window.innerWidth;
            var backWidth = document.body.scrollWidth; //the width of the back div
            var backHeight = document.body.scrollHeight;
            var bodyHeight = window.innerHeight;
            if(self.get("width") > bodyWidth)
            {
                self.set("width", bodyWidth);
            }
            if(self.get("height") > bodyHeight)
            {
                self.set("height", bodyHeight);
            }
            var left = (bodyWidth - self.get("width"))/2 + window.scrollX;
            var top = (bodyHeight - self.get("height"))/2 + window.scrollY;
            var html = self.get("html");
            self.container.html("");
            self.widowDiv = Node.one('<div class="vs_div_talbe_border" style="position: absolute;left:' + left + 'px;top:' + top + 'px;width:' + self.get("width") + 'px"></div>');
            self.widowDiv.append('<div class="clearfix"><div class="vs_div_table_border_head_left"></div><div class="vs_div_table_border_head"></div><div class="vs_div_table_border_head_right"></div></div>');
            self.widowDiv.append('<div class="clearfix"><div class="vs_div_table_border_content_left"></div><div class="vs_div_table_border_content"></div><div class="vs_div_table_border_content_right"></div></div>');
            self.widowDiv.append('<div class="clearfix"><div class="vs_div_table_border_bottom_left"></div><div class="vs_div_table_border_bottom"></div><div class="vs_div_table_border_bottom_right"></div></div>');
            var divList = self.widowDiv.children();
            S.each(divList, function(row){
                Node.one(row.childNodes[1]).css("width", self.get("width") - 40);
            });
            var setHDiv = divList[1];
            S.each(setHDiv.childNodes, function(item){
                Node.one(item).css("height", self.get("height") - 40);
            });
            var cWidth = self.get("width") - 10;
            var cHeight = self.get("height") - 10;
            var cTable = Node.one('<div style="overflow:hidden;position:absolute;left:5px;top:26px;width:' + cWidth + 'px;height:' + (cHeight - 25 - 32) + 'px;"></div>');
            var title = Node.one('<div style="overflow:pages/admin/operatio hidden;text-align:left;border-bottom:1px solid #28afae;left:5px;top:7px;position:absolute;width:' + cWidth + 'px;height:18px;">&nbsp;' + self.get("title") + '</div>');
            var bottomField = Node.one('<div style="overflow: hidden;border-top:1px solid #28afae;left:5px;top:' + (cHeight - 30) + 'px;position:absolute;width:' + cWidth + 'px;height:28px;"></div>');
            if(html.length == 0)
            {
                var frame = Node.one('<iframe id="' + wId + '" frameborder="no" border="0" style="width:' + cWidth + 'px;height:' + (cHeight - 57) + 'px;"></iframe>');
                frame.attr("src", CurSite.getAbsolutePath(self.get("url")) + "&frameId=" + wId);
                cTable.append(frame);
            }
            else
            {
                cTable.append(html);
            }
            self.widowDiv.append(title);
            self.widowDiv.append(cTable);
            self.widowDiv.append(bottomField);

            self.cTable = cTable;

            var bts = self.get("controlBt");
            var btsWidth = 68*bts.length;
            for(var key in bts)
            {
                var bt = bts[key];
                var btMarginLeft
                if(key == 0)
                {
                    btMarginLeft = cWidth - btsWidth + 60*key;
                }
                else
                {
                    btMarginLeft = 10;
                }
                var btNode = Node.one('<input index="' + key + '" type="button" value="' + bt.name + '" style="width:50px;margin-left:' + btMarginLeft + 'px"/>');
                bottomField.append(btNode);
                self._bindBtEvent(btNode);
            }
            self.backDiv = Node.one('<div class="div_window_back" style="position: absolute;;left:0px;top:0px;width:' + backWidth + 'px;height:' + backHeight + 'px"></div>');
            body.append(self.backDiv);
            body.append(self.widowDiv);
        },
        //回调页面中的回调函数
        _callBack:function(index, err, data)
        {
            var self = this;
            var ctrBt = self.get("controlBt")[index];
            var cb = ctrBt.cb;
            if(cb)
            {
                if(cb(err, data))
                {
                    self.close();
                }
            }
            else
            {
                self.close();
            }
        },
        _bindBtEvent:function(btNode)
        {
            var self = this;
            btNode.on("click", function(){
                var index = parseInt(Node.one(this).attr("index"));
                var ctrBt = self.get("controlBt")[index];
                if(ctrBt.check)
                {
                    //如果校验页面中的数据
                    var cWin = CurSite.getFrameWinById(self.get("wId"));
                    cWin.check(function(err, data){
                        self._callBack(index, err, data);
                    });
                }
                else
                {
                    self._callBack(index);
                }
            });
        },
        setHtml:function(html)
        {
            var self = this;
            self.cTable.html(html);
        },
        close:function()    //关闭窗口
        {
            var self = this;
            self.widowDiv.remove();
            self.backDiv.remove();
        }
    });
    return VsWindow;
});