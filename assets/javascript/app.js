// Sitcom array

var topics = ["The Office", "Roseanne", "Parks and Recreation", 
"The Cosby Show", "Bewitched", "That '70s Show", "The Fresh Prince of Bel-Air",
"Will and Grace", "Seinfeld", "Friends", "30 Rock", "Home Improvement",
"How I Met Your Mother", "I Love Lucy", "Frasier", "Community"];

// Render initial buttons function

function renderButtons() {

	$("#sitcom-buttons").empty();

	for (var i = 0; i < topics.length; i++) {

		var addButton = $("<button>");
		addButton.addClass("sitcom");
		addButton.attr("data-name", topics[i]);
		addButton.text(topics[i]);
		$("#sitcom-buttons").append(addButton);
	}
	generateGifs();
}

// Function to generate gifs from API

function generateGifs() {
	$(".sitcom").on("click", function() {
		var sitcomName = $(this).attr("data-name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Sbg6dxBSOLOUtR8fPRBNNksmsagTLbc8&q=" + sitcomName + "&limit=10&lang=en";

		$("#gifs-appear-here").empty();

		$.ajax({
			url: queryURL,
			method: "GET"
		})
		.done(function(response) {

			var results = response.data;

			for (var i = 0; i < results.length; i++) {
				var gifDiv = $("<div class='image'>");

				var rating = results[i].rating;

				var p = $("<p>").text("Rating: " + rating.toUpperCase());

				var sitcomImage = $("<img>");
				sitcomImage.addClass("gif")
				sitcomImage.attr("src", results[i].images.fixed_height_still.url);
				sitcomImage.attr("data-still", results[i].images.fixed_height_still.url)
				sitcomImage.attr("data-animate", results[i].images.fixed_height.url)
				sitcomImage.attr("data-state", "still")

				gifDiv.prepend(p);
				gifDiv.prepend(sitcomImage);

				$("#gifs-appear-here").prepend(gifDiv);
			}
			gifClicked();
		});
	});
}

// Click event for search form

$("#add-sitcom").on("click", function(event) {
	event.preventDefault();
	var sitcom = $("#sitcom-input").val().trim();
	topics.push(sitcom);
	renderButtons();
	$("#sitcom-input").val("");
});

renderButtons();

function gifClicked (){
	$(".gif").on("click", function(){

		var state = $(this).attr("data-state");
		var pause = $(this).attr("data-still");
		var play = $(this).attr("data-animate");

		if (state == "still") {
			$(this).attr("src", play);
			$(this).attr("data-state", "animate");

		}
		else if (state == "animate") {
			$(this).attr("src", pause);
			$(this).attr("data-state", "still")
		}
	});
}







