document.addEventListener("DOMContentLoaded", main);


function addPages(app,pagesArray){
    var  titlePage=new TitlePage(app);

    pagesArray.push(titlePage);

    var portfolioPage=new PortfolioPage(app);

    pagesArray.push(portfolioPage);

    var aboutPage=new AboutPage(app);

    pagesArray.push(aboutPage);

    var contactPage=new ContactPage(app);

    pagesArray.push(contactPage);

}

function App(){
    //SETTINGS FOR CONTROL ELEMENTS
    var Settings={
        mainColor:"#62d6ff",
        splashFont:1/10,
        menuButton:{
            size:1/20,
            indent:1/50
        },
        menu:{
            topRate:1/30,
            bottomRate:1/5,
            font: 1/40
        },
        menuNavButton:{
            width:1/6,
            height:1/18,
            top:1/10,
            font:1/50
        },
        radioButton:{
            size:1/100,
            indentRight:1/30
        }
    };

    //CONTROL ELEMENTS
    var menuButton=document.getElementById("menuButton");
    var menu=document.getElementById("menu");
    var radioButtons=document.getElementById("navigationColumn");

    var cssNode = document.createElement('style');
    cssNode.setAttribute('type', 'text/css');
    document.getElementsByTagName('head')[0].appendChild(cssNode);

    var pageAnimationCssNode=document.createElement("style");
    pageAnimationCssNode.setAttribute('type','text/css');
    document.getElementsByTagName("head")[0].appendChild(pageAnimationCssNode);

    var upperScreen = document.getElementById("upperScreen");
    var currentScreen = document.getElementById("currentScreen");
    var lowerScreen = document.getElementById("lowerScreen");
    var pageInCurrentScreen;

    var me=this;

    var activePage;

    //Getting window props
    this.getWidth=function(){
        return self.innerWidth || ( de && de.clientWidth ) || document.body.clientWidth;
    }

    this.getHeight=function(){
        return self.innerHeight || ( de && de.clientHeight ) || document.body.clientHeight;
    }

    this.getSettings=function(){
        return Settings;
    }

    // Setting menu button appearance an behaviour
    this.adjustMenuButton=function(){
        var size=me.getHeight()*Settings.menuButton.size;
        var indent=me.getHeight()*Settings.menuButton.indent;

        Service.setDimensions(menuButton,size,size);
        Service.setIndent(menuButton,indent,indent);

        menuButton.style.borderRadius=""+size/5+"px";

        var lines=document.getElementsByClassName("line");
        for(var el in lines){
            if(el<3){
                lines[el].style.height=""+size/7+"px";
                lines[el].style.marginTop=""+size/7+"px";
            }
        }

        menuButton.onmouseover=function(){lines[0].style.background=lines[1].style.background=lines[2].style.background=Settings.mainColor}
        menuButton.onmouseout=function(){lines[0].style.background=lines[1].style.background=lines[2].style.background="white"}

        var hideMenu=function(){
            me.setMenuCondition(0,0,0,"");

            menuButton.onclick=showMenu;
        }
        var showMenu=function(){
            var height=me.getHeight();
            var topSize=Settings.menu.topRate*me.getWidth();
            var bottomSize=Settings.menu.bottomRate*me.getWidth();

            for(i in pagesArray){
               var menuPageButton=document.getElementById("menu"+pagesArray[i].getTitle()+"Button");
                menuPageButton.style.visibility="visible";
                menuPageButton.style.fontSize=""+((me.getHeight()+me.getWidth())/2)*Settings.menuNavButton.font+"px";
                var mPBwidth=me.getWidth()*Settings.menuNavButton.width;
                var mPBheight=me.getHeight()*Settings.menuNavButton.height;
                Service.setDimensions(menuPageButton,mPBwidth,mPBheight);
                Service.setIndent(menuPageButton,10-bottomSize,-me.getHeight()+height*Settings.menuNavButton.top+(i*mPBheight));
            }

            me.setMenuCondition(height,topSize,bottomSize,"menuAnimation 0.5s,1");

            menuButton.onclick=hideMenu;
        }

        menuButton.onclick=showMenu;
    }

//    Setting menu
    this.setMenuCondition=function(height,topSize,bottomSize,animation){
        menu.style.borderTop=""+height+"px solid "+Settings.mainColor;
        menu.style.borderRight=""+topSize+"px solid transparent";
        menu.style.borderLeft=""+bottomSize+"px solid "+Settings.mainColor;

        menu.style.animation=animation;
        menu.style.webkitAnimation=animation;

        pageInCurrentScreen.style.left=""+2*topSize+"px";

        var pageAnim;
        if(animation=="") pageAnim="";
        else pageAnim="pageOnMenuAnimation 0.5s,1";

        pageInCurrentScreen.style.animation=pageAnim;
        pageInCurrentScreen.style.webkitAnimation=pageAnim;
    }

    this.adjustMenu = function(){

        function createAnimation(height,topSize,bottomSize)
        {
            cssNode.innerHTML="@keyframes menuAnimation\
            {\
                from {\
                border-top: "+height+"px solid "+Settings.mainColor+";\
                border-right: 0px solid transparent;\
                border-left: 0px solid "+Settings.mainColor+";\
            }\
                to {\
                border-top: "+height+"px solid "+Settings.mainColor+";\
                border-right: "+topSize+"px solid transparent;\
                border-left: "+bottomSize+"px solid "+Settings.mainColor+";\
            }\
            }"+
            "@-webkit-keyframes menuAnimation\
            {\
                from {\
                border-top: "+height+"px solid "+Settings.mainColor+";\
                border-right: 0px solid transparent;\
                border-left: 0px solid "+Settings.mainColor+";\
            }\
                to {\
                border-top: "+height+"px solid "+Settings.mainColor+";\
                border-right: "+topSize+"px solid transparent;\
                border-left: "+bottomSize+"px solid "+Settings.mainColor+";\
            }\
            }"+Service.getMovementAnimation("pageOnMenuAnimation",0,0,topSize*2,0);

        }


        var height=me.getHeight();
        var topSize=Settings.menu.topRate*me.getWidth();
        var bottomSize=Settings.menu.bottomRate*me.getWidth();

        me.setMenuCondition(0,0,0,"");

        createAnimation(height,topSize,bottomSize);


        var closeMenuButton=document.getElementById("closeMenuButton");
        closeMenuButton.style.top="-"+(height-height*Settings.menuButton.indent)+"px";
        closeMenuButton.style.right=""+10+"px";
        closeMenuButton.style.fontSize=""+height*Settings.menu.font+"px";
        closeMenuButton.onclick=function(){
            me.setMenuCondition(0,0,0,"");
        }


    }


    // Setting current page with its standard interface
    this.adjustPages=function(){

        var currentPage=pagesArray[activePage];

        if(currentPage){
            currentPage.setDimensions(me.getWidth(),me.getHeight());
            currentScreen.appendChild(currentPage.getPage());

            pageInCurrentScreen=currentPage.getPage();
        }
    }

   //Setting navigation
    this.setNavigation=function(){
        for(i in pagesArray){

            // Menu navigation buttons
            var menuPageButton=Service.getElement("div","menu"+pagesArray[i].getTitle()+"Button","menuNavigationButton");
            menuPageButton.innerHTML=pagesArray[i].getTitle();
            menuPageButton.style.visibility="hidden";
            menuPageButton.pageId=i;
            menuPageButton.addEventListener('click', function(){
               me.navigate(this.pageId);
            });
            menu.appendChild(menuPageButton);

            // Radiobuttons
            var radioButton=Service.getElement("div","radio"+pagesArray[i].getTitle()+"Button","radioButton");
            radioButton.pageId=i;
            radioButton.addEventListener('click', function(){
                me.navigate(this.pageId);
            });
            radioButtons.appendChild(radioButton);
        }
    }

    //Setting navigation elements positions, dimensions, and animation of page slide effect
    this.adjustNavigation=function(){
        function setAnimation(){
            pageAnimationCssNode.innerHTML="\n"+Service.getMovementAnimation("currentPageSlideTop",0,0,0,-me.getHeight());
            pageAnimationCssNode.innerHTML+="\n"+Service.getMovementAnimation("currentPageSlideDown",0,0,0,me.getHeight());

            pageAnimationCssNode.innerHTML+="\n"+Service.getMovementAnimation("nextPageSlideTop",0,me.getHeight(),0,0);

            pageAnimationCssNode.innerHTML+="\n"+Service.getMovementAnimation("previousPageSlideDown",0,-me.getHeight(),0,0);
        }

        setAnimation();

        // Setting radiobuttons column
        for(var i in pagesArray){
                var radioButton=document.getElementById("radio"+pagesArray[i].getTitle()+"Button");
                var mRBsize=me.getWidth()*Settings.radioButton.size;
                Service.setDimensions(radioButton,mRBsize,mRBsize);

                var rBX=me.getWidth()-me.getWidth()*Settings.radioButton.indentRight;
                var rBY=(me.getHeight())/2-(pagesArray.length*mRBsize/2)+i*(mRBsize+5);
                Service.setIndent(radioButton,rBX,rBY);

            radioButton.style.borderColor=""+Settings.mainColor;
                if(radioButton.pageId==activePage) radioButton.style.background=""+Settings.mainColor;
                else  radioButton.style.background="";
        }
    }

    //Radiobuttons color set for different backgrounds
    this.setRadioButtonsColor=function(color){
        for(var i in pagesArray){
            var radioButton=document.getElementById("radio"+pagesArray[i].getTitle()+"Button");

            radioButton.style.borderColor=color;

            if(radioButton.pageId==activePage) radioButton.style.background=""+color;
            else  radioButton.style.background="";
        }
    }

    //Navigating
    this.navigate=function(pageId, notFromMenu){
        console.log("going to  page"+pageId);

        var nextPage=pagesArray[pageId];

        // give page time to load, if needed
        var loadingTime=nextPage.getLoadingTime();
        if(loadingTime>0){

            var splashScreen=Service.getElement("div","splashScreen","splashScreen");
            Service.setDimensions(splashScreen,me.getWidth(),me.getHeight());
            splashScreen.style.fontSize=""+(me.getHeight()+me.getWidth())/2*Settings.splashFont+"px";
            splashScreen.style.lineHeight=""+me.getHeight()+"px";
            currentScreen.appendChild(splashScreen);

            var perc=0;
            var loadingProcess=setInterval(function(){
                splashScreen.innerHTML=""+perc+"%";
                perc++;
                if(perc>=100) {
                    clearInterval(loadingProcess);
                    currentScreen.removeChild(splashScreen);
                    me.navigate(pageId);
                }

            },loadingTime/100);

            return;
        }

        // continue navigation

        if(notFromMenu){
            Service.setIndent(pageInCurrentScreen,0,0);
            Service.setIndent(nextPage.getPage(),0,0);
            me.setMenuCondition(0,0,0,"");
        }

         if(pageId>activePage) {

            nextPage.setDimensions(me.getWidth(),me.getHeight());
            lowerScreen.appendChild(nextPage.getPage());
            Service.setIndent(lowerScreen,0,me.getHeight());

            Service.setAnimation(currentScreen,"currentPageSlideTop 0.5s,1");

            Service.setAnimation(lowerScreen,"nextPageSlideTop 0.5s,1");

            setTimeout(function(){
                currentScreen.innerHTML="";
                lowerScreen.innerHTML="";

                Service.setAnimation(currentScreen,"");

                Service.setAnimation(lowerScreen,"");

                currentScreen.appendChild(nextPage.getPage());

                activePage=pageId;
                pageInCurrentScreen=nextPage.getPage();

                Service.setAnimation(pageInCurrentScreen,"");

                me.paint();
            },500);
        }
        if(pageId<activePage) {

            nextPage.setDimensions(me.getWidth(),me.getHeight());
            upperScreen.appendChild(nextPage.getPage());
            Service.setIndent(upperScreen,0,-me.getHeight());

            Service.setAnimation(currentScreen,"currentPageSlideDown 0.5s,1");

            Service.setAnimation(upperScreen,"previousPageSlideDown 0.5s,1");

            setTimeout(function(){
                currentScreen.innerHTML="";
                upperScreen.innerHTML="";

                Service.setAnimation(currentScreen,"");

                Service.setAnimation(upperScreen,"");

                currentScreen.appendChild(nextPage.getPage());

                activePage=pageId;
                pageInCurrentScreen=nextPage.getPage();

                Service.setAnimation(pageInCurrentScreen,"");

                me.paint();
            },500);
        }
        me.paint();
    }


    //Paint function
    this.paint=function(activePage){

        me.adjustMenuButton();

        me.adjustPages();

        me.adjustMenu();

        me.adjustNavigation();

    }


    // all pages in application
    var pagesArray= new Array();

    addPages(this,pagesArray);

    activePage=0;

    this.setNavigation();

    this.paint();
}

function main(){
    app = new App();
    window.addEventListener("resize",app.paint);
}