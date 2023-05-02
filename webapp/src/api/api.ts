import { Category } from "../domain/Category";
import { Comment } from "../domain/Comment";
import { Picture } from "../domain/Picture";
import { Place } from "../domain/Place";
import { Score } from "../domain/Score";
import { User } from "../domain/User";
import { Visibility } from "../domain/Visibility";

//Comments----------------------------------------

//Add a comment
export async function addComment(comment: Comment): Promise<boolean> {
  const apiEndPoint =
    "https://lomapen1a.cloudns.ph:5443/api";
  let response;
  try{
    response = await fetch(apiEndPoint + "/comment/add", {
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
  }catch(err){}

  let url = "/comment/add";
  let body = JSON.stringify({
    comment: comment.text,
    place: comment.place,
    visibility: comment.visibility,
  })

  return await handleErrorPostBoolean(url, false, response, apiEndPoint, body);
}

export async function getComments(id: string): Promise<Comment[]> {
  const apiEndPoint =
    "https://lomapen1a.cloudns.ph:5443/api";
  let response;

  try {
    response = await fetch(apiEndPoint + "/comment/list/" + id, {
      credentials: "include",
      mode: "cors",
    });
  } catch (error) {}

  let url = "/comment/list/" + id;
  
  return await handleErrorGet(url, [], response, apiEndPoint);
}

//Scores--------------------------------------------

//Add a score
export async function addScore(score: Score): Promise<boolean> {
  const apiEndPoint =
    "https://lomapen1a.cloudns.ph:5443/api";
  let response;

  try {
    response = await fetch(apiEndPoint + "/score/add", {
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
  } catch (error) {}

  let url = "/score/add";
  let body = JSON.stringify({
    score: score.score,
    place: score.place,
    visibility: score.visibility,
  })

  return await handleErrorPostBoolean(url, false, response, apiEndPoint, body);
}

//Get scores for a place
export async function getScores(id: String): Promise<Score[]> {
  const apiEndPoint =
    "https://lomapen1a.cloudns.ph:5443/api";
  let response;

  try {
    response = await fetch(apiEndPoint + "/score/list/" + id, {
      credentials: "include",
      mode: "cors",
    });
  } catch (error) {}

  let url = "/score/list/" + id;
  
  return await handleErrorGet(url, [], response, apiEndPoint);
}

//Places----------------------------------------------

//Add a place
export async function addPlace(place: Place): Promise<Place> {
  const apiEndPoint =
    "https://lomapen1a.cloudns.ph:5443/api";
  let response;

  try {
    response = await fetch(apiEndPoint + "/place/add", {
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
  } catch (error) {}

  let url = "/place/add";
  let body = JSON.stringify({
    name: place.name,
    visibility: place.visibility,
    latitude: place.latitude,
    longitude: place.longitude,
    category: place.category,
    description: place.description,
  })

  return await handleErrorPost(url, new Place("ERR", "", "", "", 0, 0, Visibility.PUBLIC, Category.BAR), response, apiEndPoint, body); 
}

//Pictures----------------------------------------------
export async function getPictures(id: string): Promise<Picture[]> {
  const apiEndPoint =
    "https://lomapen1a.cloudns.ph:5443/api";

  let response;

  try {
    response = await fetch(apiEndPoint + "/picture/list/" + id, {
      credentials: "include",
      mode: "cors",
    });
  } catch (error) {}

  let url = "/picture/list/" + id;
  
  return await handleErrorGet(url, [], response, apiEndPoint);
 
}

export async function addPicture(picture: Picture): Promise<boolean> {
  const apiEndPoint =
    "https://lomapen1a.cloudns.ph:5443/api";
  let response;

  try {
    response = await fetch(apiEndPoint + "/picture/add", {
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
  } catch (error) {}

  let url = "/picture/add";
  let body = JSON.stringify({
    picture: picture,
    place: picture.place,
    visibility: picture.visibility,
    url: picture.url,
  })

  return await handleErrorPostBoolean(url, false, response, apiEndPoint, body);
}

//Places----------------------------------------------

//List places by visibility
export async function getPlaces(visibility: string): Promise<Place[]> {
  const apiEndPoint =
    "https://lomapen1a.cloudns.ph:5443/api";

  let response;

  try {
    response = await fetch(apiEndPoint + "/place/" + visibility + "/list", {
      credentials: "include",
      mode: "cors",
    });
  } catch (error) {}

  let url = "/place/" + visibility +"/list/";
  
  return await handleErrorGet(url, [], response, apiEndPoint);
}

//List public places by user

export async function getAllPlacesByUser(): Promise<Place[]> {
  const apiEndPoint =
    "https://lomapen1a.cloudns.ph:5443/api";
  let response = await fetch(apiEndPoint + "/place/all/list", {
    credentials: "include",
    mode: "cors",
  });
  let url = "/place/all/list";
  
  return await handleErrorGet(url, [], response, apiEndPoint);
}

export async function getPublicPlacesByPublicUser(
  id: string
): Promise<Place[]> {
  let userId = encodeURIComponent(id);
  const apiEndPoint =
    "https://lomapen1a.cloudns.ph:5443/api";
  let response;

  try {
    response = await fetch(apiEndPoint + "/place/public/list/" + userId, {
      credentials: "include",
      mode: "cors",
    });
  } catch (error) {}

  let url = "/place/public/list/" + userId;
  
  return await handleErrorGet(url, [], response, apiEndPoint);
}

export async function getPublicPlacesByUser(): Promise<Place[]> {
  const apiEndPoint =
    "https://lomapen1a.cloudns.ph:5443/api";
  let response;

  try {
    response = await fetch(apiEndPoint + "/place/public/list", {
      credentials: "include",
      mode: "cors",
    });
  } catch (error) {}

  let url = "/place/public/list/";
  
  return await handleErrorGet(url, [], response, apiEndPoint);
}

export async function getPlacesToShareByUser(id: string): Promise<Place[]> {
  const apiEndPoint =
    "https://lomapen1a.cloudns.ph:5443/api";
  let newId = encodeURIComponent(id);
  let response;

  try {
    response = await fetch(apiEndPoint + "/place/friends/list/" + newId, {
      credentials: "include",
      mode: "cors",
    });
  } catch (error) {}

  let url = "/place/friends/list/" + newId;
  
  return await handleErrorGet(url, [], response, apiEndPoint);
}

export async function getPrivatePlacesByUser(): Promise<Place[]> {
  const apiEndPoint =
    "https://lomapen1a.cloudns.ph:5443/api";
  let response;

  try {
    response = await fetch(apiEndPoint + "/place/private/list", {
      credentials: "include",
      mode: "cors",
    });
  } catch (error) {}

  let url = "/place/private/list/";
  
  return await handleErrorGet(url, [], response, apiEndPoint);
}

//List shared places by user
export async function getSharedPlacesByUser(): Promise<Place[]> {
  const apiEndPoint =
    "https://lomapen1a.cloudns.ph:5443/api";
  let response;

  try {
    response = await fetch(apiEndPoint + "/place/friends/list", {
      credentials: "include",
      mode: "cors",
    });
  } catch (error) {}

  let url = "/place/friends/list/";
  
  return await handleErrorGet(url, [], response, apiEndPoint);
}

//List shared places by friends
export async function getSharedPlacesByFriends(): Promise<Place[]> {
  const apiEndPoint =
    "https://lomapen1a.cloudns.ph:5443/api";
  let response;

  try {
    response = await fetch(apiEndPoint + "/place/shared/list", {
      credentials: "include",
      mode: "cors",
    });
  } catch (error) {}

  let url = "/place/shared/list/";
  
  return await handleErrorGet(url, [], response, apiEndPoint);
}

//User--------------------------------------------------------
export async function addFriend(id: string): Promise<boolean> {
  const apiEndPoint =
    "https://lomapen1a.cloudns.ph:5443/api";
  let response;

  try {
    response = await fetch(apiEndPoint + "/users/friends/add", {
      credentials: "include",
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        webId: id,
      }),
    });
  } catch (error) {}

  let url = "/users/friends/add";
  let body = JSON.stringify({
    webId: id,
  })

  return await handleErrorPostBoolean(url, false, response, apiEndPoint, body);
}

export async function getFriendRequests(): Promise<User[]> {
  const apiEndPoint =
    "https://lomapen1a.cloudns.ph:5443/api";

  let response;

  try {
    response = await fetch(apiEndPoint + "/users/request", {
      credentials: "include",
      mode: "cors",
    });
  } catch (error) {}

  let url = "/user/request";
  
  return await handleErrorGet(url, [], response, apiEndPoint);
}

export async function getFriendsForUser(id: string): Promise<User[]> {
  const apiEndPoint =
    "https://lomapen1a.cloudns.ph:5443/api";

  let userId = encodeURIComponent(id);
  let response;

  try {
    response = await fetch(apiEndPoint + "/friends/" + userId, {
      credentials: "include",
      mode: "cors",
    });
  } catch (error) {}

  let url = "/friends/" + userId;
  
  return await handleErrorGet(url, [], response, apiEndPoint);
}

export async function getProfile(): Promise<User> {
  const apiEndPoint =
    "https://lomapen1a.cloudns.ph:5443/api";

  let response;

  try {
    response = await fetch(apiEndPoint + "/profile", {
      credentials: "include",
      mode: "cors",
    });
  } catch (error) {}

  let url = "/profile";
  
  return await handleErrorGet(url, new User("ERROR","ERROR",null), response, apiEndPoint);
}

export async function getProfileById(id: string): Promise<User> {
  const apiEndPoint =
    "https://lomapen1a.cloudns.ph:5443/api";

  let userId = encodeURIComponent(id);
  let response;

  try {
    response = await fetch(apiEndPoint + "/profile/" + userId, {
      credentials: "include",
      mode: "cors",
    });
  
  } catch (error) {}

  let url = "/profile/" + userId;
  
  return await handleErrorGet(url, new User("ERROR","ERROR",null), response, apiEndPoint);
}



export async function getAllPublicUsers(): Promise<User[]> {
  const apiEndPoint =
    "https://lomapen1a.cloudns.ph:5443/api";

  let response;

  try {
    response = await fetch(apiEndPoint + "/users/public", {
      credentials: "include",
      mode: "cors",
    });
  } catch (error) {}

  let url = "/users/public";
  
  return await handleErrorGet(url, [], response, apiEndPoint);
}

export async function isLoggedIn(): Promise<boolean> {
  const apiEndPoint =
    "https://lomapen1a.cloudns.ph:5443/api";

  let response;

  try {
    response = await fetch(apiEndPoint + "/isLogged", {
      credentials: "include",
      mode: "cors",
    });
  } catch (error) {}

  let url = "/isLogged";

  return handleErrorGet(url, false, response, apiEndPoint);
}

export async function addUserToList(): Promise<boolean> {
  const apiEndPoint =
    "https://lomapen1a.cloudns.ph:5443/api";
  let response;

  try {
    response = await fetch(apiEndPoint + "/users/share", {
      credentials: "include",
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {}

  let url = "/picture/add";
  let body = JSON.stringify({
  })

  return await handleErrorPostBoolean(url, false, response, apiEndPoint, body);
}

//Log in
export async function login(
  oidcIssuer: string,
  redirectUrl: string
): Promise<void> {
  const apiEndPoint =
    "https://lomapen1a.cloudns.ph:5443/api";

  let provider = encodeURIComponent(oidcIssuer);
  let redirect = encodeURIComponent(redirectUrl);

  let url = apiEndPoint + "/login/" + provider + "/" + redirect;
  window.location.href = url;
  
}

//Logout
export async function logout(): Promise<void> {
  const apiEndPoint =
    "https://lomapen1a.cloudns.ph:5443/api";

  await fetch(apiEndPoint + "/logout", {
    credentials: "include",
    mode: "cors",
  });

  
}

//Error handling

async function handleErrorGet(url:string,errorResponse:any,response:Response | undefined,apiEndPoint:string){
  if (response !== undefined && response.status === 200){
    return response.json();
  }else{
    let response2 = await fetch(apiEndPoint.replace("https","http").replace("5443","5080") + url, {
      credentials: "include",
      mode: "cors",
    });
    if (response2.status === 200){
      return response2.json();
    }else{
      return errorResponse;
    }
  }
}

async function handleErrorPostBoolean(url:string,errorResponse:any,response:Response | undefined,apiEndPoint:string, body: string){
  if (response !== undefined && response.status === 200){
    return true;
  }else{
    let response2 = await fetch(apiEndPoint.replace("https","http").replace("5443","5080") + url, {
      credentials: "include",
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body
    });
    if (response2.status === 200){
      return true;
    }else{
      return errorResponse;
    }
  }
}

async function handleErrorPost(url:string,errorResponse:any,response:Response | undefined,apiEndPoint:string, body: string){
  if (response !== undefined && response.status === 200){
    return response.json();
  }else{
    let response2 = await fetch(apiEndPoint.replace("https","http").replace("5443","5080") + url, {
      credentials: "include",
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body
    });
    if (response2.status === 200){
      return response2.json();
    }else{
      return errorResponse;
    }
  }
}