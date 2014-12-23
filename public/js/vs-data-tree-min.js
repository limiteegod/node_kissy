KISSY.add("vs-data-tree", ["./node", "./base"], function(S, require) {
    var Node = require("./node");
    var Base = require("./base");
    var Json = require("./json");
    function VsDataTree(container, config) {
        var self = this;
        if (!(self instanceof VsDataTree)) {
            return new VsDataTree(container, config);
        }
        self.container = container = S.one(container);
        if (!container) return;
        VsDataTree.superclass.constructor.call(self, config);
        self._init();
    };

    S.extend(VsDataTree, Base);

    VsDataTree.ATTRS = {
        icoWidth:{
            value:18
        },
        icoHeight:{
            value:18
        },
        rowHeight:{
            value:24
        },
        ico:{
            value:'img/vs_tree_parent_node.png'
        },
        selected:{
            value:null
        },
        getChildren:{
            value:undefined
        }
    };

    S.augment(VsDataTree, {
        _init:function()
        {
            var self = this;
            self.nodeDataList = {};
            self.set("width", self.container.width());
            var contentDiv = '<div style="width: ' + self.get("width") + 'px;"></div>';
            self.contentDiv = Node.one(contentDiv);
            self.container.append(self.contentDiv);
            var data = self.get("data");
            for(var key in data)
            {
                self.nodeDataList[data[key].id] = data[key];
                self.contentDiv.append(self._getRowHtml(data[key], 0));
            }
            var selected = self.get("selected");
            if(selected)
            {
                self.setSelected(selected);
            }
            self._setActionListener(self.contentDiv);
        },
        _getCtrPath:function(hasChildren, expanded,lever)
        {
            var self = this;
            var ctlPath;
            if(hasChildren > 0 && expanded == 0)
            {
                //ctlPath = 'img/menu-arrow-bottom.gif';
                ctlPath = 'img/menu-arrow-null.gif';
            }
            else
            {
               // ctlPath = 'img/menu-arrow-top.gif';
                ctlPath = 'img/menu-arrow-null.gif';
            }
            if(lever){
                ctlPath = 'img/menu-arrow-null.gif';
            }
            return CurSite.getAbsolutePath(ctlPath);
        },
        _getIcoPath:function(hasChildren,lever)
        {
            var self = this;
            var ico;
            if(hasChildren)
            {
                ico = 'img/icon-folder.gif';
            }
            else
            {
                ico = 'img/icon-file.gif';
            }
            if(lever){
                ico = 'img/icon-folder-open.gif';
            }
            return CurSite.getAbsolutePath(ico);
        },

        _getRowHtml:function(data, level)
        {
            var self = this;
            var ctlPath = self._getCtrPath(data.hasChildren, 0), ico = self._getIcoPath(data.hasChildren);
            var icoWidth = self.get("icoWidth");
            var ctlBtWidth = 12;
            var icoHeight = self.get("icoHeight");
            var rowHeight = self.get("rowHeight");
            var width = self.get("width");
            var textWidth = 80;
            var margin_left = level*(ctlBtWidth + 2);
            var rowWidth = textWidth + icoWidth + ctlBtWidth + margin_left;
            var classValue="clearfix";
            if(data.hasChildren==1){
                classValue+=" parent_tree";
            }else{
                classValue+=" son_tree";
                ctlPath=self._getCtrPath(data.hasChildren, 0,1);
            }

            var rowStr = '<div parent="' + data.parent + '" expanded="0" hasClick="0" hasChildren="' + data.hasChildren + '" level="' + level + '" id="' + data.id + '" class="'+classValue+'" style="padding-left:' + margin_left + 'px">';
            //control button
            var margin_top = 3;
            rowStr += '<div dataid="' + data.id + '" col="-1" class="vs_grid_content" style="width:' + ctlBtWidth + 'px;height:' + rowHeight + 'px;margin-top:' + margin_top + 'px;cursor:pointer;">';
            rowStr += '<img src="' + ctlPath + '" width="' + ctlBtWidth + '" height="' + ctlBtWidth + '">';
            rowStr += '</div>';
            //img
            rowStr += '<div col="0" class="vs_grid_content" style="width:' + icoWidth + 'px;height:' + rowHeight + 'px;">';
            rowStr += '<img src="' + ico + '" width="' + icoWidth + '" height="' + icoHeight + '">';
            rowStr += '</div>';
            rowStr += '<div dataid="' + data.id + '" col="1" class="vs_grid_content" style="margin-top:2px;width:' + textWidth + 'px;height:' + (rowHeight - 2) + 'px;">' + data.name + '</div>';
            rowStr += '</div>';
            return rowStr;
        },
        _setActionListener:function(parent)
        {
            var self = this;
            //绑定事件
            parent.children("div").each(function(item){
                self._setNodeActionListener(item);
            });
        },
        _setNodeActionListener:function(item)
        {
            var self = this;

            item.children('div[col="1"]').each(function(cItem){
                cItem.on("click", function(){
                    var cNode = Node.one(this);
                    var id = cNode.attr("dataid");
                    self.setSelected(id);
                });
            });

            item.on("click",function(){
                var cNode = Node.one(this);
                var id = cNode.attr("id");

                self.expand(id);
            });

        },
        setSelected:function(id)
        {
            var self = this;
            var selected = self.get("selected");
            var isParent=self.contentDiv.one('#' + id).attr("hasChildren");
            if(isParent==1){
                return;
            }

            if(selected == id){
                return;
            }
            if(selected)
            {
                self.contentDiv.one('#' + selected).css("background", "#eee");
            }
            if(id)
            {
                var selector = '#' + id;
                self.contentDiv.one(selector).css("background", "#a3cafe");
            }
            self.set("selected", id);
            //触发选择变化事件
            var selectionChange = self.get("selectionChange");
            if(selectionChange)
            {
                selectionChange(self.nodeDataList[selected], self.nodeDataList[id]);
            }
        },
        getSelectedData:function()
        {
            var self = this;
            if(self.get("selected") > -1)
            {
                return self.get("data")[self.get("selected")];
            }
            else
            {
                return null;
            }
        },
        //get children
        getChildren:function(id, backCb)
        {
            var self = this;
            var cb = self.get("getChildren");
            if(cb != undefined)
            {
                cb(id, backCb);
            }
        },
        //expand a node
        expand:function(id)
        {
            var self = this;
            var nodeData = self.nodeDataList[id];
            var cNode = Node.one("#" + id);

            //判断是否点击，处理多次点击情景
            var isClick = parseInt(cNode.attr("hasClick"));
            if(isClick == 1){
                return;
            }
            cNode.attr("hasClick",1);
            var hasChildren = parseInt(cNode.attr("hasChildren"));
            var expanded = parseInt(cNode.attr("expanded"));
            if(hasChildren > 0)
            {
                if(expanded <= 0)
                {

                    var level = parseInt(cNode.attr("level")) + 1;
                    if(self.contentDiv.all('div[parent="' + id + '"]').html()==null){
                        self.getChildren(id, function(err, data){
                            nodeData.children = data;
                            for(var key in data)
                            {
                                self.nodeDataList[data[key].id] = data[key];
                                var rowStr = self._getRowHtml(data[key], level);
                                var newNode = Node.one(rowStr);
                                self._setNodeActionListener(newNode);
                                newNode.css("display", "none");
                                newNode.insertAfter(cNode);
                            }
                            self.contentDiv.all('div[parent="' + id + '"]').slideDown(0.2,null,'swing');
                            cNode.attr("hasClick",0);
                        });
                    }else{
                        self.contentDiv.all('div[parent="' + id + '"]').slideDown(0.2,null,'swing');
                        cNode.attr("hasClick",0);
                    }
                    cNode.attr("expanded", 1);
                    cNode.one('div[col="-1"]').one('img').attr("src", self._getCtrPath(1, 1));
                    cNode.one('div[col="0"]').one('img').attr("src", self._getIcoPath(1, 1));
                }
                else    //收起节点
                {
                    self._removeChildren(id);
                    cNode.attr("expanded", 0);
                    cNode.attr("hasClick",0);
                    cNode.one('div[col="-1"]').one('img').attr("src", self._getCtrPath(1, 0));
                    cNode.one('div[col="0"]').one('img').attr("src", self._getIcoPath(1));
                }
            }

        },
        //删除所有的子节点
        _removeChildren:function(id)
        {
            var self = this;
            if(id == self.get("selected"))
            {
                self.set("selected", null);
            }
            var nodeData = self.nodeDataList[id];
            if(nodeData.children)
            {
                for(var key in nodeData.children)
                {
                    var child = nodeData.children[key];
                    self._removeChildren(child.id);
                }
            }
            self.contentDiv.all('div[parent="' + id + '"]').css("background", "#eee");
            self.contentDiv.all('div[parent="' + id + '"]').slideUp(0.2,null,'swing');
        }
    });
    return VsDataTree;
});