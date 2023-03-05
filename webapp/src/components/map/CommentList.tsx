import { Comment } from '../../shared/shareddtypes';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ContactPageIcon from '@mui/icons-material/ContactPage';



type CommentListProps = {
  comments: Comment[];
}

export default function CommentList(props: CommentListProps): JSX.Element {
  return (
    <>
      <List>
      {props.comments.map((comment,i)=>{
        
        return (
          <ListItem key={i}>
            <ListItemIcon>
              <ContactPageIcon/>
            </ListItemIcon>
            <ListItemText primary={comment.text} secondary={comment.text}/>
          </ListItem>
        )
      })}
      </List>
      
        
          
    </>
  );
}

