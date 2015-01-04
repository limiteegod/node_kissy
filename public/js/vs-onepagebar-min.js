KISSY.add("vs-onepagebar", ["./node", "./base"], function(S, require) {
    var Node = require("./node");
    var Base = require("./base");
    function VsOnePagebar(container, config) {
        var self = this;
        if (!(self instanceof VsOnePagebar)) {
            return new VsOnePagebar(container, config);
        }
        /**
         * 容器元素
         * @type {Element}
         */
        self.container = container = S.one(container);
        if (!container) return;
        VsOnePagebar.superclass.constructor.call(self, config);
        self._init();
    };

    S.extend(VsOnePagebar, Base);

    VsOnePagebar.ATTRS = {
        count:{
            value:0
        },
        cur:{
            value:1
        },
        limit:{
            value:20
        },
        toPage:{
            value:undefined
        }
    };

    S.augment(VsOnePagebar, {
        _init:function()
        {
            var self = this;
            var count = self.get("count");
            var size = self.get("limit");
            var cur = self.get("cur");
            var pageCount = parseInt(count/size);
            self.set("pageCount", pageCount);
            if(count%size > 0)
            {
                pageCount++;
            }

            var pStr = self._getDetailPage(cur, pageCount);
            var html = '<div class="vs_grid_plain">共' + count + '条记录,</div>';
            html += '<div class="vs_grid_plain">共' + pageCount + '页</div>';
            var pre= '<span class="disabled" style="margin-left: 30px"> 上一页</span>';
            var next='<span class="disabled"> 下一页</span>';
            if(pageCount>1){
                if(cur>1&&cur<pageCount){
                    pre= '<a class="prePage" style="margin-left: 30px"> 上一页</a>';
                    next= '<a class="nextPage" > 下一页</a>';
                }else if(cur==1){
                    next= '<a class="nextPage" > 下一页</a>';
                }else{
                    pre= '<a class="prePage" style="margin-left: 30px"> 上一页</a>';
                }
            }
            if(count > 0)
            {
                html += pre;
                html += pStr;
                html += next;
            }

            self.container.html(html);

            //绑定事件
            self.container.all(".page_select").each(function(item){
                item.on("click", function(){
                    var toPage = parseInt(Node.one(this).html());
                    var toPageFunc = self.get("toPage");
                    if(toPageFunc)
                    {
                        toPageFunc(toPage);
                    }
                });
            });

            self.container.all(".prePage").each(function(item){
                item.on("click", function(){
                    var toPage = cur-1;
                    var toPageFunc = self.get("toPage");
                    if(toPageFunc)
                    {
                        toPageFunc(toPage);
                    }
                });
            });

            self.container.all(".nextPage").each(function(item){
                item.on("click", function(){
                    var toPage = cur+1;
                    var toPageFunc = self.get("toPage");
                    if(toPageFunc)
                    {
                        toPageFunc(toPage);
                    }
                });
            });




        },
        _getDetailPage:function(cur, pageCount)
        {
            var self = this;
            var pArray;
            if(pageCount <= 9)
            {
                pArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            }
            else
            {
                if(cur <= 3)
                {
                    pArray = [1, 2, 3, 4, -1, pageCount - 1, pageCount];
                }
                else if(pageCount - cur <= 2)
                {
                    pArray = [1, 2, -1, pageCount - 3, pageCount - 2, pageCount - 1, pageCount];
                }
                else
                {
                    pArray = [1, 2, -1, cur -1, cur, cur + 1, -1, pageCount - 1, pageCount];
                }
            }
            return self._getIndexHtml(cur, pArray, pageCount);
        },
        _getIndexHtml:function(cur, pArray, pageCount)
        {
            var str = '';
            for(var key in pArray)
            {
                var pIndex = pArray[key];
                if(pIndex < 0)
                {
                    str += '...&nbsp;';
                }
                else if(pIndex <= pageCount)
                {
                    var cls = 'page_select';
                    if(pIndex == cur)
                    {
                        cls = 'current';
                        str += '<span class="' + cls + '">' + pIndex + '</span>';
                    }else{
                        str += '<a class="' + cls + '">' + pIndex + '</a>';
                    }

                }
            }
            return str;
        }
    });
    return VsOnePagebar;
});