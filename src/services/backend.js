export function getRedirectURL() {
  return fetch(process.env.API_URL + "spotify/redirect/playlist", {
    method: "GET",
  }).then((response) => response.json());
}

export function getUserId(userAccessToken) {
  return fetch(process.env.API_URL + "spotify/userId/" + userAccessToken, {
    method: "GET",
  }).then((response) => response.json());
}

export async function getWordEntry(word) {
  const response = await fetch(
    process.env.API_URL + "wordEntries/search/" + word,
    {
      method: "GET",
    }
  );

  if (response.status == 404) {
    // post word and return that new word entry
    const newWordEntry = await fetch(process.env.API_URL + "wordEntries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ word }),
    }).then((response) => response.json());
    return newWordEntry._id;
  } else {
    return response.json();
  }
}

export function getSingleTrack(id) {
  return fetch(process.env.API_URL + "wordEntries/singleTrack/" + id, {
    method: "GET",
  }).then((response) => {
    if (response.status == 200 || response.status == 201) {
      return response.json();
    } else {
      return null;
    }
  });
}

export function createPlaylist(userAccessToken, tracks, playlistTitle) {
  const filterTracks = tracks.filter((item) => item);

  const body = {
    userAccessToken,
    tracks: filterTracks,
    playlistTitle,
  };
  return fetch(process.env.API_URL + "playlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((response) => response.json());
}
