/* Random Quote Machine. by Nicholas D'Amico @ nicholasdamico.net */

/* Program Cross Browser Compatiability Checked in:
  - Chrome Version 51.0.2704.103 - .106 (64-bit)
  - Firefox 39.0 - FireFox 47.0.1
  - Safari 9.1.1


/* This program generates random quotes when a user clicks the "Show another quote" button on the web page. The Quote is then printed to the web page with a new random background-color. If no user input from clicking the button occurs then every 15 secs a new quote will be randomly selected and printed to the DOM.
 */

// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("click", printQuote, false);

var viewedQuotes = []; // Array to store randomly selected Quotes.
var intervalID;

// randomly generates and returns a number.
function randomNum(upper) {
    var rNumber = Math.floor(Math.random() * upper);
    return rNumber;
}

/* Calls getRandomQuote(); to generate a randomly selected Quote.
Then formats the HTML for index.html and outputs to DOM.
*/
function printQuote() {
    var selectedQuote = getRandomQuote();
    var backgrdColor = randomColor();
    var message = '<p class="quote">' + selectedQuote.quote + '</p>';
    message += '<p class="source">' + selectedQuote.source;

    // Checks for 'citation' property in Object.
    // Only adds HTML <span> if Obj. has 'citation' property.
    if (selectedQuote.hasOwnProperty('citation')) {
        message += '<span class="citation">' + selectedQuote.citation +
            '</span>';
    }

    // Checks for 'year' property in Object.
    // Only adds HTML <span> if Obj. has 'year' property.
    if (selectedQuote.hasOwnProperty('year')) {
        message += ' <span class="year">' + selectedQuote.year + ' </span>';
    }
    message += ' </p>';

    // Compiled HTML 'message' is sent to DOM replaces HTML on element ID 'quote-box'.
    document.getElementById("main-body").style.background = backgrdColor;
    document.getElementById("quote-box").innerHTML = message;
}

// Function generates randomly selected Quote.
function getRandomQuote() {
    // Random number generated based on quote arrays length.
    var ranNumber = Math.floor(Math.random() * quotes.length);

    // Removes (1) object from quotes array stores in spliceQuote.
    var spliceQuote = quotes.splice(ranNumber, 1)[0];

    // Checks to see if quotes array is empty.
    // If empty, moves all removed quote objects back to quotes array.
    if (quotes.length === 0) {
        quotes = viewedQuotes;
        viewedQuotes = [];
    }

    // Adds spliced quote to back of viewedQuotes array.
    // returns random quote to printQuote();
    viewedQuotes.push(spliceQuote);
    return spliceQuote;
}

// Generates random rgb color and formats color for css rgb value.
function randomColor() {
    var rColor = 'rgb(' + randomNum(256) + ', ';
    rColor += randomNum(256) + ', ';
    rColor += randomNum(256) + ')';
    return rColor;
}

// Used on <body onload="changeQuote();".
// Sets a 15second interval call to printQuote().
// every 15 secs a new quote and background color will occur.
function changeQuote() {
    intervalID = setInterval(printQuote, 15000);
}
