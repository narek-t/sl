//FR SLIDER
function dial(el){
    var $dial = $(el);
    var $items = $dial.find('.dial-slide');
    var thumbs = $items.find('.dial-slide__thumb');
    var amount = $items.length;
    var degStep = 360/amount;
    var startAngle = 0;
    var itemWidth = thumbs.innerWidth();
    var itemHeight = thumbs.innerHeight()
    var containerWidth = $(el).width();
    thumbs.wrapInner('<div class="dial-slide__inner"></div>');
    // var itemContainer = $items.parents('.dial-slide');
    
    this.rotateItems = function(){
        //find activeIndex from angle
        activeI = -startAngle/degStep%amount;
        if (activeI<0){activeI+=amount;}
        $items.removeClass('dial-slide__active dial-slide__next dial-slide__prev');

        $items.each(function(i){
            var d = i*degStep+startAngle;
            
            if (i==activeI){
                //active this item

                $(this).addClass('dial-slide__active');
                $(this).next('.dial-slide').length ? $(this).next().addClass('dial-slide__next')
                    : $items.first().addClass('dial-slide__next');
                $(this).prev('.dial-slide').length ? $(this).prev().addClass('dial-slide__prev')
                    : $items.last().addClass('dial-slide__prev');
                var index = $(this).index();
                $(".fr-slider-links a").removeClass("active");
                $(".fr-slider-links a").eq(index-3).addClass("active");

                //milion ways to add content/css, but one of the simplest would be to add things to the data attributes of the items
                $dial.find('.content')
                    .html($(this).find('.dial-content').html())
                    .css({backgroundColor:$(this).data('css')});
                
            }
            $(this).find('.dial-slide__thumb').css({
                transform: 'rotateZ('+d+'deg)',
                'margin-left': -itemWidth/2 + 'px',
                'transform-origin': (itemWidth/2 + 'px') + ' ' + (containerWidth/2 + itemHeight/2) + 'px',
                top: -itemHeight/2 + 'px'
             });
            $(this).find('.dial-slide__inner').css({transform:'rotateZ('+(-d)+'deg)'});
            $(this).find('.dial-slide__content').css('padding', itemWidth/2 + 5 +'px');
        });
    };
    
    this.rotateLeft = function(){
        startAngle -= degStep;
        this.rotateItems();
    }
    
    this.rotateRight = function(){
    	startAngle += degStep;
        this.rotateItems();
    }
    
    this.jumpTo = function(a){
        startAngle = a;
        this.rotateItems();
    }
    this.init = function(){
        var that = this;
    	this.rotateItems();
        $dial.find('.left').click(function(){
        	that.rotateLeft();
        });
        $dial.find('.right').click(function(){
        	that.rotateRight();
        });
        $items.each(function(i){
            var d = i*degStep;
            $(this).click(function(){
                that.jumpTo(-d);
            });
        });
        return this;
    }
    
};
var d = new dial('.dial-slider').init();

$(".fr-slider-links a").click(function(e) {
    e.preventDefault();
    var index1 = $(this).index();
    $(".fr-slide-item").eq(index1).click();
});