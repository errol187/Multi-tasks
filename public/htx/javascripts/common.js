 /*!
 * Common JS
 *
 * Copyright 
 * Licensed under MIT (https://github.com/silviomoreto/bootstrap-select/blob/master/LICENSE)
 */

 $(document).ready(function($) {

 	// Menu
	var clickEvent = 'click';
	var menuLinkTimer;
	var navScroll;

 	 clickEvent = ('ontouchstart' in window) ? 'touchstart' : ((window.DocumentTouch && document instanceof DocumentTouch) ? 'tap' : 'click');

	/*
	*
	* Navbar
	*/ 
	if ($('#errors .errors p').length) {
		
			$('html, body').animate({ scrollTop: 0 }, 'fast');
		
	}

	$('.bookingsummary').on('affixed.bs.affix', function () {
		var prefix = $(".comp__results--found").attr("class");

		$(".comp__results--found").addClass(prefix+"--affix");

		// $(this).prev().find(".icon-HT_close").removeClass("hidden");

		// $('html, body').animate({ scrollTop: 0 }, 'fast');

		// $(".bookingsummary").addClass(hidden);
	});

	$('.bookingsummary').on('affixed-top.bs.affix', function () {
		var prefix = $(".comp__results--found").attr("class");

		$(".comp__results--found").removeClass("comp__results--found--affix");

		// $(this).prev().find(".icon-HT_close").removeClass("hidden");

		// $('html, body').animate({ scrollTop: 0 }, 'fast');

		// $(".bookingsummary").addClass(hidden);
	});
 	// Calendar back button
 	var ID_CALENDAR_BACK = $("#calendarBack"),
 		OPACITY_LAYER = $(".layer-opacity"),
		DATE_PICKER = $(".mod__dtp");

	$('nav.navbar .navbar-toggle').on('click', function (e) {
		e.stopPropagation();
		var CLOSE_ICON = $(this).find(".icon-HT_close");
		var BURGER_ICON = $(this).find(".icon-bar");
		if (CLOSE_ICON.hasClass("hidden")){

			$("#example-navbar-collapse").removeClass("hidden");

			$(CLOSE_ICON).removeClass("hidden")
			//$(this).prev().find(".icon-HT_close").removeClass("hidden");
			$(BURGER_ICON).addClass("hidden")
			$('html, body').animate({ scrollTop: 0 }, 'fast');
			$("body").addClass("noScroll");

			opacityLayer(OPACITY_LAYER, true);
		} else {
			$(CLOSE_ICON).addClass("hidden")
			//$(this).prev().find(".icon-HT_close").removeClass("hidden");
			$(BURGER_ICON).removeClass("hidden")
			$("body").removeClass("noScroll");
			opacityLayer(OPACITY_LAYER, false);
		}
	});

	$("body").on('click', function (){
		$(".mod__dtp").removeClass('datepicker-section-show');
		$(this).removeClass('in');

		opacityLayer(OPACITY_LAYER, false);

		$("body").removeClass('no-scroll');
	})

	$(ID_CALENDAR_BACK).on("click", function(){
		$(".mod__dtp").removeClass('datepicker-section-show');
		$(this).removeClass('in');

		opacityLayer(OPACITY_LAYER, false);

		$("body").removeClass('no-scroll');
	});

 	$('.js-open-datepicker-section').click(function(e) {

 		e.preventDefault();
 		e.stopPropagation();

 		var datepickerSection = $(this).data('datepicker');

 		if(datepickerSection == '.return-date-time-picker' && !isReturnTransfer())
 		{
 			return false;
 		}
 		//if single dont show calendar calendar
 		$(".mod__dtp").removeClass('datepicker-section-show');
 		$(datepickerSection).toggleClass('datepicker-section-show');
 		if (!window.matchMedia("(min-width: 768px)").matches) {
 			$(ID_CALENDAR_BACK).addClass('in');
 			opacityLayer(OPACITY_LAYER, true);
 			$("body").addClass('no-scroll');
 		} else {
 			console.log("DESKTOP > 768PX: ", e)
 		} 		
 	}); 	

 	$('.js-close-datepicker-section').click(function(e) {
 		e.preventDefault();
 		var datepickerSection = $(this).data('datepicker');
 		$(datepickerSection).removeClass('datepicker-section-show');
 		$(ID_CALENDAR_BACK).removeClass('in');
 		opacityLayer(OPACITY_LAYER, false);
 		$("body").removeClass('no-scroll');
 		
 		// on close update date field
 		var ReturnDatepicker = $('#returndatepicker').data("DateTimePicker");
 		// console.log(ReturnDatepicker);
 		// debugger;

 		$('#' + $('body').data('id')).val($('body').data('setdate'));

 	});



	// // Event toggle on collapse
	// $('#example-navbar-collapse').on('shown.bs.push', function () {
		
	// 	$(this).prev().find(".icon-bar").addClass("hidden");
	// 	$(this).prev().find(".icon-HT_close").removeClass("hidden");

	// 	$('html, body').animate({ scrollTop: 0 }, 'fast');

	// 	$("body").addClass("noScroll");
	// });

	// // Reverse event toggle on collapse
	// $('#example-navbar-collapse').on('hidden.bs.push', function () {
	// 	// $(this).prev().find(".glyphicon").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-right");

	// 	$(this).prev().find(".icon-HT_close").addClass("hidden");
	// 	$(this).prev().find(".icon-bar").removeClass("hidden");
	// 	$("body").removeClass("noScroll");
	// });

	// Event toggle on dropdown
	$('.js-dropdown').on('shown.bs.dropdown', function () {
		
		$(this).children("button").find(".icon-HT_sml-chevron-down").addClass("icon-HT_sml-chevron-up").removeClass("icon-HT_sml-chevron-down");
	});

	// Reverse event toggle on dropdown
	$('.js-dropdown').on('hidden.bs.dropdown', function () {
		// $(this).prev().find(".glyphicon").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-right");

		$(this).children("button").find(".icon-HT_sml-chevron-up").addClass("icon-HT_sml-chevron-down").removeClass("icon-HT_sml-chevron-up");
	});

	// Utility to count chars + add class
	var $currCheckCount  = $("button .js-currency_symbol");

	if ($.trim($currCheckCount.html()).length >= 2) {
		$currCheckCount.addClass('shrink-text');
	}


	/*
	* Subscription
	*/

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

 	// Dialog box
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

	// Form submission
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

	// Dialog box
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
	$('#news').validator().on('submit', function (e) {
	  if (e.isDefaultPrevented()) {
	    // handle the invalid form...
	    return false;

	  } else {

		//setup variables
		var $form = $(e.target),
		formData = $form.serialize(),
		formUrl = $form.attr('action'),
		formMethod = 'POST', 
		responseMsg = $('#helpEmail');


		//send data to server for validation
		$.ajax({
		    url: formUrl,
		    type: formMethod,
		    data: formData,
		    success:function(data) {
			//setup variables
			var responseData = jQuery.parseJSON(data), 
			    klass = '';

			
			//response conditional
			switch(responseData.status){
			    case 'error':
				klass = 'response-error';
				// TODO: refactor to addclass/bootstrap
				document.getElementById("helpEmail").style.color = "#ff0000";
				document.getElementById("helpEmail").style.fontWeight = "bold";

				ga('send', 'event', 'Email Newsletter Sign Up', 'Unsuccessful Subscribe', '' + window.location.href, {'nonInteraction': 1});
			    break;
			    case 'success':
				klass = 'response-success';
				document.getElementById("helpEmail").style.color = "#66CD00";
				document.getElementById("helpEmail").style.fontWeight = "bold";

				ga('send', 'event', 'Email Newsletter Sign Up', 'Subscribe', '' + window.location.href, {'nonInteraction': 1});
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
		
		//END SIGNUP FORM SHORT VERSION
		}
	})

 	$('#js-copy-contact').click(function() {
 		$('#lead_passenger_first').val($('#contact_first_name').val());
 		$('#lead_passenger_last').val($('#contact_last_name').val());
 		$('#lead_passenger_phone').val($('#contact_phone').val());
 		$('#lead_passenger_email').val($('#contact_email').val());
 	});
	
	// $('.mod__carousel .more-info').on('click', function(e){

	// 	e.preventDefault();

	// 	var _this = $(this);

	// 	_this.closest(".item").children().children("button").toggleClass('hidden');

	// 	//$(_this).closest(".item").children(".mod__carousel--image").addClass('out');
	// 	//$(_this).closest(".item").children(".mod__carousel--more-info").addClass('in');

	// });

	// Read more
	$('.read-more.btn-block').on('click', function(e){
		console.log('read more');
		e.preventDefault();

		var _this = $(this);

		$(_this).closest("footer").prev(".mod__info--toggle-more").toggleClass('hidden');
		
		if($(_this).closest("footer").prev(".mod__info--toggle-more").hasClass('hidden')) {
			$(this).html($(this).data('readmore'));
		} else {
			$(this).html($(this).data('readless'));
		}
	});
	
 	// Carousel
 	$(".carousel").swiperight(function() {
	    $(this).carousel('prev');
	});
	$(".carousel").swipeleft(function() {  
	    $(this).carousel('next');
	});	
	

	// Checkout Summary
	$('#toggleCheckoutSummary').on("click", function (){
		var _this = $(this);
		
			$(".mod__booking--summary--toggle").toggleClass("in");
		
		//$(".mod__booking--summary--toggle").parent().siblings(".mod__booking--summary-button")

		if ($(".mod__booking--summary--toggle").hasClass("in")){
			$('.mod__booking--summary-button--text').text("Hide full summary");
			_this.children(".icon").removeClass("icon-HT_lrg-chevron-down");
			_this.children(".icon").addClass("icon-HT_lrg-chevron-up");
		} else {
			_this.children(".icon").removeClass("icon-HT_lrg-chevron-up");
			_this.children(".icon").addClass("icon-HT_lrg-chevron-down");
			$('.mod__booking--summary-button--text').text("Show full summary");
		}
		
	});


	$('.js-search-results').on('click', '.mod__result--more-info .more-info', function(e){

		console.log('results more-info');
		
		var _this = $(this);
		var resultsDescription = $(_this).closest('.panel-footer').prev().find(".mod__result--description"),
			resultsWrapper = $(_this).closest('.panel-footer').prev().find(".mod__result--wrapper")
			visible = resultsDescription.hasClass("show");
		var resultsDescriptionClose = $(_this).closest('.panel-footer').parents('.panel').children(".close");

		e.preventDefault();

		resultsDescription.toggleClass("show");
		resultsWrapper.toggleClass("noShow");
		resultsDescriptionClose.toggleClass("hidden");
		
		if (visible){
			$(_this).children(".text").html("More info");
		} else {
			$(_this).children(".text").html("Less info");
		}

	}).on('click', '.mod__result .panel #resultPanelButton', function(e){
		
		var _this = e.currentTarget;
		var resultsDescription = $(_this).closest(".panel").find(".mod__result--description"),
			resultsWrapper = $(_this).closest(".panel").find(".mod__result--wrapper");
		
		var buttonText = $(_this).closest(".panel").find(".panel-footer").find(".more-info").children(".text");

		buttonText.html("More info");
		//$(_this).children(".text").html("Less info");
		resultsWrapper.toggleClass("noShow");
		resultsDescription.toggleClass("show");

		$(_this).toggleClass("hidden");
		$(_this).children(".text").html("More info");
		
	});

	$("#example-navbar-collapse").on('show.bs.collapse', function(){
		$("main").addClass("resetMargin")
	});

	$("#example-navbar-collapse").on('hidden.bs.collapse', function(){
		$("main").removeClass("resetMargin")
	});


	// Bootstrap affix
	// $('#Search_Summary_Affix').affix({
	//   offset: {
	//     top: 100,
	//     bottom: function () {
	//       return (this.bottom = $('.js-change-search').outerHeight(true))
	//     }
	//   }
	// })

 $('.BackToTop').on("click", function(){
 	$('html, body').animate({ scrollTop: 0 }, 'fast');
 });

 if ($(".com__info-banner").is(':visible')){
 	$("main").addClass('noTopMargin')

 } else {
	$("main").removeClass('noTopMargin') 	
 }

 // Background image swapper
 var $bgContainer = $('.comp__search--bg');
 
 if ($('#bg-image')[0] !== undefined) {
 	$('.comp__search--bg').css('background-image', 'url(' + $('#bg-image')[0].value + ')');
 }

 var helperCVCImage = $('#cvc'); // Credit card CVC helper
 var owl = $("#transfersCarousel");

  owl.owlCarousel({
      items : 3, //10 items above 1000px browser width
      itemsDesktop : [1000,3], //5 items between 1000px and 901px
      itemsDesktopSmall : [900,2], // betweem 900px and 601px
      itemsTablet: [600,1], //2 items between 600 and 0
      itemsMobile : 1, // itemsMobile disabled - inherit from itemsTablet option
      navigation: true,
      navigationText : [
      	'<span class="icon icon-HT_circ-chevron-left" aria-hidden="true"></span>',
      	'<span class="icon icon-HT_circ-chevron-right" aria-hidden="true"></span>'
      	],
      	pagination: true
  });

  $("[data-slide='prev']").on('click', '.mod__carousel--transfers', function(event) {
  	event.preventDefault();
  	console.log("event");
  	owl.trigger('owl.prev');
  });

  $("[data-slide='next']").on('click', '.mod__carousel--transfers', function(event) {
  	event.preventDefault();
  	console.log("event");
  	owl.trigger('owl.next');
  });

if ($('#transfer_cost_display').length) {
	if (!$('#was_transfer_cost_display').hasClass('hide')) {
		$('#transfer_cost_display').addClass('strike');
	}
}



 });

function opacityLayer (ele, state){

	if(state){
		$(ele).addClass('show');	
	} else {
		$(ele).removeClass('show');	
	}

};









