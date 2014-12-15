
function setTexts(pics){
    for(var i in pics){
        pics[i].setTitle("Gallery Post Example");
        if(i%2==0)  pics[i].setText("A man who works with his hands is a laborer; a man who works with his hands and his brain is a craftsman; but a sman who works with his hands and his brain and his heart is an artist.");
        else            pics[i].setText("This is Photoshop's version of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec <p> Sagittis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet mauris. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.");
    }
}

PostView={

    Settings:{
        paneSize:1/2,
        paneIndent:1/3,

        closeButton:{
            Size: 1/100,
            Indent: 1/100,
            Font: 1/50
        },
        sketch:{
            size: 1/10
        }
    },

    body:Service.getElement("div","picView","picturePostView"),
    sidePane:Service.getElement("div","picViewControls","picturePostPane"),
    page: null,
    infoDiv:Service.getElement("div","sidePaneInfo","sidePaneInfoLayer"),
    closeButton:Service.getElement("div","","sidePaneCloseButton"),
    picture:null,
    sketches:null,
    sketchesDiv:Service.getElement("div","sidePaneSketches","sidePaneSketchLayer"),

    view:function(picture){
        if(!picture.getUrl()) return;

        PostView.page.getParent().setRadioButtonsColor("white");

        PostView.picture=picture;

        PostView.infoDiv.appendChild(picture.title);
        PostView.infoDiv.appendChild(picture.text);

        PostView.body.style.backgroundImage="url("+picture.getUrl()+")";
        PostView.page.getPage().appendChild(PostView.body);

        //set sketches array
        if(picture.page==0)  PostView.sketches=PostView.page.getPage1Photos();
        else PostView.sketches=PostView.page.getPage2Photos();

        var line=0;
        var pos=0;

        for(var i in PostView.sketches){
            var sketch=Service.getElement("div","sketch"+i,"sketch");
            if (picture.url!=PostView.sketches[i].getUrl()) sketch.style.backgroundImage="linear-gradient(rgba(0,0,0,0.2),rgba(0, 0, 0, 0.8)),url("+PostView.sketches[i].getUrl()+")";
            else sketch.style.backgroundImage="url("+PostView.sketches[i].getUrl()+")";

            sketch.picture=PostView.sketches[i];

            Service.setIndent(sketch,(60+5)*pos,(30+5)*line);

            PostView.sketchesDiv.appendChild(sketch);

            pos++;

            if(i%3==2) {
                line++;
                pos=0;
            }

            sketch.addEventListener("click",function(){
               PostView.sketchesDiv.innerHTML="";
               PostView.close();
               PostView.view(this.picture);
            });
        }

    },

    adjust:function(width,height){
//        set body
        Service.setDimensions(PostView.body,width,height);
//        set side pane
        Service.setDimensions(PostView.sidePane,width*PostView.Settings.paneSize,height);
        Service.setIndent(PostView.sidePane,width-width*PostView.Settings.paneIndent,0);
//        set text
        Service.setDimensions(PostView.infoDiv,width*PostView.Settings.paneSize/2,height/2);
        Service.setIndent(PostView.infoDiv,width-width*PostView.Settings.paneSize/2-(width/20),height/15);
//        set sketches container
        Service.setDimensions(PostView.sketchesDiv,width*PostView.Settings.paneSize/2,height/5);
        Service.setIndent(PostView.sketchesDiv,width-width*PostView.Settings.paneSize/2-(width/20)+10,height/15+height/2+10);
//        set close button
        Service.setDimensions(PostView.closeButton,width*PostView.Settings.closeButton.Size,height*PostView.Settings.closeButton.Size);
        Service.setIndent(PostView.closeButton,width*PostView.Settings.paneSize/2,5);
        Service.setFontSize(PostView.closeButton,(width+height)/2*PostView.Settings.closeButton.Font);
    },

    init:function(p){
        PostView.page=p;

        PostView.body.appendChild(PostView.sidePane);

        PostView.body.appendChild(PostView.infoDiv);
        PostView.body.appendChild(PostView.sketchesDiv);



        PostView.closeButton.innerHTML="&#10060";

        PostView.closeButton.addEventListener("click",PostView.close);

        PostView.sidePane.appendChild(PostView.closeButton);
    },

    close:function(){

        PostView.picture.infoDiv.appendChild(PostView.picture.title);
        PostView.picture.infoDiv.appendChild(PostView.picture.text);

        PostView.page.getPage().removeChild(PostView.body);
    }

}

//all arguments are in rate to actual screen size
function Picture(div,x,y,width,height,url, pg){

    Settings={
        titleFont:1/30,
        textFont:1/70
    }

    this.get=function(){
        return this.div;
    }

    this.getX=function(){
        return this.x;
    }

    this.getY=function(){
        return this.y;
    }

    this.getWidth=function(){
        return this.width;
    }

    this.getHeight=function(){
        return this.height;
    }

    this.getUrl=function(){
        return this.url;
    }


    this.setAttributes=function(w, h, hLay, vLay){
            var photoWidth=w*this.width;
            var photoHeight=h*this.height;

            var photoX=hLay*w*this.x;
            var photoY=vLay*h*this.y;

            Service.setDimensions(this.div,photoWidth,photoHeight);
            Service.setIndent(this.div,photoX,photoY);

            Service.setFontSize(me.title,(w+h)/2*Settings.titleFont);
            Service.setFontSize(me.text,(w+h)/2*Settings.textFont);
    }

    this.setTitle=function(title){
        this.title.innerHTML=title;
    }

    this.setText=function(text){
        this.text.innerHTML=text;
    }

    this.page=pg;

    this.div=div;

    this.infoDiv=Service.getElement("div","","infoLayer");

    this.title=Service.getElement("div","","picTitle");
    this.text=Service.getElement("div","","picText");

    this.infoDiv.appendChild(this.title);
    this.infoDiv.appendChild(document.createElement("br"));
    this.infoDiv.appendChild(this.text);

    this.div.appendChild(this.infoDiv);
    this.x=x;
    this.y=y;
    this.width=width;
    this.height=height;
    this.url=url;

    var me=this;

    this.div.style.backgroundImage='url('+url+')';

    this.div.addEventListener("click",function(){
        PostView.view(me);
    });
}


function PortfolioPage(app){

    var Settings={
        title:"PORTFOLIO",
        titleFont:1/30,
        loadingTime:3000,
        layout:{
            horizontal:1/4,
            vertical:1/3
        },
        catButtons:{
            top: 1/3,
            right: 1/5,
            font: 1/35,
            height: 1/10,
            width:1/3.8
        },
        navButtons:{

        }
    };

    var Application=app;

    var me=this;

    var activePhotoPage=0;

    var pageTop=0;
    var pageLeft=0;

    var portfolioAnimationCssNode=document.createElement("style");
    portfolioAnimationCssNode.setAttribute('type','text/css');
    document.getElementsByTagName("head")[0].appendChild(portfolioAnimationCssNode);

    this.getParent=function(){
        return Application;
    }

    function setAnimation(){
        portfolioAnimationCssNode.innerHTML="\n"+Service.getMovementAnimation("firstPageSlideRight",0,0,-app.getWidth(),0);
        portfolioAnimationCssNode.innerHTML+="\n"+Service.getMovementAnimation("secondPageSlideRight",app.getWidth(),0,0,0);

        portfolioAnimationCssNode.innerHTML+="\n"+Service.getMovementAnimation("firstPageSlideLeft",-app.getWidth(),0,0,0);
        portfolioAnimationCssNode.innerHTML+="\n"+Service.getMovementAnimation("secondPageSlideLeft",0,0,app.getWidth(),0);
    }

    this.getTitle=function(){
        return Settings.title;
    }

    this.getPage1Photos=function(){
        return photos1;
    }

    this.getPage2Photos=function(){
        return photos2;
    }

    //kinda loading function, that performs all necessary operations
    this.getLoadingTime=function(){
        var time=Settings.loadingTime;
        Settings.loadingTime=0;
        return time;
    }

    this.setDimensions=function(width,height){

//        first page size
        Service.setDimensions(pageOne,width,height);

//        second page size and shift
        Service.setDimensions(pageTwo,width,height);

        if(activePhotoPage==0){
            Service.setIndent(pageOne,0,0);
            Service.setIndent(pageTwo,width,0);
        }else if(activePhotoPage==1){
            Service.setIndent(pageOne,-width,0);
            Service.setIndent(pageTwo,0,0);
        }

//        setting animation
        setAnimation();
        Service.setAnimation(pageOne,"");
        Service.setAnimation(pageTwo,"");
//        pictures
        for(var i in photos1){
            photos1[i].setAttributes(width,height,Settings.layout.horizontal,Settings.layout.vertical);
            pageOne.appendChild(photos1[i].get());
        }

        for(var i in photos2){
            photos2[i].setAttributes(width,height,Settings.layout.horizontal,Settings.layout.vertical);
            pageTwo.appendChild(photos2[i].get());
        }

//        control block
        controlBlock.setAttributes(width,height,Settings.layout.horizontal,Settings.layout.vertical);

        Service.setFontSize(pageTitle,(width+height)/2*Settings.titleFont);

//        category buttons
        var controlBlockWidth=width*controlBlock.width;
        var controlBlockHeight=height*controlBlock.height;

        var lastCatBut;

        for(var i in catButtons){
            var catButWidth=controlBlockWidth*Settings.catButtons.width;
            var catButHeight=controlBlockHeight*Settings.catButtons.height;

            Service.setDimensions(catButtons[i],catButWidth,catButHeight);

            var catButX=controlBlockWidth/2-(catButtons.length*catButWidth/2)+i*(catButWidth+7);

            Service.setX(catButtons[i],catButX);
            Service.setFontSize(catButtons[i],(controlBlockWidth+controlBlockHeight)/2*Settings.catButtons.font);

            lastCatBut=controlBlockWidth-(catButX+catButWidth);

            // PicView
            PostView.adjust(width,height);
        }

//        navigation buttons
        var navButWidth=controlBlockWidth*Settings.catButtons.width;
        var navButHeight=controlBlockHeight*Settings.catButtons.height;

        var nextButWidth;
        var backButWidth;

        if(activePhotoPage==0) {
            nextButWidth=navButWidth;
            backButWidth=navButWidth/2;
        }else{
            nextButWidth=navButWidth/2;
            backButWidth=navButWidth;
        }

        Service.setDimensions(nextButton,nextButWidth,navButHeight);
        Service.setDimensions(backButton,backButWidth,navButHeight);

        var butY=controlBlockHeight/1.4;

        var backButX=controlBlockWidth-nextButWidth-backButWidth-lastCatBut;
        var nextButX=controlBlockWidth-nextButWidth-lastCatBut;

        Service.setIndent(nextButton,nextButX,butY);
        Service.setIndent(backButton,backButX,butY);

        Service.setFontSize(nextButton,(controlBlockWidth+controlBlockHeight)/2*Settings.catButtons.font);
        Service.setFontSize(backButton,(controlBlockWidth+controlBlockHeight)/2*Settings.catButtons.font);


    }

    this.getPage=function(){
        return body;
    }

    var body=Service.getElement("div","portfolioDiv","portfolioPage");


    var pageOne=Service.getElement("div","portPage1","portfolioPageHolder");
    body.appendChild(pageOne);

    var photos1 = new Array();

    photos1.push(new Picture(Service.getElement("div","trioPic","picture"),0,0,1/4,1/3,"resources/img/trio.jpg",0));
        photos1.push(new Picture(Service.getElement("div","nycPic","picture"),1,0,1/4,1/3,"resources/img/nycwoman.jpg",0));
    photos1.push(new Picture(Service.getElement("div","jumpPic","picture"),0,1,2/4,1/3,"resources/img/jumping.jpg",0));
        photos1.push(new Picture(Service.getElement("div","boatPic","picture"),2,0,1/4,2/3,"resources/img/coupleintheboat.jpg",0));
    photos1.push(new Picture(Service.getElement("div","womanPic","picture"),0,2,1/4,1/3,"resources/img/woman.jpg",0));
        photos1.push(new Picture(Service.getElement("div","girlPic","picture"),1,2,2/4,1/3,"resources/img/girl.jpg",0));
    photos1.push(new Picture(Service.getElement("div","surferPic","picture"),3,1,1/4,2/3,"resources/img/surfer.jpg",0));

    setTexts(photos1);

//    Second portfolio page content

    var pageTwo=Service.getElement("div","portPage2","portfolioPageHolder");
    body.appendChild(pageTwo);

    var photos2 = new Array();

    photos2.push(new Picture(Service.getElement("div","trioPic2","picture"),0,0,1/4,1/3,"resources/img/trio.jpg",1));
        photos2.push(new Picture(Service.getElement("div","abovePic","picture"),1,0,1/4,1/3,"resources/img/above.jpg",1));
    photos2.push(new Picture(Service.getElement("div","jumpPic2","picture"),0,1,2/4,1/3,"resources/img/jumping.jpg",1));
        photos2.push(new Picture(Service.getElement("div","beardPic","picture"),2,0,1/4,2/3,"resources/img/beard.jpg",1));
    photos2.push(new Picture(Service.getElement("div","womanPic2","picture"),0,2,1/4,1/3,"resources/img/woman.jpg",1));
        photos2.push(new Picture(Service.getElement("div","photosPic","picture"),1,2,2/4,1/3,"resources/img/polaroids.jpg",1));
    photos2.push(new Picture(Service.getElement("div","surferPic2","picture"),3,1,1/4,2/3,"resources/img/surfer.jpg",1));

    setTexts(photos2);

//    Portfolio control elements
    var controlBlock=new Picture(Service.getElement("div","portControls","portfolioControls"),3,0,1/4,1/3,"");
    controlBlock.get().style.background="#62d6ff";
    controlBlock.get().removeChild(controlBlock.infoDiv);

    var pageTitle=Service.getElement("div","portTitle","portfolioTitle");
    pageTitle.innerHTML=Settings.title;

    controlBlock.get().appendChild(pageTitle);

//    category buttons
    var catButtons=[Service.getElement("div","allBut","portfolioButton"),Service.getElement("div","carsBut","portfolioButton"),Service.getElement("div","fashionBut","portfolioButton")];
    catButtons[0].innerHTML="ALL"; catButtons[1].innerHTML="CARS"; catButtons[2].innerHTML="FASHION";
    catButtons[0].style.background="white";  catButtons[0].style.color=app.getSettings().mainColor;
    for (var i in catButtons) {
        catButtons[i].addEventListener("click",function(){
            for (var j in catButtons) {
                catButtons[j].style.background=app.getSettings().mainColor;
                catButtons[j].style.color="white";
            }
            this.style.background="white";
            this.style.color=app.getSettings().mainColor;
        });
        controlBlock.get().appendChild(catButtons[i]);
    }

//    navigation buttons
    var backButton=Service.getElement("div","portBackBut","portfolioButton");
    backButton.innerHTML="<";

        backButton.addEventListener("click",function(){
            if(activePhotoPage==0) return;

            Service.setAnimation(pageOne,"firstPageSlideLeft 0.5s, 1");
            Service.setAnimation(pageTwo,"secondPageSlideLeft 0.5s, 1");

            backButton.innerHTML="<";
            nextButton.innerHTML="NEXT>";

            activePhotoPage=0;

            setTimeout(app.paint,500);
        });

    controlBlock.get().appendChild(backButton);

    var nextButton=Service.getElement("div","portNextBut","portfolioButton");
    nextButton.innerHTML="NEXT>";

        nextButton.addEventListener("click",function(){
            if(activePhotoPage==1) return;

            Service.setAnimation(pageOne,"firstPageSlideRight 0.5s, 1");
            Service.setAnimation(pageTwo,"secondPageSlideRight 0.5s, 1");

            backButton.innerHTML="BACK";
            nextButton.innerHTML=">";

            activePhotoPage=1;

            setTimeout(app.paint,500);
        });

    controlBlock.get().appendChild(nextButton);

    body.appendChild(controlBlock.get());

//    PostView.container=body;
    PostView.init(this);
}
