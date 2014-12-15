var Service={
    getElement:function(type,id,clss){
        var element=document.createElement(type);
        element.setAttribute("id",id);
        element.setAttribute("class",clss);
        return element;
    },
    setDimensions:function(element,width,height){
        element.style.width=""+width+"px";
        element.style.height=""+height+"px";
    },
    setIndent:function(element,x,y){
        element.style.left=""+x+"px";
        element.style.top=""+y+"px";
    },
    getMovementAnimation:function(name,x0,y0,x1,y1){
        var animation="@keyframes _aName_{ \
                from{\
                    top:_yStart_px;\
                    left:_xStart_px;\
                }\
                to{\
                    top:_yEnd_px;\
                    left:_xEnd_px;\
                }\
            }\
            @-webkit-keyframes _aName_{\
                from{\
                    top:_yStart_px;\
                    left:_xStart_px;\
                }\
                to{\
                    top:_yEnd_px;\
                    left:_xEnd_px;\
                }\
            }";

        animation=animation.replace(/_xStart_/g,x0);
        animation=animation.replace(/_yStart_/g,y0);

        animation=animation.replace(/_xEnd_/g,x1);
        animation=animation.replace(/_yEnd_/g,y1);

        animation=animation.replace(/_aName_/g,name);

        return animation;
    },
    setAnimation:function(object,animation){
        object.style.animation=animation;
        object.style.webkitAnimation=animation;
    },
    setFontSize:function(object,size){
      object.style.fontSize=""+size+"px";
    },
    setX:function(object,x){
        object.style.left=""+x+"px";
    },
    setY:function(object,y){
        object.style.top=""+y+"px";
    }
}