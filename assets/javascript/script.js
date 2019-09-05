var topicsSports = ["soccer", "football", "baseball", "tennis", "swimming", "sprinting", "basketball", "hockey", "golf", "boxing"]


// ---------------------------------------------------------
renderBtn();


// ---------------------------------------------------------

function renderBtn() {
    for (let i = 0; i < topicsSports.length; i++) {
        var btn = $("<button>");
            btn.addClass ("topicsSports")
            btn.addClass("btn btn-primary mr-4");
            btn.attr("data-name", topicsSports[i])
            btn.text(topicsSports[i]);
            $("#btnDiv").append(btn);

    }
}

// ----------------------------------------------------------- 
// function to add new sports button

function addNewButton (){
    $("#addGif").on("click", function(){
        var sports = $("#sport-input").val().trim();
        if (sports == ""){
            return false;
        }
        topicsSports.push(sports);

        displayGifButtons();
        return false;
    });
}

// ---------------------------------------------------------------
// function to remove last sports button

function removeLastButton (){
   $("removeGif").on("click", function(){
       topicsSports.pop(sports);
       displayGifButtons();
       return false;
   });
}

// ---------------------------------------------------------------
// function to display the gifs

function displayGifs() {
    var sports =$(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + sports + "&api_key=Ag2URJctP1NH1qwbNIlUsFZrH60sh05S=10";
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .done(function(response) {
        console.log(response);
        $("#gifsView").empty();
        var results = response.data;
        if (results == ""){
            alert("There isn't a gif for this slected button");
        }
        for (var i=0; i<results.length; i++){

            var gifDiv = $("<div>"); //div for the gifs to go inside
            gifDiv.addClass("gifDiv");
            // pulling rating of gif
            var gifRating = $("<p>").text("Rating: " + results[i].rating);
            gifDiv.append(gifRating);
            // pulling gif
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); // still image
            gifImage.attr("data-animate",results[i].images.fixed_height_small.url); // animated image
            gifImage.attr("data-state", "still"); // set the image state
            gifImage.addClass("image");
            gifDiv.append(gifImage);
            // pulling still image of gif
            // adding div of gifs to gifsView div
            $("#gifsView").prepend(gifDiv);
        }
    });
}
// Calling Functions & Methods
displayGifButtons(); // displays list of actions already created
addNewButton();
removeLastButton();
// Document Event Listeners
$(document).on("click", ".action", displayGifs);
$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
