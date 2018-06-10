lat = [42.352271, 42.330154, 42.3884, 42.373362, 42.320685, 42.31129, 42.35639457, 42.342622, 42.275275,
			 42.29312583, 42.39674, 42.395428, 42.36249079, 42.361166, 42.355518, 42.251809, 42.233391, 42.284652,
			 42.2665139, 42.300093, 42.365486, 42.2078543];
lng = [-71.05524200000001, -71.057655, -71.11914899999999, -71.118956, -71.052391, -71.053331, -71.0624242, -71.056967,
			 -71.029583, -71.06573796000001, -71.121815, -71.142483, -71.08617653, -71.070628, -71.060225, -71.005409, -71.007153,
			 -71.06448899999999, -71.0203369, -71.061667, -71.103802, -71.0011385];
title = ["South Station", "Andrew", "Porter Square", "Harvard Square", "JFK/Umass", "Savin Hill", "Park Street", "Broadway",
				 "North Quincy", "Shawmut", "Davis", "Alewife", "Kendall/MIT", "Charles/MGH", "Downtown Crossing", "Quincy Center",
				 "Quincy Adams", "Ashmont", "Wollaston", "Fields Corner", "Central Square", "Braintree"];
latlng = {};

function setMarker(lat, lng, title) {
	var coords = new google.maps.LatLng(lat, lng);

	// Create marker
	var marker = new google.maps.Marker({
		position: coords,
		icon: trainIcon,
		title: title,
	});

	latlng = {...latlng, [marker.title]: coords};
	
	marker.setMap(map);

	// Global info window
	infowindow = new google.maps.InfoWindow();

	// Open info window on click of marker
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(marker.title);
		infowindow.open(map, marker);
	});
}

function initMap() {
	var southStation = new google.maps.LatLng(42.352271, -71.05524200000001);
	// Set up map
	var myOptions = {
		zoom: 13, // The larger the zoom number, the bigger the zoom
		center: southStation,
		mapTypeId: 'roadmap'
	};

	// Create the map in the "map_canvas" <div>
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

	trainIcon = {
		url: 'trainmarker.png',
		scaledSize: new google.maps.Size(20, 20)
	};

	// Create markers
	for (i = 0; i < lat.length; i++) {
		setMarker(lat[i], lng[i], title[i]);
	}

	// Rendering the red polyline connecting each station
	var alewifeToAshmontPath = [
		latlng["Alewife"], latlng["Davis"], latlng["Porter Square"], latlng["Harvard Square"],
		latlng["Central Square"], latlng["Kendall/MIT"], latlng["Charles/MGH"], latlng["Park Street"],
		latlng["Downtown Crossing"], latlng["South Station"], latlng["Broadway"], latlng["Andrew"],
		latlng["JFK/Umass"], latlng["Savin Hill"], latlng["Fields Corner"], latlng["Shawmut"], latlng["Ashmont"]
	];
	var jfkUmassToBraintreePath = [
		latlng["JFK/Umass"], latlng["North Quincy"], latlng["Wollaston"],
		latlng["Quincy Center"], latlng["Quincy Adams"], latlng["Braintree"]
	];

	var alewifeToAshmont = new google.maps.Polyline({
		path: alewifeToAshmontPath,
		geodesic: true,
		strokeColor: '#FF0000',
		strokeOpacity: 1.0,
		strokeWeight: 4
    });

  	var jfkUmassToBraintree = new google.maps.Polyline({
		path: jfkUmassToBraintreePath,
		geodesic: true,
		strokeColor: '#FF0000',
		strokeOpacity: 1.0,
		strokeWeight: 4
    });

	alewifeToAshmont.setMap(map);
	jfkUmassToBraintree.setMap(map);
}
