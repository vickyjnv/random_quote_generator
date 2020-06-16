//The following block of code is from Twitter and is needed
//for the Twitter API
window.twttr = (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
        t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);
    t._e = [];
    t.ready = function (f) {
        t._e.push(f);
    };

    return t;
}(document, "script", "twitter-wjs"));

/*The following code will randomly choose a quote from the JSON file, and then it will allow one
to tweet the randomly chosen quote after clicking on the tweet button. It will also change the background
color every time */
$(document).ready(function () {
    $("#getMessage").on("click", function () {
        $.getJSON("random_quotes.json", function (json) {
            var yourHTML = "";
            //generate a random number from 0 to the length of the array -1
            var randomNumber = Math.floor(Math.random() * (json.length))

            //change the content of the message box with jquery to the randomly chosen quote and its author
            $(".message").html("<p><br><strong>" + json[randomNumber]["theQuote"] + "</strong>" + "  -  " + json[randomNumber]["authorOfQuote"] + "<br></p>");

            //a Twitter tweet's URL will be in the form https://twitter.com/intent/tweet?text=
            //one needs to add the content after the =.
            //spaces don't work well in HTML, so we need to use %20 to encode a space
            var quote = json[randomNumber]["theQuote"];
            var noSpacesContent = quote.replace(/ /g, "%20");
            var author = json[randomNumber]["authorOfQuote"];
            var noSpacesContent2 = author.replace(/ /g, "%20");
            //below I had to insert &#35; for # because # needs to be encoded for HTML similar to how the space was.
            var noSpacesContent3 = "%20%20&#35;goodquotes";

            var twitterBeginningURL = "https://twitter.com/intent/tweet?text=";
            var fullURL = twitterBeginningURL + noSpacesContent + "%20%20" + "-" + "%20%20" + noSpacesContent2 + noSpacesContent3;

            //replace single quotes by something equivalent to it in a URL, but which won't break the url
            //' actually should be %27. I discovered this by copying a url from twitter and changing it
            fullURLFixed = fullURL.replace(/'/g, "%27");
            //finally make sure a spaces are replaced by %20
            fullURLFixedFinal = fullURLFixed.replace(/ /g, "%20");

            //escaping the " in the following line was necessary because of potential single quotes making problems
            $(".message").append("<br><a class='twitter-share-button' " + "href=\"" + fullURLFixedFinal + "\">" + "</a>");

            //now set up randomly chosen background color
            var arrayOfColors = ["IndianRed", "LightBlue", "Tan", "SlateGray", "Tomato", "powderblue", "Peru", "Turquoise"];
            var randomColorNumber = Math.floor(Math.random() * (arrayOfColors.length));
            $("body").css("background-color", arrayOfColors[randomColorNumber]);

            //reload content as recommended by https://dev.twitter.com/web/javascript/initialization
            //One needs to use the following code otherwise the Twitter quote won't change after a new quote generation
            twttr.widgets.load(document.getElementById("quoteID"));

            //change the text content of blue button after the first time a quote is generated
            $("#getMessage").text("Get a new randomly chosen quote.");
        });
    });
});