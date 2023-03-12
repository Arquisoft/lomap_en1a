import React from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button/Button";
import TextField from '@mui/material/TextField';
import image from "../../images/placeHolder.png";
import btnImage from "../../images/Add_image.png";
import picURL from "../../images-places/eii.jpg";
import { Rating } from 'react-simple-star-rating';
import { ChangeEvent, useState } from 'react';
import { useEffect } from 'react';
import { addPicture, getComments, getScores, getPictures } from '../../api/api';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { Comment } from '../../domain/Comment';
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
import SlideshowPictures from "../mainPage/SlideShowPictures";
import { FOAF, VCARD } from "@inrupt/lit-generated-vocab-common";
import PictureSelector from "../mainPage/PictureSelector";

type InfoWindowProps = {
  avg:number;
  refreshScores:(place: string) => Promise<void>;
  refreshPictures: (place: string) => Promise<void>;
  infoWindowData:{
    id:string;
    title:string;
    latitude: number;
    longitude:number;
  }
}

export default function InfoWindow(props: InfoWindowProps):JSX.Element {

 const { session } = useSession();
  var webId = session.info.webId as string;
  
  

  
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [notification, setNotification] = useState<NotificationType>({severity:'success',message:''});
  
  //For the pictures
  const [pictures,setPictures] = useState<Picture[]>([]);

  var picName = "";
  var newPicUrl = "../../images-places/" + picName;

  //For the comments
  const [comments,setComments] = useState<Comment[]>([]);



  //Gets the list of comments for a specific place
  const refreshCommentList = async () => {
    getComments(props.infoWindowData?.id).then((s)=>setComments(s));
  }

  //Gets the list of pictures for a specific place
  const refreshPictureList = async () => {
    getPictures(props.infoWindowData?.id).then((s)=>setPictures(s));
  }
  
  
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


  const handleAddScore = async (value:number) => {
    //e.preventDefault();

    var score = new Score("",value,props.infoWindowData?.id,webId);
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


  const refreshScoresAfterAdding = async (value:number) => {
    await handleAddScore(value); //Adds the new score
    
    props.refreshScores(props.infoWindowData.id);
  }
  

  useEffect(()=>{
    refreshCommentList();
  },[]);


      return (
  
  
        <>
          <Grid container spacing={1} alignItems="center" justifyContent="center" className='info-window'>
            
            <Grid item xs={6} textAlign="center">
                <Box component="h3" ><>{props.infoWindowData?.title}</></Box>
            </Grid>


            <Grid item xs={12}>
                <PictureSelector OnPictureListChange={refreshPictureList} place={props.infoWindowData?.id} user={"username"}/>
                
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
                onClick={(value)=>refreshScoresAfterAdding(value)}
                
                />
            </Grid> 

            <Grid item xs={3}>
              <Box component="p" textAlign="right">{props.avg}</Box>
            </Grid> 

            <Grid item xs={3}>
              <StarIcon htmlColor='orange' fontSize='large'/>
            </Grid> 

            <Grid item xs={12}>
              <CommentForm OnCommentListChange={refreshCommentList} place={props.infoWindowData?.id} user={"username"}/>        
            </Grid>
            <Grid item xs={12}>
              <CommentList comments={comments}/>
            </Grid>
            

            </Grid>
        </>


  
          );
        
  
  }