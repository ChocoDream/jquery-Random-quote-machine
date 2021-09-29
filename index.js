const fetchQuotes = async () => {
  return await fetch("https://type.fit/api/quotes")
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.error(error));
};
const random = (length) => {
  return Math.floor(Math.random() * length);
};

const randomize = (array) => {
  return array[random(array.length)];
};

const renderInteractives = (quote) => {
  const { text: currentText } = quote;
  const currentAuthor = quote.author ?? "Unknown";
  $("#text").text(`"${currentText}"`);
  $("#author").text(`- ${currentAuthor}`);
};

$(document).ready(() => {
  fetchQuotes().then((data) => {
    let quote = randomize(data);
    $("#new-quote").click(() => {
      quote = randomize(data);
      renderInteractives(quote);
    });

    renderInteractives(quote);
  });
});
