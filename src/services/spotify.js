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

export function getSongs(songName, token, genre = null) {
  let query = `q=%22${songName.replace(" ", "%20")}%22`;
  if (genre) {
    query = query + "genre:%22" + genre.replace(" ", "%20") + "%22";
  }
  query = query + "&type=track&limit=50";

  return fetch(process.env.SPOTIFY_API + `search?${query}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  }).then((response) => response.json());
}
