KISSY.add("vs-items", ["./node", "./base"], function(S, require) {
    var Node = require("./node");
    var Base = require("./base");
    function VsItems(container, config) {
        var self = this;
        if (!(self instanceof VsItems)) {
            return new VsItems(container, config);
        }
        /**
         * 容器元素
         * @type {Element}
         */
        self.container = container = S.one(container);
        if (!container) return;
        VsItems.superclass.constructor.call(self, config);
        self._init();
    };

    S.extend(VsItems, Base);

    VsItems.ATTRS = {
        //是否可以选择多项
        multiple:{
            value:false
        }
    };

    S.augment(VsItems, {
        _init:function()
        {
            var self = this;
            self.vData = {};
            self.vDataArray = [];
            self.set("width", self.container.width());
            self.set("height", self.container.height());
        },
        _getItemHtml:function(data)
        {
            var self = this;
            var imgUrl = CurSite.getAbsolutePath("img/close.png");
            var lable = '<div class="vs_grid_plain" style="font-size:24px;border-right:1px solid black;">' + data.name + '</div>';
            var closeBt = '<div id="' + data.id + '_ctr" dataId="' + data.id + '" class="vs_grid_plain" style="cursor:pointer;"><img src="' + imgUrl + '" width="24px" height="24px"/></div>';
            var html = '<div id="' + data.id + '" class="vs_grid_plain" style="border:1px solid black;">';
            html += lable;
            html += closeBt;
            html += '</div>';
            return html;
        },
        //添加一个元素
        add:function(data)
        {
            var self = this;
            if(!self.get("multiple"))
            {
                self.vData = {};
                self.vDataArray = [];
                self.container.html("");
            }
            var html = self._getItemHtml(data);
            var itemNode = Node.one(html);
            itemNode.one("#" + data.id + "_ctr").on("click", function(){
                var id = Node.one(this).attr("dataId");
                self.remove(id);
            });
            self.container.append(itemNode);

            var cur = self.vData[data.id];
            if(cur != undefined)
            {
                self.vDataArray[cur] = data;
            }
            else
            {
                cur = self.vDataArray.length;
                self.vData[data.id] = cur;
                self.vDataArray[cur] = data;
            }
        },
        //删除一个元素
        remove:function(id)
        {
            var self = this;
            var cur = self.vData[id];
            if(cur != undefined)
            {
                self.vData[id] = undefined;
                self.vDataArray.splice(cur, 1);
                self.container.one("#" + id).remove();
            }
        },
        //获得所有的元素
        getData:function()
        {
            var self = this;
            return self.vDataArray;
        }
    });
    return VsItems;
});