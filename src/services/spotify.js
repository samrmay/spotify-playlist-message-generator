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

function findMatch(word, tracks, notArtists = null) {
  if (!notArtists) {
    notArtists = [];
  }
  for (let i in tracks.items) {
    const item = tracks.items[i];
    const name = item.name.toLowerCase().replace(/\s\(feat.+\)/, "");
    if (name == word) {
      return { item, notArtists: null };
    } else {
      for (let i in item.artists) {
        notArtists.push(item.artists[i].name.toLowerCase());
      }
    }
  }
  return { item: null, notArtists: [...new Set(notArtists)] };
}

async function findExactMatch(word, token, genre = null) {
  const hipster = [true, false];
  const genres = [
    null,
    "blues",
    "classical",
    "disco",
    "experimental",
    "folk",
    "indie pop",
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

  for (let i in genres) {
    const genre = genres[i];
    for (let j in hipster) {
      const isHipster = hipster[j];
      const queryResult = await getSongs(word, token, null, isHipster, genre);
      if (queryResult.tracks) {
        const result = findMatch(word, queryResult.tracks);
        if (result.item) {
          return result.item;
        }
      }
    }
  }
  return null;
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
  };

  const keys = Object.keys(POLY_DICT);
  for (let i in keys) {
    const key = keys[i];
    const patt = new RegExp(`\\b${key}\\b`, "gi");
    const poly =
      POLY_DICT[key][Math.floor(Math.random() * POLY_DICT[key].length)];
    message = message.replace(patt, poly);
  }
  message = message.replace(/[\.!,()\?]/gi, "");
  return message;
}

export function generateSongSequence(message, token) {
  message = generatePolymorphisms(message.toLowerCase());
  console.log(message);
  const wordArr = message.split(" ");
  const promises = [];
  for (let i in wordArr) {
    promises.push(findExactMatch(wordArr[i], token));
  }

  return Promise.all(promises).then((results) => {
    return results;
  });
}
