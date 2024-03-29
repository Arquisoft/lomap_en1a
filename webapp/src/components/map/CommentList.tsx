import { Comment } from '../../domain/Comment';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ContactPageIcon from '@mui/icons-material/ContactPage';



type CommentListProps = {
  comments: Comment[];
}

export default function CommentList(props: CommentListProps): JSX.Element {
  const getPrimaryText = (comment: Comment) => {
    let aux = comment.owner;
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

