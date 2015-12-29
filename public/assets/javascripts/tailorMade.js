/**
*
*
* Tailor made form submission
* TODO: Add to literal object initHT,js
*
**/
$(document).ready(function(){
var tailorMadePage = $('input[id^="departuredate_"]');

//console.log("tailmade id: ", tailorMadePage);

if (tailorMadePage.length){

	//console.log("TAILORMADE PAGE");

	//Load date pickers
	var depCurrDate = moment();
 	var depMaxDate = moment().add(5, 'y');
	var departureDate = moment();

	// $('input[id^="departuredate_"]').val(moment(new Date()).format('DD/MM/YYYY'));
	$('select[id^="departurehour_"]').val(moment({hour : 00}));
	$('select[id^="departureminute_"]').val(moment({minute : 00}));

	if($('input[id^="departuredate_"]').length && $('input[id^="departuredate_"]').val() != '')
		{

			currDepartureDate = moment($('input[id^="departuredate_"]').val(), 'DD/MM/YYYY');
			if(currDepartureDate.isValid() && currDepartureDate > departureDate)
			{
				departureDate = currDepartureDate;
			}
		}

 	var departureDate = moment($('input[id^="departuredate_"]').val());

	if(!departureDate.isValid())
	{

		departureDate = departureDate.add(7, 'd');
	}
	maxDate = moment().add(5, 'y');
	
	// $('input[id^="departuredate_"]').val(currDate);
	// input[id=""]
	// input[id^="departurehour_"]

	var departureDatepicker = $('#departuredatepicker').datetimepicker({
		locale: language,	
		format: 'DD/MM/YYYY',
		inline: true,
		useCurrent: true,
		minDate: depCurrDate.add(1, 'd'),
		maxDate: depMaxDate,
		defaultDate:depCurrDate,
		icons: {

            //date: 'glyphicon glyphicon-calendar',
            up: 'icon icon-HT_lrg-chevron-up',
            down: 'icon icon-HT_lrg-chevron-down',
            previous: 'icon icon-HT_lrg-chevron-left',
            next: 'icon icon-HT_lrg-chevron-right',
            // today: 'glyphicon glyphicon-screenshot',
            // clear: 'glyphicon glyphicon-trash',
            // close: 'glyphicon glyphicon-remove'


        }
	}).on('dp.change', function(e){
		$('input[id^="departuredate_"]').val(e.date.format('DD/MM/YYYY'));
	
		displaySelectdDateTime('js-departure-selected', e.date.format('MMMM DD').toString(), $('select[id^="departurehour_"]').val() + ':' + $('select[id^="departureminute_"]').val())
		 
		//Change return calendar min and max dates
		departureDatepicker.data("DateTimePicker").hide();

		//departureDatepicker.data("DateTimePicker").minDate(e.date);
		departureDatepicker.data("DateTimePicker").maxDate(e.date.add(5, 'y'));
		departureDatepicker.data("DateTimePicker").show();
	});

	//$('select[id^="departurehour_"], select[id^="departureminute_"]')

	$('select[id^="departurehour_"], select[id^="departureminute_"]').change(function() {
		//console.log(this);


		var departureDate = moment($('input[id^="departuredate_"]').val(), 'DD/MM/YYYY');

		// var pickDate = moment($('#returndate').val(), 'DD/MM/YYYY');

		// displaySelectdDateTime('js-departure-selected', departureDate.format('MMMM DD').toString(), $('select[id^="departurehour_"]').val() + ':' + $('select[id^="departureminute_"]').val())

		displaySelectdDateTime('js-departure-selected', departureDate.locale(language).format('MMMM DD').toString(), $('select[id^="departurehour_"]').val() + ':' + $('select[id^="departureminute_"]').val())
	});

} // tailormadepage

});