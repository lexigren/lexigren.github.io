function Form(titleText){

    Settings={
        titleSize:1/5,
        fieldSize:1/15,
        font: 1/72,
        form:{
            width:1/2,
            height:1/2,
            indentL:1/12,
            indentT:1/5
        },
        button:{
            height:1/18,
            width:1/6,
            font:1/65
        }
    };

    this.addField=function(id,value,lines){
        var field;

        if(lines==1){
            field=Service.getElement("input",id,"contactinput");
            field.type="text";
        }else{
            field=Service.getElement("textarea",id,"contactinput");
        }

        field.value=value;

        field.lines=lines;

        fields.push(field);

        form.appendChild(field);
    }

    this.adjust=function(width,height){
        var formWidth=width*Settings.form.width;
        var formHeight=height*Settings.form.height

        Service.setDimensions(form,formWidth,formHeight);
        Service.setIndent(form,width*Settings.form.indentL,height*Settings.form.indentT);

        var lastY=0;

        Service.setDimensions(title,formWidth,Settings.titleSize*formHeight);
        Service.setFontSize(title,(width+height)/2*Settings.font);

        lastY+=Settings.titleSize*formHeight+10;

        for(var i in fields){
            Service.setDimensions(fields[i],formWidth,Settings.fieldSize*formHeight*fields[i].lines);
            Service.setY(fields[i],lastY);
            lastY+=Settings.fieldSize*formHeight*fields[i].lines+15;
        }

        Service.setDimensions(formButton,width*Settings.button.width,height*Settings.button.height);
        Service.setIndent(formButton,formWidth/2-width*Settings.button.width/2,lastY);
        Service.setFontSize(formButton,(width+height)/2*Settings.button.font);
    }

    this.get=function(){
        return form;
    }

    this.titleText=titleText;

    var form=Service.getElement("div","contactForm","formDiv");
    var title=Service.getElement("div","contactFormTitle","formHeader");
    title.innerHTML=titleText;

    form.appendChild(title);

    var formButton = Service.getElement("div","formButton","applicationButton");
    formButton.innerHTML="SUBMIT";

    form.appendChild(formButton);

    var fields=new Array();

}


function ContactPage(app){

    var Settings={
        title:"CONTACT",
        pageTitle:{
            height:1/3,
            width:1/4,
            font:1/30
        }
    };

    var Application=app;

    var pageTop=0;
    var pageLeft=0;

    var map;

    function initializeMap() {
        var mapOptions = {
            center: new google.maps.LatLng(48.4780031, 35.1750952),
            zoom: 18
        }
        map = new google.maps.Map(mapContainer, mapOptions)
    }

    this.getTitle=function(){
        return Settings.title;
    }

    this.getLoadingTime=function(){
        return 0;
    }

    this.setDimensions=function(width,height){
        Service.setDimensions(body,width,height);
        Service.setDimensions(mapContainer,width,height);
        google.maps.event.trigger(map, "resize");

        Service.setDimensions(pageTitle,width*Settings.pageTitle.width,height*Settings.pageTitle.height);
        Service.setIndent(pageTitle,3*width*Settings.pageTitle.width,0);
        Service.setFontSize(pageTitle,Settings.pageTitle.font*(width+height)/2);


        form.adjust(width,height);

//        var buttonWidth=width*Settings.button.width;
//        var buttonHeight=height*Settings.button.height;

//        var buttonTop=textTop+textHeight+10;
//        var buttonLeft=(width-buttonWidth)/2;

//        Service.setDimensions(portfolioButton,buttonWidth,buttonHeight);
//        Service.setIndent(portfolioButton,buttonLeft,buttonTop);

//        portfolioButton.style.fontSize=""+(width+height)/2*Settings.button.font+"px";
    }

    this.getPage=function(){
        return body;
    }

    var body=Service.getElement("div","contactDiv","contactpage");

    var mapContainer=Service.getElement("div","mapDiv","map");

    body.appendChild(mapContainer);

    initializeMap();

    var pageTitle=Service.getElement("div","contactTitle","contacttitle");
    pageTitle.innerHTML=Settings.title;

    body.appendChild(pageTitle);


    var form=new Form("This is great contact section for people to get hold of you. The contact form works pretty slick. It has validation and a great confirmation message");

    form.addField("nameInput","Your name *",1);
    form.addField("emailInput","Your email *",1);
    form.addField("subjectInput","Your subject *",1);
    form.addField("messageInput","Your message *",4);

    body.appendChild(form.get());

//    var portfolioButton=Service.getElement("div","portfolioButtonAbout","applicationButton");
//    portfolioButton.innerHTML="PORTFOLIO";
//    portfolioButton.pageId=1;
//
//    portfolioButton.addEventListener("click",function(){
//        app.navigate(1,1);
//    });
//
//    body.appendChild(portfolioButton);
}
