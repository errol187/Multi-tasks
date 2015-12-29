var hTaxis = hTaxis || {};

// Fix elements to desired position on page.
// Dependency: https://github.com/imakewebthings/waypoints

(function ($) {
    hTaxis.fix = {

        setVars: function () {
            this.oStickyElements = $('.sticky-element');
            this.oWaypointElements = $('.waypoint-element');
            //this.summaryHeight = $('.sticky-element');
            //this.oStickyElements = $('.sticky-element');
            this.summaryBtn = $(".js-change-search");
        },


        init: function () {
            this.setVars();
            this.buildStickyWaypoints(hTaxis.fix.oStickyElements);
            this.buildWaypoints(this.oWaypointElements);
            //this.toggleButtonText();
            //console.log("FIX");
        },

        isScrolledIntoView: function (el) {
            var $elem = $(el),
                    $window = $(window),

                    docViewTop = $window.scrollTop(),
                    docViewBottom = docViewTop + $window.height(),

                    elemTop = $elem.offset().top,
                    elemBottom = elemTop + $elem.height();

            return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
        },

        fixLogic: function (attr){

            var combinedHeight, currentHeight;

            // switch (attr){

            //     case "0": 
            //         // *** Set the context that will be used
            //         // *** Figure height of already fixed elements and append element
            //         // to be fixed

            //         function(){};
            //         break;
            //     case "1": 
            //         function(){};
            //         break;
            //     case "2": 
            //         function(){};
            //         break;
            //     default: 
            // }


            //  this.sticky = new Waypoint.Sticky({
            //   element: hTaxis.fix.oStickyElements,
            //   handler: function(direction) {
            //     //console.log('Sticky: Basic waypoint triggered', direction);
            //     //console.log(this);
                
            //   },
            //   offset: -200
              
            // });
        },

        buildStickyWaypoints: function(elements) {
            //console.log("StickyObjectClasses:");
            var thisEle;
            var media = matchMedia("(min-width: 768px)");
             var mQuerySm = Modernizr.mq('(min-width: 768px)');

             if (media.matches) {
                console.log("Onload: STICKY");
                    elements.each(function(i){
                        if (typeof this.sticky === "function" ){
                            this.sticky.destroy();
                        }
                    })
                    
              } else {
                $(elements).each(function(i) {
                    console.log("Onload:CREATE: STICKY");
                    // var thisEle = $(elements)[i];
                        this.sticky = new Waypoint.Sticky({
                          element: this,
                          handler: hTaxis.fix.handlerAnimate(this), 
                          offset: -this.clientHeight
                      
                        });
                    });
              }

              media.addListener(function (mediaQueryList) {
                if (mediaQueryList.matches) {
                  console.log("DESTROY: STICKY");
                  
                  elements.each(function(i){
                        // console.log("ele: ", elements[i].sticky)
                        // console.log("this: ", this.sticky)
                        this.sticky.destroy();
                    });
                } else {
                  console.log("CREATE: STICKY");
                  
                  $(elements).each(function(i) {
                    // var thisEle = $(elements)[i];
                        this.sticky = new Waypoint.Sticky({
                          element: this,
                          handler: hTaxis.fix.handlerAnimate(this), 
                          offset: -this.clientHeight
                      
                        });
                    });
                }
                
              }); // event listener

        },
        buildWaypoints: function(elements) {
            //console.log('Waypoint: Basic waypoint triggered');
            $(elements).each(function(i) {
                this.waypoint = new Waypoint({

                  element: elements[i],
                  handler: function(direction) {

                    var bookingState = $("#bookingSummaryScroll").hasClass("hidden");
                    var summaryBooking = $(".comp__search--form").hasClass("hidden");
                        
                    var $mybutton = hTaxis.fix.summaryBtn;

                    // When scrolling
                    if (direction === "down") { // down
                        if (!bookingState && summaryBooking){
                            $mybutton.text($mybutton.data('changesearch'));
                        } 
                        else if (bookingState && !summaryBooking){
                            $mybutton.text($mybutton.data('showsearch'));
                        } else {
                            $mybutton.text($mybutton.data('hidesearch'));
                        }    
                    } else { // up
                        if (!bookingState && summaryBooking){
                            $mybutton.text($mybutton.data('changesearch'));
                        } 
                        else if (bookingState && !summaryBooking){
                            $mybutton.text($mybutton.data('hidesearch'));
                        } else {
                            $mybutton.text($mybutton.data('showsearch'));
                            
                        }    
                    }
                  },
                   offset: -200
              
                });
            });

            // Click event 
        },
        handlerAnimate: function (){
            //console.log("Animate Handler");
            // TODO: Apply animations

        }
       // toggleButtonText: function (){

            //Hide summary section and show seach section
        //     $('.js-change-search').click(function(e) {
                
        //         e.preventDefault();
                
        //         if ($("#bookingSummaryScroll").hasClass("hidden")){
        //             $('#bookingSummaryScroll, .comp__search--hero').removeClass('hidden');
        //             //$('.js-search-form-wrapper').addClass('hidden');
        //             $('.comp__search--form, .comp__search--hero').addClass('hidden ');

        //             $('.mod__search--summary-button--text').text($('.mod__search--summary-button--text').data('changesearch'));
        //             // scrollTo($("body"));
        //             // $('#Search_Summary_Affix').removeClass('showsearch');
        //             // $('#Search_Summary_Affix .bookingsummary').css('position', 'fixed');
        //         // $('#Search_Summary_Affix .bookingsummary').css('z-index', '9');
        //             scrollTo($("body"));
                    
                    
        //         } else {
        //             $('#bookingSummaryScroll, .comp__search--hero').addClass('hidden');
        //             // $('.js-search-form-wrapper').removeClass('hidden');
        //             $('.comp__search--form, .comp__search--hero').removeClass('hidden');
        //             $('.mod__search--summary-button--text').text($('.mod__search--summary-button--text').data('hidesearch'));
        //             scrollTo($("body"));

        //         }
        //     });
        // }

    
    }
})($);
