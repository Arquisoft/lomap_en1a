import { Comment } from "../domain/Comment";
import { Picture } from "../domain/Picture";
import { Place } from "../domain/Place";
import { Score } from "../domain/Score";
import { User } from "../domain/User";



//Comments----------------------------------------

//Add a comment
export async function addComment(comment: Comment): Promise<boolean> {

  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  let response = await fetch(apiEndPoint + '/comment/add', {
    credentials: 'include',
    mode: 'cors',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 'comment': comment.getText(), 'place': comment.getPlace(), 'user': comment.getOwner().replaceAll("/", "-").replaceAll("#", "-") })
  });
  if (response.status === 200)
    return true;
  else
    return false;
}

export async function getComments(id: string): Promise<Comment[]> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'

  let response = await fetch(apiEndPoint + '/comment/list/' + id, {
    credentials: 'include',
    mode: 'cors'
  });
  //The objects returned by the api are directly convertible to Comment objects
  return response.json();
}

//Scores--------------------------------------------

//Add a score
export async function addScore(score: Score): Promise<boolean> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  let response = await fetch(apiEndPoint + '/score/add', {
    credentials: 'include',
    mode: 'cors',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 'score': score.getScore(), 'place': score.getPlace(), 'user': score.getOwner().replaceAll("/", "-").replaceAll("#", "-") })
  });
  if (response.status === 200)
    return true;
  else
    return false;
}

//Get scores for a place
export async function getScores(id: String): Promise<Score[]> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  let response = await fetch(apiEndPoint + '/score/list/' + id,{
    credentials: 'include',
    mode: 'cors'
  });
  return response.json();
}


//Places----------------------------------------------

//Add a place
export async function addPlace(place: Place): Promise<boolean> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  let response = await fetch(apiEndPoint + '/place/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'name': place.getName(), 'user': place.getOwner().replaceAll("/", "-").replaceAll("#", "-"),
      'visibility': place.getVisibility(), 'latitude': place.getLatitude(), 'longitude': place.getLongitude()
    }),

    credentials: 'include',
    mode: 'cors'
  });

  if (response.status === 200)
    return true;
  else
    return false;
}

//List places by visibility
export async function getPlaces(id: string, visibility: string): Promise<Place[]> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'

  alert(apiEndPoint + '/place/' + visibility + '/list');

  let response = await fetch(apiEndPoint + '/place/' + visibility + '/list', {
    credentials: 'include',
    mode: 'cors'
  }
  );
  //The objects returned by the api are directly convertible to Comment objects
  return response.json();
}


//FIXME
export async function getPlacesByUser(): Promise<Place[]> {
  //var a = await getPrivatePlacesByUser(id);
  var b = await getPublicPlacesByUser();
  var c = await getSharedPlacesByUser();

  //console.log((a.concat(b)).concat(c))
  //return (a.concat(b)).concat(c);
  return b.concat(c)
}

//List places by user
export async function getPublicPlacesByUser(): Promise<Place[]> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  let response = await fetch(apiEndPoint + '/place/public/list', {
    credentials: 'include',
    mode: 'cors'
  });
  //The objects returned by the api are directly convertible to Comment objects
  return response.json();
}

export async function getPrivatePlacesByUser(): Promise<Place[]> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  let response = await fetch(apiEndPoint + '/place/private/list', {
    credentials: 'include',
    mode: 'cors'
  });
  //The objects returned by the api are directly convertible to Comment objects
  return response.json();
}
export async function getSharedPlacesByUser(): Promise<Place[]> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  let response = await fetch(apiEndPoint + '/place/shared/list', {
    credentials: 'include',
    mode: 'cors'
  });
  //The objects returned by the api are directly convertible to Comment objects
  return response.json();
}



//Pictures----------------------------------------------
export async function getPictures(id: string): Promise<Picture[]> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'

  let response = await fetch(apiEndPoint + '/picture/list/' + id, {
    credentials: 'include',
    mode: 'cors'
  });
  //The objects returned by the api are directly convertible to Picture objects
  return response.json();
}

//Add a picture
export async function addPicture(picture: Picture): Promise<boolean> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  let response = await fetch(apiEndPoint + '/picture/add', {
    credentials: 'include',
    mode: 'cors',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'url': picture.getUrl(), 'place': picture.getPlace(),
      'owner': picture.getOwner()
    })
  });
  if (response.status === 200)
    return true;
  else
    return false;
}


export async function getFriendsForUser(id: string): Promise<User[]> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'

  let userId = encodeURIComponent(id);
  //alert(apiEndPoint + "/friends/" + userId)
  let response = await fetch(apiEndPoint + '/friends/' + userId, {
    credentials: 'include',
    mode: 'cors'
  });
  //The objects returned by the api are directly convertible to Comment objects
  return response.json();
}

export async function getProfile(): Promise<User> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'

  let url = apiEndPoint + "/profile"
  //console.log(url)
  let response = await fetch(apiEndPoint + '/profile', {
    credentials: 'include',
    mode: 'cors'
  }); //Sacar string de aqui
  //The objects returned by the api are directly convertible to Comment objects
  return response.json();
}

//User---------------------------------------------------------
//Log in
export async function login(oidcIssuer: string, redirectUrl: string): Promise<void> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'

  let provider = encodeURIComponent(oidcIssuer);
  let redirect = encodeURIComponent(redirectUrl);

  let url = apiEndPoint + '/login/' + provider + '/' + redirect;
  window.location.href = url;

  // let response = await fetch(apiEndPoint + '/login/' + provider + '/' + redirect); //Sacar string de aqui
  //The objects returned by the api are directly convertible to Comment objects
  // return response.json();
}