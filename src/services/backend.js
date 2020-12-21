export function getRedirectURL() {
  return fetch(process.env.API_URL + "redirect/playlist", {
    method: "GET",
  });
}

export function getUserId(userAccessToken) {
  return fetch(process.env.API_URL + "userId/" + userAccessToken, {
    method: "GET",
  });
}

export function getWordEntry(word) {
  return fetch(process.env.API_URL + "wordEntries/search/" + word, {
    method: "GET",
  });
}

export function getSingleTrack(wordEntry) {
  return fetch(
    process.env.API_URL + "wordEntries/singleTrack" + wordEntry._id,
    {
      method: "GET",
    }
  );
}
