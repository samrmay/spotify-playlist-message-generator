import shuffleArr from "./shuffleArr";

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

export async function createPlaylist(name, songs, userAccessToken, userId) {
  const playlist = await fetch(
    process.env.SPOTIFY_API + `users/${userId}/playlists`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    }
  ).then((response) => response.json());

  if (playlist.error) {
    return { error: playlist.error };
  }

  const body = songs.map((item) => item.uri);
  const maxi = Math.ceil(body.length / 100) * 100;
  for (let i = 1; i < maxi; i += 100) {
    const upper = 100 > body.length ? body.length : 100;
    const batch = body.splice(0, upper);
    await fetch(process.env.SPOTIFY_API + `playlists/${playlist.id}/tracks`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uris: batch }),
    });
  }
  return { error: null, playlist: playlist };
}
