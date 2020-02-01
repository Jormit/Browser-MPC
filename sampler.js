sounds = [];
var currentKey = 0;
var currentRow = 0;

// Opens file dialog and allows to load in sound on currently selected pad.
function handleFileSelect(evt) {
	var files = evt.target.files; // FileList object

	for (var i = 0, f; f = files[i]; i++) {

		if (!sounds[currentKey]) {
			if ($("#pads").children().length == 0){
				$("#pads").html('<tr id = "row_0"></tr>');
			}

			if ($("#row_" + currentRow).children().length == 4) {
				currentRow++;
				$("#pads").html($("#pads").html() + '<tr id = "row_' +  currentRow + '"></tr>');
			}

			$("#row_" + currentRow).html( $("#row_" + currentRow).html() + 
			'<th><div class = "pad" id="key' + currentKey + '">' + '[' + String.fromCharCode(currentKey) 
			+ '] ' + files[0].name + '</div></th>');

		} else {
			$("#key" + currentKey).html('[' + String.fromCharCode(currentKey) + '] ' + files[0].name);
		}

		var reader = new FileReader();

		// Closure to capture the file information.
		reader.onload = (function(theFile) {
			return function(e) {
				sounds[currentKey] = new Howl({
					src: e.target.result,
					format: theFile.name.split('.').pop().toLowerCase()
				});
			};
		})(f);

		// Read in the image file as a data URL.
		reader.readAsDataURL(f);
	}
}

document.getElementById('loadSound').addEventListener('change', handleFileSelect, false);

$(document).keydown(function(e){
	if (e.key.length == 1){
		var code = e.key.charCodeAt(0);
		currentKey = code;
		$("#currentKey").text("Selected Key: " + e.key);
		$("#key" + currentKey).addClass("active_pad");
		
		if (sounds[code]) {
			sounds[code].stop();
			sounds[code].play();
		}
	}
});

$(document).keyup(function(e){
	if (e.key.length == 1){
		$("#key" + e.key.charCodeAt(0)).removeClass("active_pad");
	}
});

