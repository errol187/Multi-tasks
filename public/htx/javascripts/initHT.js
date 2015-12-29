/* Script

Init.js

Initiate common javascript apps/functions

*/


// jQuery.noConflict();

var hTaxis = hTaxis || {};

(function ($) {
	hTaxis.init = function () {
		// Initialize Components

		// SRC: assets/javascripts/components/fix.js
		var summaryState = $(".mod__search-summary").hasClass("hidden");
		if (!summaryState){ // Check summary is visible
			// Visible so apply waypoints
			this.fix.init();
		}

		// Mobile Specific JS
		if ($(window).load() < 960) {
			
			// this.navigation.init();
		}

		if($('#map').length)
		{
			this.googleHtApi.init();
		}

		this.carousel.init();
		
		this.passengers.init();
	
		//console.log("SEARCH RESULTS");
		
		this.vehicles.init();
		this.vehicles.increment("unbind");
		this.vehicles.decrement("unbind");	
		
		// Read more/less
		this.read.init();
			   
	};

	$(document).ready(function () {
		hTaxis.init();
		
		$("#js-booknow-btn").on('click', function(event){
		// Works for mobile
			$("body").data("clickedEle", event.currentTarget.id);
		});

		// enable for desktop
		if (window.matchMedia("(min-width: 768px)").matches) {
			console.log ("LOCALSTORAGE: MATCHMEDIA MIN WIDTH = 768", $('[data-vehicles="vehicles"]'));
			//$("select[data-passengers]").prop('disabled', false);  
			$("#pickupdate, #returndate").prop('disabled', false);  
		}

	});

})(jQuery);

$(document).bind("ajaxSend", function(event, xhr, settings){
	// //console.log ("AJAXRQ-SEND", event, xhr, settings);

	var activeEle = event.currentTarget.activeElement.id;
	// console.log("AJAX BINDING OF LOADER: ", activeEle);
	if (activeEle == "js-booknow-btn" || $("body").data("clickedEle") == "js-booknow-btn") {
		console.log("AJAX BINDING OF LOADER");
		console.log(event, xhr, settings);
		$("body").addClass('initLoader');
		$("body").addClass('no-scroll');	
	}
	
 }).bind("ajaxComplete", function(event, xhr, settings){
   //$("#loading").hide();
   //var activeEle = event.currentTarget.activeElement.id;
   // if (activeEle == "js-booknow-btn"){

   	// TODO: refactor and make conditions
		//debugger;
		setTimeout(function(){ 
			$('.js-search-form-wrapper').removeClass('hidden');
			// $('.js-search-results').removeClass('loading-results');
			//debugger;
			$("body").removeClass('initLoader');
			$("body").removeClass('no-scroll');
		}, 500);
   	// //console.log ("AJAXRQ-COMPLETE", this);
	// }
   
   
 });

// ====================================================================================
// Console Log
// Ensures using //console.log doesn't cause errors in browsers that do not support it
// ====================================================================================
if (typeof console === "undefined") {
	console = {
		log: function () { }
	};
}
