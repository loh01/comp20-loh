stationList = [
	{lat:42.352271, lng:-71.05524200000001, name:"South Station", stopid:'place-sstat'},
	{lat:42.395428, lng:-71.142483, name:"Alewife", stopid:'place-alfcl'},
	{lat:42.39674, lng:-71.121815, name:"Davis", stopid:'place-davis'},
	{lat:42.3884, lng:-71.11914899999999, name:"Porter Square", stopid:'place-portr'},
	{lat:42.373362, lng:-71.118956, name:"Harvard Square", stopid:'place-harsq'},
	{lat:42.365486, lng:-71.103802, name:"Central Square", stopid:'place-cntsq'},
	{lat:42.36249079, lng:-71.08617653, name:"Kendall/MIT", stopid:'place-knncl'},
	{lat:42.361166, lng:-71.070628, name:"Charles/MGH", stopid:'place-chmnl'},
	{lat:42.35639457, lng:-71.0624242, name:"Park Street", stopid:'place-pktrm'},
	{lat:42.355518, lng:-71.060225, name:"Downtown Crossing", stopid:'place-dwnxg'},
	{lat:42.342622, lng:-71.056967, name:"Broadway", stopid:'place-brdwy'},
	{lat:42.330154, lng:-71.057655, name:"Andrew", stopid:'place-andrw'},
	{lat:42.320685, lng:-71.052391, name:"JFK/Umass", stopid:'place-jfk'},
	{lat:42.31129, lng:-71.053331, name:"Savin Hill", stopid:'place-shmnl'},
	{lat:42.300093, lng:-71.061667, name:"Fields Corner", stopid:'place-fldcr'},
	{lat:42.29312583, lng:-71.06573796000001, name:"Shawmut", stopid:'place-smmnl'},
	{lat:42.284652, lng:-71.06448899999999, name:"Ashmont", stopid:'place-asmnl'},
	{lat:42.275275, lng:-71.029583, name:"North Quincy", stopid:'place-nqncy'},
	{lat:42.2665139, lng:-71.0203369, name:"Wollaston", stopid:'place-wlsta'},
	{lat:42.251809, lng:-71.005409, name:"Quincy Center", stopid:'place-qnctr'},
	{lat:42.233391, lng:-71.007153, name:"Quincy Adams", stopid:'place-qamnl'},
	{lat:42.2078543, lng:-71.0011385, name:"Braintree", stopid:'place-brntn'}
	];

posLat = 0;
posLng = 0;

function initMap() {
	var southStation = new google.maps.LatLng(stationList[0].lat, stationList[0].lng);
	stationList[0].pos = southStation;

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
	for (i = 1; i < stationList.length; i++) {
		setStationMarker(stationList[i].lat, stationList[i].lng, stationList[i].name, i);
	}

	// Rendering the red polyline connecting each station
	var alewifeToAshmontPath = [
		stationList[1].pos, stationList[2].pos, stationList[3].pos, stationList[4].pos, stationList[5].pos, stationList[6].pos,
		stationList[7].pos, stationList[8].pos, stationList[9].pos, stationList[0].pos, stationList[10].pos, stationList[11].pos,
		stationList[12].pos, stationList[13].pos, stationList[14].pos, stationList[15].pos, stationList[16].pos
	];

	var jfkUmassToBraintreePath = [
		stationList[12].pos, stationList[17].pos, stationList[18].pos, stationList[19].pos, stationList[20].pos, stationList[21].pos
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

	getMyLocation();
}

function setStationMarker(lat, lng, title, curr) {
	var coords = new google.maps.LatLng(lat, lng);

	// Create marker
	var marker = new google.maps.Marker({
		position: coords,
		icon: trainIcon,
		title: title
	});

	stationList[curr].pos = coords;
	
	marker.setMap(map);

	getSchedule(curr, marker);
}

function getMyLocation() {
	navigator.geolocation.getCurrentPosition(function(position) {
		posLat = position.coords.latitude;
		posLng = position.coords.longitude;
		setMyMarker(posLat, posLng);
	});
}

function setMyMarker(lat, lng) {
	var me = new google.maps.LatLng(lat, lng);

	var closestStation = stationList[0].pos;
	var closestStationName = stationList[0].name;
	var sdist = google.maps.geometry.spherical.computeDistanceBetween(me, closestStation);

	for (i = 1; i < stationList.length; i++)
	{
		currDist = google.maps.geometry.spherical.computeDistanceBetween(me, stationList[i].pos);

		if (currDist < sdist)
		{
			sdist = currDist;
			closestStation = stationList[i].pos;
			closestStationName = stationList[i].name;
		}
	}

	// Convert distance from meters to miles
	sdist = sdist*0.000621371;

	var myMarker = new google.maps.Marker({
		position: me,
		title: "You are here"
	});

	myMarker.setMap(map);

	// Global info window
	infowindow = new google.maps.InfoWindow();

	var infoDisplay = '<div id="content">' + 
				'<h1>' + myMarker.title + '</h1>' +
				'<p>' +  'Current Position: ' + lat + ',' + lng + '</p>' +
				'<p>' + 'Closest MBTA Red Line Station: ' + closestStationName + '</p>' + 
				'<p>' + 'Distance to Closest Station: ' + sdist + ' miles' + '</p>' + 
				'</div>';

	// Open info window on click of marker
	google.maps.event.addListener(myMarker, 'click', function() {
		infowindow.setContent(infoDisplay);
		infowindow.open(map, myMarker);
	});

	// Rendering the purple polyline connecting the closest station station
	var meToClosestStationPath = [
		me, closestStation
	];

  	var meToClosestStation = new google.maps.Polyline({
		path: meToClosestStationPath,
		geodesic: true,
		strokeColor: '#6600ff',
		strokeOpacity: 1.0,
		strokeWeight: 4
    });

    meToClosestStation.setMap(map);
}

function getSchedule(curr, marker) {
	var request = new XMLHttpRequest();
	var schedapi = "https://defense-in-derpth.herokuapp.com/redline/schedule.json?stop_id=" + stationList[curr].stopid;

	request.open("GET", schedapi, true);

	var schedString = '<h1>' + stationList[curr].name + '</h1>';

	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			jsonData = request.responseText;
			parsed = JSON.parse(jsonData);

			for (i = 0; i < parsed.data.length; i++) {
				schedString += '<p>' +
				'<span> Train ' + i + '</span>'
				'<span> Arrival time: ' + parsed.data[i].attributes.arrival_time + '</span>';

				if (parsed.data[i].attributes.direction_id == 0) {
					schedString += '<span> Direction: To Ashmont/Braintree </span></p>';
				}
				else if (parsed.data[i].attributes.direction_id == 1) {
					schedString += '<span> Direction: To Alewife </span></p>';
				}
			}
		}
		else if (request.readyState == 4 && request.status != 200) {
			schedString += "<p>Whoops, something went terribly wrong. Unable to load schedule. Status code: " + request.status + "</p>";
		}
	};

	// Global info window
	infowindow = new google.maps.InfoWindow();

	// Open info window on click of marker
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(schedString);
		infowindow.open(map, marker);
	});

	request.send();
}
