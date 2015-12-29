var clickEvent = 'click';
var menuLinkTimer;
var navScroll;

function toggleMenu() {
	// remove all links to prevent click (iPad's issue)
	$('.menubar a').each(function() {
		var orig = $(this).attr('href');
		if(orig == 'javascript:void(0);') return;
		$(this).attr('data-temphref', orig).attr('href', 'javascript:void(0);');
	});
	
	if($('.menubar').is('.closed')) {
		$('.menubar').removeClass('closed');
	} else {
		$('.menubar').addClass('closed');
	}
	
	if(menuLinkTimer) {
		clearTimeout(menuLinkTimer);
		menuLinkTimer = null;
	}
	
	// restore links
	menuLinkTimer = setTimeout(function() {
		$('.menubar a').each(function() {
			var hr = $(this).data('temphref');
			if(!hr) return;
			$(this).attr('href', hr);
		});
	}, 1000);
}

function toggleBookingSummary() {
	if($('.bookingsummary').is('.closed')) {
		$('.bookingsummary').removeClass('closed');
	} else {
		$('.bookingsummary').addClass('closed');
	}
}
