const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader');


let apiQuotes = [];

// show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

function newQuote() {
    loading();
    // random quotes
   const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
   authorText.textContent = quote.author;
//    check if author field is blank and replace it with unknown
    if(!quote.author) {
        authorText.textContent = 'Unknown'
    } else {
        quoteText.textContent = quote.text;
    }
    if(quote.text.length > 50) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent  = quote.text;
    complete();
}
// get quotes from API


async function getQuotes() {
    loading();
    const apiUrl ='https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        console.log(newQuote());
    } catch (error) {
        alert(error)
    }
}

// tweet quote

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// on load

getQuotes();


