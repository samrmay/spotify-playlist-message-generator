export function getRedirectURL() {
  return fetch(process.env.API_URL + "spotify/redirect/playlist", {
    method: "GET",
  }).then((response) => response.json());
}

export function getUserId(userAccessToken) {
  return fetch(process.env.API_URL + "userId/" + userAccessToken, {
    method: "GET",
  });
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
