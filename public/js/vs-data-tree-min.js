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
            value:20
        },
        icoHeight:{
            value:20
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
            self.set("height", self.container.height());
            self.container.html("");
            var contentDiv = '<div style="position: absolute;left: 0px;top: 0px;padding: 0px;width: ' + self.get("width") + 'px;height:' + self.get("height") + 'px;"></div>';
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
        _getCtrPath:function(hasChildren, expanded)
        {
            var self = this;
            var ctlPath;
            if(hasChildren > 0 && expanded == 0)
            {
                ctlPath = 'img/vs_tree_parent_control_button.png';
            }
            else
            {
                ctlPath = 'img/vs_tree_child_control_button.png';
            }
            return CurSite.getAbsolutePath(ctlPath);
        },
        _getIcoPath:function(hasChildren)
        {
            var self = this;
            var ico;
            if(hasChildren)
            {
                ico = 'img/vs_tree_parent_node.png';
            }
            else
            {
                ico = 'img/vs_list_ico.png';
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
            var rowStr = '<div parent="' + data.parent + '" expanded="0" hasChildren="' + data.hasChildren + '" level="' + level + '" id="' + data.id + '" class="clearfix"" style="padding-left:' + margin_left + 'px">';
            //control button
            var margin_top = 4;
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
            item.children('div[col="-1"]').each(function(cItem){
                cItem.on("click", function(){
                    var cNode = Node.one(this);
                    var id = cNode.attr("dataid");
                    self.expand(id);
                });
            });

            item.children('div[col="1"]').each(function(cItem){
                cItem.on("click", function(){
                    var cNode = Node.one(this);
                    var id = cNode.attr("dataid");
                    self.setSelected(id);
                });
            });
        },
        setSelected:function(id)
        {
            var self = this;
            var selected = self.get("selected");
            if(selected == id)
                return;
            if(selected)
            {
                var srcNode = self.contentDiv.one('#' + selected).one('div[col="1"]');
                srcNode.css("background", "none");
            }
            if(id)
            {
                var selector = '#' + id;
                var tNode = self.contentDiv.one(selector).one('div[col="1"]');
                tNode.css("background", "#DDDDDD");
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
            var hasChildren = parseInt(cNode.attr("hasChildren"));
            var expanded = parseInt(cNode.attr("expanded"));
            if(hasChildren > 0)
            {
                if(expanded <= 0)
                {
                    var level = parseInt(cNode.attr("level")) + 1;
                    self.getChildren(id, function(err, data){
                        nodeData.children = data;
                        for(var key in data)
                        {
                            self.nodeDataList[data[key].id] = data[key];
                            var rowStr = self._getRowHtml(data[key], level);
                            var newNode = Node.one(rowStr);
                            self._setNodeActionListener(newNode);
                            newNode.insertAfter(cNode);
                        }
                    });
                    cNode.attr("expanded", 1);
                    cNode.one('div[col="-1"]').one('img').attr("src", self._getCtrPath(1, 1));
                }
                else    //收起节点
                {
                    self._removeChildren(id);
                    cNode.attr("expanded", 0);
                    cNode.one('div[col="-1"]').one('img').attr("src", self._getCtrPath(1, 0));
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
            self.contentDiv.all('div[parent="' + id + '"]').remove();
        }
    });
    return VsDataTree;
});