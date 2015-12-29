var hTaxis = hTaxis || {};

// Fix elements to desired position on page.
// Dependency: https://github.com/imakewebthings/waypoints

(function ($) {
    	var zoom = 8;
    	var centertLoc = {lat: parseFloat($('#airportlat').val()), lng: parseFloat($('#airportlong').val())};
    	
    hTaxis.googleHtApi = {
    	

        setVars: function () {
           this.mapCanvas = document.getElementById('map');
           this.mapOptions = {
              center: new google.maps.LatLng(centertLoc),
              // center: new google.maps.LatLng(38.282169, -0.558156),
              zoom: zoom,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              mapTypeControl: true,
		scaleControl: true,
		streetViewControl: true,
            };
        },
        init: function () {
            this.setVars();
            this.createMap();
        },
        createMap: function () {

		var map = new google.maps.Map(hTaxis.googleHtApi.mapCanvas, hTaxis.googleHtApi.mapOptions);

        	var airportLoc = {lat: parseFloat($('#airportlat').val()), lng: parseFloat($('#airportlong').val())};
		var airportMarker = new google.maps.Marker({
			position: airportLoc,
			map: map,
			title: ''
		});

		if($('#resortlat').length)
		{
	        	var resortLoc = {lat: parseFloat($('#resortlat').val()), lng: parseFloat($('#resortlong').val())};
			var resortMarker = new google.maps.Marker({
				position: resortLoc,
				map: map,
				title: ''
			});
		}
        }
    }
})($);
