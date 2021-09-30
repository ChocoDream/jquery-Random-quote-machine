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

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const renderInteractives = (quote) => {
  const { text: currentText } = quote;
  const currentAuthor = quote.author ?? "Unknown";
  const r = clamp(random(255), 25, 195);
  const g = clamp(random(255), 25, 195);
  const b = clamp(random(255), 25, 195);
  $("#text").animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $(this).text(currentText);
  });
  $("#author").animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $(this).text(currentAuthor);
  });
  const currentColor = `rgb(${r}, ${g}, ${b})`;
  $("html body").animate(
    { backgroundColor: currentColor, color: currentColor },
    1000
  );
  $(".btn").animate(
    { backgroundColor: currentColor },
    1000
  );
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
