import {Comment} from '../shared/shareddtypes';

export async function addComment(comment:Comment):Promise<boolean>{
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint+'/users/add', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({'name':comment.name, 'text':comment.text})
      });
    if (response.status===200)
      return true;
    else
      return false;
}

//Hay algo mal al retornar el json()
export async function getComments():Promise<Comment[]>{
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint+'/users/list');
    //The objects returned by the api are directly convertible to Comment objects
    return response.json()
}