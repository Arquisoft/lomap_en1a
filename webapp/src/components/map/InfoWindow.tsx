import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import noPic from "../../images/No_pictures_img.png";
import { useState } from 'react';
import { useEffect } from 'react';
import { getComments, getPictures, getProfileById } from '../../api/api';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { Comment } from '../../domain/Comment';
import StarIcon from '@mui/icons-material/Star';
import { Score } from '../../domain/Score';
import { NotificationType } from './CommentForm';
import { addScore } from '../../api/api';
import Rating from '@mui/material/Rating';
import { getScores } from '../../api/api';
import { Visibility } from '../../domain/Visibility';
import PictureSelector from './PictureSelector';
import Slideshow from '../mainPage/SlideShow';
import { InfoWindowDataType } from './MapView';

type InfoWindowProps = {
  infoWindowData: InfoWindowDataType;
  handleIsLoading: (value: boolean, message?: string) => Promise<void>;
  isLoading: boolean;
}

export default function InfoWindow(props: InfoWindowProps): JSX.Element {


  const [notificationStatus, setNotificationStatus] = useState(false);
  const [notification, setNotification] = useState<NotificationType>({ severity: 'success', message: '' });

  //For the comments
  const [comments, setComments] = useState<Comment[]>([]);

  //For the rating
  const [value, setValue] = useState(0);

  //For the pictures
  const [pictureURLs, setPictureURLs] = useState<string[]>([])

  const [cachedComments, setCachedComments] = useState<Comment[]>([]);



  const refreshPicturesSlide = async () => {
    getPictures(props.infoWindowData?.id).then((pics) => {
      let picURLs: string[] = pics.map((pic, i) => pic.url);
      setPictureURLs(picURLs);
    });

  }

  //Gets the list of comments for a specific place
  const refreshCommentList = async () => {
    props.handleIsLoading(true, "Loading comments...");//Start showing loading symbol
    const comments = await getComments(props.infoWindowData?.id);


    const newComments = await Promise.all(comments.map(async (comm) => {
      const user = await getProfileById(comm.owner);
      return {
        ...comm,
        owner: user.username,
      };

    }));
    props.handleIsLoading(false);//Stop showing loading symbol


    setComments(newComments);
  }


  const handleAddScore = async (value: number) => {
    var score = new Score("", value, props.infoWindowData?.id, "", new Date(), Visibility.PUBLIC);
    let result: boolean = await addScore(score); //The score still has no ID
    if (result) {
      setNotificationStatus(true);
      setNotification({
        severity: 'success',
        message: 'You score has been posted!'
      });
    }
    else {
      setNotificationStatus(true);
      setNotification({
        severity: 'error',
        message: 'There\'s been an error posting your score.'
      });
    }
  }

  //For the computation of the avg score
  const [avg, setAvg] = useState(0);

  const refreshScores = async () => {


    getScores(props.infoWindowData.id).then((s) => {
      if (s.length > 0) {
        let aux = 0;
        for (let i = 0; i < s.length; i++) {

          aux += s[i].score;
        }
        let avg = aux / s.length;
        let a = avg.toFixed(1)
        setAvg(parseFloat(a)); //Calculates the new average
      } else {
        setAvg(0)
      }

    });
  }



  const refreshScoresAfterAdding = async (value: number) => {
    await handleAddScore(value); //Adds the new score

    refreshScores();
  }




  //Update comment list and scores when the info window data changes
  useEffect(() => {
    refreshScores();
    refreshCommentList();
    refreshPicturesSlide();
  }, [props.infoWindowData]);





  return (


    <>
      <Grid container spacing={1} alignItems="center" justifyContent="center" className='info-window'
        style={props.isLoading ? { pointerEvents: "none", opacity: "0.4" } : {}}>

        <Grid item xs={6} textAlign="center">
          <Box component="h3" ><>{props.infoWindowData?.title}</></Box>
        </Grid>
        <Grid item xs={6} textAlign="center">
          <Box component="h4" ><>{props.infoWindowData?.category}</></Box>
        </Grid>

        <Grid item xs={12}>
          {
            pictureURLs.length == 0 ?
              <Box id="no-pictures-img" component="img" src={noPic} alt="No pictures found"></Box>
              :
              <Slideshow images={pictureURLs} />
          }
        </Grid>


        <Grid item xs={12}>
          <PictureSelector OnPictureListChange={refreshPicturesSlide} place={props.infoWindowData?.id} user={"username"} />
        </Grid>

        <Grid item xs={6}>
          <Box
            sx={{
              width: 200,
              display: 'flex',
              alignItems: 'center',
            }}>
            <Rating
              precision={0.5}
              name="rating"
              size="large"
              value={value}
              onChange={(event, value) => {
                setValue(value as number);
                refreshScoresAfterAdding(value as number);
              }}
            />
            {value !== null && (
              <Box sx={{ ml: 2 }}>{value + "/5"}</Box>
            )}
          </Box>
        </Grid>

        <Grid item xs={3}>
          <Box component="p" textAlign="right">{avg}</Box>
        </Grid>

        <Grid item xs={3}>
          <StarIcon htmlColor='orange' fontSize='large' />
        </Grid>

        <Grid item xs={12}>
          <CommentForm OnCommentListChange={refreshCommentList} place={props.infoWindowData?.id} handleIsLoading={props.handleIsLoading} />
        </Grid>
        <Grid item xs={12}>
          <CommentList comments={comments} />
        </Grid>


      </Grid>
    </>



  );


}