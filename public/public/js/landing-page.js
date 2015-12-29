
var return_date_is_editted = false;

$(document).ready(function(){

	$('#return').click(function(event) {
		var offset = 0;
		$('html, body').animate({scrollTop: $('#transfer_search').offset().top-offset}, 800);
		$('#bookingtypeid').val(1).trigger('change');
	});

	$('#single').click(function(event) {
		var offset = 0;
		// Scroll to search form
		$('html, body').animate({scrollTop: $('#transfer_search').offset().top-offset}, 800);
		// Set Type of transfer value to Single FROM Airport
		$('#bookingtypeid').val(2).trigger('change');
	});

	// Expand passengers selection row
	$('#add_passengers').click(function(){

		$('#passenger_info').slideUp('slow');
		$('#passengersSelect').slideDown('slow');
	});

});


//-----------------------------------------------------------------------------------
//		Use alternate date/time picker for Mozilla Firefox 
//-----------------------------------------------------------------------------------


$(document).ready(function(){ 

	// Check if browser is Mozilla Firefox 
	var isFirefox = typeof InstallTrigger !== 'undefined';  // Firefox 1.0+
	if ( isFirefox )
	{
		// Change date input fields to jQuery datepickers
		$('#returndate').datepicker();
		$('#pickupdate').datepicker();
	}
});



//-----------------------------------------------------------------------------------
//		Date/timepicker return autopoulate with date seven days after arrival
//-----------------------------------------------------------------------------------


$(document).ready(function(){

	$('#pickupdate').change(function(){

		var currentDate = new Date( $(this).val() );
		var returnDate = new Date( $('#returndate').val() );

		// if the 
		if(!return_date_is_editted || returnDate < currentDate)
		{
			var currentDate = new Date( $(this).val() );

			currentDate.setDate(currentDate.getDate() + 7);
			 
			// Find the current time zone's offset in milliseconds.
			var timezoneOffset = currentDate.getTimezoneOffset() * 60 * 1000;
			 
			// Subtract the time zone offset from the current UTC date, and pass
			//  that into the Date constructor to get a date whose UTC date/time is
			//  adjusted by timezoneOffset for display purposes.
			var localDate = new Date(currentDate.getTime() - timezoneOffset);
			 
			// Get that local date's ISO date string and remove the Z.
			var localDateISOString = localDate.toISOString().replace('Z', '');

			// console.log(currentDate);

			$('#returndate').val(localDateISOString);
		}

	});

	$('#returndate').change(function(){
		return_date_is_editted = true;
	});


});



$(document).ready(function(){

	$(window).on('scroll', function() {

	    var y_scroll_pos = window.pageYOffset;
	    var scroll_pos_test = 400;             // set to whatever you want it to be

	    if(y_scroll_pos > scroll_pos_test) {
	        $(".voucher-promo-mayday15-mobile").animate({right: "20px"}, 800);
	    }
	});

});


$(document).ready(function(){

	$( "#departure_time_message_selector" ).click(function(){

		$('#dialogBox').dialog();

	});
});
