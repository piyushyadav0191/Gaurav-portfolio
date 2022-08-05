var jsScroll;
var jsSkew;
var currentPixel;
var body; 
var anims = {};
var triggerHover = false;
var initAnimsTrigger = false;
var body;
var scroller;

$(document).ready(function() {
    
    setTimeout(function(){
        $("header").addClass("active");
    }, 900);
    
    body = document.body;
    jsScroll = document.getElementsByClassName('pageScroll')[0];
    jsSkew = document.getElementsByClassName('pageContainer')[0];
    currentPixel = 0;
    
    setTimeout(function(){
        scroller = new LocomotiveScroll({
            el: document.querySelector('[data-scroll-container]'),
            smooth: true,
            smoothMobile: true
        });
        var offset = 0;
        var speed = 0.1;
        scroller.on("scroll", function(e){
            offset += (e.scroll.y - offset) * speed;
            var newPixel = offset;
            var diff = newPixel - currentPixel;
            var skewSpeed = diff * 0.1;
            var scrollTop = $(document).scrollTop();
            var windowHeight = $(window).height();
            jsSkew.style.transform = "skewY(" + skewSpeed + "deg)";
            $(".innerImage").each(function(i, el){
                var offset = $(el).parent(".imageWrapperAnim").offset().top;
                var elHeight = $(el).parent(".imageWrapperAnim").height();
                $(el).css("transform", "translateY(" + ((scrollTop - offset) / 10) + "px)");
            });
            currentPixel = newPixel;
        });
        $(".latestWork .latestWorkWrapper .dataAnimWrapper").on("click", function(){
            scroller.scrollTo(".projects .contentWrapper .projectTitle");
        });
    }, 1200);
    
//    body = document.body;
//    jsScroll = document.getElementsByClassName('pageScroll')[0];
//    jsSkew = document.getElementsByClassName('pageContainer')[0];
//    currentPixel = window.pageYOffset;
//
//    var speed = 0.1;
//    var offset = 0;
//
//    function smoothScroll() {
//        offset += (window.pageYOffset - offset) * speed;
//        var newPixel = offset;
//        var diff = newPixel - currentPixel;
//        var skewSpeed = diff * 0.1;
//        var scrollTop = $(document).scrollTop();
//        var windowHeight = $(window).height();
//        jsScroll.style.transform = "translateY(-" + offset + "px) translateZ(0)";
//        jsSkew.style.transform = "skewY(" + skewSpeed + "deg)";
//        $(".innerImage").each(function(i, el){
//            var offset = $(el).parent(".imageWrapperAnim").offset().top;
//            var elHeight = $(el).parent(".imageWrapperAnim").height();
//            $(el).css("transform", "translateY(" + ((scrollTop - offset) / 10) + "px)");
//        });
//        currentPixel = newPixel;
//
//        requestAnimationFrame(smoothScroll);
//    }
//
//    smoothScroll();

    $(window).on("resize", function(){
        setPageHeight();
//        smoothScroll();
        if($(window).width() < 769){
            var height = $(".pageContainer .bigTitle").height();
            $(".backgroundVideo .letter").css("margin-top", (height - 250));
            $(".backgroundVideo .stripe").css("margin-top", (height - 250));
            $(".backgroundVideo .headerVideo").css("margin-top", (height - 550));
        } else {
            $(".backgroundVideo .letter").css("margin-top", "");
            $(".backgroundVideo .stripe").css("margin-top", "");
            $(".backgroundVideo .headerVideo").css("margin-top", "");
        }
    });

    $(window).trigger("resize");

    $(".dataAnimWrapper").hover(  function() {
        if(!triggerHover){
            console.log("test");
            triggerHover = true;
            $(".dataAnimWrapper[data-anim='" + $(this).data("anim") + "']:not([data-text='" + $(this).data("text") + "'])").trigger("mouseenter").addClass("hover");
        }
    }, function() {
        if(triggerHover){
            triggerHover = false;
            $(".dataAnimWrapper[data-anim='" + $(this).data("anim") + "']:not([data-text='" + $(this).data("text") + "'])").trigger("mouseleave").removeClass("hover");
        }
    });
    
});



function setPageHeight(){
    var height = $(jsScroll).outerHeight();
    $("body").height(height);
    setTimeout(function(){
        var height = $(jsScroll).outerHeight();
        $("body").height(height);
    }, 600);
}

function initAnims(){
    $(".dataAnim").each(function(){
        var style = "normal";
        var padding = 100;
        var size = 100;
        if($(this).parent(".dataAnimWrapper").data("style")){
            style = $(this).parent(".dataAnimWrapper").data("style");
        }
        if($(this).parent(".dataAnimWrapper").data("padding")){
            padding = $(this).parent(".dataAnimWrapper").data("padding");
        }
        if($(this).parent(".dataAnimWrapper").data("size")){
            padding = $(this).parent(".dataAnimWrapper").data("size");
        }
//        loadAnimation($(this), $(this).parent(".dataAnimWrapper").data("text"), style, padding, size);
    });
}

function loadAnimation(el, dataText, style, padding, size) {
    
    var text = new Blotter.Text(dataText, {
      	family : "'Times new Roman', serif",
        style: style,
      	size : size,
      	fill : "#D91616",
        weight: 400,
      	leading: 1,
        paddingLeft: padding,
        paddingRight: padding
        
    });

    var material = new Blotter.LiquidDistortMaterial();

    // Play with the value for uSpeed. Lower values slow
    // down animation, while higher values speed it up. At
    // a speed of 0.0, animation is stopped entirely.
    material.uniforms.uSpeed.value = 1;
    material.uniforms.uVolatility.value = 0;
    material.uniforms.uSeed.value = 5;
    
    // Try uncommenting the following line to play with
    // the "volatility" of the effect. Higher values here will
    // produce more dramatic changes in the appearance of your
    // text as it animates, but you will likely want to keep
    // the value below 1.0.
    //material.uniforms.uVolatility.value = 0.30;

    var blotter = new Blotter(material, {
      texts : text
    });
	
    var scope = blotter.forText(text);

    scope.appendTo(el);
    setTimeout(function(){
        setPageHeight();
    }, 600);
    
    $(el).parent(".dataAnimWrapper").hover(  function() {
        $(this).addClass("hover");
        $(this).animate({  now: '0.02' }, {
            step: function(now,fx) {
              material.uniforms.uVolatility.value = now;
            }
        }, 3000, "easeInCubic");
      }, function() {
        $(this).removeClass("hover");
        $(this).animate({  now: '0' }, {
            step: function(now,fx) {
              material.uniforms.uVolatility.value = now;
            }
        }, 3000, "easeOutCubic");
    });
}