import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import type { AlertColor } from '@mui/material/Alert';
import { NotificationType } from '../map/CommentForm';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import { User } from '../../domain/User';
import { styled } from '@mui/material/styles';
import { TableCell, TableFooter, TablePagination, TableRow, tableCellClasses } from '@mui/material';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';

interface FriendsTableProps{
    friends:User[]
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: "#D3D3D2",
    },
    '&:nth-of-type(even)': {
        backgroundColor: "#BFBFBE",
      },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

function FriendsTable(props:FriendsTableProps) {

    let friends = [new User("Prueba","Prueba"),new User("Prueba 2","Prueba 2"),new User("Prueba 3","Prueba 3"),new User("Prueba 2","Prueba 2"),new User("Prueba 2","Prueba 2"),new User("Prueba 2","Prueba 2"),new User("Prueba 2","Prueba 2"),new User("Prueba 2","Prueba 2"),new User("Prueba 2","Prueba 2"),new User("Prueba 2","Prueba 2")]
   
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - friends.length) : 0;
    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
      ) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };




    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">Friend username</StyledTableCell>
              <StyledTableCell align="center">Friend web id</StyledTableCell>
              <StyledTableCell align="center">Accept</StyledTableCell>
              <StyledTableCell align="center">Remove</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
                {(rowsPerPage > 0
                    ? friends.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : friends
                ).map((row) => (
                    <StyledTableRow
                    key={row.webId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      {row.username}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row.webId}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                        <Button variant="contained">Add friend</Button>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                        <Button variant="contained">Remove request</Button>
                    </StyledTableCell>
    
                  </StyledTableRow>
                ))}
                {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                    </TableRow>
                )}


          </TableBody>
          <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={friends.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
             
            />
          </TableRow>
        </TableFooter>
        </Table>
      </TableContainer>
    );
  }



export default function FriendsView(){
    //Hook for the friend web id
    const[text,setText] = useState("");
    const[requests,setRequests] = useState<User[]>([]);
    const [notificationStatus, setNotificationStatus] = useState(false);
    const [notification, setNotification] = useState<NotificationType>({ severity: 'success', message: '' });

    //Add a friend
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        /*e.preventDefault();    
        let result: boolean = await addFriend(text);
        if (result) {
          setNotificationStatus(true);
          setNotification({
            severity: 'success',
            message: 'Your friend request has been sent!'
          });
        }
        else {
          setNotificationStatus(true);
          setNotification({
            severity: 'error',
            message: 'There\'s been an error sending your friend requestt.'
          });
        }*/
      }


    //useEffect(()=>getFriendRequests().then(f=>setRequests(f)),[])

    return (
        <>
          <div className="table-area">
          <h1>Friend management menu</h1>
                
                    <Grid container spacing={1}>
                    
                        <Grid item xs={12}>
                            <form name="register" onSubmit={handleSubmit}>
                                <TextField
                                    sx={{width: 400}}
                                    multiline
                                    rows={2}
                                    required
                                    name="text"
                                    placeholder="Write your friend's web id"
                                    variant="filled"
                                    value={text}
                                    onChange={e => {
                                    setText(e.target.value);
                                    }}

                                />
                                <Button variant="contained" type="submit" sx={{height: 52}}>Send request</Button>
                            </form>
                        </Grid>
                        
                            <Grid item xs={12}>
                                <FriendsTable friends={[]}/>
                            </Grid>
                        

                    </Grid>
               
                <Snackbar open={notificationStatus} autoHideDuration={3000} onClose={() => { setNotificationStatus(false) }}>
                    <Alert severity={notification.severity} sx={{ width: '100%' }}>
                    {notification.message}
                    </Alert>
                </Snackbar>
          </div>
        </>
      )
}