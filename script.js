// Pegar os elementos do HTML
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Mostrar o loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Esconder o loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Mostrar nova frase
function newQuote() {
  const quote = apiQuotes[0];
  // Verificar se o autor está vazio e adicionar 'Desconhecido'

  if (!quote.author) {
    quoteAuthor.textContent = "Desconhecido";
  } else {
    quoteAuthor.textContent = quote.author;
  }

  // Reduzir o tamanho da fonte para frases longas
  if (quote.quote.length > 150) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.quote;

  // Parar o loader e mostrar a frase
  complete();
}

// Pegar frases do API
async function getQuotes() {
    // Mostrar o loading
  loading();
  const apiUrl = "https://api.api-ninjas.com/v1/quotes";
  const apiKey = "R+SHZ8O/NnGjpQIpjlpa2g==xRjV2VmQunuojLy1";
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "X-Api-Key": apiKey,
      },
    });
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    console.error(error);
  }
}

// Tweetar a frase
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", getQuotes);
twitterBtn.addEventListener("click", tweetQuote);

// Ao carregar a página
getQuotes();
