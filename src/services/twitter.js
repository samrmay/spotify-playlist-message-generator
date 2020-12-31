export function searchTweet(url) {
  const id = url.match(/twitter\.com\/(\w+)\/status(es)?\/(\d+)/)[3];

  return fetch(process.env.API_URL + "twitter/" + id, {
    method: "GET",
  }).then((response) => response.json());
}

export function cleanTweetText(text) {
  // Remove links
  // https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
  let cleanText = text.replace(
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
    ""
  );
  return cleanText;
}
