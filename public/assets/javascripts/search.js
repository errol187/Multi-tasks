 var allow_same_date_return = false;

 $(document).ready(function($) {

 	$(".mod__dtp").on("click", function(e){
 		e.stopPropagation();
 	})
 		
 	if($('#pickupdate').length)
 	{
	 	//Load date pickers
		var currDate = moment();
	 	var maxDate = moment().add(5, 'y');
		var pickupDate = moment();

		if (typeof language == 'undefined') {
			language = 'en';
		} else if(language == 'zh') {
			language = 'zh-cn';
		}
		
	 	if($('#pickupdate').length && $('#pickupdate').val() != '')
	 	{
	 		currPickupDate = moment($('#pickupdate').val(), 'DD/MM/YYYY');
	 		if(currPickupDate.isValid() && currPickupDate > pickupDate)
	 		{
	 			pickupDate = currPickupDate;
	 		}
	 	}
	 	
	 	var dtPickupSelectedHour, dtReturnSelectedHour, dtPickupSelectedMin, dtReturnSelectedMin;
	 	
	 	dtPickupSelectedHour = $("#pickuphour").on("change", function(e){
	 		return "at " + $("#dtPickupSelectedHour").text( this.value.toString());
	 	});
	 	
	 	dtPickupSelectedMin = $("#pickupmin").on("change", function(e){
	 		return $("#dtPickupSelectedMin").text( this.value.toString());
	 	});
	 	
	 	dtReturnSelectedHour = $("#returnhour").on("change", function(e){
	 		return "at " + $("#dtReturnSelectedHour").text( this.value.toString());
	 	});
	 	
	 	dtReturnSelectedMin = $("#returnmin").on("change", function(e){
	 		return $("#dtReturnSelectedMin").text( this.value.toString());
	 	});
	 	
		var pickupDatepicker = $('#pickupdatepicker').datetimepicker({
			locale: language,	
			format: 'DD/MM/YYYY',
			inline: true,
			useCurrent: true,
			minDate: currDate.add(1, 'd'),
			maxDate: maxDate,
			defaultDate:pickupDate.format('YYYY-MM-DD'),
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

			// set date format of input field
			$('#pickupdate').val(e.date.format('DD/MM/YYYY'));

			// display summary of date as string
			displaySelectdDateTime('js-pickup-selected', e.date.format('MMMM DD').toString(), $('#pickuphour').val() + ':' + $('#pickupmin').val());
			combinedDateTime('pickupdate', e.date.format('DD/MM/YYYY').toString(), $('#pickuphour').val() + ':' + $('#pickupmin').val());
			ga('send', 'event', 'Gateway to Hotel Form', 'Pickup Date', e.date.format('DD/MM/YYYY') + '', {'nonInteraction': 1});

			//Change return calendar min and max dates
			returnDatepicker.data("DateTimePicker").hide();
			returnDatepicker.data("DateTimePicker").minDate(e.date);
			returnDatepicker.data("DateTimePicker").maxDate(e.date.add(5, 'y'));
			returnDatepicker.data("DateTimePicker").show();

			// $("body").data("RetMinDate", e.date);
			// $("body").data("RetMaxDate", e.date.add(5, 'y'));

		});

		var returnDate = moment($('#returndate').val(), 'DD/MM/YYYY');

		if(!returnDate.isValid())
		{
			returnDate = pickupDate.add(7, 'd');
		}
		maxDate = moment().add(5, 'y');

		var returnDatepicker = $('#returndatepicker').datetimepicker({
			locale: language,
			format: 'DD/MM/YYYY',
			inline: true,
			useCurrent: true,
			minDate: currDate.add(2, 'days'),
			maxDate: maxDate,
			defaultDate: returnDate.format('YYYY-MM-DD'),
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

			$('#returndate').val(e.date.format('DD/MM/YYYY'));

			displaySelectdDateTime('js-return-selected', e.date.format('MMMM DD').toString(), $('#returnhour').val() + ':' + $('#returnmin').val());
			combinedDateTime('returndate', e.date.format('DD/MM/YYYY').toString(), $('#returnhour').val() + ':' + $('#returnmin').val());

			ga('send', 'event', 'Gateway to Hotel Form', 'Pickup Date', e.date.format('DD/MM/YYYY') + '', {'nonInteraction': 1});
		});
 	}

 	//Update min and max range for return date picker
 	$('#bookingtypereturn, #bookingtypeid').change(function() {
 		var pickupDate = moment($('#pickupdate').val(), 'DD/MM/YYYY');

		//Change return calendar min and max dates
		returnDatepicker.data("DateTimePicker").hide();
		returnDatepicker.data("DateTimePicker").minDate(pickupDate);
		returnDatepicker.data("DateTimePicker").maxDate(pickupDate.add(5, 'y'));
		returnDatepicker.data("DateTimePicker").show();
 	});

 	$('#bookingtypereturn, #bookingtypesinglefromairport, #bookingtypesinglefromresort').click(function() {
 		var currClicked = $(this).attr('id');
 		var needReverting = false;
 		var bookingTypeId = $('#bookingtypeid').val();

 		if(currClicked == 'bookingtypesinglefromresort' || currClicked == 'bookingtypesinglefromairport') {
 			$('#returndatepicker').data("DateTimePicker").hide();
 			$('[data-datepicker=".return-date-time-picker"]').parent().css('opacity', .5);
 		}

 		if(currClicked == 'bookingtypereturn' ) {
 			$('[data-datepicker=".return-date-time-picker"]').parent().css('opacity', 1);
 		}


 		if(currClicked == 'bookingtypesinglefromresort' && (bookingTypeId == '1' || bookingTypeId == '2'))
 		{
 			needReverting = true;
 		}
 		else if((currClicked == 'bookingtypereturn' || currClicked == 'bookingtypesinglefromairport') && bookingTypeId == '3')
 		{
 			needReverting = true;
 		}

 		if(needReverting)
 		{
 			var hFields = ['name', 'oname', 'ids', 'placeid', 'country', 'latitude', 'longitude', 'gatewaytypeid', 'gatewaytype'],
			tmp = [];

			$.each(hFields, function( index, value ) {
				tmp[value] = $('input[name=pickup_' + value + ']').val();
				$('input[name=pickup_' + value + ']').val($('input[name=dropoff_' + value + ']').val());
				$('input[name=dropoff_' + value + ']').val(tmp[value]);
			});

			tmp['fromtype'] = $('#fromtype').val();

			$('#fromtype').val($('#totype').val());
			$('#totype').val(tmp['fromtype']);

			var tmp = $('input[id=pickup_name').attr('placeholder');
			$('input[id=pickup_name').attr('placeholder', $('input[id=dropoff_name').attr('placeholder'));
			$('input[id=dropoff_name').attr('placeholder', tmp);

			tmp = $('input[id=pickup_name').data('error');
			$('input[id=pickup_name').data('error', $('input[id=dropoff_name').data('error'));
			$('input[id=dropoff_name').data('error', tmp);

 		}

 		if($(this).data('bookingtypeid') != bookingTypeId)
 		{
 			$('#bookingtypeid').val($(this).data('bookingtypeid'));
			ga('send', 'event', 'Gateway to Hotel Form Radio Buttons', 'Gateway', $('#pickup_oname').val() + '|' +  $('#pickup_name').val() + '|'  + $('#dropoff_name').val() + '|' + getBookingType(), {'nonInteraction': 1});
 		}
 	});

	 //Disable departue date if single
 	$('#bookingtypereturn, #bookingtypesingle').change(function() {
 		if($(this).val() == 'single')
 		{
 			$(".departuredatetime").addClass('hidden');
 			$('#returndate').attr('type', 'hidden');
 			
 			if($('#bookingtypeid').val() == '1') {
	 			$('#bookingtypeid').val('2');
 			}
 		}
 		else
 		{
 			$('#bookingtypeid').val('1');
 			$(".departuredatetime").removeClass('hidden');
 			$('#returndate').attr('type', 'text');
 			$('#returndate').prop('disabled', 'disabled');	
 		}
 	});

	$('#transfer_search').validator().on('submit', function (e) {
		
		if (e.isDefaultPrevented()) {
			// handle the invalid form...t
			return false;
		} else {
			
			$('.js-search-results').html('');
			
			// If summary functionalit has been performed
			$('#bookingSummaryScroll, .comp__search--hero').removeClass('hidden');

			$('.js-search-form-wrapper').addClass('hidden');
			$('.comp__search--form, .comp__search--hero').addClass('hidden');

			// $('.comp__search--form, .comp__search--hero').addClass('hidden');

			$('.mod__search--summary-button--text').text($('.mod__search--summary-button--text').data('changesearch'));

			e.preventDefault();
			
			//Search for transfers
			var bookingTypeId = 2;
			var arrivalDateTime = arrivaldate(true);
			var returnDateTime = null;

			var airportgroupid = '';

			//Store the rest of the hidden values
			var pickup_name              = '';

			var pickup_oname             = '';
			var pickup_ids               = '';
			var pickup_country           = '';
			var pickup_latitude          = '';
			var pickup_longitude         = '';
			var pickup_gatewaytypeid     = '';
			var pickup_gatewaytype       = '';
			var dropoff_name             = '';
	
			var dropoff_oname            = '';
			var dropoff_ids              = '';
			var dropoff_placeid          = '';
			var dropoff_country          = '';
			var dropoff_latitude         = '';
			var dropoff_longitude        = '';
			var dropoff_gatewaytypeid    = '';
			var dropoff_gatewaytype      = '';

			var dropoff_ttiicode         = '';
			var pickup_name_placeholder  = '';
			var dropoff_name_placeholder = '';
			var formType = ''


			if($(this).hasClass('js-places-search-form'))
			{
				formType = 'g2h';
				var pickupLocations = $('#pickup_ids').val();
				var pickupId = 0;
				pickupLocations = pickupLocations.split('|');
				
				var dropoffLocations = $('#dropoff_ids').val();
				var dropoffId = 0;
				dropoffLocations = dropoffLocations.split('|');

				if($('#pickup_gatewaytype').val() == 'pickup')
				{
					pickupId = pickupLocations[0];
					dropoffId = dropoffLocations[1];
					bookingTypeId = 2;

				}
				else if($('#pickup_gatewaytype').val() == 'dropoff')
				{
					pickupId = pickupLocations[1];
					dropoffId = dropoffLocations[0];
					bookingTypeId = 3;
				}

				if($('#bookingtypereturn').is(':checked'))
				{
					returnDateTime = returndate(true);
					bookingTypeId = 1;
				}

				pickup_name              = $('#pickup_name').val();
				
				pickup_oname             = $('#pickup_oname').val();
				pickup_ids               = $('#pickup_ids').val();
				pickup_country           = $('#pickup_country').val();
				pickup_latitude          = $('#pickup_latitude').val();
				pickup_longitude         = $('#pickup_longitude').val();
				pickup_gatewaytypeid     = $('#pickup_gatewaytypeid').val();
				pickup_gatewaytype       = $('#pickup_gatewaytype').val();
				dropoff_name             = $('#dropoff_name').val();
				
				dropoff_oname            = $('#dropoff_oname').val();
				dropoff_ids              = $('#dropoff_ids').val();
				dropoff_placeid          = $('#dropoff_placeid').val();
				dropoff_country          = $('#dropoff_country').val();
				dropoff_latitude         = $('#dropoff_latitude').val();
				dropoff_longitude        = $('#dropoff_longitude').val();
				dropoff_gatewaytypeid    = $('#dropoff_gatewaytypeid').val();
				dropoff_gatewaytype      = $('#dropoff_gatewaytype').val();

				dropoff_ttiicode         = $('#dropoff_ttiicode').val();
				pickup_name_placeholder  = $('#pickup_name').attr('placeholder');
				dropoff_name_placeholder = $('#dropoff_name').attr('placeholder');
				
				ga('send', 'event', 'Gateway to Hotel Form', 'Submitting Quote', 'Click', {'nonInteraction': 1});
			}
			else // fallback form
			{
				formType = 'fallback';
				bookingTypeId = $('#bookingtypeid').val();

				if(bookingTypeId == '1')
				{
					returnDateTime = returndate(true);
					$('#totype').val('RST');
				}
				else if(bookingtypeid == '2')
				{
					$('#totype').val('RST');
				}

				pickupId = $('#pickup').val();
				dropoffId = $('#dropoff').val();
				airportgroupid = $('#airportgroupid').val();

				ga('send', 'event', 'Original Search Form', 'Submitting Quote', 'Click', {'nonInteraction': 1});
			}

			var key = 'search_' + bookingTypeId
				+ '_' + arrivalDateTime
				+ '_' + returnDateTime
				+ '_' + $('#adults').val()
				+ '_' + $('#children').val()
				+ '_' + $('#infants').val()
				+ '_' + pickupId
				+ '_' + dropoffId
				+ '_' + airportgroupid
				+ '_' + $('#fromtype').val()
				+ '_' + $('#totype').val();

			if(!isLocalStorageExpired(key))
			{
				data = localStorage[key];

				//hide seach form and show search summary
				populateSummarySection();
				$('.js-search-summary-wrapper').removeClass('hidden');
				$('.comp__search--form, .comp__search--hero').addClass('hidden');

				setTimeout(function(){ 
					$('.js-search-form-wrapper').removeClass('hidden');
					// $('.js-search-results').removeClass('loading-results');
					hTaxis.fix.init();
				}, 500);

				$('.js-search-results').html(data);
				scrollTo($("body"));

				if (window.matchMedia("(min-width: 768px)").matches) {
					console.log ("LOCALSTORAGE: MATCHMEDIA MIN WIDTH = 768", $('[data-vehicles="vehicles"]'));
				        //$("select[data-passengers]").prop('disabled', false);  
				        $("select[data-passengers]").prop('readonly', false);  
				}
				return;
			}

			//Search 
			$.ajax({
				type : "POST",
				url : "/ajax/searchproducts",
				data: {
					'bookingtypeid':            bookingTypeId,
					'pickupdatetime':           arrivalDateTime,
					'returndatetime':           returnDateTime,
					'adults':                   $('#adults').val(),
					'children':                 $('#children').val(),
					'infants':                  $('#infants').val(),
					'pickupid':                 pickupId,
					'dropoffid':                dropoffId,
					'airportgroupid':           airportgroupid,
					'fromtype':                 $('#fromtype').val(),
					'totype':                   $('#totype').val(),
					'pickup_name':              pickup_name,
					'pickup_oname':             pickup_oname,
					'pickup_ids':               pickup_ids,
					'pickup_country':           pickup_country,
					'pickup_latitude':          pickup_latitude,
					'pickup_longitude':         pickup_longitude,
					'pickup_gatewaytypeid':     pickup_gatewaytypeid,
					'pickup_gatewaytype':       pickup_gatewaytype,
					'dropoff_name':             dropoff_name,
					'dropoff_oname':            dropoff_oname,
					'dropoff_ids':              dropoff_ids,
					'dropoff_placeid':          dropoff_placeid,
					'dropoff_country':          dropoff_country,
					'dropoff_latitude':         dropoff_latitude,
					'dropoff_longitude':        dropoff_longitude,
					'dropoff_gatewaytypeid':    dropoff_gatewaytypeid,
					'dropoff_gatewaytype':      dropoff_gatewaytype,
					'pickup_name_placeholder':  pickup_name_placeholder,
					'dropoff_name_placeholder': dropoff_name_placeholder,
					'dropoff_ttiicode':         dropoff_ttiicode
				},
				async : true,
				success : function (data) {
					if(data != 'error')
					{
						//hide seach form and show search summary
						populateSummarySection();
						$('.js-search-summary-wrapper').removeClass('hidden');
						$('.comp__search--form, .comp__search--hero').addClass('hidden');
						
						setTimeout(function(){ 
							$('.js-search-form-wrapper').removeClass('hidden');
							//$('.mod__booking--summary').removeClass('loading-results'); 
							//$('.js-search-results').removeClass('loading-results');

							hTaxis.vehicles.init();
							// Initilais Waypoint
							// This is needed to fix dynamic elements after Ajax request
							hTaxis.fix.init();
							if (window.matchMedia("(min-width: 768px)").matches) {
								console.log ("AJAX: MATCHMEDIA MIN WIDTH = 768", $('[data-vehicles="vehicles"]'));
						        //$("select[data-passengers]").prop('disabled', false);  
						        //$("select[data-passengers]").prop('readonly', false);  
						        $("select[data-vehicles]").prop('disabled', false);
						      }

						}, 1000);

						$('.js-search-results').html(data);
						scrollTo($("body"));
						// scrollTo($('.js-change-search.mod__search--summary-button--text'));
						// 
						ga('send', 'pageview', '/' + language + '/search/' + formType + '/success/' + $('#fromurlname').val() + '/' + $('#tourlname').val());

						//if(localStorage && key)
							if(use_cache && !isLocalStorageExpired(key))
						{
							localStorage[key + '_Timestamp'] = Math.round(new Date().getTime() / 1000);
							localStorage[key] = data;
						}
					}
					else
					{
						var fromText = '';
						var toText = '';

						if($('.js-places-search-form').length)
						{
							fromText = stripLocationText($('#pickup_name').val());
							toText = stripLocationText($('#dropoff_name').val());
						}
						else
						{
							if($('#bookingtypeid').val() == '3')
							{
								toText = stripLocationText($('#airportgroupid').val()) + '-' + stripLocationText($('#pickup').val());
								fromText = stripLocationText($('#dropoff').val());

							}
							else
							{
								fromText = stripLocationText($('#airportgroupid option:selected').text()) + '-' + stripLocationText($('#pickup option:selected').text());
								toText = stripLocationText($('#dropoff option:selected').text());
							}
						}

						ga('send', 'pageview', '/' + language + '/search/' + formType + '/fail/' + fromText + '/' + toText);
						
						var redirectUrl = $('#no-results-redirect').val();
						window.location.href = redirectUrl;
					}
				}
			});


			// //----------
			// // Empty To from Box
			// //----------
			// if($('#pickup_ids').val() == '' || $('#dropoff_ids').val() == '')
			// {
			// 	e.preventDefault();

			// 	if($('#pickup_ids').val() == '')
			// 	{
			// 		$('#pickup_name').parents('.to-from').addClass('has-error');
			// 		gatewaytype = $('#pickup_gatewaytype').val();
			// 		$('.to-from-error.pickup').html(
			// 			(gatewaytype == 'dropoff')
			// 			 ? $('.places-errors-list .missing-hotel').html()
			// 			 : $('.places-errors-list .missing-airport').html()
			// 		).show();
			// 	}

			// 	if($('#dropoff_ids').val() == '' )
			// 	{
			// 		$('#dropoff_name').parents('.to-from').addClass('has-error');
			// 		gatewaytype = $('#dropoff_gatewaytype').val();
			// 		$('.to-from-error.dropoff').html(
			// 			(gatewaytype == 'pickup')
			// 			 ? $('.places-errors-list .missing-airport').html()
			// 			 : $('.places-errors-list .missing-hotel').html()
			// 		).show();
			// 	}
			// }
			// else
			// {

			// 	//----------
			// 	// Dialogs for search error inducing user values
			// 	//----------
			// 	if($('#return_transfer:checked').length > 0 && $('#pickup_gatewaytype').val() == 'dropoff')
			// 	{
			// 		e.preventDefault();
			// 		$(".inbound-return").dialog("open");
			// 	}
			// 	else if($('#return_transfer:checked').length > 0 && returndate().getTime() == arrivaldate().getTime() && !allow_same_date_return)
			// 	{
			// 		e.preventDefault();
			// 		$(".same-day-return").dialog("open");
			// 	}
			// }
			

			//----------
			// Date Errors
			//----------
			tomorrow = moment().add(1, 'days');

			if(arrivaldate() < tomorrow)
			{
				e.preventDefault();
				$('#pickupdate').parents('.calendar_field').addClass('has-error');

				$('.calendar-field-error.arrival').html(
					$('.places-errors-list .arrival-date-less-than-twenty-four-hours').html()
				).show();
			}

			if($('#return_transfer:checked').length > 0 && returndate() < arrivaldate())
			{
				e.preventDefault();
				$('#departuredate').parents('.calendar_field').addClass('has-error');

				$('.calendar-field-error.departure').html(
					$('.places-errors-list .departure-date-before-arrival').html()
				).show();
			}
			else if($('#return_transfer:checked').length > 0 && returndate() < tomorrow)
			{
				e.preventDefault();
				$('#departuredate').parents('.calendar_field').addClass('has-error');

				$('.calendar-field-error.departure').html(
					$('.places-errors-list .departure-date-before-today').html()
				).show();
			}
			
		 // END: Search for transfers

		}

	});

 	//Hide summary section and show seach section
 	$('.js-change-search').click(function(e) {
 		e.preventDefault();
 		var wmedia = window;
	 	var showSearch = $('.mod__search--summary-button--text').data('showsearch');
	 	var buttonText = $('.mod__search--summary-button--text').text();
 		
 		if (window.matchMedia("(min-width: 768px)").matches) {
			console.log(wmedia)
 			if ($(".comp__search--form").hasClass("hidden"))  {
				$('.comp__search--form').toggleClass('hidden');
				$('.mod__search--summary-button--text').text($('.mod__search--summary-button--text').data('hidesearch'));
				scrollTo($("body"));
			} else {
				$('.comp__search--form').toggleClass('hidden');
				$('.mod__search--summary-button--text').text($('.mod__search--summary-button--text').data('changesearch'));
				scrollTo($("body"));
			}

 		} else {

			console.log(wmedia)
	 		

 	// 	if ($("#bookingSummaryScroll").hasClass("hidden")){
		// 	$('#bookingSummaryScroll, .comp__search--hero').removeClass('hidden');
		// 	//$('.js-search-form-wrapper').addClass('hidden');
		// 	$('.comp__search--form, .comp__search--hero').addClass('hidden ');

		// 	$('.mod__search--summary-button--text').text($('.mod__search--summary-button--text').data('changesearch'));
		// 	// scrollTo($("body"));
		// 	// $('#Search_Summary_Affix').removeClass('showsearch');
		// 	// $('#Search_Summary_Affix .bookingsummary').css('position', 'fixed');
		// // $('#Search_Summary_Affix .bookingsummary').css('z-index', '9');
		// 	scrollTo($("body"));
			
			
		// } else {
		// 	$('#bookingSummaryScroll, .comp__search--hero').addClass('hidden');
		// 	// $('.js-search-form-wrapper').removeClass('hidden');
		// 	$('.comp__search--form, .comp__search--hero').removeClass('hidden');
		// 	$('.mod__search--summary-button--text').text($('.mod__search--summary-button--text').data('hidesearch'));
		// 	scrollTo($("body"));

		// };

			if (showSearch == buttonText) {
				scrollTo($("body"));
				return;
			} else if ($("#bookingSummaryScroll").hasClass("hidden")) {
				$('#bookingSummaryScroll, .comp__search--hero').removeClass('hidden');
				$('.comp__search--form, .comp__search--hero').addClass('hidden ');
				$('.mod__search--summary-button--text').text($('.mod__search--summary-button--text').data('changesearch'));
				scrollTo($("body"));

			} else {
				$('#bookingSummaryScroll, .comp__search--hero').addClass('hidden');
				$('.comp__search--form, .comp__search--hero').removeClass('hidden');
				$('.mod__search--summary-button--text').text($('.mod__search--summary-button--text').data('hidesearch'));
				scrollTo($("body"));
			};
		};
 	});
 	
 		
			
	
 	//Auto completion tranfser search places
 	var cache = {
		data: {},
		get: function (key) {
			return cache.data[key];
		},
		set: function (key, cachedData, callback) {
			cache.unset(key);
			cache.data[key] = cachedData;
			if ($.isFunction(callback)) callback(cachedData);
		},
		unset: function (key) {
			delete cache.data[key];
		},
		clear: function (key) {
			cache.data = {};
		},
		exists: function (key) {
			return cache.data.hasOwnProperty(key) && cache.data[key] !== null;
		},
	}


	var use_cache = false;
	 $.ui.autocomplete.prototype._renderItem = function(ul, item)
	 {
	 	var term = this.term;
	 	itemclass = '';
	 	noresults = false;
	 	//brackets and question marks mess up regex
	 	var t = '';
	 	if(item.label == 'No results found.')
	 	{
	 		t = '<span class="secondary_highlight ui-corner-all" style="background-image: none;	border: none; border-radius: 0;	height: 30px; line-height: 30px; padding: 0 10px; color: #666666; overflow: hidden; text-decoration: none; display: block; min-height: 0; font-weight: 400;">' + item.label + '</span>';
	 		noresults = true;
	 	}
	 	else if(typeof item.matched_substrings !== 'undefined')
	 	{
	 		//text highlighting
	 		pieces = [];
	 		for (var i = 0; i < item.matched_substrings.length; i++) {
	 			if(i > 0)
	 			{
	 				//text bewtween highlighting
	 				pieces.push( item.label.substring(item.matched_substrings[i-1].offset + item.matched_substrings[i-1]['length'], item.matched_substrings[i].offset) + '<span class="text_highlight">' );
	 			}
	 			else
	 			{
	 				//text before any highlighting
	 				pieces.push( item.label.substring(0, item.matched_substrings[i].offset) + '<span class="text_highlight">' );
	 			}
	 			//the highlighted piece
	 			pieces.push( item.label.substring(item.matched_substrings[i].offset, item.matched_substrings[i].offset + item.matched_substrings[i]['length']) + '</span>' );
	 			//stick on the last piece
	 			if(i == 0);
	 			{
	 				pieces.push( item.label.substring(item.matched_substrings[i].offset + item.matched_substrings[i]['length'], item.label.length) );
	 			}
	 		};
	 		//put it all back together again
	 		for (var i = 0; i < pieces.length; i++) {
	 			t += pieces[i];
	 		};
	 		pieces = t.split(',');
	 		pieces[1] = '<span class="secondary_highlight">' + pieces[1];
	 		pieces = pieces.join(',');
	 		pieces += '</span>';
	 		t = pieces;
	 	}
	 	else
	 	{
	 		var w = term.match(/\s/, 'gi'),
	 		icon = '',
	 		address = '',
	 		style = '';

			if (typeof item.gatewaytypeid != 'undefined' && item.gatewaytypeid != 0)
			{
				icon = '<div style="float:left; margin-top:5px"><img style="margin-right:5px" src="/images/default/gateway_icons/' + item.gatewaytypeid + '.png"></div>';
			}

	 		term = term.split('(').join('');
			term = term.split(')').join('');
			term = term.split('[').join('');
			term = term.split(']').join('');
			term = term.split('?').join('');
	 		term = term.split(' ').join('|');

	 		var regex = new RegExp("^(" + term + ")", "gi");

	 		if (item.label.match(regex, 'gi')
	 			&& ! w) {
	 			t = item.label.replace(regex, '<span class="text_highlight">$1</span>');
	 		} else {
				var re = new RegExp("(" + term + ")", "gi");
				t = item.label.replace(re, '<span class="text_highlight">$1</span>');
				if(typeof t !== 'undefined')
				{
					pieces = t.split(',');
					if ( typeof pieces[1] !== 'undefined' )
					{
						pieces[1] = '<span class="secondary_highlight">' + pieces[1];
					}
		 			pieces = pieces.join(',');
		 			pieces += '</span>';
		 			t = pieces;
				}
			}
	 	}
		return $( "<li></li>" )
			.data( "item.autocomplete", item )
			.append( ((noresults) ? t : "<a" + style + itemclass + ">" + icon + t + address + "</a>") )
			.appendTo( ul );
	};


	jQuery.ui.autocomplete.prototype._resizeMenu = function () {
		var ul = this.menu.element;
		ul.outerWidth(this.element.parent().outerWidth());
	}

	//Clear return values
	$('#pickup_name').on('input', function (event) {
		$('#dropoff_name, #dropoff_ids, #dropoff_placeid, #dropoff_country, #dropoff_latitude, #dropoff_longitude, #dropoff_gatewaytypeid, #dropoff_ttiicode').val('');
	});

	$('#pickup_name').on('keyup keydown blur focus', function (event) {
		if ($(this).val() == '') {
			$('#pickup_ids, #pickup_placeid, #pickup_country, #pickup_latitude, #pickup_longitude, #pickup_gatewaytypeid, #pickup_ttiicode').val('');
		}
		if (typeof event.originalEvent != 'undefined'
			&& event.originalEvent.type == 'focus')
		{
			// $('#pickupOptions ul').css({display: 'block'});
		}
		if (typeof event.originalEvent != 'undefined'
			&& event.originalEvent.type == 'keyup')
		{
			$("input[name='pickup_oname']").val( $("input[name='pickup_name']").val() );
		}
	})



	$("#pickup_name").autocomplete(
	{
		create: function( event, ui )
		{
			if( $("#pickup_name").val() == '')
			{
				$('#pickup_ids, #pickup_placeid, #pickup_country, #pickup_latitude, #pickup_longitude, #pickup_gatewaytypeid').val('');
			}
		},
		response: function(event, ui)
		{
			if ( ui.content[0]["value"] == "No results found." && $('#pickup_gatewaytype').val() == 'pickup')
			{
				ga('send', 'event', 'Gateway to Hotel Form', 'Gateway – Unsuccessful', $('#pickup_oname').val() + '|' +  $('#dropoff_name').val() + '|' + getBookingType(true), {'nonInteraction': 1});
			}
			else if ( ui.content[0]["value"] == "No results found." && $('#pickup_gatewaytype').val() == 'dropoff')
			{
				ga('send', 'event', 'Gateway to Hotel Form', 'Hotel – Unsuccessful', $('#pickup_oname').val() + '|' +  $('#dropoff_name').val() + '|' + getBookingType(true), {'nonInteraction': 1});
			}
		},
		source: function(request, response) {
			var results,
			cacheKey = 'pickup' + $("input[name='dropoff_country']").val() + request.term;
			if (use_cache && cache.exists(cacheKey)) {
				results = cache.get(cacheKey);
				results.done(function(data, textStatus, jqXHR) {
					response($.map(data.results, function(item) {
						return item;
					}));
				});
			} else {

				var key = 'pickup_' + request.term;

				if(use_cache && !isLocalStorageExpired(key))
				{
					var results = $.parseJSON(localStorage[key]);
					response($.map(results, function(item) {
						return item;
					}));

					return;
				}

				results = $.getJSON("/en/ajax/searchlocations/", {
						term: request.term,
						element:'pickup',
						gatewaytype: $("input[name='pickup_gatewaytype']").val(),
						// these will all be empty as the
						// dropoff field is cleared by default
						// when you start typing.
						dropoff:$("input[name='dropoff']").val(),
						country: $("input[name='dropoff_country']").val(),
						latitude: $("input[name='dropoff_latitude']").val(),
						longitude: $("input[name='dropoff_longitude']").val(),
						gatewaytypeid: $("input[name='pickup_gatewaytypeid']").val()
					}).done(function(data, textStatus, jqXHR) {
						response($.map(data.results, function(item) {
							return item;
						}));
						cache.set(cacheKey, results);

						//if(localStorage && key)
							if(use_cache && !isLocalStorageExpired(key))
						{
							localStorage[key + '_Timestamp'] = Math.round(new Date().getTime() / 1000);
							localStorage[key] = JSON.stringify(data.results);
						}
					});

			}
		},
		minLength: 1,
		// delay: 300,
		delay: 1000,
		appendTo: "#pickupOptions",
		position: { my: "left top", at: "left bottom", of: "#pickupOptions" },
		select: function( event, ui )
		{
			//--------------
			// Empty out current pickup information
			//--------------
			$('#pickup_name, #pickup_ids, #pickup_placeid, #pickup_country, #pickup_latitude, #pickup_longitude, #pickup_gatewaytypeid, #pickup_ttiicode').val('');

			if (ui.item.value == "No results found.")
			{
				return false;
			}

			if(typeof ui.item.place_id !== 'undefined')
			{
				$('#pickup_placeid').val(ui.item.place_id);
			}


			//---------------
			// Populate fields with selected item info
			//---------------

			if(typeof ui.item.short_label !== 'undefined') {
				$("#pickup_name").val(ui.item.short_label);
			} else {
				$("#pickup_name").val(ui.item.label);
			}

			if(typeof ui.item.airportid !== 'undefined')
			{
				$('#pickup_ids').val(ui.item.airportid);
			}
			if(typeof ui.item.resortid !== 'undefined')
			{
				$('#pickup_ids').val($('#pickup_ids').val() + '|' + ui.item.resortid);
			}
			if(typeof ui.item.countrycode !== 'undefined')
			{
				$('#pickup_country').val(ui.item.countrycode);
			}
			if(typeof ui.item.latitude !== 'undefined')
			{
				$('#pickup_latitude').val(ui.item.latitude);
			}
			if(typeof ui.item.longitude !== 'undefined')
			{
				$('#pickup_longitude').val(ui.item.longitude);
			}
			if(typeof ui.item.gatewaytypeid !== 'undefined')
			{
				$('#pickup_gatewaytypeid').val(ui.item.gatewaytypeid);
			}
			if(typeof ui.item.gatewaytypeid !== 'undefined')
			{
				$('#pickup_gatewaytypeid').val(ui.item.gatewaytypeid);
			}
			if(typeof ui.item.airportgatewaytypecode !== 'undefined')
			{
				$('#pickup_gatewaytypecode').val(ui.item.airportgatewaytypecode);
			}


			//--------------
			// Google Analytics for user selection
			//--------------
			var gateWayType = 'airport';
			if($('#pickup_gatewaytype').val() == 'pickup')
			{
				ga('send', 'event', 'Gateway to Hotel Form', 'Gateway', $('#pickup_oname').val() + '|' +  $('#pickup_name').val() + '|'  + $('#dropoff_name').val() + '|' + getBookingType(true), {'nonInteraction': 1});
			}
			else if($('#pickup_gatewaytype').val() == 'dropoff')
			{
				gateWayType = 'resort';
				ga('send', 'event', 'Gateway to Hotel Form', 'Hotel', $('#pickup_oname').val() + '|' +  $('#pickup_name').val() + '|'  + $('#dropoff_name').val() + '|' + getBookingType(true), {'nonInteraction': 1});
			}

			if(typeof ui.item[gateWayType + 'gatewaytypecode'] !== 'undefined')
			{
				$('#fromtype').val(ui.item[gateWayType + 'gatewaytypecode']);
			}

			//Re-enable dropoff
			if($('.js-places-search-form #dropoff_name').prop('disabled'))
			{
				$('.js-places-search-form #dropoff_name').prop('disabled', false);
				$('.js-places-search-form #dropoff_name').parent().css('opacity', 1);
			}

			//--------------
			// Clear Error Fields on select
			//--------------

			field = $(this).prop('id');
			field = field.substr(0, field.length -5)

			$('.to-from-error.'+field).html('').hide();
			return false;
		},
		change: function( event, ui )
		{
			if(ui.item == null)
			{
				$('#pickup_name, #pickup_ids, #pickup_placeid, #pickup_country, #pickup_latitude, #pickup_longitude, #pickup_gatewaytypeid, #pickup_ttiicode').val('');
				$('#dropoff_name, #dropoff_ids, #dropoff_placeid, #dropoff_country, #dropoff_latitude, #dropoff_longitude, #dropoff_gatewaytypeid, #dropoff_ttiicode').val('');
			}
		},
		close : function() {
			$('#pickupOptions ul').empty();

		}
		// TODO: Remove - Stop autocomplete disappearing
		// ,
		// close: function(event, ui) {
	 //        $('.ui-autocomplete').css('display', 'block')
	 //    }
	});








	//----------------------------------
	//  DROPOFF FIELDS
	//----------------------------------


	$('#dropoff_name').on('keyup keydown blur focus', function (event) {
		if ($(this).val() == '') {
			$('#dropoff_ids, #dropoff_placeid, #dropoff_country, #dropoff_latitude, #dropoff_longitude, #dropoff_gatewaytypeid, #dropoff_ttiicode').val('');
		}
		if (typeof event.originalEvent != 'undefined'
			&& event.originalEvent.type == 'focus')
		{
				// $('#dropoffOptions ul').css({display: 'block'});
		}
		if (typeof event.originalEvent != 'undefined'
			&& event.originalEvent.type == 'keyup')
		{
				$("input[name='dropoff_oname']").val( $("input[name='dropoff_name']").val() );
		}
	});

	$("#dropoff_name").autocomplete(
	{
		create: function( event, ui )
		{
			if( $("#dropoff_name").val() == '')
			{
				$('#dropoff_ids, #dropoff_placeid, #dropoff_country, #dropoff_latitude, #dropoff_longitude, #dropoff_gatewaytypeid, #dropoff_ttiicode').val('');
			}
		},
		response: function(event, ui)
		{
			if ( ui.content[0]["value"] == "No results found." && $('#dropoff_gatewaytype').val() == 'dropoff')
			{
				ga('send', 'event', 'Gateway to Hotel Form', 'Hotel – Unsuccessful', $('#dropoff_oname').val() + '|' +  $('#pickup_name').val() + '|' + getBookingType(true), {'nonInteraction': 1});

			}
			else if ( ui.content[0]["value"] == "No results found." && $('#dropoff_gatewaytype').val() == 'pickup')
			{
				ga('send', 'event', 'Gateway to Hotel Form', 'Gateway – Unsuccessful', $('#dropoff_oname').val() + '|' +  $('#pickup_name').val() + '|' + getBookingType(true), {'nonInteraction': 1});
			}
		},
		source: function(request, response) {
			var results,
			cacheKey = 'dropoff' + $("input[name='pickup_country']").val() + request.term;
			if (use_cache && cache.exists(cacheKey)) {
				results = cache.get(cacheKey);
				results.done(function(data, textStatus, jqXHR) {
					response($.map(data.results, function(item) {
							return item;
					}));
				});
			} else {

				var key = 'dropoff_' + request.term + '_' + $("input[name='pickup_ids']").val()
					+ '_' + $("input[name='pickup_country']").val()
					+ '_' + $("input[name='pickup_latitude']").val()
					+ '_' + $("input[name='pickup_longitude']").val()
					+ '_' + $("input[name='pickup_gatewaytypeid']").val()
					+ '_' + $("input[name='dropoff_gatewaytype']").val();

				if(use_cache && !isLocalStorageExpired(key))
				{
					var results = $.parseJSON(localStorage[key]);
					response($.map(results, function(item) {
						return item;
					}));

					return;
				}

				results = $.getJSON("/en/ajax/searchlocations/", {
					term: request.term,
					element:'dropoff',
					pickup:$("input[name='pickup_ids']").val(),
					country: $("input[name='pickup_country']").val(),
					latitude: $("input[name='pickup_latitude']").val(),
					longitude: $("input[name='pickup_longitude']").val(),
					gatewaytypeid: $("input[name='pickup_gatewaytypeid']").val(),
					gatewaytype: $("input[name='dropoff_gatewaytype']").val()
				}).done(function(data, textStatus, jqXHR) {
					response($.map(data.results, function(item) {
						return item;
					}));
					cache.set(cacheKey, results);

					//if(localStorage && key)
					if(use_cache && !isLocalStorageExpired(key))
					{
						localStorage[key + '_Timestamp'] = Math.round(new Date().getTime() / 1000);
						localStorage[key] = JSON.stringify(data.results);
					}
				});
			}
		},
		minLength: 1,
		// delay: 200,
		delay: 1000,
		appendTo: "#dropoffOptions",
		position: { my: "left top", at: "left bottom", of: "#dropoffOptions" },
		select: function( event, ui )
		{
			//Reveal rest of the form
			if($(".mod__dates").is(':hidden')) {
	 			$(".mod__dates").addClass('reveal-opacity');
	 			$(".mod__travellers").addClass('reveal-opacity');
	 		}


			//-----------
			// Clear currently selected values
			//-----------

			$('#dropoff_ids, #dropoff_placeid, #dropoff_country, #dropoff_latitude, #dropoff_longitude, #dropoff_gatewaytypeid, #dropoff_ttiicode').val('');

			//-----------
			// Populate with selected values
			//-----------

			if(typeof ui.item.short_label !== 'undefined'){
				$("#dropoff_name").val(ui.item.short_label);
			} else {
				$("#dropoff_name").val(ui.item.label);
			}

			if(typeof ui.item.place_id !== 'undefined')
			{
				$('#dropoff_placeid').val(ui.item.place_id);
			}
			if(typeof ui.item.resortid !== 'undefined')
			{
				$('#dropoff_ids').val(ui.item.airportid);
			}
			if(typeof ui.item.resortid !== 'undefined')
			{
				$('#dropoff_ids').val( $('#dropoff_ids').val() + '|' + ui.item.resortid);
			}
			if(typeof ui.item.countrycode !== 'undefined')
			{
				$('#dropoff_country').val(ui.item.countrycode);
			}
			if(typeof ui.item.latitude !== 'undefined')
			{
				$('#dropoff_latitude').val(ui.item.latitude);
			}
			if(typeof ui.item.longitude !== 'undefined')
			{
				$('#dropoff_longitude').val(ui.item.longitude);
			}
			if(typeof ui.item.gatewaytypeid !== 'undefined')
			{
				$('#dropoff_gatewaytypeid').val(ui.item.gatewaytypeid);
			}
			if(typeof ui.item.tticode !== 'undefined')
			{
				$('#dropoff_ttiicode').val(ui.item.tticode);
			}


			//--------------
			// Google Analytics tracking for user selection
			//--------------
			
			var gateWayType = 'airport';
			if($('#dropoff_gatewaytype').val() == 'dropoff')
			{	
				gateWayType = 'resort';
				ga('send', 'event', 'Gateway to Hotel Form', 'Hotel', $('#dropoff_oname').val() + '|' +  $('#dropoff_name').val() + '|'  + $('#pickup_name').val() + '|' + getBookingType(true), {'nonInteraction': 1});
			}
			else if($('#dropoff_gatewaytype').val() == 'pickup')
			{
				ga('send', 'event', 'Gateway to Hotel Form', 'Airport', $('#dropoff_oname').val() + '|' +  $('#dropoff_name').val() + '|'  + $('#pickup_name').val() + '|' + getBookingType(true), {'nonInteraction': 1});
			}

			if(typeof ui.item[gateWayType + 'gatewaytypecode'] !== 'undefined')
			{
				$('#totype').val(ui.item[gateWayType + 'gatewaytypecode']);
			}

			//--------------
			//	Clear Error Fields on select
			//--------------

			field = $(this).prop('id');
			field = field.substr(0, field.length -5)

			$('.to-from-error.'+field).html('').hide();
			return false;
		},
		change: function( event, ui )
		{
			if(ui.item == null)
			{
				$('#dropoff_name, #dropoff_ids, #dropoff_placeid, #dropoff_country, #dropoff_latitude, #dropoff_longitude, #dropoff_gatewaytypeid, #dropoff_ttiicode').val('');
			}
		},
		close : function() {
			$('#dropoffOptions ul').empty();
		}
		// TODO: Remove - Stop autocomplete disappearing
		// ,
		// close: function(event, ui) {
		//         $('.ui-autocomplete').css('display', 'block')
		//     }
	});

 	//Reset buttons
 	$('#reset-pickup, #reset-dropoff').click(function() {
		$(this).siblings('#dropoff_name, #dropoff_ids, #dropoff_placeid, #dropoff_country, #dropoff_latitude, #dropoff_longitude, #dropoff_gatewaytypeid, #dropoff_ttiicode, #pickup_name, #pickup_ids, #pickup_placeid, #pickup_country, #pickup_latitude, #pickup_longitude, #pickup_gatewaytypeid, #pickup_ttiicode').val('');

		// clear both fields when clearing the FROM box
		if($(this).attr('id') == 'reset_pickup')
		{
			$('#dropoff_name, #dropoff_ids, #dropoff_placeid, #dropoff_country, #dropoff_latitude, #dropoff_longitude, #dropoff_gatewaytypeid, #dropoff_ttiicode, #pickup_name, #pickup_ids, #pickup_placeid, #pickup_country, #pickup_latitude, #pickup_longitude, #pickup_gatewaytypeid, #pickup_ttiicode').val('');
		}
	});

	$('#pickuphour, #pickupmin').change(function() {
		var pickDate = moment($('#pickupdate').val(), 'DD/MM/YYYY');

		displaySelectdDateTime('js-pickup-selected', pickDate.lang(language).format('MMMM DD'), $('#pickuphour').val() + ':' + $('#pickupmin').val());
		combinedDateTime('pickupdate', pickDate.lang(language).format('DD/MM/YYYY').toString(), $('#pickuphour').val() + ':' + $('#pickupmin').val());

		ga('send', 'event', 'Gateway to Hotel Form', 'Pickup Time', $('#pickuphour').val() + ':' + $('#pickupmin').val() + '', {'nonInteraction': 1});
	});

	$('#returnhour, #returnmin').change(function() {
		var returnDate = moment($('#returndate').val(), 'DD/MM/YYYY');

		displaySelectdDateTime('js-return-selected', returnDate.lang(language).format('MMMM DD'), $('#returnhour').val() + ':' + $('#returnmin').val());
		combinedDateTime('returndate', returnDate.lang(language).format('DD/MM/YYYY').toString(), $('#returnhour').val() + ':' + $('#returnmin').val());

		ga('send', 'event', 'Gateway to Hotel Form', 'Return Time', $('#returnhour').val() + ':' + $('#returnmin').val() + '', {'nonInteraction': 1});
	});


	if($('#js-booknowclicked').length && $('#js-booknowclicked').val() == '1')
	{
		$('#js-booknowclicked').val('0');
		$('#js-booknow-btn').trigger('click');
	}

	//Display error if pickup name is empty
	$('.js-places-search-form #pickup_name, .js-places-search-form #dropoff_name').blur(function() {
		if($(this).val() == '')
		{
			$(this).parent().parent().addClass('has-error');

			if($(this).attr('id') == 'pickup_name')
			{
				$('.js-places-search-form #dropoff_name').prop('disabled', true);
				$('.js-places-search-form #dropoff_name').parent().css('opacity', .5);
			}
		}
		else
		{
			if($(this).attr('id') == 'pickup_name')
			{
				$('.js-places-search-form #dropoff_name').prop('disabled', false);
				$('.js-places-search-form #dropoff_name').parent().css('opacity', 1);
			}
		}
	});

 }); // End document.ready

 

/////////////////////////////////////////////////////////////////////////////////

// JavaScript Document
var isMobile = {
    Android : function() {
        return navigator.userAgent.match(/Android/i) ? true : false;
    },
    BlackBerry : function() {
        return navigator.userAgent.match(/BlackBerry/i) ? true : false;
    },
	iPad : function() {
		return navigator.userAgent.match(/iPad/i) ? true : false;
	},
    iOS : function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
    },
    Windows : function() {
        return navigator.userAgent.match(/IEMobile/i) ? true : false;
    },
    any : function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
    },
	platform : function() {
		if(this.Android()) return 'android';
		if(this.iOS()) {
			if(this.iPad()) return 'ios ipad';
			return 'ios iphone';
		}
		return 'others'
	}
};

//Check iOS version
function iOSversion() {
	if (/iP(hone|od|ad)/.test(navigator.platform)) {
		var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
		return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
	}
}



$(document).ready(function(){

	if( isMobile.any() )
	{
		// TAILORMADE FORM ELEMENTS
		$("#passenger_phone").attr("type", "tel");
		$("#contact_phone").attr("type", "tel");
		$("#contact_email").attr("type", "email");

		// BOOKING FORM ELEMENTS
		if ( $("#email").attr("type") != "hidden" )
		{
			$("#email").attr("type", "email");
		}
		$("#confirmemail").attr("type", "email");
		$("#mobile").attr("type", "tel");
		$("#cardnumber").attr("type", "number");
		$("#cardsecuritynumber").attr("type", "number");
		$("#issue_number").attr("type", "number");
		$("#elvsortcode").attr("type", "number");
		$("#elvaccountnumber").attr("type", "number");
		
		//TODO : debug and fix if needed
		//Hide total payable box when keyboard is on
		// if($('.totalbox').length)
		// {
		// 	$(document).on('focus','input, select, textarea', function() {
		// 		var ver = iOSversion();
		// 	        if(isMobile.iOS() && ver[0] && ver[0] > 7){
		// 	                if($(this).attr('readonly') === undefined){
		// 	                        $('.totalbox').hide()
		// 	                }
		// 	         }
		// 	});
		// 	$(document).on('blur','input, select, textarea', function(){
		// 		var ver = iOSversion();
		// 		if(isMobile.iOS() && ver[0] && ver[0] > 7){
		// 			if($(this).attr('readonly') === undefined){
		// 				$('.totalbox').show();
		// 			}
		// 		}
		// 	});
		// }
	}

	if ( $('[type="date"]').prop('type') != 'date' )
	{
		// default to jquery date picker if date is unsupported
		$('[type="date"]').datepicker();
	}


	$('#pickupdate, #returndate').change(function() {
		if($(this).hasClass('input_error'))
		{
			$(this).removeClass('input_error');
		}
	});

});

$(document).ready(function(){

	if( isMobile.iOS() || isMobile.Android() )
	{
		$('.hasDatepicker').each(function()
		{
			var dateval = $(this).val();
			dateval = dateval.split('-');

			$(this).datepicker('destroy');
			$(this).attr('type', 'date');

			$(this).val(dateval[2]+'-'+dateval[1]+'-'+dateval[0]);
		});
	}
});

$(document).ready(function(){

	$('#getQuoteBottom').click(function(){

		// $('#getQuoteBottom #change_search_button').toggleClass('changeQuoteBottomUp');
		// $('html, body').animate({ scrollTop: 0 }, 'fast');
		$(".voucher-promo-mayday15-mobile").animate({right: "20px"}, 800);
	});

});



// validation for Tailor Made contact form
$(document).ready(function(){
	$('#js-show-hide-search').click(function(e) {
		e.preventDefault();
		$('#transfer_search').toggleClass('hidden');
	});
});


function getCurrencyFormat(language_code, currency_code, amount, include_code)
{
	var return_amount = 0;

	$.ajax({
		url: '/en/ajax/formatmoney',
		type: 'POST',
		data: {value: amount, override_currency: currency_code, ajax: 1, include_code:include_code},
		async : false
	}).success(function(response){
		return_amount = response;
	});
	
	return return_amount;
}

$(document).ready(function()
{
	$("#dialogDepartureQuickQuote").dialog(
	{
		autoOpen: false,
		modal: true,
		draggable: false,
		resizable: false
	});
	$("#dialogArrivalQuickQuote").dialog(
	{
		autoOpen: false,
		modal: true,
		draggable: false,
		resizable: false
	});

	$("img#departure_time_message").click(function(){
		submitInfoClick($(this).attr('id'), 'departure time');
		$("#dialogDepartureQuickQuote").dialog('open');
		return false;
	});
	$("img#arrival_time_message").click(function(){
		submitInfoClick($(this).attr('id'), 'arrival time');
		$("#dialogArrivalQuickQuote").dialog('open');
		return false;
	});

	if($('#carbon_offset_message').length) {

		$("#dialogCarbonOffset").dialog(
		{
			autoOpen: false,
			modal: true,
			draggable: false,
			resizable: false
		});

		$("img#carbon_offset_message").click(function(){
			submitInfoClick('carbon_offset_message', 'carbon offset');
			$("#dialogCarbonOffset").dialog('open');

			return false;
		});
	}

	if($('#customer_email_message').length) {
		$("#dialogCustomerEmail").dialog(
		{
			autoOpen: false,
			modal: true,
			draggable: false,
			resizable: false,
			width: 600,
			maxHeight: 200
		});

		$("img#customer_email_message").click(function(){
			submitInfoClick('customer_email_message', 'agent customer voucher email address');
			$("#dialogCustomerEmail").dialog('open');

			return false;
		});
	}

	// Need to show dialog divs to attach dialog to them (css required to set display: none in case javascript fails)
	$(".more_information").css("display", "block");

	$(".more_information").dialog(
	{
		autoOpen: false,
		modal: true,
		draggable: false,
		resizable: false
	});
	// Need to hide dialog divs again
	$(".more_information").css("display", "none");

	$("img.more_information_link").click(function(){
		var productInfo = $(this).data('info');
		submitInfoClick(productInfo, 'product more info');

		var id = $(this).attr('id');
		$("#more-" + id).parent().children(".more_information").dialog('open');
		return false;
	});
});

function change_return(value)
{
	if($('#add_return:checked').length > 0)
	{
		$('#return').val('1');
		$('.departuredatetime').find('input,select').prop('disabled', false);
	}
	else
	{
		$('#return').val('0');
		$('.departuredatetime').find('input,select').prop('disabled', true);

	}
}

function type_change(value, language)
{
	var bookingtypeid = value;
	var airportgroupid = $("#airportgroupid").val();
	var bookingtypegatewaycode = null;


	if( bookingtypeid == 1 )
	{
		$('.arrivaldatetime').find('input,select').prop('disabled', false);
		$('.departuredatetime').removeClass('hidden');

		ga('send', 'event', 'Original Search Form', 'Booking Type', $('#bookingtypeid').find("option:selected").text(), {'nonInteraction': 1});
	}
	else if ( bookingtypeid == 2 || bookingtypeid == 3 )
	{
		$('.arrivaldatetime').find('input,select').prop('disabled', false);
		$('.departuredatetime').addClass('hidden');

		ga('send', 'event', 'Original Search Form', 'Booking Type', $('#bookingtypeid').find("option:selected").text(), {'nonInteraction': 1});
	}

	if ( airportgroupid != 0)
	{
		populatePickup(airportgroupid, bookingtypeid, bookingtypegatewaycode, language);
		$("#dropoff").empty();
		$("#dropoff").trigger("chosen:updated");
	}

	//Swap label
	if(bookingtypeid == 3)
	{
		$('#pickup').parent().prev().html($('#dropoff_label').val());
		$('#dropoff').parent().prev().html($('#pickup_label').val());
	}
	else if(bookingtypeid == 1 || bookingtypeid == 2)
	{
		$('#dropoff').parent().prev().html($('#dropoff_label').val());
		$('#pickup').parent().prev().html($('#pickup_label').val());
	}
}

function airport_group_change(airportgroupid, language)
{
	var bookingtypeid = $('#bookingtypeid').val();
	populatePickup(airportgroupid, bookingtypeid, null, language);

	ga('send', 'event', 'Original Search Form', 'Airport group name', $('#airportgroupid').find("option:selected").text(), {'nonInteraction': 1});
}

function pickup_change(pickup, language)
{
	var bookingtypeid = $("#bookingtypeid").val();
	var airportgroupid = $("#airportgroupid").val();
	
	var fromtype = $('#pickup').find(':selected').data('gateway-type-code');
	$('#fromtype').val(fromtype);

	populateDropoff(airportgroupid, pickup, bookingtypeid, null, language);

	ga('send', 'event', 'Original Search Form', 'Pickup', $('#pickup').find("option:selected").text(), {'nonInteraction': 1});
}
function dropoff_change(dropoff, language)
{
	var totype = $('#dropoff').find(':selected').data('gateway-type-code');
	$('#totype').val(totype);

	ga('send', 'event', 'Original Search Form', 'Dropoff', $('#dropoff').find("option:selected").text(), {'nonInteraction': 1});
}

function populateTransferTypes(typeid, language)
{
	$.ajax({
		url: htx_domain + '/' + language + '/search/gettransfertypes',
		type: 'POST',
		data: {typeid:typeid, ajax: 1},
		async: false
	}).success(function(response){
		var obj = $.parseJSON(response);
		var sel = $("#bookingtypeid");
		sel.empty();
		$.each(obj, function(i, item){
			sel.append('<option value="' + item.Id + '">' + item.Name + '</option>');
		});
		sel.removeAttr('disabled');
	});
}

function isLocalStorageExpired(key, currTimestamp)
{
	if(typeof currTimestamp == 'undefined')
	{
		currTimestamp = Math.round(new Date().getTime() / 1000);
	}

	var day = 86400;
	if( localStorage && localStorage[key] && localStorage[key] != '{}' && localStorage[key + '_Timestamp'] && parseInt( localStorage[key + '_Timestamp'] ) + day > currTimestamp)
	{
        	return false;
	}
	else
	{
		return true;
	}
}

function populatePickup(airportgroupid, bookingtypeid, bookingtypegatewaycode, language)
{
	var localStrKey = '';

	if(typeof affiliate_code !== 'undefined') {
		localStrKey = 'pickup_destinations_' + affiliate_code + '_' + agency_user_id + '_' + language + '_' + bookingtypeid + '_' + airportgroupid;
	}

	$("#fromtype").val("");

	$("#pickup").prop('disabled', true);
	$("#dropoff").prop('disabled', true);

	$("#pickup").empty();
	$("#dropoff").empty();

	if(typeof airportgroupid !== 'undefined' && typeof bookingtypeid !== 'undefined')
	{
		if( isLocalStorageExpired(localStrKey,null) )
		{
			var asyncFlag = false;
			if($('.mobileSearch').length)
			{
				asyncFlag = true;
			}

			if($('.loading-pickup').length)
			{
				$('.loading-pickup').removeClass('hide');
			}

			$.ajax({
				// url: htx_domain + '/' + language + '/search/getpickup',
				url: htx_domain + '/' + language + '/ajax/getpickup',
				type: 'GET',
				dataType: 'jsonp',
				jsonp: 'jsonp_callback',
				data: {airportgroupid: airportgroupid, bookingtypeid: bookingtypeid, bookingtypegatewaycode: bookingtypegatewaycode, ajax: 1},
				async: asyncFlag,
			}).success(function(response){
				populatePickupCallback(response);

				if( localStorage && localStrKey)
				{
					localStorage[localStrKey + '_Timestamp'] = Math.round(new Date().getTime() / 1000);
					localStorage[localStrKey] = JSON.stringify(response);
				}
			});
		}
		else
		{
			var options = $.parseJSON(localStorage[localStrKey]);
			populatePickupCallback(options);
		}
	}
}

function populatePickupCallback(options)
{
	var sel = $("#pickup");
	sel.empty();

	for (var item in options) {
		if(typeof options[item]['GatewayCode'] !== 'undefined')
		{
			sel.append('<option data-gateway-type-code="' + options[item]['GatewayCode'] + '" value="' + options[item]['Id'] + '">' + options[item]['Name'] + '</option>');
		}
		else if (options[item]['Name'])
		{
			sel.append('<option value="' + options[item]['Id'] + '">' + options[item]['Name'] + '</option>');
		}
	};

	sel.removeAttr('disabled');
	$("#dropoff").attr("disabled", "disabled");

	if($('.loading-pickup').length)
	{
		$('.loading-pickup').addClass('hide');
	}
}

function populateDropoff(airportgroupid, pickup, bookingtypeid, bookingtypegatewaycode, language)
{

	$("#dropoff").prop('disabled', true);

	$("#dropoff").empty();

	var localStrKey = '';

	if(typeof airportgroupid !== 'undefined' && typeof pickup !== 'undefined' && typeof bookingtypeid !== 'undefined')
	{
		if(typeof affiliate_code !== 'undefined') {
			localStrKey = 'dropoff_destinations_' + affiliate_code + '_' + agency_user_id + '_' + language + '_' + bookingtypeid + '_' + airportgroupid + '_' +  pickup;
		}

		if( isLocalStorageExpired(localStrKey,null) )
		{
			var asyncFlag = false;
			if($('.mobileSearch').length)
			{
				asyncFlag = true;
			}

			if($('.loading-dropoff').length)
			{
				$('.loading-dropoff').removeClass('hide');
			}

			$.ajax({
				// url: htx_domain + '/' + language + '/search/getdropoff',
				url: htx_domain + '/' + language + '/ajax/getdropoff',
				type: 'GET',
				dataType: 'jsonp',
				jsonp: 'jsonp_callback',
				data: {airportgroupid: airportgroupid, pickup: pickup, bookingtypeid: bookingtypeid, bookingtypegatewaycode: bookingtypegatewaycode, ajax: 1},
				async: asyncFlag
			}).success(function(response) {
				populateDropoffCallback(response);

				if( localStorage && localStrKey)
				{
					localStorage[localStrKey + '_Timestamp'] = Math.round(new Date().getTime() / 1000);
					localStorage[localStrKey] = JSON.stringify(response);
				}

				if($('.loading-dropoff').length)
				{
					$('.loading-dropoff').addClass('hide');
				}
			});
		}
		else
		{
			var options = $.parseJSON(localStorage[localStrKey]);
			populateDropoffCallback(options);
		}
	}
}

function populateDropoffCallback(options)
{
	var sel = $("#dropoff");
	sel.empty();

	for (var item in options) {
		if(typeof options[item]['GatewayCode'] !== 'undefined')
		{
			sel.append('<option data-gateway-type-code="' + options[item]['GatewayCode'] + '" value="' + options[item]['Id'] + '">' + options[item]['Name'] + '</option>');
		}
		else if (options[item]['Name'])
		{
			sel.append('<option value="' + options[item]['Id'] + '">' + options[item]['Name'] + '</option>');
		}
	};

	sel.removeAttr('disabled');

	if($('.loading-dropoff').length)
	{
		$('.loading-dropoff').addClass('hide');
	}
}
function showMoreResults(button, moreMsg, lessMsg)
{
	if ( button.innerHTML == moreMsg )
	{
		$('.hidden_products').slideDown();
		button.innerHTML = lessMsg;
		$('#' + button.id).addClass('open');
		$('#' + button.id).removeClass('morebtn');
		$('#' + button.id).addClass('lessbtn');
	}
	else if	( button.innerHTML == lessMsg )
	{
		$('html, body').animate(
		{
			scrollTop: ($("ul.result_list").offset().top) - 50
		}, 300);
		$('.hidden_products').slideUp();
		button.innerHTML = moreMsg;
		$('#' + button.id).removeClass('open');
		$('#' + button.id).removeClass('lessbtn');
		$('#' + button.id).addClass('morebtn');
	}

	return false;
}

function updateTransferPrice(element, currency_symbol, currency_code, language_code, maxpax)
{
	var id = '#' + element.form.id;

	//formatting prices for
	var new_price = element.form.price.value * element.value;
	var formatted_new_price = getCurrencyFormat(language_code, currency_code, new_price, 1);

	// var old_price = element.form.was_unit_price.value * element.value;
	// var formatted_old_price = getCurrencyFormat(language_code, currency_code, old_price);

	var pp_new_price = element.form.price_per_person.value * element.value;
	var pp_formatted_new_price = getCurrencyFormat(language_code, currency_code, pp_new_price, 1);


	// Prices
	$(id).find('span.js-total-price').html(formatted_new_price);
	//$(id).find('.resultbox.price .icon_image.big_price span.total_was_price').html(formatted_old_price);
	$(id).find('span.js-per-person-price').html(pp_formatted_new_price);

	// Pax and Luggage
	$(id).find('span.js-luggage').html((maxpax * element.value));
	$(id).find('span.js-max-pax').html((maxpax * element.value));

	var transferPriceTemplate = $('#tranfser-price-tmp').val();
	$(id).find('#submit').val(transferPriceTemplate.replace('[TRANSFER_PRICE]', $(id).find('span.js-total-price').text()));
}

function submitInfoClick(fieldName, infoType)
{
	//GA send event
	if(typeof(_gaq) !== 'undefined') {
		_gaq.push(['_trackEvent', 'Info button click', infoType, fieldName]);
	}
}

function showMoreProducts(thisEl, showFewerMsg, showMoreMsg)
{
	if($(thisEl).html() == showFewerMsg)
	{
		$(thisEl).html(showMoreMsg);
		$('.hidden-results').addClass('hidden');
		scrollTo($('.js-change-search.mod__search--summary-button--text'));
	}
	else
	{
		$(thisEl).html(showFewerMsg);
		$('.hidden-results').removeClass('hidden');
	}
}

function populateSummarySection()
{
	var bookingTypeTxt = '';
	var toText = '';
	var fromText = '';
	var airPortTxt = '';
	var resortTxt = '';
	var countryTxt = '';

	if($('#bookingtypeid').val() == '3') {
		bookingTypeTxt = $('.js-search-summary-bookingtype').data('typeinbound');
	} else if($('#bookingtypeid').val() == '2' || $('#bookingtypeid').val() == '1') {
		bookingTypeTxt = $('.js-search-summary-bookingtype').data('typeoutbound');
	}

	if($('.js-places-search-form').length) {

		toText = $('#pickup_name').val() + ' ' + $('.js-search-summary-travellingform').data('to') + ' ' + $('#dropoff_name').val();
	} else {
		countryTxt = $("#airportgroupid option[value='" + $('#airportgroupid').val() +  "']").text();
		resortTxt = $("#dropoff option[value='" + $('#dropoff').val() +  "']").text();
		airPortTxt = $("#pickup option[value='" + $('#pickup').val() +  "']").text();

		if($('#bookingtypeid').val() == '3') {
			toText = resortTxt + ', ' + countryTxt + ' ' + $('.js-search-summary-travellingform').data('to') + ' ' +  airPortTxt + ', ' + countryTxt;
		} else {
			toText = airPortTxt + ', ' + countryTxt + ' ' + $('.js-search-summary-travellingform').data('to') + ' ' +  resortTxt + ', ' + countryTxt;
		}
	}
	
	$('.js-search-summary-pickupdatetime').html(arrivaldate(false, $('.js-search-summary-pickupdatetime').data('at')));

	//From text
	$('.js-search-summary-travellingform').html(toText);

	//Return values
	if($('#bookingtypeid').val() == '1') {
		bookingTypeTxt = $('.js-search-summary-bookingtype').data('typereturn');

		$('.js-search-summary-returndatetime').html(returndate(false, $('.js-search-summary-returndatetime').data('at')));
		
		if($('.js-places-search-form').length) {
			toText = $('#dropoff_name').val() + ' ' + $('.js-search-summary-travellingform').data('to') + ' ' + $('#pickup_name').val();
		} else {
			toText = resortTxt + ', ' + countryTxt + ' ' + $('.js-search-summary-travellingform').data('to') + ' ' +  airPortTxt + ', ' + countryTxt;
		}

		$('.js-search-summary-travellingto').html(toText);
		$('.js-search-summary-travellingto').prev().removeClass('hidden');

	} else {
		$('.js-search-summary-returndatetime').html('');
		$('.js-search-summary-travellingto').html('');
		$('.js-search-summary-travellingto').prev().addClass('hidden');
	}
	
	$('.js-search-summary-bookingtype').html(bookingTypeTxt);

	//Pax
	$('.js-search-summary-adults').html($('#adults').val());
	$('.js-search-summary-children').html($('#children').val());
	$('.js-search-summary-infants').html($('#infants').val());
}


function isReturnTransfer()
 {
 	if($('.js-places-search-form').length)
 	{
	 	if($('#bookingtypereturn').length && $('#bookingtypereturn').prop('checked'))
	 	{
	 		return true;
	 	}
 	}
 	else
 	{
		if($('#bookingtypeid').length && $('#bookingtypeid').val() == '1')
	 	{
	 		return true;
	 	} 		
 	}

 	return false;
 }

function arrivaldate(formatted, summaryformatted)
{
	arrivalDate = moment($('#pickupdate').val() + ' ' + $('#pickuphour').val() + ':' + $('#pickupmin').val(), 'DD/MM/YYYY HH:mm');

	if(!arrivalDate.isValid())
	{
		arrivalDate = moment();
	}

	if(formatted)
	{
		return arrivalDate.format('YYYY-MM-DDTHH:mm:ss');
	}
	else if(summaryformatted) 
	{
		return '<strong>' + arrivalDate.lang(language).format('DD MMMM YYYY') + '</strong> ' + summaryformatted + ' <strong>' + arrivalDate.lang(language).format('HH:mm') + '</strong>';
	}

	return arrivalDate;
}


function returndate(formatted, summaryformatted)
{
	returnDate = moment($('#returndate').val() + ' ' + $('#returnhour').val() + ':' + $('#returnmin').val(), 'DD/MM/YYYY HH:mm');

	if(!returnDate.isValid())
	{
		returnDate = moment();
	}

	if(formatted)
	{
		return returnDate.format('YYYY-MM-DDTHH:mm:ss');
	}
	else if(summaryformatted) 
	{
		return '<strong>' + returnDate.lang(language).format('DD MMMM YYYY') + '</strong> ' + summaryformatted + ' <strong>' + returnDate.lang(language).format('HH:mm') + '</strong>';
	}

	return returnDate;
}




function populatePickup(airportgroupid, bookingtypeid, bookingtypegatewaycode, language)
{
	var localStrKey = '';

	if(typeof affiliate_code !== 'undefined') {
		localStrKey = 'pickup_destinations_' + affiliate_code + '_' + agency_user_id + '_' + language + '_' + bookingtypeid + '_' + airportgroupid;
	}

	$("#fromtype").val("");

	$("#pickup").prop('disabled', true);
	$("#dropoff").prop('disabled', true);

	$("#pickup").empty();
	$("#dropoff").empty();

	if(typeof airportgroupid !== 'undefined' && typeof bookingtypeid !== 'undefined')
	{
		if( isLocalStorageExpired(localStrKey,null) )
		{
			var asyncFlag = false;
			if($('.mobileSearch').length)
			{
				asyncFlag = true;
			}

			if($('.loading-pickup').length)
			{
				$('.loading-pickup').removeClass('hide');
			}

			$.ajax({
				// url: htx_domain + '/' + language + '/search/getpickup',
				url: htx_domain + '/' + language + '/ajax/getpickup',
				type: 'GET',
				dataType: 'jsonp',
				jsonp: 'jsonp_callback',
				data: {airportgroupid: airportgroupid, bookingtypeid: bookingtypeid, bookingtypegatewaycode: bookingtypegatewaycode, ajax: 1},
				async: asyncFlag,
			}).success(function(response){
				populatePickupCallback(response);

				if( localStorage && localStrKey)
				{
					localStorage[localStrKey + '_Timestamp'] = Math.round(new Date().getTime() / 1000);
					localStorage[localStrKey] = JSON.stringify(response);
				}
			});
		}
		else
		{
			var options = $.parseJSON(localStorage[localStrKey]);
			populatePickupCallback(options);
		}
	}
}

function scrollTo(jqrEl)
{
	$('html, body').animate({
	        scrollTop: jqrEl.offset().top - 55
	}, 200);	
}

function displaySelectdDateTime(className, FormattedDateStr, TimeStr)
{
	var templateSel = $('#js-you-have-selected').val();
	templateSel = templateSel.replace('[DATE]', FormattedDateStr);
	templateSel = templateSel.replace('[TIME]', TimeStr);
	$('.' + className).text(templateSel);
}

function combinedDateTime(id, FormattedDateStr, TimeStr)
{
	
	var templateSel  = ' ';
	templateSel = templateSel
	+ FormattedDateStr
	+ ' at '
 	+ TimeStr
 	$('body').data('id', id);
	$('body').data('setdate', templateSel);
	console.log(templateSel);
}

function getBookingType(standardSwitched)
{
	var bookingType = 'Return';
	if(standardSwitched)
	{
		bookingType = 'Standard';
	}

	if($('#bookingtypeid').val() == '2')
	{
		if(standardSwitched)
		{
			bookingType = 'Standard';
		}
		else
		{
			bookingType = 'Single from airport';
		}
	}
	else if($('#bookingtypeid').val() == '3')
	{
		if(standardSwitched)
		{
			bookingType = 'Switched';
		}
		else
		{
			bookingType = 'Single to airport';
		}
	}

	return bookingType;
}

function stripLocationText(txt)
{
	txt = txt.replace(/ /g, '-');
	txt = txt.replace(/,/g, '-');
	txt = txt.replace('(', '-');
	txt = txt.replace(')', '-');
	txt = txt.replace(/--/g, '-');
	txt = txt.replace(/--/g, '-');
	txt = txt.toLowerCase();

	return txt;
}

//Show results when back button is pressed
function bookNowClicked(thisEl)
{
	$('#js-booknowclicked').val('1');
}


function triggerDisabled (ele){ 
	console.log("TRIGGERED: ", ele);
};

