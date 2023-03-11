import React from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button/Button";
import image from "../../images/placeHolder.png";
import btnImage from "../../images/Add_image.png";
import { Rating } from 'react-simple-star-rating';
import { ChangeEvent, useState } from 'react';
import { useEffect } from 'react';
import { addPicture, getComments, getScores, getPictures } from '../../api/api';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { Comment } from '../../domain/Comment';
import { IInfoWindowData } from './MapView';
import "../../App.css";
import StarIcon from '@mui/icons-material/Star';
import { Score } from '../../domain/Score';
import { Place } from '../../domain/Place';
import { Picture } from '../../domain/Picture';
import { PlaceVisibility } from '../../domain/Visibility';
import { User } from '../../domain/User';
import { NotificationType } from './CommentForm';
import { addScore } from '../../api/api';
import { useSession} from "@inrupt/solid-ui-react";
import axios from 'axios';

export const InfoWindow:React.FC<IInfoWindowData>=( {infoWindowData,setInfoWindowData}) =>{

  const { session } = useSession();
  var webId = session.info.webId as string;
  
  var user = new User("","PLACEHOLDER",webId); 
  var place = new Place(infoWindowData?.id,infoWindowData?.title,user,PlaceVisibility.FULL,infoWindowData?.latitude,infoWindowData?.longitude);
  
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [notification, setNotification] = useState<NotificationType>({severity:'success',message:''});
  
  //For the pictures
  const [pictures,setPictures] = useState<Picture[]>([]);

  //For the comments
  const [comments,setComments] = useState<Comment[]>([]);

  //For the scores
  const [scores,setScores] = useState<Score[]>([]);

  //For the computation of the avg score
  const [avg,setAvg] = useState(0);
  

  //Gets the list of comments for a specific place
  const refreshCommentList = async () => {
    setComments(await getComments(infoWindowData?.id)); 
  }


  var picURL = "";
  
  
  // Image upload -------------------------------------------------------
  /*const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileList(e.target.files);
  };

  const files = fileList ? [...fileList] : [];

  const handleUploadClick = () => {
    if (!fileList) {
      return;
    }

    const data = new FormData();
    files.forEach((file, i) => {
      data.append(`file-${i}`, file, file.name);
    });


    // Uploading the file using the fetch API to the server
    fetch('http://localhost:5000/api/uploadfile', {
      method: 'POST',
      body: data,
      mode:'cors',
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));

    axios.post("http://localhost:3000/api/picture/add", data, {
      headers: {
        "content-type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
      }
    });     
  };*/

  // ------------------------------------------------------------


  const handleAddPicture = async (value:string) => { // value should be file in final implementation
    var pic = new Picture("",value,place,user);
    //let result:boolean = await addPicture(pic); //The picture still has no ID
    picURL = value;
    /*if (result) {
      setNotificationStatus(true);
      setNotification({ 
        severity:'success',
        message:'Your picture has been posted!'
      });
    }
    else{
      setNotificationStatus(true);
      setNotification({ 
        severity:'error',
        message:'There\'s been an error posting your picture.'
      });
    }*/
  }

  //Gets the list of pictures for a specific place
  const refreshPictures = async (value:string) => {
    handleAddPicture(value); //Adds the new picture
    setPictures(await getPictures(infoWindowData?.id));
  }

  const handleAddScore = async (value:number) => {
    //e.preventDefault();

    var score = new Score("",value,place,user);
    let result:boolean = await addScore(score); //The score still has no ID
    if (result){
      setNotificationStatus(true);
      setNotification({ 
        severity:'success',
        message:'Your score has been posted!'
      });
      //Notify the change to the parent component
      //props.OnCommentListChange();
    }
    else{
      setNotificationStatus(true);
      setNotification({ 
        severity:'error',
        message:'There\'s been an error posting your score.'
      });
    }
  }


  //Gets the list of scores for a specific place
  const refreshScores = async (value:number) => {
    handleAddScore(value); //Adds the new score
    


    setScores(await getScores(infoWindowData?.id));
    let aux = 0;
    for (let i = 0; i < scores.length; i++) {
      aux+=scores[i].getScore();
    }
    setAvg(aux/scores.length); //Calculates the new average
  }

  

  useEffect(()=>{
    refreshCommentList();
  },[]);


      return (
  
  
        <>
          <Grid container spacing={1} alignItems="center" justifyContent="center" className='info-window'>
            
            <Grid item xs={6} textAlign="center">
                <Box component="h3" ><>{infoWindowData?.title}</></Box>
            </Grid>


            <Grid item xs={12}>
                <Box component="img" src={image} sx={{maxWidth: '100%', maxHeight: 350, width: 'auto', height: 'auto', }}></Box>
                <Button id="btn-Add-Image" onClick={() => refreshPictures("../../images-places/eii.png")}><img id="img-Add-Image" src={btnImage} alt="Add_image"/></Button>
                <img src={picURL}></img>
            </Grid>            
              
            {/*<div>
              <input type="file" onChange={handleFileChange} multiple />

              <ul>
                {files.map((file, i) => (
                  <li key={i}>
                    {file.name} - {file.type}
                  </li>
                ))}
              </ul>

              <button onClick={handleUploadClick}>Upload</button>
                </div>*/}

           <Grid item xs={6}>
              <Rating
                transition
                fillColorArray={['#f17a45', '#f19745', '#f1a545', '#f1b345', '#f1d045']}
                allowFraction
                onClick={(value)=>refreshScores(value)}
                
                />
            </Grid> 

            <Grid item xs={3}>
              <Box component="p" textAlign="right">{avg}</Box>
            </Grid> 

            <Grid item xs={3}>
              <StarIcon htmlColor='orange' fontSize='large'/>
            </Grid> 

            <Grid item xs={12}>
              <CommentForm OnCommentListChange={refreshCommentList} place={place} user={user}/>        
            </Grid>
            <Grid item xs={12}>
              <CommentList comments={comments}/>
            </Grid>
            

            </Grid>
        </>


  
          );
        
  
  }