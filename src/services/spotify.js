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
    const name = item.name.toLowerCase();
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
      let notArtists = [];
      for (let k = 0; k < 2; k++) {
        const queryResult = await getSongs(
          word,
          token,
          notArtists,
          isHipster,
          genre
        );
        if (queryResult.tracks) {
          const result = findMatch(word, queryResult.tracks);
          if (result.item) {
            return result.item;
          } else {
            notArtists = result.notArtists;
          }
        }
      }
    }
  }
  return null;
}

function generatePolymorphisms(word) {
  const WORDS_DICT = {
    to: "2",
    for: "4",
    the: "da",
  };
  if (Object.keys(WORDS_DICT).includes(word)) {
    return WORDS_DICT[word];
  }
  return word;
}

export function generateSongSequence(message, token) {
  message = message.toLowerCase();
  const wordArr = message.split(" ");
  const promises = [];
  for (let i in wordArr) {
    promises.push(findExactMatch(generatePolymorphisms(wordArr[i]), token));
  }

  return Promise.all(promises).then((results) => {
    return results;
  });
}
