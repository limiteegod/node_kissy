KISSY.add("vs-data-select", ["./node", "./base", "./vs-round-input"], function(S, require) {
    var Node = require("./node");
    var Base = require("./base");
    var VsRoundInput = require("./vs-round-input");
    function VsDataSelect(container, config) {
        var self = this;
        if (!(self instanceof VsDataSelect)) {
            return new VsDataSelect(container, config);
        }
        /**
         * 容器元素
         * @type {Element}
         */
        self.container = container = S.one(container);
        if (!container) return;
        VsDataSelect.superclass.constructor.call(self, config);
        self._init();
    };

    S.extend(VsDataSelect, Base);

    VsDataSelect.ATTRS = {
        width:{
            value:310
        },
        click:{
            value:function(){}
        },
        //是否可以选择多项
        multiple:{
            value:false
        }
    };

    S.augment(VsDataSelect, {
        _init:function()
        {
            var self = this;
            self.vData = {};
            self.vDataArray = [];
            var width = self.get("width");
            var roundWidth = width - 20;
            var imgUrl = CurSite.getAbsolutePath("img/data_select.png");
            self.container.append('<div class="container" style="float:left;width:' + roundWidth + 'px;"></div>');

            var selectButton = Node.one('<div class="container" style="float:left;cursor:pointer;padding-left:2px;padding-top:5px;width:' + 20 + 'px;"><img width="20px" height="20px" src="' + imgUrl + '"/></div>');
            selectButton.on("click", function(){
                var cb = self.get("click");
                cb(self);
            });
            self.container.append(selectButton);

            var divList = self.container.children();
            var setHDiv = divList[0];

            self.vsRoundInput = new VsRoundInput(setHDiv, {width:roundWidth});
        },
        setData:function(data)
        {
            var self = this;
            if(!self.get("multiple"))
            {
                self.vData = {};
                self.vDataArray = [];
            }
            self.vData[data.id] = 0;
            self.vDataArray[0] = data;
            self.vsRoundInput.setData(data.name);
        },
        //获得控件绑定的数据
        getData:function()
        {
            var self = this;
            return self.vDataArray;
        }
    });
    return VsDataSelect;
});