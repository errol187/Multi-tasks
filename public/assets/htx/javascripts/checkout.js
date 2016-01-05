$(document).ready(function($) {

	var requiredElements = [], num = 1;

	// $('#newbookingform').validator().on('submit, ', function (e) {
		$('#newbookingform').validator().on('submit ', function (e) {
		console.log("FORM", e);

		var selectedCPay = 	$("#cardpayment").prop('checked'),
			selectedPPPay = $("#paypalpayment").prop('checked')

			if (!selectedCPay && !selectedCPay) {
				e.preventDefault();
				$("#paypalpayment").parent().next('.help-block').html($("#paypalpayment").data("error"))
				$("#paypalpayment").parent().parent(".form-group").addClass('has-error')
				$(".input-group.cardicon-1, .input-group.cardicon-2").css('background', '#fae9ed')
				

				console.log("Please select a payment type");

				return;
			} else {
				$("#paypalpayment").parent().parent(".form-group").removeClass('has-error');
				$("#paypalpayment").parent().next('.help-block').html('')
				$(".input-group.cardicon-1, .input-group.cardicon-2").css('background', 'transparent');
			}

		if (e.isDefaultPrevented(e)) {

			// $("form").data("bs.validator") // current validtor
			// $("form").data("bs.validator").$element[0] //object of form elements
			// $("form").data("bs.validator").$element[0][index] // validated fields (needs condition for required fields)
			// $("form").data("bs.validator").$element[0][index].validity["valid"] // returns boolean
			// $("form").data("bs.validator").$element[0][21].required (condition needed to create object for required fields)

				
			
			// Function param[form object]
			// var validationForm = $(this).data("bs.validator");

			// // Perform condition to find first required field
			// for (var i = 0; i < validationForm.$element[0].length; i++) {
				
			// 	// push to objcet
			// 	if ( validationForm.$element[0][i].required){

			// 		// [all required elements]
			// 		console.log("element ", validationForm.$element[0][i]);
			// 		console.log("VALID? ", validationForm.$element[0][i].validity["valid"]);
			// 		requiredElements.push(validationForm.$element[0][i]);
			// 	}

			// };
			
			//console.log("VALID ELEMENTS", requiredElements);


			// Perform condition to find if field is valid

			// Do not post form
			return false;
		} else {
			console.log("SUBMIT SUCCESS:", this);
		}
	});
});

var clickEvent = 'click';
var allowSubmit = true;

$(document).ready(function() {

	if($('.input_error').length)
	{
		a = 0;

		$('.input_error').each( function(i, val){
			if(a == 0)
			{
				a = $(this).offset().top;
			}
			else if (  $(this).offset().top < a )
			{
				a = $(this).offset().top;
			}
		});

		$('html, body').animate(
		{
			scrollTop: (a) - 50
		}, 1000);
	}

	// if( !isMobile.any() )
	// {
	// 	$('.bookSummary').jScroll({ top : 20, speed : 500 });
	// 	$('.bookSummary.cxe').jScroll({ top : 0, speed : 500 });
	// }


	alternateTransferDetails();
	alternateAccommodationDetails();
	// alternateBillingDetails();

	displayAddressDetails();

	$("form#newbookingform input, form#newbookingform select").blur(function() {
		var fieldName = $(this).attr('name');

		ga('send', 'event', 'Booking Form', fieldName, '', {'nonInteraction': 1});
	});


	$("#fromairportgroupid").change(function() {
		var airportgroupid = $(this).val();
		if ( airportgroupid == '' )
		{
			$('#fromairportcode').attr('disabled', true);
			$('#fromairportcode').val('');
		}
		else
		{
			populateAirports(airportgroupid, 'fromairportcode');
		}
	});

	$("#toairportgroupid").change(function(){

		var airportgroupid = $(this).val();
		if ( airportgroupid == '' )
		{
			$('#toairportcode').attr('disabled', true);
			$('#toairportcode').val('');
		}
		else
		{
			populateAirports(airportgroupid, 'toairportcode');
		}
	});


	$("input[name=paymenttype]:radio").change(function(){
		var paymenttype = $(this).val();
		updateFees(paymenttype);
	});

	$('.bookingsummary a.label').bind(clickEvent, toggleBookingSummary);
	$('.bookingsummary a.close').bind(clickEvent, toggleBookingSummary);

	// total pull out
	$('table.total').bind(clickEvent, function() {
		toggleTotalPullout('total_pullout');
	});

	if($('#paypalpayment').length)
	{
		if($('#paypalpayment').is(':checked'))
		{
			updateFees($('#paypalpayment').val());
		}
	}

	if($('#cardtype').length)
	{
		if($('#cardtype').val() != '')
		{
			updateFees('card');
		}

	 	$("#cardtype").on("change", function(e){

	 		var _this = $(this)[0],
	 			vCardType = $("#cardtype option:selected").data("type");
	 		
			switch(vCardType) {
			    case "visa":
			    case "mastercard":
			    case "mastercarddebit":
			        $(".mod__card-details--date").show();
			        $(".mod__card-details--issue-no").show();
			        break;
				case "maestro":
				case "amex":
			        $(".mod__card-details--date").hide();
			        $(".mod__card-details--issue-no").hide();
			        break;
			    default:
			        return;
			}
	 	});
	}
});

function toggleTotalPullout(id)
{
	var parent = $('#' + id ).closest('.totalbox');
	if(parent.length <= 0) return;
	if(parent.find('.toshow').is(':visible')) {
		parent.find('.toshow').slideUp('slow');
	} else {
		parent.find('.toshow').slideDown('slow');
	}
}


function validateSingle(form, fieldName, fieldValue)
{
	var serialized_form;

	if($('#' + fieldName).prop('required') && !fieldValue)
	{
		$('#' + fieldName).addClass('input_error');
	}
	else if (fieldName != 'submit')
	{
		//cannot send an array over the curl request so we need to remove the optional extras array here
		//it is a hidden field (in optional_extras.phtml) and therefore doesnt need to be validated anyway

		//trying to minimize packet size.
		// if($.inArray(fieldName, [ 'confirmemail','optionalextra' ] ) != -1)
		// {
			serialized_form = $(form).serialize();
			var split_serialized_form = serialized_form.split("&");
			var length = split_serialized_form.length;
			while(length--)
			{
				var split_item = split_serialized_form[length].split("=");
				if(split_item[0] == 'optional_extras%5B%5D')
				{
					split_serialized_form.splice(length, 1);
				}
			}
			serialized_form = split_serialized_form.join("&");
			serialized_form = '&' + serialized_form
		// }
		// else
		// {
		// 	// in efforts to reduce the serialize form size
		// 	serialized_form = '';
		// }

		$.ajax({
			url: '/en/ajax/validatenewbookingsingle',
			type: 'POST',
			data: 'fieldName=' + fieldName + '&fieldValue=' + fieldValue + serialized_form,
			async : true
		}).success(function(response){
			if($('#' + fieldName).length) 
			{
				$('#' + fieldName).val($('#' + fieldName).val().trim());
				$('#' + fieldName).removeClass('input_error');
				if ( response == 'true' )
				{
					
				}
				else
				{
					$('#' + fieldName).addClass('input_error');
				}
			}
		});
	}
}

function validateForm(form)
{
	var ret = false;

	$('input#booking').attr("disabled", true);

	$.ajax({
		url: '/en/ajax/validatenewbooking',
		type: 'POST',
		data: $(form).serialize(),
		async: false
	}).success(function(response){

		if ( response != 'true' )
		{
			var obj = $.parseJSON(response);
			var a = 0;
			$.each(obj, function(i, val){
				if ( a == 0 )
				{
					$('html, body').animate(
					{
						scrollTop: ($("#" + i).offset().top) - 50
					}, 1000);
				}
				$('#' + i).addClass('input_error');
				a++;
			});
		}
		else
		{
			ret = true;
		}
	});

	if ( ret == false )
	{
		$(form + ' input#submit').removeAttr("disabled");
	}

	return ret;
}


function populateAirports(airportgroupid, airportid)
{
	if($('.loading-' + airportid).length)
	{
		$('.loading-' + airportid).removeClass('hide');
	}

	$.ajax({
		url: '/ajax/getairports',
		type: 'POST',
		data: {airportgroupid: airportgroupid, ajax: 1},
		async: true
	}).success(function(response){
		var obj = $.parseJSON(response);
		var sel = $("#" + airportid);
		sel.empty();
		$.each(obj, function(i, item){
			sel.append('<option value="' + item.Id + '">' + item.Name + '</option>');
		});
		sel.removeAttr('disabled');

	
		if($('.loading-' + airportid).length)
		{
			$('.loading-' + airportid).addClass('hide');
		}
	});
}




function alternateTransferDetails()
{
	if ( $("#alternate_transfer_details").prop("checked") == true )
	{
		$("#departure_transfer_details").hide();
	}
	else
	{
		$("#departure_transfer_details").show();
	}
}

function alternateAccommodationDetails()
{
	if ( $("#alternate_accommodation_details").prop("checked") == true )
	{
		$("#departure_accommodation_details").hide();
	}
	else
	{
		$("#departure_accommodation_details").show();
	}
}

function alternateBillingDetails()
{
	if ( $("#alternate_billing_details").prop("checked") == true )
	{
		$("#card_holder_details").hide();
		displayAddressDetails();
	}
	else
	{
		$("#card_holder_details").show();
		$('#address_billing_details').html('');
	}
}



function displayAddressDetails()
{
	if ( $('#address_billing_details').length )
	{
		var address;

		if ( $('#surname').val() == '' && $('#firstname').val() == '' && $('#address1').val() == '' && $('#address2').val() == '' && $('#address2').val() == '' && $('#postcode').val() == '' )
		{
			address = '';
		}
		else
		{

			address = '(';

			address += ( ($('#surname').val() != '' && $('#firstname').val() != '') ? $('#firstname').val() + ' ' : $('#firstname').val());
			address += ( ($('#address1').val() != '' && $('#surname').val() != '') ? $('#surname').val() + ', ' : $('#surname').val());
			address += ( ($('#address2').val() != '' && $('#address1').val() != '') ? $('#address1').val() + ', ' : $('#address1').val());
			address += ( ($('#address3').val() != '' && $('#address2').val() != '') ? $('#address2').val() + ', ' : $('#address2').val());
			address += ( ($('#postcode').val() != '' && $('#address3').val() != '') ? $('#address3').val() + ', ' : $('#address3').val());
			address += ( ($('#postcode').val() != '' && $('#address3').val() == '') ? ', ' + $('#postcode').val() : $('#postcode').val());
			address += ')';
		}

		$('#address_billing_details').html(address);
	}
}

function toggleBookingSummary() {
	if($('.bookingsummary').is('.closed')) {
		$('.bookingsummary').removeClass('closed');
	} else {
		$('.bookingsummary').addClass('closed');
	}
}


function applyPromo()
{
	var promocode = $("#promocode").val();

	promocode = $.trim(promocode);

	if(promocode == '')
	{
		return false;
	}

	$.ajax({
		url: '/en/ajax/applypromocode',
		type: 'POST',
		data: {newpromocode: promocode},
		async: true
	}).success(function(response) {

		var obj = $.parseJSON(response);

		if (obj.result)
		{
			$("#promocode").parent().parent().addClass('has-success').removeClass('has-error');
			
			$("#transfer_cost_display").html(obj.result.price);
			$('.js-totalbox').addClass('js-promocode-applied');
			$("#transfer_cost").val(obj.result.price);
			$("#was_transfer_cost_display").removeClass('hide');
			$("#was_transfer_cost_display_amount").html(obj.result.oldprice);
			updateFees($("input[name=paymenttype]:radio:checked").val());
		}
		else if(obj.error)
		{
			$("#promocode").parent().parent().addClass('has-error').removeClass('has-success');
		}

	});
}


function updateFees(paymenttype)
{
	updateTotalOEPrice();

	if ( !paymenttype )
	{
		paymenttype = new Array();
		paymenttype[0] = 'account';
	}
	else
	{
		paymenttype = paymenttype.split("_");
	}

	switch ( paymenttype[0] )
	{
		case 'card':
			$("#card_payment_details").removeClass('hidden');
			$("#cardNote").removeClass('hidden');
			$("#3d_secure_note").removeClass('hidden');
			$("#elv_payment_details").addClass('hidden');

			// Buttons
			$("#checkout_paypal").addClass('hidden');
			$("#normal_checkout").removeClass('hidden');
			$("#billing_details").removeClass('hidden');

			var cardtype = $("#cardtype").val();
			cardtype = cardtype.split("_");
			updateBookingFee(cardtype[1], cardtype[2]);

			//Add required attribute for card details
			$('#cardtype').attr('required', 'required');
			$('#cardexpiremonth').attr('required', 'required');
			$('#cardexpireyear').attr('required', 'required');

			// $('#newbookingform').validator('validate');

			break;
		case 'paypal':
			$("#card_payment_details").addClass('hidden');
			$("#billing_details").removeClass('hidden');
			$("#cardNote").addClass('hidden');
			$("#3d_secure_note").addClass('hidden');
			$("#elv_payment_details").addClass('hidden');

			// Buttons
			$("#checkout_paypal").removeClass('hidden');
			$("#normal_checkout").addClass('hidden');

			updateBookingFee(paymenttype[1], paymenttype[2]);

			//Remove required attribute for card details
			
			$('#accountpostcode').removeAttr('required');
			$('#cardtype').removeAttr('required');
			$('#cardexpiremonth').removeAttr('required');
			$('#cardexpireyear').removeAttr('required');

			// $('#newbookingform').validator('validate');

			break;
		case 'elv':
			$("#card_payment_details").addClass('hidden');
			$("#cardNote").addClass('hidden');
			$("#3d_secure_note").addClass('hidden');
			$("#elv_payment_details").removeClass('hidden');

			// Buttons
			$("#checkout_paypal").addClass('hidden');
			$("#normal_checkout").removeClass('hidden');

			updateBookingFee('fixed', 0);

			break;
		case 'account':

			updateBookingFee('fixed', 0);

			break;
	}
}



function updateTotalOEPrice()
{
	var total_oe_amount = 0;
	$("select.optional_extra_select").each(function(){
		var ind_price = $(this).val().split("_");
		ind_price = parseFloat(ind_price[1]);

		var id = $(this).attr('id');

		var formatted_ind_price = getCurrencyFormat(booking_language, booking_currency, ind_price);

		$("#" + id + "_price span").html(formatted_ind_price);

		total_oe_amount += ind_price;
	});

	var formatted_total_price = getCurrencyFormat(booking_language, booking_currency, total_oe_amount);

	$("#total_oe_amount").val(total_oe_amount);
	$("span#optional_extra_total").html(formatted_total_price);
	$("span.optional_extra_total").html(formatted_total_price);

	updateTotalPrice();
}

function updateTotalPrice()
{
	var total_price = parseFloat($("#transfer_cost").val());

	var booking_fee = parseFloat($("input#booking_fee").val());
	booking_fee = (isNaN(booking_fee)) ? 0 : booking_fee;
	total_price += booking_fee;
	

	if ( $("input#carbon").prop("checked") == true )
	{
		var carbon_offset = parseFloat($("input#carbon_offset").val());
		carbon_offset = (isNaN(carbon_offset)) ? 0 : carbon_offset;

		total_price += carbon_offset;

		$('span.carbon_offset').html($('span#carbon_offset').html());
	}
	else
	{
		$('span.carbon_offset').html($('span#formatted_zero').html());
	}
	if ( $("input#total_oe_amount").val() )
	{
		var oe_amount = parseFloat($("#total_oe_amount").val());
		oe_amount = (isNaN(oe_amount)) ? 0 : oe_amount;

		total_price += oe_amount;

		$(".oe_total_display").show();
	}
	else
	{
		$(".oe_total_display").hide();
	}

	var formatted_total_price = getCurrencyFormat(booking_language, booking_currency, total_price);

	// when the booking form loads for the first time, this is run but total_price is NaN
	// so leaving it as is
	if (isNaN(total_price))
	{
		$("span#total_price").html(total_price.toFixed(2));
		$("span.total_price").html(total_price.toFixed(2));
		$("#SummaryTotalCost").html(total_price.toFixed(2));
	}
	else
	{
		$("span#total_price").html(formatted_total_price);
		$("#SummaryTotalCost").html(formatted_total_price);
	}


}


function updateBookingFee(feetype, feeamount)
{
	var total_cost = parseFloat($("#transfer_cost").val());
	if ( $("input#total_oe_amount").val() )
	{
		var oe_amount = parseFloat($("input#total_oe_amount").val());
		oe_amount = (isNaN(oe_amount)) ? 0 : oe_amount;

		total_cost +=  oe_amount;
	}
	var booking_fee = 0;
	if ( feetype == 'percent' )
	{
		booking_fee = ( total_cost / 100 ) * parseFloat(feeamount);
	}
	else if ( feetype == 'fixed' )
	{
		booking_fee = parseFloat(feeamount);
	}

	var formatted_booking_fee = getCurrencyFormat(booking_language, booking_currency, booking_fee);
	//formatted_booking_fee = numeral(booking_fee).format(price_format);

	booking_fee = booking_fee.toFixed(2);

	$("input#booking_fee").val(booking_fee);
	$("span#booking_fee").html(formatted_booking_fee);
	$("span.booking_fee").html(formatted_booking_fee);

	updateTotalPrice();
}


// number formatting function
// copyright Stephen Chapman 24th March 2006
// permission to use this function is granted provided
// that this copyright notice is retained intact
function formatNumber(num,dec,thou,pnt,curr1,curr2,n1,n2) {
	if (! dec ) dec = 2;
	if (! thou ) thou = '';
	if (! pnt ) pnt = '.';
	if (! curr1 ) curr1 = '';
	if (! curr2 ) curr2 = '';
	if (! n1 ) n1 = '';
	if (! n2 ) n2 = '';
	var x = Math.round(num * Math.pow(10,dec));
	if (x >= 0) {
		n1=n2='';
	};
	var y = (''+Math.abs(x)).split('');
	var z = y.length - dec;
	y.splice(z, 0, pnt);
	while (z > 3) {
		z-=3; y.splice(z,0,thou);
	};
	var r = curr1+n1+y.join('')+n2+curr2;
	return r;
}

// function showBookingConfirmation(bookingref, agenttype)
// {
// 	$("#bookingref").val(bookingref);
// 	$("#type").val(agenttype);
// }

