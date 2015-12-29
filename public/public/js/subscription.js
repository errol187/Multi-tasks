$(document).ready(function(){


	//START SIGNUP FORM FULL VERSION
	$("#subscription").submit(function() {
		$(".form-element-error").html('');
		$("#discounts input[type=text]").removeClass("errorBox");

		subscribeformelements = $(this).serialize() + '&subscribe=SUBSCRIBEd&ajaxform=yes';

		$.ajax({
			type: "POST",
			url: "/en/index/subscriptionajax",
			data: subscribeformelements,
			async: true,
			accepts: 'json'
		}).success(function( msg ) {
			var returned = $.parseJSON(msg);
			// return false;
			if (returned.success == "true")
			{
				$("#discount-image").attr("src", "/images/htx/img/discounts-success.png");
				$("#subscription").hide();
				$("#discount-success").show();
				setTimeout(function(){
					window.location.href = "/consumers";
				}, 1500);
			}
			else
			{
				$.each(returned, function (i, val){
					$("#" + i + "-error").html("<img src='/images/htx/icons/warning.png' height='20' width='20' title='" + val + "' />");
					$("#" + i).addClass("input_error");
				});
				// $(".messages").css('color', 'red');
				// $(".messages").html(returned.errors);
				return false;
			}
		}).error(function( msg ) {
		});
		return false;
	});

	$('#subscription-form').dialog({
		autoOpen: false,
		modal: true,
		resizable: false,
		draggable: false,
		width: 500
	});

	$('#newsletter').removeAttr('href');

	$('#newsletter').click(function() {
		$('#subscription-form').dialog("open");
	});

	$('#newsletter-pod').removeAttr('href');

	$('#newsletter-pod').click(function() {
		$('#subscription-form').dialog("open");
	});

	$("#discounts").submit(function() {
		$(".form-element-error").html('');
		$("#discounts input[type=text]").removeClass("errorBox");

		subscribeformelements = $(this).serialize() + '&subscribe=SUBSCRIBEd&ajaxform=yes';

		$.ajax({
			type: "POST",
			url: "/en/index/subscriptionajax",
			data: subscribeformelements,
			async: true,
			accepts: 'json'
		}).success(function( msg ) {
			var returned = $.parseJSON(msg);
			// return false;
			if (returned.success == "true")
			{
				$("#discount-image").attr("src", "/images/htx/img/discounts-success.png");
				$("#discounts").hide();
				$("#discount-success").show();
			}
			else
			{
				$.each(returned, function (i, val){
					$("#" + i + "-error").html("<img src='/images/htx/icons/warning.png' height='20' width='20' title='" + val + "' />");
					$("#" + i).addClass("input_error");
				});
				// $(".messages").css('color', 'red');
				// $(".messages").html(returned.errors);
				return false;
			}
		}).error(function( msg ) {
		});
		return false;
	});

	$('#data-policy').dialog({
		autoOpen: false,
		modal: true,
		resizable: true,
		draggable: false,
		width:	800,
		maxHeight: 500
	});

	$('#data-policy-link').removeAttr('href');

	$("#data-policy-link").click(function() {
		$("#data-policy").dialog("open");
	});
	//END SIGNUP FORM FULL VERSION


	//START SIGNUP FORM SHORT VERSION
	$('#news').submit(function(){
	//setup variables
	var form = $(this),
	formData = form.serialize(),
	formUrl = $('#news').attr('action'),
	formMethod = 'POST', 
	responseMsg = $('#signupresponse');

	//send data to server for validation
	$.ajax({
	    url: formUrl,
	    type: formMethod,
	    data: formData,
	    success:function(data){

		//setup variables
		var responseData = jQuery.parseJSON(data), 
		    klass = '';

		//response conditional
		switch(responseData.status){
		    case 'error':
			klass = 'response-error';
			document.getElementById("signupresponse").style.color = "#ff0000";
			document.getElementById("signupresponse").style.fontWeight = "bold";
		    break;
		    case 'success':
			klass = 'response-success';
			document.getElementById("signupresponse").style.color = "#66CD00";
			document.getElementById("signupresponse").style.fontWeight = "bold";
		default:
		
		    break;  
		}
		//show reponse message
		responseMsg.fadeOut(200,function(){
		    $(this).addClass(klass)
			   .text(responseData.message)
			   .fadeIn(200,function(){
			       //set timeout to hide response message
			       setTimeout(function(){
				   responseMsg.fadeOut(200,function(){
				       $(this).removeClass(klass);
				   });
			       },3500);
			    });
		 });
	      }
	});

	return false;
	});
	//END SIGNUP FORM SHORT VERSION
});	
