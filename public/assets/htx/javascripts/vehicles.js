var hTaxis = hTaxis || {};

// Fix elements to desired position on page.
// Dependency: https://github.com/imakewebthings/waypoints

(function ($) {

  var vehiclesCounter = $(".js-vehicles");
  
  hTaxis.vehicles = {
    setVars: function () {
      this.selectAttr = $("select[data-vehicles]");
      this.inputAttr = $("input[data-vehicles]");
      this.ID_CALENDAR_BACK = $("#calendarBack");
      this.OPACITY_LAYER = ".layer-opacity";
      this.O_INCREMENT = $(".com__vehicles [data-increment]");
      this.O_DECREMENT = $(".com__vehicles [data-decrement]");
      this.current = "";
      
    },
    init: function () {
      this.setVars();
      // this.showVehicles();

      if ($("#search-results .js-transfer-product").length) {
        // ajax complete
        this.close();
        this.increment();
        this.decrement();
        this.parseEvents(this.selectAttr);
        this.oVehicles = [{
          "vehicles": '',
          "current": ''
        }];

        $('#selected_vehicles').html(this.oVehicles[0]["vehicles"]);

      }
      
      
    },
    parseEvents: function (selectAttr) {
      var mod_vehicleCounter = $("input[data-vehicles]");
      var mod_vehicleSelected = $('#selected_vehicles')
      // //console.log("SelectAttr: ", selectAttr);  
      
      $(".js-vehicles").delegate( vehiclesCounter , "touchenter, touchstart", function (e){
        
        // //console.log("DATA VEHICLES", e);
        e.preventDefault();
        this.blur();
        window.focus();

        // set current
        hTaxis.vehicles.oVehicles[0]["current"] = e.currentTarget;
        hTaxis.vehicles.oVehicles[0]["vehicles"] = e.currentTarget.value;
        mod_vehicleCounter.attr("value", e.currentTarget.value);
        mod_vehicleSelected.text(e.currentTarget.value)

        hTaxis.vehicles.showBack();
        hTaxis.vehicles.showVehicles();
        hTaxis.vehicles.showOpacity(".layer-opacity", true);
        hTaxis.vehicles.preventScroll();
        
      });

      $('.com__vehicles').on( 'click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        /* Act on the event */
      });
      
    },
    showVehicles: function () {
      $('.com__vehicles').addClass('vehicles-section-show');        
    },
    showBack: function (){
      $(this.ID_CALENDAR_BACK).addClass('in');
    
    },
    showOpacity: function (ele, state){
      //console.log("opacity: ", ele, state)
      
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
        $('.js-close-vehicles-section, #calendarBack').click(function(e) {
          e.preventDefault();
          e.stopPropagation();

          $('.com__vehicles').removeClass('vehicles-section-show');
          $("#calendarBack").removeClass('in');
          hTaxis.vehicles.showOpacity(".layer-opacity", false);
          $("body").removeClass('no-scroll');

          if (e.currentTarget.innerHTML == "CONTINUE") {
            //console.log (e.currentTarget);
            // Save selection
            hTaxis.vehicles.saveSelection(hTaxis.vehicles.oVehicles[0]);
          } else {
            // //console.log('RESET: ', hTaxis.vehicles.oVehicles);
            hTaxis.vehicles.resetSelection(hTaxis.vehicles.oVehicles[0]);
          }
        });
     },
     increment: function(arg){
      // //console.log("increment", arg);
      if (arg){
        $(".com__vehicles [data-increment]").unbind();
        return;
      } else {
        $(".com__vehicles [data-increment]").on("touchenter, touchstart", function (e){
          var inc = e.currentTarget.dataset.increment;
          var value = parseInt($('input[data-vehicles=' + inc + ']').attr("value"));
          value++
          $('input[data-vehicles=' + inc + ']').attr("value", value);
          hTaxis.vehicles.updateSummary(inc, value);

        })
      }
        
     },
     decrement: function(arg){
      // //console.log("decrement", arg);
      if (arg){
        $(".com__vehicles [data-decrement]").unbind();
        return;
      } else {
        $(".com__vehicles [data-decrement]").on( "touchenter, touchstart", function (e){
          var dec = e.currentTarget.dataset.decrement;
          var min = e.currentTarget.dataset.mincount;
          var value = parseInt($('input[data-vehicles=' + dec + ']').attr("value"));
          //console.log(min, value)
            if(value > min){
               value--  
              $('input[data-vehicles=' + dec + ']').attr("value", value);
              hTaxis.vehicles.updateSummary(dec, value);
             };
            

        });
      }
     },
     updateSummary: function (ele, num){
      //console.log("updateSelectAttr", ele, num);
      $('#selected_vehicles').text(num)
        
     },
     saveSelection: function (type){
        var curr = hTaxis.vehicles.oVehicles[0]["current"];
        curr.selectedIndex = parseInt($('#selected_vehicles').text())-1
        type["vehicles"] = $("select[data-vehicles='vehicles']").val();

     },

     resetSelection: function (type){

        $("input[data-vehicles]").data("vehicles")
        $("input[data-vehicles]").attr("value", hTaxis.vehicles.oVehicles[0]["vehicles"]);
        $('#selected_vehicles').html(hTaxis.vehicles.oVehicles[0]["vehicles"]);
     
     }

  } 
})($);
