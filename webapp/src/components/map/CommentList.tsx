import { Comment } from '../../domain/Comment';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import { getProfileById } from '../../api/api';
import { User } from '../../domain/User';
import { useState } from 'react';



type CommentListProps = {
  comments: Comment[];
}

export default function CommentList(props: CommentListProps): JSX.Element {
  const [profile, setProfile] = useState<User>()
  const getPrimaryText = (comment: Comment) => {
    getProfileById(comment.owner)
    .then(user => {
      setProfile(user)
    })

    let aux = ""
    aux = aux.concat(" at ")
    let date = new Date(comment.date)
    aux = aux.concat(date.toDateString())

    return aux
  }
  return (
    <>
      <List>
      {props.comments.map((comment,i)=>{
        return (
          <ListItem key={i}>
            <ListItemIcon>
              <ContactPageIcon/>
            </ListItemIcon>
            <ListItemText primary={getPrimaryText(comment)} secondary={comment.text} />
          </ListItem>
        )
      })}
      </List>
      
        
          
    </>
  );
}

