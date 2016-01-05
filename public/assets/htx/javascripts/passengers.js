var hTaxis = hTaxis || {};

// Fix elements to desired position on page.
// Dependency: https://github.com/imakewebthings/waypoints

(function ($) {

  var a = parseInt($("select[data-passengers='adults']").val());
  var c = parseInt($("select[data-passengers='children']").val());
  var i = parseInt($("select[data-passengers='infants']").val());

  $(".com__passengers input[data-passengers='adults']").attr("value", a);
  $(".com__passengers input[data-passengers='children']").attr("value", c);
  $(".com__passengers input[data-passengers='infants']").attr("value", i);

  hTaxis.passengers = {
    setVars: function () {
      this.selectAttr = $("select[data-passengers]");
      this.inputAttr = $(".com__passengers input[data-passengers]");
      this.ID_CALENDAR_BACK = $("#calendarBack");
      this.OPACITY_LAYER = ".layer-opacity";
      this.O_INCREMENT = $(".com__passengers [data-increment]");
      this.O_DECREMENT = $(".com__passengers [data-decrement]");
      this.oPassengers = [{
        "adults": a,
        "children": c,
        "infants" : i

      }];

      $('#selected_adults').html(this.oPassengers[0]["adults"])
      $('#selected_children').html(this.oPassengers[0]["children"])
      $('#selected_infants').html(this.oPassengers[0]["infants"])
    },
    init: function () {
      this.setVars();
      // this.showPassengers();
      this.parseEvents(this.selectAttr);
      this.close();
      //this.increment(this.O_INCREMENT);
      //this.decrement(this.O_DECREMENT);
      ////console.log("PASSENGERS: ", this.oPassengers)
    },
    parseEvents: function (selectAttr) {

      if (window.matchMedia("(min-width: 768px)").matches) {
        $("select[data-passengers]").prop('disabled', false);  
        $("select[data-passengers]").prop('readonly', false);  
      }

      var media = matchMedia("(min-width: 768px)");
      media.addListener(function (mediaQueryList) {

      $(selectAttr).on("touchenter, touchstart, click" , function (e){
        e.preventDefault();
        this.blur();
        window.focus();

        if (mediaQueryList.matches) {
          console.log("Media: true");
          $("select[data-passengers]").prop('disabled', false);  
          $("select[data-passengers]").prop('readonly', false);  
        } else {
        //it doesn't match :(
          console.log("Media: false");
          $("select[data-passengers]").prop('disabled', true);  
          $("select[data-passengers]").prop('readonly', true);  

          hTaxis.passengers.showBack();
          hTaxis.passengers.showPassengers();
          hTaxis.passengers.showOpacity(".layer-opacity", true);
          hTaxis.passengers.preventScroll();
        }
      });
        
      });

      $('.com__passengers').on('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        /* Act on the event */
      });
      
    },
    showPassengers: function () {
      $('.com__passengers').addClass('passengers-section-show');        
    },
    showBack: function (){
      $(this.ID_CALENDAR_BACK).addClass('in');
    
    },
    showOpacity: function (ele, state){
      ////console.log("opacity: ", ele, state)
      
        if(state){
          $(ele).addClass('show');  
        } else {
          $(ele).removeClass('show'); 
        }

     },
     preventScroll: function (){
        $("body").addClass('no-scroll');
     },
     close: function(){
        $('.js-close-passengers-section, #calendarBack').click(function(e) {
          e.preventDefault();
          e.stopPropagation();

          $('.com__passengers').removeClass('passengers-section-show');
          $("#calendarBack").removeClass('in');
          hTaxis.passengers.showOpacity(".layer-opacity", false);
          $("body").removeClass('no-scroll');

          if (e.currentTarget.innerHTML == "CONTINUE") {
            // Save selection
            hTaxis.passengers.saveSelection(hTaxis.passengers.oPassengers[0]);
          } else {
            hTaxis.passengers.resetSelection(hTaxis.passengers.oPassengers[0]);
          }
        });
     },
     increment: function(objItems){
      
        $(objItems).one("touchenter, touchstart" , function (e){
        debugger;    
          var inc = e.currentTarget.dataset.increment;
          var value = parseInt($('input[data-passengers=' + inc + ']').attr("value"));
          //value = isNaN(value) ? 0 : value;
          value++
          $('input[data-passengers=' + inc + ']').attr("value", value);
          hTaxis.passengers.updateSummary(inc, value);

        })
     },
     decrement: function(objItems){

      
        $(objItems).one("touchenter, touchstart" , function (e){
          debugger;
          var dec = e.currentTarget.dataset.decrement;
          var min = e.currentTarget.dataset.mincount;
          var value = parseInt($('input[data-passengers=' + dec + ']').attr("value"));
          ////console.log(min, value)
            if(value > min){
               value--  
              $('input[data-passengers=' + dec + ']').attr("value", value);
              hTaxis.passengers.updateSummary(dec, value);
             };
            

        });
     },
     updateSummary: function (ele, num){
      ////console.log("updateSelectAttr", ele, num);
        switch(ele){
          case "adults":
            
            $('#selected_'+ele).text(num)
          break;

          case "children":
            
            $('#selected_'+ele).text(num)
          break;

          case "infants":
            
            $('#selected_'+ele).text(num)
          break;
      }

     },
     saveSelection: function (type){

      // if () {
        $("select[data-passengers='adults']").prop('selectedIndex', parseInt($('#selected_adults').text())-1);
        $("select[data-passengers='children']").prop('selectedIndex', parseInt($('#selected_children').text()));
        $("select[data-passengers='infants']").prop('selectedIndex', parseInt($('#selected_infants').text())); 

        type["adults"] = $("select[data-passengers='adults']").val();
        type["children"] = $("select[data-passengers='children']").val();
        type["infants"] = $("select[data-passengers='infants']").val();

      // /}
      
     },

     resetSelection: function (type){

      var aPassengers = $(".com__passengers input[data-passengers]");

      for (var i = 0; i < aPassengers.length; i++) {

        $(".com__passengers input[data-passengers]").data("passengers")

        var passType = aPassengers[i].getAttribute("data-passengers")

         switch(passType){
            case "adults":
              ////console.log(type)
              // $('#selected_'+ele).text(num)
              $(aPassengers[i]).attr("value", type[passType]);
              $('#selected_adults').html(type[passType]);
            break;

            case "children":
              ////console.log(type)
              $(aPassengers[i]).attr("value", type[passType]);
              $('#selected_children').html(type[passType]);
            break;

            case "infants":
              ////console.log(type)
              $(aPassengers[i]).attr("value", type[passType]);
              $('#selected_infants').html(type[passType]);
            break;
        }


      };


      
      // $('#selected_children').html(type["children"]);
      // $('#selected_infants').html(type["infants"]);
     }

  } 
})($);
