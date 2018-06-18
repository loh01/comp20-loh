// Your JavaScript goes here...
function parse() {

	var request = new XMLHttpRequest();
	request.open("GET", "data.json", true);

	output = document.getElementById("messages");

	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			jsonData = request.responseText;
			parsed = JSON.parse(jsonData);

			outputString = "";
			for (i = 0; i < parsed.length; i++) {
				outputString += '<p>' + parsed[i]["content"] + ' <span id="user">' + parsed[i]["username"] + '</span></p>';
			}
			output.innerHTML = outputString;
		}
		else if (request.readyState == 4 && request.status != 200) {
			output.innerHTML = "<p>Whoops, something went terribly wrong. Status code: " + request.status + "</p>";
		}
	};

	request.send();

}