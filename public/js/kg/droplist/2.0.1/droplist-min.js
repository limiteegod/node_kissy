/*!build time : 2014-09-26 4:21:54 PM*/
KISSY.add("kg/droplist/2.0.1/datalist",function(a,b,c,d){function e(){this._init.apply(this,arguments)}var f="__id",g="__index",h={dataSource:null};a.augment(e,a.EventTarget,{_init:function(b){b=this.cfg=a.merge(h,b),this.cache={},this._dataMap={},this._initSelected=b.selected,this.mulSelect=b.mulSelect},getDataByValue:function(b){if(this.getDataSource()){var c;return a.each(this.getDataSource(),function(a){return a.value===b?(c=a,!1):void 0}),c}},getClientId:function(a){return a&&a[f]},getDataByText:function(b){if(this.getDataSource()){var c;return a.each(this.getDataSource(),function(a){return a.text===b?(c=a,!1):void 0}),c}},select:function(b){var c=b;a.isPlainObject(b)||void 0==b||(c=this._dataMap[b]),this._selectByData(c)},_selectByData:function(b){if(this.mulSelect){if(this.selected&&b&&a.inArray(b,this.selected))return}else if(this.selected&&b&&b.value===this.selected.value)return;this.fire("selected",{data:b})},saveData:function(a){this.mulSelect?(this.selected=this.selected||[],this.selected.push(a)):this.selected=a},delData:function(a){for(var b=0;b<this.selected.length;b++)if(this.selected[b].__id==a){this.selected.splice(b,1);break}},getSelectedData:function(){return this.selected||this._initSelected},setDataSource:function(a,b){this.cache[a]=b,this._list=b},getDataSource:function(a){return a=a||"",this.cache[a]},dataFactory:function(b){var c=this,d=c.getSelectedData(),e=[],h=this._dataMap;return c.selected=void 0,a.each(b,function(b,i){var j=a.guid();if(b[f]=j,b[g]=i,h[j]=b,e.push(b),c.cfg.mulSelect){if(d&&d.length)for(var k=0;k<d.length;k++)if(d[k]&&b.value==d[k].value){c.select(j);break}}else d&&b.value==d.value&&c.select(j)}),delete c._initSelected,e}}),d.exports=e}),KISSY.add("kg/droplist/2.0.1/viewscroll",["dom","event","overlay","kg/lap/0.0.1/"],function(a,b,c,d){function e(){this._init.apply(this,arguments)}var f=b("dom"),g=b("event"),h=b("overlay"),i=b("kg/lap/0.0.1/"),j="",k={selectedCls:"selected",focusCls:"focus",prefixId:"dropmenu-",prefixCls:"dropmenu-",menuItem:'<li class="{prefixCls}item" id="{prefixId}item{__id}" data-id="{__id}">{text}</li>',empty:"\u641c\u7d22\u65e0\u7ed3\u679c"},l={format:function(a){return a}};a.augment(e,a.EventTarget,{_init:function(b,c){var d=this,e=a.merge(l,c),g=new h({prefixCls:k.prefixCls});d.layer=g,d.elList=f.create("<ul></ul>"),d.datalist=b,d.format=e.format,d.mulSelect=e.mulSelect,g.on("afterRenderUI",function(){d._UIRender()}),this.on("hide",function(){d.focused=void 0})},_UIRender:function(){var b=this,c=b.layer,d=b.elList,e=c.get("el"),f=c.get("contentEl");f.append(d),b._bindList(),b.elWrap=e,b.elWrap.attr("id",k.prefixId+"wrap"+a.guid()),b.fire("UIRender")},emptyRender:function(a){this._list=[],f.html(this.elList,a||k.empty)},render:function(b){var c=this,d=c.lap,e=document.createDocumentFragment();return d&&d.stop(),c.lap?(a.later(function(){c.render(b)},20),!0):(f.html(c.elList,j),d=c.lap=i(b,{duration:30}),c._list=b,d.handle(function(a){var b=c._itemRender(a);b&&e.appendChild(b)}),d.batch(function(){f.append(e,c.elList)}),d.then(function(){f.append(e,c.elList),c.lap=null}),void d.start())},_itemRender:function(b){if(!b)return null;var c=this.format(a.clone(b)),d=a.substitute(k.menuItem,a.merge({prefixId:k.prefixId,prefixCls:k.prefixCls},c)),e=f.create(d),g=this.datalist.getSelectedData();return this.mulSelect?g&&a.inArray(b,g)&&this._selectByElement(e,b):g&&g.value===b.value&&this._selectByElement(e,b),e},_bindList:function(){var a=this,b=a.elList;g.on(b,"click",function(b){var c=b.target,d=k.prefixCls+"item";if(f.hasClass(c,d)||(c=f.parent(c,d)),c){b.stopPropagation();var e=f.attr(c,"data-id");a.fire("itemSelect",{id:e})}})},select:function(a){var b=this.getElement(a);b||(b=a=void 0),this._selectByElement(b,a),this.fire("select",{data:a})},_focus:function(b){var c=this.getElement(b);c||(c=b=void 0),this._setElementClass(c,this.focused,k.focusCls,!0),this.focused=b,this.scrollIntoView(b),this.mulSelect&&this.datalist.selected&&b&&a.inArray(b,this.datalist.selected)||this.fire("focus",{data:b})},_selectByElement:function(a,b){this._setElementClass(a,this.datalist.selected,k.selectedCls),this.focused=b},_setElementClass:function(a,b,c,d){if(b&&!this.mulSelect||d){var e=this.getElement(b);e&&f.removeClass(e,c)}a&&f.addClass(a,c)},focusNext:function(){function b(b){for(var e=d._list.length-b+1;e--;)if(!d.datalist.selected||!a.inArray(d._list[d._list.length-e],d.datalist.selected)){c=d._list[d._list.length-e];break}}var c,d=this,e=this.focused;if(e){var f=0;a.each(this._list,function(a,b){return a.value==e.value?(f=b,!1):void 0}),this.mulSelect?b(f+1):c=this._list[f+1]}else b(0);this._focus(c)},focusPrevious:function(){function b(b){for(b++;b--;)if(!d.datalist.selected||!a.inArray(d._list[b],d.datalist.selected)){c=d._list[b];break}}var c,d=this,e=this.focused;if(e){var f=0;a.each(this._list,function(a,b){return a.value==e.value?(f=b,!1):void 0}),this.mulSelect?b(f-1):c=this._list[f-1]}else b(this._list.length-1);this._focus(c)},selectFocused:function(){this.focused&&this.fire("itemSelect",{id:this.datalist.getClientId(this.focused)})},visible:function(a){var b=this.getVisible(),c=void 0===a?!b:a;b!==c&&(c?(this.layer.show(),this.fire("show")):(this.layer.hide(),this.fire("hide")))},destroy:function(){this.layer.destroy()},getVisible:function(){return this.layer.get("visible")},align:function(a){this.layer.set("align",a)},getElement:function(a){var b=this.datalist.getClientId(a);return b?f.get("#"+k.prefixId+"item"+b,this.elList):void 0},scrollIntoView:function(a){var b=this.getElement(a);f.scrollIntoView(b,this.elWrap)}}),d.exports=e}),KISSY.add("kg/droplist/2.0.1/droplist",["dom","event","ajax","./datalist","./viewscroll"],function(a,b,c,d){function e(){this._init.apply(this,arguments)}var f=b("dom"),g=b("event"),h=b("ajax"),i=b("./datalist"),j=b("./viewscroll"),k="placeholder"in document.createElement("input"),l="",m=function(){},n={hideDelay:100,droplistCls:"",fieldName:"",inputName:"",ariaLabel:"",insertion:document.body,placeholder:"",freedom:!1,customData:void 0,autoMatch:!0,mulSelect:!1,fnDataAdapter:function(a){return a},fnReceive:function(a){return a}},o={wrap:['<div class="droplist {isMultiple} {droplistCls}"><div class="drop-trigger"><i class="caret"></i></div><div class="drop-wrap">',k?void 0:'<label class="drop-placeholder">{placeholder}</label>','<input class="drop-text" type="text" placeholder="{placeholder}" /></div><input class="drop-value" type="hidden" /></div>'].join(l),textCls:"drop-text",valueCls:"drop-value",triggerCls:"drop-trigger",placeholderCls:"drop-placeholder"},p=[9,13,16,17,18,20,27,33,34,35,36,37,38,39,40,45,91,93],q="aria-activedescendant",r={bind:function(a,b){var c=a._view,d=a.elText;f.attr(a.elWrap,{role:"combobox"}),f.attr(d,{role:"textbox"}),f.attr(d,{"aria-autocomplete":"list","aria-haspopup":"true","aria-label":b}),a.on("hide show",function(a){f.attr(d,"aria-expanded","show"===a.type)}),c.on("UIRender",function(){var a=c.elWrap;f.attr(d,{"aria-owns":a[0].id}),c.on("focus",function(b){var d=b.data,e=c.getElement(d);a.attr(q,e?e.id:l)})}),a.on("change",function(){f.attr(c.elWrap,q,l)})}};a.augment(e,a.EventTarget,{_init:function(b){var c=a.merge(n,b);this.cfg=c,c.srcNode&&this._buildWrap(c.srcNode),this._data=new i({selected:c.selectedItem,mulSelect:c.mulSelect}),this._view=new j(this._data,{format:c.format,mulSelect:c.mulSelect}),this._bindControl(),this._timer={hide:null},this._matchMap={}},render:function(){function b(a){var b=c._dataFactory(a);g.setDataSource("",b)}var c=this,d=c.cfg,e=c.elWrap,g=c._data;if(e||(c._buildWrap(),e=c.elWrap,elTrigger=c.elTrigger),!f.parent(e)){var h=d.insertion;a.isFunction(h)?h(e):h.appendChild?h.appendChild(e):a.isString(h)&&(h=f.get(h),h&&h.appendChild&&h.appendChild(e)),d.mulSelect&&elTrigger&&f.remove(elTrigger)}this._bindElement(),r.bind(this,d.ariaLabel);var i=d.dataSource;a.isArray(i)?b(i):a.isString(i)?this._fetch({url:i},function(a){b(a)}):a.isPlainObject(i)?this._fetch(i,function(a){b(a)}):a.isFunction(i)&&i(function(a){b(a)})},doWith:function(a,b,c){var d=this,e=d._grepMethods(a,b,c);d._runWithMatch(e,a,d.getSelectedData())},_grepMethods:function(a,b,c){var d=this,e=d._matchMap[a];e||(e=d._matchMap[a]={match:[],mismatch:[]});var f=d._mergeMethods(e.match,b),g=d._mergeMethods(e.mismatch,c);return{match:f,mismatch:g}},_mergeMethods:function(b,c){var d=[];return a.each(a.makeArray(c),function(c){a.inArray(c,b)||(b.push(c),d.push(c))}),d},removeMatch:function(a){var b=this._matchMap[a];b&&(b.match.length=0,b.mismatch.length=0)},selectByValue:function(a){var b=this._data,c=b.getDataByValue(a);void 0!==a&&!c&&this.cfg.freedom&&(c=this.getCustomData()),b.select(c)},selectByData:function(a){var b=this._data,c=a?b.getDataByValue(a.value):void 0;void 0!==a&&!c&&this.cfg.freedom&&(c=a),b.select(c)},getSelectedData:function(){return this._data.getSelectedData()},getCustomData:function(){var a=this.cfg.customData||{},b={};return b.text=void 0!==a.text?a.text:this.elText.value,b.value=void 0!==a.value?a.value:b.text,b},hide:function(){var a=this._view;a&&a.visible(!1),this.fire("hide")},show:function(){var a=this._view,b=this.elWrap;a.align({node:b,points:["bl","tl"],offset:[0,0]}),a.visible(!0),this.fire("show")},destroy:function(){this.fire("destroy"),f.remove(this.elWrap),this._view.destroy(),this._view=null,this._data=null},_dataFactory:function(a){var b=this.cfg.fnDataAdapter(a);return this._data.dataFactory(b)},_bindControl:function(){var b=this,c=this._view,d=this._data;c.on("UIRender",function(){var a=c.elWrap;f.unselectable(a),g.on(a,"mousedown",function(a){a.preventDefault()})}),c.on("itemSelect",function(a){b._data.select(a.id)}),c.on("focus",function(a){b.cfg.mulSelect?b.elText.value=a.data?a.data.text:"":b._fillText(a.data||b.getSelectedData())}),d.on("selected",function(a){c.select(a.data),b._fillText(a.data),d.saveData(a.data),b.fire("change",{data:a.data,value:b.getValue()}),b.hide()}),b.on("change",function(c){var d=b._matchMap;a.each(d,function(a,d){b._runWithMatch(a,d,c.data)})})},_buildWrap:function(b){var c=this.cfg;if(b=f.get(b),!b){var d=a.substitute(o.wrap,{isMultiple:c.mulSelect?"droplist-multiple":"",droplistCls:c.droplistCls?c.droplistCls:"",placeholder:c.placeholder});b=f.create(d)}var e=f.get("."+o.triggerCls,b),g=f.get("."+o.textCls,b),h=f.get("."+o.valueCls,b),i=f.get("."+o.placeholderCls,b),j=c.fieldName,k=c.inputName||j+"-text";j&&(f.attr(h,"name",j),f.attr(g,"name",k)),this.elPlaceholder=i,this.elWrap=b,this.elValue=h,this.elText=g,this.elTrigger=e},_bindElement:function(){{var b=this,c=(this.cfg,this.elText),d=this.elValue;b._view,b._data}g.on(this.elTrigger,"click",function(){g.fire(c,"focus")}),f.unselectable(this.elTrigger),d&&b.on("change",function(){b.getSelectedData();d.value=b.getValue()});var e=this.elPlaceholder;!k&&g.on(c,"valuechange",function(){var b=f.val(c);""===a.trim(b)?f.show(e):f.hide(e)}),b._bindInput(c)},_bindInput:function(b){var c=this,d=this.elText,e=c.cfg,f=c._data,h=c._view;g.on(b,"click",function(){var a=c._view.getVisible();a||g.fire(d,"focus")}),g.on(b,"focus",function(){var a=c._view.getVisible();c._stopHideTimer(),a?c.hide():(h.render(f.getDataSource()),c.show())}),g.on(b,"blur",function(){var d,f=b.value;e.autoMatch&&(d=c._autoMatchByText(f),d&&c.getSelectedData()&&a.inArray(d,c.getSelectedData())&&(d=void 0)),!e.mulSelect&&void 0===d&&e.freedom&&f!==l&&(d=c.getCustomData()),d?c._data.select(d):(c._fillText(null),c.fire("change",{data:void 0,value:c.getValue()})),c._latencyHide()}),g.on(b,"keydown",function(a){var b=a.keyCode;return 9==b||27==b?void c.hide():38==b||40==b?(a.preventDefault(),c._view.getVisible()?void(40===b?h.focusNext():h.focusPrevious()):(h.render(f.getDataSource()),void c.show())):void(13==b&&(a.preventDefault(),h.selectFocused()))}),g.on(b,"keyup",function(d){function g(b){if(!e.mulSelect){var d=c.getSelectedData();f.selected=void 0,void 0!==d&&c.fire("change",{data:void 0,value:c.getValue()})}if(h.focused=void 0,0===b.length){var g="";a.isFunction(e.emptyFormat)?g=e.emptyFormat(j):a.isString(e.emptyFormat)&&(g=e.emptyFormat),h.emptyRender(g)}else h.render(b);c.show()}var i=d.keyCode;if(!(a.inArray(i,p)||i>=112&&123>=i)){var j=b.value;return j?void(e.remote?c._remoteFilter(j,g):c._syncFilter(j,g)):(h.render(f.getDataSource()),void c.show())}})},_fetch:function(b,c){var d=this,e=a.now();if(d._lastModify=e,!b.url)throw new Error("there is no data");var f=a.merge({type:"GET",dataType:"json",error:function(){alert("\u8bf7\u6c42\u6570\u636e\u53d1\u751f\u9519\u8bef\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\u3002")}},b),g=d.cfg.fnReceive,i=b.success||m;f.success=function(a){if(!(e<d._lastModify)){var b=g(a);b&&(i(b),b.result?c&&c(b.list):alert(b.msg))}},h(f)},_runWithMatch:function(b,c,d){d||(d={}),c==d.value?a.each(b.match,function(a){a&&a({data:d})}):a.each(b.mismatch,function(a){a&&a({data:d})})},_autoMatchByText:function(a){var b=this._data,c=b.getDataByText(a);return c},_fillText:function(a){{var b=this.elText;this.elPlaceholder}this.cfg.mulSelect?(a&&this._addChosen(a),b.value=l):b.value=a?a.text:l},_addChosen:function(b){var c=this.elText,d='<div class="search-choice"><span>{text}</span><a class="search-choice-close" data-id="{__id}"></a></div>',e=a.substitute(d,b);cOption=f.create(e),f.insertBefore(cOption,c),this._bindDelChosen(cOption),this._autoMatchInputWidth()},_bindDelChosen:function(a){var b=this,c=f.get("a",a);g.on(c,"click",function(c){c.preventDefault(),f.remove(a);var d=f.attr(this,"data-id");b._data.delData(d),b._autoMatchInputWidth(),b.fire("change",{data:void 0,value:b.getValue()})})},_autoMatchInputWidth:function(){var a=this.elText,b=f.siblings(a),c=f.width(f.parent(a)),d=0;if(b.length){for(var e=0;e<b.length;e++){var g=f.outerWidth(b[e])+parseInt(f.css(b[e],"marginLeft"))+parseInt(f.css(b[e],"marginRight"));d+=g,d>c&&(d=g)}f.css(a,"width",50>c-d-3?"100%":c-d-3),f.removeAttr(a,"placeholder"),!k&&f.hide(elPlaceholder)}else f.css(a,"width","100%"),f.attr(a,"placeholder",this.cfg.placeholder),!k&&f.show(elPlaceholder)},_remoteFilter:function(b,c){var d=this,e=d.cfg,f=e.remote||{};f.data=a.merge(f.data,{text:b});var g=f;d._fetch(g,function(a){var e=d._dataFactory(a);d._data.setDataSource(b,e),c&&c(e)})},_syncFilter:function(b,c){var d=this,e=d._data,f=[];a.each(e.getDataSource(),function(a){-1!==a.text.indexOf(b)&&f.push(a)}),c&&c(f)},_stopHideTimer:function(){var a=this._timer;a.hide&&(a.hide.cancel(),a.hide=null)},_latencyHide:function(){var b=this,c=b._timer;b._stopHideTimer(),c.hide=a.later(function(){b.hide()},b.cfg.hideDelay)},getValue:function(){var a=this.getSelectedData();if(this.cfg.mulSelect){var b=[];if(a&&a.length)for(var c=0;c<a.length;c++)b.push(a[c].value);return b.join(",")}return a?a.value:""}}),d.exports=e});