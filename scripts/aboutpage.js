function ProgressBar(text, percentage){

    this.get=function(parent){
        parent.appendChild(holder);
        parent.appendChild(textLayer);
    }

    this.adjust=function(width,height,y,font){
        Service.setDimensions(holder,width,height);
        Service.setDimensions(textLayer,width,height);

        Service.setY(holder,y);
        Service.setY(textLayer,y);

        Service.setFontSize(meter,font);
        Service.setFontSize(textLayer,font);
    }

    this.text=text;
    this.percentage=percentage;

    var holder=Service.getElement("div","","progressbar");
    var meter=Service.getElement("div","","progressMeter");
    meter.style.width=percentage;
    meter.innerHTML=text;
    holder.appendChild(meter);

    var textLayer=Service.getElement("div","","progressbarLayer");
    textLayer.innerHTML=percentage;

}

function AboutPage(app){

    var Settings={
        title:"ABOUT ME",
        pageTitle:{
            height:1/3,
            width:1/4,
            font:1/30
        },
        infoBlock:{
            width:1/3,
            height:1/1.7,
            indent:1/10,
            headerHeight:1/10,
            header:1/40,
            textHeight:1/3,
            text:1/82
        },
        progressBar:{
            height:1/20
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


        Service.setDimensions(pageTitle,width*Settings.pageTitle.width,height*Settings.pageTitle.height);
        Service.setIndent(pageTitle,3*width*Settings.pageTitle.width,0);
        Service.setFontSize(pageTitle,Settings.pageTitle.font*(width+height)/2);

//        infoBlock settings

        var infoBlockWidth=width*Settings.infoBlock.width;
        var infoBlockHeight=height*Settings.infoBlock.height;
        var lastY=0;

        Service.setDimensions(infoBlock,infoBlockWidth,infoBlockHeight);
        Service.setIndent(infoBlock,width*Settings.infoBlock.indent, height*Settings.infoBlock.indent);

        Service.setFontSize(textHeader,Settings.infoBlock.header*(width+height)/2);
        Service.setDimensions(textHeader,infoBlockWidth,infoBlockHeight*Settings.infoBlock.headerHeight);
        lastY+=infoBlockHeight*Settings.infoBlock.headerHeight;


        Service.setFontSize(text,Settings.infoBlock.text*(width+height)/2);
        Service.setY(text,lastY);
        Service.setDimensions(text,infoBlockWidth,infoBlockHeight*Settings.infoBlock.textHeight);
        lastY+=infoBlockHeight*Settings.infoBlock.textHeight;

        Service.setFontSize(skillsHead,Settings.infoBlock.text*(width+height)/2);
        Service.setY(skillsHead,lastY);
        Service.setDimensions(skillsHead,infoBlockWidth/10,Settings.infoBlock.text*(width+height)/2);
        lastY+=(Settings.infoBlock.text*(width+height)/2)/2;

        Service.setIndent(separator,infoBlockWidth/10,lastY);
        Service.setDimensions(separator,9*infoBlockWidth/10,1);
        lastY+=(Settings.infoBlock.text*(width+height)/2)/2+15;

//        Progress bars


        digitalPhotoPB.adjust(infoBlockWidth,infoBlockHeight*Settings.progressBar.height,lastY,Settings.infoBlock.text*(width+height)/2);
        lastY+=infoBlockHeight*Settings.progressBar.height+15;


        analogPhotoPB.adjust(infoBlockWidth,infoBlockHeight*Settings.progressBar.height,lastY,Settings.infoBlock.text*(width+height)/2);
        lastY+=infoBlockHeight*Settings.progressBar.height+15;

        urbexPB.adjust(infoBlockWidth,infoBlockHeight*Settings.progressBar.height,lastY,Settings.infoBlock.text*(width+height)/2);
        lastY+=infoBlockHeight*Settings.progressBar.height+15;


        portraitPB.adjust(infoBlockWidth,infoBlockHeight*Settings.progressBar.height,lastY,Settings.infoBlock.text*(width+height)/2);
        lastY+=infoBlockHeight*Settings.progressBar.height+15;

//        portfolioButton

        var buttonWidth=width*Settings.button.width;
        var buttonHeight=height*Settings.button.height;

        var buttonTop=width*Settings.infoBlock.indent+infoBlockHeight;
        var buttonLeft=width*Settings.infoBlock.indent;

        Service.setDimensions(portfolioButton,buttonWidth,buttonHeight);
        Service.setIndent(portfolioButton,buttonLeft,buttonTop);
        Service.setFontSize(portfolioButton,(width+height)/2*Settings.button.font);
    }

    this.getPage=function(){
        return body;
    }

    var body=Service.getElement("div","aboutDiv","aboutpage");


    var pageTitle=Service.getElement("div","aboutTitle","abouttitle");
    pageTitle.innerHTML=Settings.title;

    body.appendChild(pageTitle);

    var infoBlock=Service.getElement("div","aboutInfoBlock","infoblock");

    body.appendChild(infoBlock);

    var textHeader=Service.getElement("div","aboutTextHeader","infoHeader");
    textHeader.innerHTML="Behind the camera";

    infoBlock.appendChild(textHeader);


    var text=Service.getElement("div","aboutText","infoText");
    text.innerHTML="This is Photoshop's version of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec <p> Sagittis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet mauris. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.";

    infoBlock.appendChild(text);

    var skillsHead=Service.getElement("div","skillsHead","infoText");
    skillsHead.innerHTML="SKILLS";

    infoBlock.appendChild(skillsHead);

    var separator=Service.getElement("div","aboutSeparator","separator");
    separator.innerHTML;

    infoBlock.appendChild(separator);


    var digitalPhotoPB=new ProgressBar("Digital photography","75%");
    digitalPhotoPB.get(infoBlock);

    var analogPhotoPB=new ProgressBar("Analog photography","55%");
    analogPhotoPB.get(infoBlock);


    var urbexPB=new ProgressBar("URBEX","90%");
    urbexPB.get(infoBlock);

    var portraitPB=new ProgressBar("Portrait","70%");
    portraitPB.get(infoBlock);




    var portfolioButton=Service.getElement("div","portfolioButtonAbout","applicationButton");
    portfolioButton.innerHTML="PORTFOLIO";
    portfolioButton.pageId=1;

    portfolioButton.addEventListener("click",function(){
        app.navigate(1,1);
    });

    body.appendChild(portfolioButton);
}
