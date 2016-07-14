/* Random Quote Machine. by Nicholas D'Amico @ nicholasdamico.net */
/* This program generates one of five random quotes when a user clicks the "Show another quote" button on the web page. The Quote is then printed to the web page. If no user input from clicking the button occurs then every 12 secs a new quote will be randomly selected and printed to the DOM.
 */

// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("click", printQuote, false);

var viewedQuotes = [];  // Array to store randomly selected Quotes.

// Array of Objects for Quote Machine
var quotes = [{
    quote: "Wilderness is not a luxury but necessity of the human spirit.",
    source: "Edward Abbey",
    citation: "Desert Solitaire",
    year: 1968
}, {
    quote: "We do not see nature with our eyes, but with our understandings and our hearts.",
    source: "William Hazlett",
    citation: "Thoughts on Taste, Edinburgh Magazine",
    year: 1818
}, {
    quote: "Afoot and lighthearted I take to the open road, healthy, free, the world before me. Henceforth, I ask not good fortune, I myself am good fortune. Henceforth, I whimper no more, postpone no more, need nothing.",
    source: "Walt Whitman",
    citation: "Songs for the Open Road",
    year: 1998
}];



// randomly generates and returns a number.
function randomNum(upper) {
    var rNumber = Math.floor(Math.random() * upper);
    return rNumber;
};

/* Calls getRandomQuote(); to generate a randomly selected Quote.
Then formats the HTML for index.html and outputs to DOM.
*/
function printQuote() {
    var selectedQuote = getRandomQuote();
    var message = '<p class="quote">' + selectedQuote.quote + '</p>';
    message += '<p class="source">' + selectedQuote.source;

    if (selectedQuote.hasOwnProperty('citation')) {                             // Checks for 'citation' property in Object.
        message += '<span class="citation">' + selectedQuote.citation +          // Only adds HTML <span> if Obj. has 'citation' property.
        '</span>';
    }

    if (selectedQuote.hasOwnProperty('year')) {                                 // Checks for 'year' property in Object.
        message += ' <span class="year">' + selectedQuote.year + ' </span>';    // Only adds HTML <span> if Obj. has 'year' property.
    }

    message += ' </p>';
    document.getElementById("quote-box").innerHTML = message;                   // Compiled HTML 'message' is sent to DOM replaces HTML on element ID 'quote-box'.
};

function getRandomQuote() {                                                     // Function generates randomly selected Quote.
    var ranNumber = Math.floor(Math.random() * quotes.length);                  // Random number generated based on quote arrays length.
    var spliceQuote = quotes.splice(ranNumber, 1)[0];                           // Removes (1) object from quotes array stores in spliceQuote.
                                                                                // Makes sure no one quote
    if (quotes.length === 0) {
        quotes = viewedQuotes;                                                  // Checks to see if quotes array is empty.
        viewedQuotes = [];                                                      // If empty, moves all removed quote objects back to quotes array.
    }

    viewedQuotes.push(spliceQuote);                                             // Adds spliced quote to back of viewedQuotes array.
    return spliceQuote;                                                         // returns random quote to printQuote();
}
printQuote();
