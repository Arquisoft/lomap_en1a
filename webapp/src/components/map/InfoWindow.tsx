import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import image from "../../images/placeHolder.png";
import { useState } from 'react';
import { useEffect } from 'react';
import { getComments } from '../../api/api';
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

type InfoWindowProps = {
  infoWindowData: {
    id: string;
    title: string;
    latitude: number;
    longitude: number;
  }
}

export default function InfoWindow(props: InfoWindowProps): JSX.Element {




  const [notificationStatus, setNotificationStatus] = useState(false);
  const [notification, setNotification] = useState<NotificationType>({ severity: 'success', message: '' });

  //For the comments
  const [comments, setComments] = useState<Comment[]>([]);


  //For the rating
  const [value, setValue] = useState(0);



  //Gets the list of comments for a specific place
  const refreshCommentList = async () => {
    getComments(props.infoWindowData?.id).then((s) => setComments(s));
  }


  const handleAddScore = async (value: number) => {
    var score = new Score("", value, props.infoWindowData?.id, "webId", new Date(), Visibility.PUBLIC);
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
  }, [props.infoWindowData]);





  return (


    <>
      <Grid container spacing={1} alignItems="center" justifyContent="center" className='info-window'>

        <Grid item xs={6} textAlign="center">
          <Box component="h3" ><>{props.infoWindowData?.title}</></Box>
        </Grid>


        <Grid item xs={12}>
          <Box component="img" src={image} sx={{ maxWidth: '100%', maxHeight: 350, width: 'auto', height: 'auto', }}></Box>
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
          <CommentForm OnCommentListChange={refreshCommentList} place={props.infoWindowData?.id} user={"username"} />
        </Grid>
        <Grid item xs={12}>
          <CommentList comments={comments} />
        </Grid>


      </Grid>
    </>



  );


}