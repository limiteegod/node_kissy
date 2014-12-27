var Util = new function(){};



Util.getOverlay = function(name,url,width,height,item)
{

    var data={
        width:width,
        headerContent:name,
        bodyContent:'<iframe height="'+height+'px" width="'+width+'px" frameborder="0" name="popupIframe"  src="'+url+'"></iframe>',
        mask:{
            duration:.3,
            effect:'fade',
            easing:'backOut'
        },
        align:{
            node:null,
            points:['tc','tc']
        },
        effect:{
            duration:.3,
                easing:'easeOutStrong',
                target:item
        }
    }
    return data;

}
