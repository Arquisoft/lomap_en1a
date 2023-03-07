import { Comment } from "../domain/Comment";
import { Place } from "../domain/Place";
import { Score } from "../domain/Score";


//Comments----------------------------------------
export async function addComment(comment:Comment):Promise<boolean>{
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint+'/comments/add', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        //body: JSON.stringify({'owner':comment.getOwner(), 'text':comment.getText(),'place':comment.getPlace()})
      });
    if (response.status===200)
      return true;
    else
      return false;
}

export async function getComments():Promise<Comment[]>{
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint+'/comments/list');
    //The objects returned by the api are directly convertible to Comment objects
    return response.json();
  }


//Scores--------------------------------------------
export async function addScore(score:Score):Promise<boolean>{
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint+'/scores/add', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
       // body: JSON.stringify({'owner':score.getOwner(), 'score':score.getScore(),'place':score.getPlace()})
      });
    if (response.status===200)
      return true;
    else
      return false;
}

export async function getScores():Promise<Score[]>{
  const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  let response = await fetch(apiEndPoint+'/scores/list');
  return response.json();
}


//Places----------------------------------------------
export async function addPlace(place:Place):Promise<boolean>{
  const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  let response = await fetch(apiEndPoint+'/places/add', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      //body: JSON.stringify({'owner':score.getOwner(), 'score':score.getScore(),'place':score.getPlace()})
    });
  if (response.status===200)
    return true;
  else
    return false;
}

export async function getPlaces():Promise<Place[]>{
  const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  let response = await fetch(apiEndPoint+'/places/list');
  //The objects returned by the api are directly convertible to Comment objects
  return response.json();
}
