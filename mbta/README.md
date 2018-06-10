# Aspects I implemented successfully:
1. Generated map, fit to screen
2. Created markers, and used custom pin
3. Made code a little more efficient compared to creating places and their markers individually, one by one

# Challenges:
I have one question: I first tried creating a list of station objects with lat, lng and their names. Why did this not work? The initial approach I tried is as below.

function initMap() {
	// All stations
	var stationList = [
		{lat: 42.395428, lng: -71.142483, name: "Alewife"},
		{lat: 42.39674, lng: -71.121815, name: "Davis"},
		{lat: 42.3884, lng: -71.11914899999999, name: "Porter Square"},
		{lat: 42.373362, lng: -71.118956, name: "Harvard Square"},
		{lat: 42.365486, lng: -71.103802, name: "Central Square"},
		{lat: 42.36249079, lng: -71.08617653, name:"Kendall/MIT"},
		{lat: 42.361166, lng: -71.070628, name: "Charles/MGH"},
		{lat: 42.35639457, lng: -71.0624242, name: "Park Street"},
		{lat: 42.355518, lng: -71.060225, name: "Downtown Crossing"},
		{lat: 42.352271, lng: -71.05524200000001, name: "South Station"},
		{lat: 42.342622, lng: -71.056967, name: "Broadway"},
		{lat: 42.330154, lng: -71.057655, name: "Andrew"},
		{lat: 42.320685, lng: -71.052391, name: "JFK/Umass"},
		{lat: 42.31129, lng: -71.053331, name: "Savin Hill"},
		{lat: 42.300093, lng: -71.061667, name: "Fields Corner"},
		{lat: 42.29312583, lng: -71.06573796000001, name: "Shawmut"},
		{lat: 42.284652, lng: -71.06448899999999, name: "Ashmont"},
		{lat: 42.275275, lng: -71.029583, name: "North Quincy"},
		{lat: 42.2665139, lng: -71.0203369, name: "Wollaston"},
		{lat: 42.251809, lng:-71.005409, name: "Quincy Center"},
		{lat: 42.233391, lng: -71.007153, name: "Quincy Adams"},
		{lat: 42.2078543, lng: -71.0011385, name: "Braintree"}
	];

	var stations = [];
	for (i = 0; i < stationList.length; i++) {
		stations[i] = new google.maps.LatLng(stationList[i].lat, stationList[i].lng);
	};

	// Set up map
	var myOptions = {
		zoom: 13, // The larger the zoom number, the bigger the zoom
		center: stations[0],
		mapTypeId: 'roadmap'
	};
	
	// Create the map in the "map_canvas" <div>
	var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

	// Create markers and info window
	var stationMarkers = [];
	var infowindow = new google.maps.InfoWindow();

	for (i = 0; i < stationList.length; i++) {
		stationMarkers[i] = new google.maps.Marker({
				position = stations[i],
				title = stationList[i].name
		});
		stationMarkers[i]Marker.setMap(map);

		google.maps.event.addListener(stationMarkers[i], 'click', function() {
			infowindow.setContent(stationMarkers[i].title);
			infowindow.open(map, stationMarkers[i]);
		});
	};
}

# Resources:
My friend Andrew who also studies in Boston - he suggested that I split the process into two functions, and loop the function setMarker instead. He also taught me the '...' operator I used.
Other resources:
https://www.iconfinder.com/icons/359016/map_pin_pointer_skytrain_subway_train_station_transportation_icon
https://stackoverflow.com/questions/15096461/resize-google-maps-marker-icon-image?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
https://developers.google.com/maps/documentation/javascript/examples/polyline-simple
https://developers.google.com/maps/documentation/javascript/custom-markers

# Approximate duration spent: 7hrs (yeah I struggled with trying to get the code more efficient. Doing the markers individually took up like 300+ lines of code)