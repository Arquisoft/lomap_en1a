import { Comment } from "../domain/Comment";
import { Picture } from "../domain/Picture";
import { Place } from "../domain/Place";
import { Score } from "../domain/Score";
import { User } from "../domain/User";

//Comments----------------------------------------

//Add a comment
export async function addComment(comment: Comment): Promise<boolean> {
  const apiEndPoint =
    process.env.REACT_APP_API_URI || "https://localhost:5443/api";
  let response = await fetch(apiEndPoint + "/comment/add", {
    credentials: "include",
    mode: "cors",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      comment: comment.text,
      place: comment.place,
      visibility: comment.visibility,
    }),
  });
  if (response.status === 200) return true;
  else return false;
}

export async function getComments(id: string): Promise<Comment[]> {
  const apiEndPoint =
    process.env.REACT_APP_API_URI || "https://localhost:5443/api";
  let response = await fetch(apiEndPoint + "/comment/list/" + id, {
    credentials: "include",
    mode: "cors",
  });
  return response.json();
}

//Scores--------------------------------------------

//Add a score
export async function addScore(score: Score): Promise<boolean> {
  const apiEndPoint =
    process.env.REACT_APP_API_URI || "https://localhost:5443/api";
  let response = await fetch(apiEndPoint + "/score/add", {
    credentials: "include",
    mode: "cors",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      score: score.score,
      place: score.place,
      visibility: score.visibility,
    }),
  });
  if (response.status === 200) return true;
  else return false;
}

//Get scores for a place
export async function getScores(id: String): Promise<Score[]> {
  const apiEndPoint =
    process.env.REACT_APP_API_URI || "https://localhost:5443/api";
  let response = await fetch(apiEndPoint + "/score/list/" + id, {
    credentials: "include",
    mode: "cors",
  });
  return response.json();
}

//Places----------------------------------------------

//Add a place
export async function addPlace(place: Place): Promise<Place> {
  const apiEndPoint =
    process.env.REACT_APP_API_URI || "https://localhost:5443/api";
  let response = await fetch(apiEndPoint + "/place/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: place.name,
      visibility: place.visibility,
      latitude: place.latitude,
      longitude: place.longitude,
      category: place.category,
      description: place.description,
    }),

    credentials: "include",
    mode: "cors",
  });

  return response.json();
}

//Pictures----------------------------------------------
export async function getPictures(id: string): Promise<Picture[]> {
  const apiEndPoint =
    process.env.REACT_APP_API_URI || "https://localhost:5443/api";

  let response = await fetch(apiEndPoint + "/picture/list/" + id, {
    credentials: "include",
    mode: "cors",
  });
  return response.json();
}

export async function addPicture(picture: Picture): Promise<boolean> {
  const apiEndPoint =
    process.env.REACT_APP_API_URI || "https://localhost:5443/api";
  let response = await fetch(apiEndPoint + "/picture/add", {
    credentials: "include",
    mode: "cors",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      picture: picture,
      place: picture.place,
      visibility: picture.visibility,
      url: picture.url,
    }),
  });
  if (response.status === 200) return true;
  else return false;
}

//Places----------------------------------------------

//List places by visibility
export async function getPlaces(visibility: string): Promise<Place[]> {
  const apiEndPoint =
    process.env.REACT_APP_API_URI || "https://localhost:5443/api";

  let response = await fetch(apiEndPoint + "/place/" + visibility + "/list", {
    credentials: "include",
    mode: "cors",
  });

  return response.json();
}

//List public places by user

export async function getPublicPlacesByPublicUser(
  id: string
): Promise<Place[]> {
  let userId = encodeURIComponent(id);
  const apiEndPoint =
    process.env.REACT_APP_API_URI || "https://localhost:5443/api";
  let response = await fetch(apiEndPoint + "/place/public/list/" + userId, {
    credentials: "include",
    mode: "cors",
  });

  return response.json();
}

export async function getPublicPlacesByUser(): Promise<Place[]> {
  const apiEndPoint =
    process.env.REACT_APP_API_URI || "https://localhost:5443/api";
  let response = await fetch(apiEndPoint + "/place/public/list", {
    credentials: "include",
    mode: "cors",
  });

  return response.json();
}

export async function getPlacesToShareByUser(id: string): Promise<Place[]> {
  const apiEndPoint =
    process.env.REACT_APP_API_URI || "https://localhost:5443/api";
  let newId = encodeURIComponent(id);
  let response = await fetch(apiEndPoint + "/place/friends/list/" + newId, {
    credentials: "include",
    mode: "cors",
  });

  return response.json();
}

export async function getPrivatePlacesByUser(): Promise<Place[]> {
  const apiEndPoint =
    process.env.REACT_APP_API_URI || "https://localhost:5443/api";
  let response = await fetch(apiEndPoint + "/place/private/list", {
    credentials: "include",
    mode: "cors",
  });
  return response.json();
}

//List shared places by user
export async function getSharedPlacesByUser(): Promise<Place[]> {
  const apiEndPoint =
    process.env.REACT_APP_API_URI || "https://localhost:5443/api";
  let response = await fetch(apiEndPoint + "/place/friends/list", {
    credentials: "include",
    mode: "cors",
  });
  return response.json();
}

//List shared places by friends
export async function getSharedPlacesByFriends(): Promise<Place[]> {
  const apiEndPoint =
    process.env.REACT_APP_API_URI || "https://localhost:5443/api";
  let response = await fetch(apiEndPoint + "/place/shared/list", {
    credentials: "include",
    mode: "cors",
  });
  return response.json();
}

//User--------------------------------------------------------
export async function addFriend(id: string): Promise<boolean> {
  const apiEndPoint =
    process.env.REACT_APP_API_URI || "https://localhost:5443/api";
  let response = await fetch(apiEndPoint + "/users/friends/add", {
    credentials: "include",
    mode: "cors",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      webId: id,
    }),
  });
  if (response.status === 200) return true;
  else return false;
}

export async function getFriendRequests(): Promise<User[]> {
  const apiEndPoint =
    process.env.REACT_APP_API_URI || "https://localhost:5443/api";

  let response = await fetch(apiEndPoint + "/users/request", {
    credentials: "include",
    mode: "cors",
  });
  return response.json();
}

export async function getFriendsForUser(id: string): Promise<User[]> {
  const apiEndPoint =
    process.env.REACT_APP_API_URI || "https://localhost:5443/api";

  let userId = encodeURIComponent(id);
  let response = await fetch(apiEndPoint + "/friends/" + userId, {
    credentials: "include",
    mode: "cors",
  });
  return response.json();
}

export async function getProfile(): Promise<User> {
  const apiEndPoint =
    process.env.REACT_APP_API_URI || "https://localhost:5443/api";

  let response = await fetch(apiEndPoint + "/profile", {
    credentials: "include",
    mode: "cors",
  });
  return response.json();
}

export async function getProfileById(id: string): Promise<User> {
  const apiEndPoint =
    process.env.REACT_APP_API_URI || "https://localhost:5443/api";

  let userId = encodeURIComponent(id);
  let response = await fetch(apiEndPoint + "/profile/" + userId, {
    credentials: "include",
    mode: "cors",
  });
  return response.json();
}

export async function getAllPublicUsers(): Promise<User[]> {
  const apiEndPoint =
    process.env.REACT_APP_API_URI || "https://localhost:5443/api";

  let response = await fetch(apiEndPoint + "/users/public", {
    credentials: "include",
    mode: "cors",
  });
  return response.json();
}

export async function isLoggedIn(): Promise<boolean> {
  const apiEndPoint =
    process.env.REACT_APP_API_URI || "https://localhost:5443/api";

  let response = await fetch(apiEndPoint + "/isLogged", {
    credentials: "include",
    mode: "cors",
  });
  return response.json();
}

export async function addUserToList(): Promise<boolean> {
  const apiEndPoint =
    process.env.REACT_APP_API_URI || "https://localhost:5443/api";
  let response = await fetch(apiEndPoint + "/users/share", {
    credentials: "include",
    mode: "cors",
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (response.status === 200) return true;
  else return false;
}

//Log in
export async function login(
  oidcIssuer: string,
  redirectUrl: string
): Promise<void> {
  const apiEndPoint =
    process.env.REACT_APP_API_URI || "http://localhost:5080/api";

  let provider = encodeURIComponent(oidcIssuer);
  let redirect = encodeURIComponent(redirectUrl);

  let url = apiEndPoint + "/login/" + provider + "/" + redirect;
  window.location.href = url;
}

//Logout
export async function logout(): Promise<void> {
  const apiEndPoint =
    process.env.REACT_APP_API_URI || "https://localhost:5443/api";

  await fetch(apiEndPoint + "/logout", {
    credentials: "include",
    mode: "cors",
  });
}
