/*
* 
* 
*/


// TODO: How far do you go ... maybe set onResize to swap?
// Media Queries
var mQuerySm = Modernizr.mq('(min-width: 768px)');

$(document).ready(function($) {
	
	if (mQuerySm) {
		console.log("MinWidth: 768px",mQuerySm);
		$("#example-navbar-collapse").removeClass('hidden');
	}	

});

