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

export function getWordEntry(word) {
  return fetch(process.env.API_URL + "wordEntries/search/" + word, {
    method: "GET",
  }).then((response) => response.json());
}

export function getSingleTrack(id) {
  return fetch(process.env.API_URL + "wordEntries/singleTrack/" + id, {
    method: "GET",
  }).then((response) => response.json());
}

export function createPlaylist(userAccessToken, tracks, playlistTitle) {
  const body = {
    userAccessToken,
    tracks,
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
