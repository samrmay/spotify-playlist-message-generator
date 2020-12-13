import shuffleArr from "./shuffleArr";

export function getAccessToken() {
  const authString =
    "Basic " +
    btoa(
      process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET
    );

  return fetch(process.env.SPOTIFY_ACCOUNTS + "token", {
    method: "POST",
    headers: {
      Authorization: authString,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  }).then((response) => response.json());
}

export function getSongs(
  str,
  token,
  notArtists = null,
  hipster = true,
  genre = null
) {
  let query = `q=`;
  if (notArtists) {
    for (let i in notArtists) {
      query = `${query}NOT%20%22${encodeURI(
        notArtists[i].split(" ")[0]
      )}%22%20`;
    }
  }

  query = `${query}track:${encodeURI(`"${str}"`)}`;
  if (genre) {
    query = `${query}%20genre:%22${encodeURI(genre)}%22`;
  }
  if (hipster) {
    query = `${query}%20tag:hipster`;
  }

  query = query + "&type=track&limit=50&include_external=audio";
  return fetch(process.env.SPOTIFY_API + `search?${query}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => response.json())
    .catch((response) => {
      return { tracks: null };
    });
}

function findMatch(word, tracks) {
  for (let i in tracks.items) {
    const item = tracks.items[i];
    let name = item.name.toLowerCase().replace(/\s\(feat.+\)/, "");
    name = name.replace(/[\.!,()\?]/gi, "");
    if (name == word) {
      return { item };
    }
  }
  return { item: null };
}

export async function findExactMatch(word, token) {
  const hipster = [true, false];
  const genres = [
    null,
    "classical",
    "experimental",
    "indie rock",
    "jazz",
    "pop",
    "rap",
    "r&b",
    "techno",
    "video game music",
  ];
  shuffleArr(hipster);
  shuffleArr(genres);
  const promises = [];
  for (let i in genres) {
    for (let j in hipster) {
      promises.push(getSongs(word, token, null, hipster[j], genres[i]));
    }
  }
  const queryResults = await Promise.all(promises);

  for (let i in queryResults) {
    if (queryResults[i].error) {
      return { error: true, item: null };
    }
    const result = findMatch(word, queryResults[i].tracks);
    if (result.item) {
      return { error: false, item: result.item };
    }
  }

  return { error: false, item: null };
}

function generatePolymorphisms(message) {
  const POLY_DICT = {
    "is a": ["issa"],
    "got to": ["gotta"],
    "i've": ["i have"],
    im: ["i am"],
    "i'm": ["i am"],
    a: ["ay"],
    for: ["4", "foor"],
    to: ["too"],
    2: ["too"],
    the: ["dah", "duh"],
    and: ["anne"],
    be: ["bee"],
    "&": ["anne"],
    have: ["haf", "hav"],
    app: ["application"],
    "you're": ["ur"],
    your: ["ur"],
    in: [""],
    "don't": ["do not"],
    do: ["dew"],
    "doesn't": ["does not"],
    "won't": ["will not"],
  };

  const keys = Object.keys(POLY_DICT);
  for (let i in keys) {
    const key = keys[i];
    const patt = new RegExp(`\\b${key}\\b`, "gi");
    const poly =
      POLY_DICT[key][Math.floor(Math.random() * POLY_DICT[key].length)];
    message = message.replace(patt, poly);
  }
  message = message.replace(/[\.!,()\?:]/gi, "");
  return message;
}

export function parseSequence(message) {
  message = generatePolymorphisms(message.toLowerCase());
  return message.split(" ").filter((item) => item.length > 0);
}
