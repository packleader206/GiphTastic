//Javascript for Giphtastic Homework Assignment

//wait for page to load before running Javascript
$(document).ready(function() {

    let topics = ["Seattle Seahawks", "Seattle Mariners", "Seattle Sounders", "Chicago Bulls", "Portland Trailblazers", "Colorado Rockies", "Chicago White Sox", "Chicago Cubs", "Oakland Raiders", "San Francisco 49ers", "Dallas Cowboys"];

    function generateButtons() {
        //clear out the div/buttons before generating new ones using the array since new buttons will be generated each time including the existing ones, this keeps the buttons from duplicating
        $("#button-section").empty();

        //loops through the topics array, generates button element in html and also adds classes & attributes to associated button, then appends to parent DIV
        for (i=0; i < topics.length; i++) {
            let button = $("<button>");
            button.attr("type", "button");
            button.attr("data", topics[i]);
            button.addClass("btn btn-outline-danger");
            button.text(topics[i]);
            $("#button-section").append(button);
        };
    }

    generateButtons();

    //on click of generated buttons, retrieve 10 images from Giphy
    $("#button-section").on("click", ".btn", function() {
    
        //event.preventDefault();
        var team = $(this).attr("data");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + team + "&api_key=sxdozw0HBzrDeHaarpYpWmdrCNtQWRQ2&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);

            var results = response.data;

            //create for loop to loop through data of each returned image
            for (var i = 0; i < results.length; i++) {
            
                //create empty Div to house images, create empty <p> element to house rating,
                var imageDiv = $("<div>");
                var pElement = $("<p>");
                pElement.text(results[i].rating);
                var pElement = $("<p>").text("Rating: " + results[i].rating);

                var teamImage = $("<img>")
                teamImage.attr("src", results[i].images.fixed_height_still.url);
                teamImage.attr("stillImageURL", results[i].images.fixed_height_still.url);
                teamImage.attr("animatedImageURL", results[i].images.fixed_height.url);
                teamImage.attr("gifState", "still");
                teamImage.addClass("gif");


                imageDiv.append(teamImage);
                imageDiv.append(pElement);
                $("#gif-section").prepend(imageDiv);
            }
        })
    })
    //event listener for #add-team button, takes user input in the #team-input field of the form and adds/pushes it to the Topics Array, then runs the buttonGenerator function to re-create buttons out of the entire array.
    $("#add-team").on("click", function(event){
        event.preventDefault();
        console.log("#add-team");

        var newButton = $("#team-input").val();
        topics.push(newButton);
        console.log(topics);
        generateButtons();
    })

    //event listner when user clicks each of the populated gif images, toggles between still and animated
    $("#gif-section").on("click", ".gif", function(event){
        event.preventDefault();

        var state = $(this).attr("gifState");

        if (state === "still") {
            $(this).attr("src", $(this).attr("animatedImageURL"));
            $(this).attr("gifState", "animated");
        }
        else {
            $(this).attr("src", $(this).attr("stillImageURL"));
            $(this).attr("gifState", "still");
        }
    })


});






