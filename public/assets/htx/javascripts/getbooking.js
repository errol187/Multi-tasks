$(document).ready(function() {
	$('#submit_voucher').click(function(e) {
		e.preventDefault();

		$.ajax({
			url: '/en/ajax/checkbooking',
			type: 'GET',
			data: {lastname: $('#surname').val(), bookingref: $('#booking_ref').val(), ajax: 1},
		}).success(function(response){
			var obj = $.parseJSON(response);
			if (obj.success == true) 
			{
				$('#pickupsubmitted').val("0");

				if($('.pickup-time-wrapper').length)
				{
					$('.pickup-time-wrapper').hide();
				}

				$('#get_booking_form').attr('action', $('#getbookingurl').val());
				$('#data').val(obj.data);

				//if mobile show voucher in new tab
				if(isMobile.any())
				{
					$('#get_booking_form').attr('target', '_blank');
					$('#get_booking_form').submit();
				}
				else
				{			
					var urlVoucher = $('#getbookingurl').val() + '?data=' + obj.data;

					$('#voucher-pdf').attr('src', urlVoucher);
					$('.voucher-pdf').show();
				}
			}
			else
			{
				$('#errorDiv').css('display', 'block'); 
			}
		});
	});


	$('#submit_pickup').click(function() {
		if($('#surname').val() && $('#booking_ref').val())
		{
			if($('.pickup-time-wrapper').length)
			{
				$('.pickup-time-wrapper').show();
			}
			$('#get_booking_form').attr('target', '');
			$('#get_booking_form').attr('action', $('#pickupurl').val());
			$('#pickupsubmitted').val("1");
			$('#get_booking_form').submit();
		}
	});
});
