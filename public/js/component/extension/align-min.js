/*
Copyright 2013, KISSY v1.42
MIT Licensed
build time: Dec 10 01:46
*/
KISSY.add("component/extension/align",["node"],function(k,u){function m(a){var c=a.ownerDocument.body,d=j(a).css("position");if(!("fixed"===d||"absolute"===d))return"html"===a.nodeName.toLowerCase()?null:a.parentNode;for(a=a.parentNode;a&&a!==c;a=a.parentNode)if(d=j(a).css("position"),"static"!==d)return a;return null}function n(a){var c,d,b={left:0,right:Infinity,top:0,bottom:Infinity},f;f=a.ownerDocument;d=j(f).getWindow();c=f.body;for(f=f.documentElement;a=m(a);)if((!v.ie||0!==a.clientWidth)&&
a!==c&&a!==f&&"visible"!==j(a).css("overflow")){var h=j(a).offset();h.left+=a.clientLeft;h.top+=a.clientTop;b.top=Math.max(b.top,h.top);b.right=Math.min(b.right,h.left+a.clientWidth);b.bottom=Math.min(b.bottom,h.top+a.clientHeight);b.left=Math.max(b.left,h.left)}f=d.scrollLeft();a=d.scrollTop();b.left=Math.max(b.left,f);b.top=Math.max(b.top,a);c=d.width();d=d.height();b.right=Math.min(b.right,f+c);b.bottom=Math.min(b.bottom,a+d);return 0<=b.top&&0<=b.left&&b.bottom>b.top&&b.right>b.left?b:null}function o(a,
c,d,b){var f,h;f=a.left;h=a.top;c=p(c,d[0]);a=p(a,d[1]);a=[a.left-c.left,a.top-c.top];return{left:f-a[0]+ +b[0],top:h-a[1]+ +b[1]}}function q(a,c,d){var b=[];k.each(a,function(a){b.push(a.replace(c,function(a){return d[a]}))});return b}function l(){}function r(a){var c,d;c=a[0];k.isWindow(c)?(a=j(c).getWindow(),c={left:a.scrollLeft(),top:a.scrollTop()},d=a.width(),a=a.height()):(c=a.offset(),d=a.outerWidth(),a=a.outerHeight());c.width=d;c.height=a;return c}function p(a,c){var d=c.charAt(0),b=c.charAt(1),
f=a.width,h=a.height,e,g;e=a.left;g=a.top;"c"===d?g+=h/2:"b"===d&&(g+=h);"c"===b?e+=f/2:"r"===b&&(e+=f);return{left:e,top:g}}function w(a){a.target===this&&a.newVal&&this._onSetAlign(this.get("align"))}function s(){this.get("visible")&&this._onSetAlign(this.get("align"))}var t=u("node"),x=k.Env.host,j=t.all,v=k.UA;l.__getOffsetParent=m;l.__getVisibleRectForElement=n;l.ATTRS={align:{value:{}}};l.prototype={__bindUI:function(){this.on("beforeVisibleChange",w,this);this.$el.getWindow().on("resize",s,
this)},_onSetAlign:function(a){a&&a.points&&this.align(a.node,a.points,a.offset,a.overflow)},align:function(a,c,d,b){var a=t.one(a||x),d=d&&[].concat(d)||[0,0],b=b||{},f=this.$el,h=0,e=n(f[0]),g=r(f),j=r(a),a=o(g,j,c,d),i=k.merge(g,a);if(e&&(b.adjustX||b.adjustY)){if(a.left<e.left||a.left+g.width>e.right)h=1,c=q(c,/[lr]/ig,{l:"r",r:"l"}),d[0]=-d[0];if(a.top<e.top||a.top+g.height>e.bottom)h=1,c=q(c,/[tb]/ig,{t:"b",b:"t"}),d[1]=-d[1];h&&(a=o(g,j,c,d),k.mix(i,a));c=b.adjustX&&(a.left<e.left||a.left+
g.width>e.right);b=b.adjustY&&(a.top<e.top||a.top+g.height>e.bottom);if(c||b)a=k.clone(a),i={width:g.width,height:g.height},c&&a.left<e.left&&(a.left=e.left),c&&a.left+i.width>e.right&&(a.left=Math.max(e.right-i.width,e.left)),b&&a.top<e.top&&(a.top=e.top),b&&a.top+i.height>e.bottom&&(a.top=Math.max(e.bottom-i.height,e.top)),i=k.mix(a,i)}this.set({x:i.left,y:i.top},{force:1});i.width!==g.width&&this.set("width",f.width()+i.width-g.width);i.height!==g.height&&this.set("height",f.height()+i.height-
g.height);return this},center:function(a){this.set("align",{node:a,points:["cc","cc"],offset:[0,0]});return this},__destructor:function(){this.$el&&this.$el.getWindow().detach("resize",s,this)}};return l});