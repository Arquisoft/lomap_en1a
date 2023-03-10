import { Comment } from "../domain/Comment";
import { Picture } from "../domain/Picture";
import { Place } from "../domain/Place";
import { Score } from "../domain/Score";
import {CommentDto} from "../domain/dtos/CommentDto";


//Comments----------------------------------------

//Add a comment
export async function addComment(comment:Comment):Promise<boolean>{
    
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint+'/comment/add', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({'comment':comment.getText(),'place':comment.getPlace(),'user':comment.getOwner().replaceAll("/","-").replaceAll("#","-")})
      });
    if (response.status===200)
      return true;
    else
      return false;
}

export async function getComments(id:string):Promise<Comment[]>{
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    
    let response = await fetch(apiEndPoint+'/comment/list/'+id);
    //The objects returned by the api are directly convertible to Comment objects
    return response.json();
  }


//Scores--------------------------------------------

//Add a score
export async function addScore(score:Score):Promise<boolean>{
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint+'/score/add', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
       body: JSON.stringify({'score':score.getScore(),'place':score.getPlace(),'user':score.getOwner().replaceAll("/","-").replaceAll("#","-")})
      });
    if (response.status===200)
      return true;
    else
      return false;
}

//Get scores for a place
export async function getScores(id:String):Promise<Score[]>{
  const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  let response = await fetch(apiEndPoint+'/score/list/'+id);
  return response.json();
}


//Places----------------------------------------------

//Add a place
export async function addPlace(place:Place):Promise<boolean>{
  const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  let response = await fetch(apiEndPoint+'/place/add', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({'name':place.getName(),'user':place.getOwner().replaceAll("/","-").replaceAll("#","-"),
      'visibility':place.getVisibility(),'latitude':place.getLatitude(),'longitude':place.getLongitude()})
    });
  if (response.status===200)
    return true;
  else
    return false;
}

//List places by visibility
export async function getPlaces(id:string):Promise<Place[]>{
  const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  let response = await fetch(apiEndPoint+'/place/list/visibility/'+id);
  //The objects returned by the api are directly convertible to Comment objects
  return response.json();
}



//List places by user
export async function getPlacesByUser(id:string):Promise<Place[]>{
  const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'

  let response = await fetch(apiEndPoint+'/place/list/'+id.replaceAll("/","-").replaceAll("#","-"));
  //The objects returned by the api are directly convertible to Comment objects
  return response.json();
}

//Get a place
export async function getPlaceDetails():Promise<Place[]>{
  const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  let response = await fetch(apiEndPoint+'/place/details');
  //The objects returned by the api are directly convertible to Comment objects
  return response.json();
}


//Pictures----------------------------------------------

//Add a picture
export async function addPicture(picture:Picture):Promise<boolean>{
  const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  let response = await fetch(apiEndPoint+'/picture/add', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({'url':picture.getUrl(),'place':picture.getPlace(),
      'owner':picture.getOwner()})
    });
  if (response.status===200)
    return true;
  else
    return false;
}