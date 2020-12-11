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
  }).then((response) => response.json());
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
  // Hipster searches
  let notArtists = [];
  for (let i = 0; i < 2; i++) {
    const result = await getSongs(word, token, notArtists);
    console.log(result);
    if (result.item) {
      return result.item;
    } else {
      notArtists = result.notArtists;
    }
  }
  // Popular searches

  return getSongs(word, token).then((response) => {
    const result1 = findMatch(word, response.tracks);
    if (result1.item) {
      return result1.item;
    } else {
      return getSongs(word, token, result1.notArtists).then((response) => {
        const result2 = findMatch(word, response.tracks);
        if (result2.item) {
          return result2.item;
        } else {
          return getSongs(word, token, null, false).then((response) => {
            return findMatch(word, response.tracks);
          });
        }
      });
    }
  });
}

export function generateSongSequence(message, token) {
  message = message.toLowerCase();
  const wordArr = message.split(" ");
  const sequence = [];
  const promises = [];
  for (let i in wordArr) {
    promises.push(findExactMatch(wordArr[i], token));
  }

  Promise.all(promises).then((results) => console.log(results));
}
