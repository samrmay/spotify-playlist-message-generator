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
