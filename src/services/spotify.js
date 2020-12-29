export function getAccessToken() {
  const authString =
    "Basic " +
    btoa(
      process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET
    );

  return fetch(process.env.SPOTIFY_ACCOUNTS + "api/token", {
    method: "POST",
    headers: {
      Authorization: authString,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  }).then((response) => response.json());
}

export function parseSequence(message) {
  message = generatePolymorphisms(message.toLowerCase());
  return message.split(" ").filter((item) => item.length > 0);
}

function generatePolymorphisms(message) {
  const POLY_DICT = {
    "is a": ["issa"],
    "got to": ["gotta"],
    "i've": ["i have"],
    im: ["i am"],
    "i'm": ["i am"],
    a: ["ay", "aye"],
    for: ["4", "foor"],
    to: ["too"],
    two: [2, "too"],
    the: ["dah", "duh"],
    and: ["anne"],
    an: ["anne"],
    be: ["bee"],
    "&": ["anne"],
    have: ["haf", "hav"],
    "you're": ["ur"],
    your: ["ur"],
    in: ["inne"],
    "don't": ["do not"],
    do: ["dew"],
    "doesn't": ["does not"],
    "won't": ["will not"],
    with: ["whiff"],
  };

  const keys = Object.keys(POLY_DICT);
  for (let i in keys) {
    const key = keys[i];
    const patt = new RegExp(`\\b${key}\\b`, "gi");
    const poly =
      POLY_DICT[key][Math.floor(Math.random() * POLY_DICT[key].length)];
    message = message.replace(patt, poly);
  }
  message = message.replace(/[\.!,()\?:"']/gi, "");
  return message;
}
