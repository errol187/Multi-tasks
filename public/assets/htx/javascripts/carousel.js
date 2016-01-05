var hTaxis = hTaxis || {};

// Fix elements to desired position on page.
// Dependency: https://github.com/imakewebthings/waypoints

(function ($) {
    hTaxis.carousel = {

        setVars: function () {
            this.mod = ".mod__carousel"
            this.oCarouselTransfers = $(this.mod + '--transfers');
            this.readMore = this.oCarouselTransfers.find("footer").children().data("readmore");
            this.readLess = this.oCarouselTransfers.find("footer").children().data("readless");
            this.oCarouselDesc = $(this.mod + '--transfers-description');
            this.oCarouselImg = $(this.mod + '--transfers-image');
            this.oCarouselBody = this.oCarouselTransfers.find('.panel-body');
            this.oCarouselActive = this.oCarouselTransfers.find('.item.active');
            this.panelHeight = this.oCarouselActive.find('.panel-body').height();
            
            this.oCarouselDesc.each(function(){
                $(this).attr("id" , _.uniqueId('carouselTransferDesc_'))
            });
            
        },

        init: function () { 
            this.setVars();
            this.carouselEvt(this.oCarouselBody);
            this.moreInfo();
        },
        carouselEvt: function (el) {
            
            $('.mod__carousel--transfers .carousel').on('slide.bs.carousel', function (evt) {

                hTaxis.carousel.reset(evt);

            });

            $('.mod__carousel--transfers .carousel').on('slid.bs.carousel', function (evt) {
                
                hTaxis.carousel.oCarouselActive = $(evt.relatedTarget);

            })
        },

        moreInfo: function(elements) {

            // $('.mod__carousel .more-info').on('click', function(e){
            //     var _this = $(this);

            //     _this.closest(".item").children().children("button").toggleClass('hidden');

            // });
            
            $(".mod__carousel--transfers .item .btn.more-info, .mod__carousel--more-info button.close").on('click', function(e){

                e.preventDefault();

                var _this = $(this); // Button
                var $activeEle = _this.data("type");
                // var TRANSFERS_DESC = hTaxis.carousel.oCarouselActive.find('[class*="description"]');
                var TRANSFERS_DESC = _this.parent().prev(".panel-body").find('.mod__carousel--transfers-description');
                var TRANSFERS_IMG = _this.parent().prev(".panel-body").find('.mod__carousel--transfers-image');

                
                $(this).data('readless');
                
                if ($activeEle == "more") {

                    var TRANSFERS_TEXT = _this.children('.read');
                    // Set carousel image
                    hTaxis.carousel.oCarouselImg = TRANSFERS_IMG;

                    // Set active descripion
                    hTaxis.carousel.oCarouselDesc = TRANSFERS_DESC;

                    // Pass transition element ID
                    hTaxis.carousel.detectTransitionEnd(TRANSFERS_DESC.attr("id"));

                    TRANSFERS_DESC.toggleClass('show');
                    TRANSFERS_IMG.toggleClass('noShow');
                    hTaxis.carousel.animateClose(TRANSFERS_DESC);

                    if(!TRANSFERS_DESC.hasClass('show')) {
                        TRANSFERS_TEXT.html(_this.data("readmore"));
                    } else {
                        TRANSFERS_TEXT.html(_this.data("readless"));
                    }

                } else {
                    
                    var TRANSFERS_TEXT =  _this.nextAll(".panel-footer").find('.read');
                    TRANSFERS_DESC =  _this.parent().find('.panel-body').children('.mod__carousel--transfers-description');
                    TRANSFERS_IMG =  _this.parent().find('.panel-body').children('.mod__carousel--transfers-image');

                    _this.toggleClass('hidden');
                    // Pass transition element ID
                    hTaxis.carousel.detectTransitionEnd(TRANSFERS_DESC.attr("id"));
                    TRANSFERS_DESC.toggleClass('show');
                    TRANSFERS_IMG.toggleClass('noShow');
                    hTaxis.carousel.animateClose(_this.parent());

                    if(TRANSFERS_DESC.hasClass('show')) {
                        TRANSFERS_TEXT.html(_this.nextAll(".panel-footer").find(".more-info").data("readmore"));
                    } else {
                        TRANSFERS_TEXT.html(_this.nextAll(".panel-footer").find(".more-info").data("readmore"));
                        
                    }

                    // });

                };

            });

        },
        detectTransitionEnd: function(eleId) {
            //console.log("TRANSITION END: " );
            // hTaxis.carousel.oCarouselImg
        
            var transEndEventNames = {
                'WebkitTransition' : 'webkitTransitionEnd', //* Saf 6, Android Browser
                'MozTransition'    : 'transitionend',       //* only for FF < 15
                'transition'       : 'transitionend'        //* IE10, Opera, Chrome, FF 15+, Saf 7+
            };

            var transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ];

            var element = document.getElementById(eleId);

            $(element).one(transEndEventName, function(e){
                e.stopPropagation();

                hTaxis.carousel.animateClose(hTaxis.carousel.oCarouselActive);
                
            }); 

        },
        animateClose: function (activeEle){
            //console.log("find button: ", activeEle.find("button"))
            activeEle.parent().prev().toggleClass('hidden');
            // hTaxis.carousel.oCarouselImg.toggleClass('noShow');
        },
        reset: function (eleEvt){
            carouselObj = hTaxis.carousel;
            carouselObj.oCarouselTransfers.find("button.close").addClass("hidden");
            carouselObj.oCarouselDesc.removeClass('show');
            carouselObj.oCarouselTransfers.find("footer").children().children(".read").html(carouselObj.readMore)
            carouselObj.oCarouselImg.each(function (){
                $(this).removeClass('noShow');
            });

        }
        
    }
})($);