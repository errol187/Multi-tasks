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

//Get booking start
$(document).ajaxStart(function () {
    $(document.body).css({ 'cursor': 'wait' })
});
$(document).ajaxComplete(function () {
    $(document.body).css({ 'cursor': 'default' })
});
//get booking end

//Check iOS version
function iOSversion() {
	if (/iP(hone|od|ad)/.test(navigator.platform)) {
		var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
		return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
	}

	return [];
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
		
		//Hide total payable box when keyboard is on
		if($('.totalbox').length)
		{
			$(document).on('focus','input, select, textarea', function() {
				var ver = iOSversion();
			        if((isMobile.iOS() && ver[0] && ver[0] > 7) || hide_header_footer) {
			                if($(this).attr('readonly') === undefined){
			                        $('.totalbox').hide()
					}
			        }
			});
			$(document).on('blur','input, select, textarea', function(){
				var ver = iOSversion();
				if((isMobile.iOS() && ver[0] && ver[0] > 7) || hide_header_footer) {
					if($(this).attr('readonly') === undefined){
						$('.totalbox').show();
					}
				}
			});
		}
	}

	if ( $('[type="date"]').prop('type') != 'date' )
	{
		// default to jquery date picker if date is unsupported
		$('[type="date"]').datepicker();
	}

	if($('#bookingtypeid').val() == '1')
	{
		$('.departuredatetime').find('input,select').prop('disabled', false);
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
		$('html, body').animate({ scrollTop: 0 }, 'fast');
		$(".voucher-promo-mayday15-mobile").animate({right: "20px"}, 800);
	});

});


function getCurrencyFormat(language_code, currency_code, amount, include_code)
{
	var return_amount = 0;

 	async: false
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

// $(document).ready(function()
// {
// 	$("#dialogDepartureQuickQuote").dialog(
// 	{
// 		autoOpen: false,
// 		modal: true,
// 		draggable: false,
// 		resizable: false
// 	});
// 	$("#dialogArrivalQuickQuote").dialog(
// 	{
// 		autoOpen: false,
// 		modal: true,
// 		draggable: false,
// 		resizable: false
// 	});

// 	$("img#departure_time_message").click(function(){
// 		submitInfoClick($(this).attr('id'), 'departure time');
// 		$("#dialogDepartureQuickQuote").dialog('open');
// 		return false;
// 	});
// 	$("img#arrival_time_message").click(function(){
// 		submitInfoClick($(this).attr('id'), 'arrival time');
// 		$("#dialogArrivalQuickQuote").dialog('open');
// 		return false;
// 	});

// 	if($('#carbon_offset_message').length) {

// 		$("#dialogCarbonOffset").dialog(
// 		{
// 			autoOpen: false,
// 			modal: true,
// 			draggable: false,
// 			resizable: false
// 		});

// 		$("img#carbon_offset_message").click(function(){
// 			submitInfoClick('carbon_offset_message', 'carbon offset');
// 			$("#dialogCarbonOffset").dialog('open');

// 			return false;
// 		});
// 	}

// 	if($('#customer_email_message').length) {
// 		$("#dialogCustomerEmail").dialog(
// 		{
// 			autoOpen: false,
// 			modal: true,
// 			draggable: false,
// 			resizable: false,
// 			width: 600,
// 			maxHeight: 200
// 		});

// 		$("img#customer_email_message").click(function(){
// 			submitInfoClick('customer_email_message', 'agent customer voucher email address');
// 			$("#dialogCustomerEmail").dialog('open');

// 			return false;
// 		});
// 	}

// 	// Need to show dialog divs to attach dialog to them (css required to set display: none in case javascript fails)
// 	$(".more_information").css("display", "block");

// 	$(".more_information").dialog(
// 	{
// 		autoOpen: false,
// 		modal: true,
// 		draggable: false,
// 		resizable: false
// 	});
// 	// Need to hide dialog divs again
// 	$(".more_information").css("display", "none");

// 	$("img.more_information_link").click(function(){
// 		var productInfo = $(this).data('info');
// 		submitInfoClick(productInfo, 'product more info');

// 		var id = $(this).attr('id');
// 		$("#more-" + id).parent().children(".more_information").dialog('open');
// 		return false;
// 	});
// });

// function change_return(value)
// {
// 	if($('#add_return:checked').length > 0)
// 	{
// 		$('#return').val('1');
// 		$('.departuredatetime').find('input,select').prop('disabled', false);
// 	}
// 	else
// 	{
// 		$('#return').val('0');
// 		$('.departuredatetime').find('input,select').prop('disabled', true);

// 	}
// }

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
	var id = '#' + element.form.id + ' #' + element.id;

	//formatting prices for
	var new_price = element.form.price.value * element.value;
	var formatted_new_price = getCurrencyFormat(language_code, currency_code, new_price, 1);

	// var old_price = element.form.was_unit_price.value * element.value;
	// var formatted_old_price = getCurrencyFormat(language_code, currency_code, old_price);

	var pp_new_price = element.form.price_per_person.value * element.value;
	var pp_formatted_new_price = getCurrencyFormat(language_code, currency_code, pp_new_price, 1);


	// Prices
	$(id).closest('.result').find('span.total_price').html(formatted_new_price);
	//$(id).closest('.result').find('.resultbox.price .icon_image.big_price span.total_was_price').html(formatted_old_price);
	$(id).closest('.result').find('span.per_person_price').html(pp_formatted_new_price);

	// Pax and Luggage
	$(id).closest('.result').find('span.luggage').html((maxpax * element.value));
	$(id).closest('.result').find('span.max_pax').html((maxpax * element.value));
}

function submitInfoClick(fieldName, infoType)
{
	//GA send event
	if(typeof(_gaq) !== 'undefined') {
		_gaq.push(['_trackEvent', 'Info button click', infoType, fieldName]);
	}
}


