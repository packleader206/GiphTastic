//Javascript for Giphtastic Homework Assignment

//wait for page to load before running Javascript
$(document).ready(function() {

    let topics = ["Seattle Seahawks", "Seattle Mariners", "Seattle Sounders", "Chicago Bulls", "Portland Trailblazers", "Colorado Rockies", "Chicago White Sox", "Chicago Cubs", "Oakland Raiders", "San Francisco 49ers", "Dallas Cowboys"];

    function generateButtons() {
        //clear out the div/buttons before generating new ones using the array since new buttons will be generated each time including the existing ones, this keeps the buttons from duplicating
        $("#button-section").empty();

        //loops through the topics array, generates button element in html and also adds classes & attributes to associated button, then appends to parent DIV
        for (var i = 0; i < topics.length; i++) {
            let button = $("<button>");
            button.attr("type", "button");
            button.attr("data", topics[i]);
            button.addClass("btn btn-outline-danger");
            button.text(topics[i]);
            $("#button-section").append(button);
        };
    };
    //invoke function
    generateButtons();

    //on click of generated buttons, retrieve 10 images from Giphy
    $("#button-section").on("click", ".btn", function() {
        
        //clears any existing gifs since new gifs will be generated each time
        $("#gif-section").empty();
        event.preventDefault();

        //variables to get API data.  Team variable = data for team-button clicked. QueryURL to specify which team to pull data for using assigned API key, specifying a limit of 10 images.
        let team = $(this).attr("data");
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + team + "&api_key=sxdozw0HBzrDeHaarpYpWmdrCNtQWRQ2&limit=10";

        //JQuery Ajax call for 'promise' of data
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            
            //create variable to set up for loop
            let results = response.data;

            //create for loop to loop through data of each returned image
            for (var i = 0; i < results.length; i++) {
            
                //create empty Div to house images & rating adds classes to the Div
                let imageDiv = $("<div>");
                imageDiv.addClass("d-inline-block iDiv");

                //create p element to display rating, then adds rating to HTML for corresponding image
                let pElement = $("<p>");
                pElement.addClass("pRating");
                pElement.text("Rating: " + results[i].rating);
                
                //creates image elements in html for associated images, set's attributes and adds class
                let teamImage = $("<img>")
                teamImage.attr("src", results[i].images.fixed_height_still.url);
                teamImage.attr("stillImageURL", results[i].images.fixed_height_still.url);
                teamImage.attr("animatedImageURL", results[i].images.fixed_height.url);
                teamImage.attr("gifState", "still");
                teamImage.addClass("gif");

                //appends image and rating elements to the imageDiv
                imageDiv.append(teamImage);
                imageDiv.append(pElement);

                //prepends the imageDiv to the parent Div #gif-section
                $("#gif-section").prepend(imageDiv);
            };
        });
    });

    //event listener for #add-team button, takes user input in the #team-input field of the form and adds/pushes it to the Topics Array, then runs the buttonGenerator function to re-create buttons out of the entire array.
    $("#add-team").on("click", function(event){
        event.preventDefault();
        console.log("#add-team");
        
        //grabs user input, then pushes it to topics array, then generates buttons for all the teams in the topics array
        let newButton = $("#team-input").val();
        topics.push(newButton);
        console.log(topics);
        generateButtons();
    });

    //event listener when user clicks each of the populated gif images, logic toggles between still and animated on-click depending on current state
    $("#gif-section").on("click", ".gif", function(event){
        event.preventDefault();

        let state = $(this).attr("gifState");

        if (state === "still") {
            $(this).attr("src", $(this).attr("animatedImageURL"));
            $(this).attr("gifState", "animated");
        }
        else {
            $(this).attr("src", $(this).attr("stillImageURL"));
            $(this).attr("gifState", "still");
        };
    });


});






