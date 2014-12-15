function TitlePage(app){

    var Settings={
        title:"HOME",
        logo:{
            size: 1/4,
            topIndent: 1/6.5
        },
        text:{
            font:1/26,
            height:1/6,
            width:1/2
        },
        button:{
            height:1/18,
            width:1/6,
            font:1/65
        }
    };

    var Application=app;

    var pageTop=0;
    var pageLeft=0;

    this.getTitle=function(){
        return Settings.title;
    }

    this.getLoadingTime=function(){
        return 0;
    }

    this.setDimensions=function(width,height){
        Service.setDimensions(body,width,height);

        if(width/height<1280/780) {
            body.style.width=""+height*1280/780+"px";
        }

        var logoWidth=262*((width+height)/2*Settings.logo.size)/238;
        var logoHeight=(width+height)/2*Settings.logo.size;

        var logoTop=pageTop+height*Settings.logo.topIndent;
        var logoLeft=(width-logoWidth)/2;

        Service.setDimensions(logo,logoWidth,logoHeight);
        Service.setIndent(logo,logoLeft,logoTop);

        text.style.fontSize=""+(width+height)/2*Settings.text.font+"px";
        var textHeight=height*Settings.text.height;
        var textWidth=width*Settings.text.width;

        Service.setDimensions(text,textWidth,textHeight);

        var textTop=logoTop+logoHeight+10;
        var textLeft=(width-textWidth)/2;

        Service.setIndent(text,textLeft,textTop);

        var buttonWidth=width*Settings.button.width;
        var buttonHeight=height*Settings.button.height;

        var buttonTop=textTop+textHeight+10;
        var buttonLeft=(width-buttonWidth)/2;

        Service.setDimensions(portfolioButton,buttonWidth,buttonHeight);
        Service.setIndent(portfolioButton,buttonLeft,buttonTop);

        portfolioButton.style.fontSize=""+(width+height)/2*Settings.button.font+"px";
    }

    this.getPage=function(){
        return body;
    }

    var body=Service.getElement("div","titleDiv","titlepage");

    var logo=Service.getElement("div","logoDiv","titlelogo");

    body.appendChild(logo);

    var text = Service.getElement("span","titleText","titletext");
    text.innerHTML="Lorem ipsum dolor sit amet,<br> consectetur adipisicing";

    body.appendChild(text);

    var portfolioButton=Service.getElement("div","portfolioButton","applicationButton");
    portfolioButton.innerHTML="PORTFOLIO";
    portfolioButton.pageId=1;

    portfolioButton.addEventListener("click",function(){
       app.navigate(1,1);
    });

    body.appendChild(portfolioButton);


}
