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
import { addFriend, getFriendRequests } from '../../api/api';

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







function FriendsTable() {

  const[requests,setRequests] = useState<User[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);
    const [notificationStatus, setNotificationStatus] = useState(false);
    const [notification, setNotification] = useState<NotificationType>({ severity: 'success', message: '' });
    const[text,setText] = useState("");

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - requests.length) : 0;
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

    //Add a friend
    const handleSubmit = async (text:string) => {   
      let result: boolean = await addFriend(text);
      if (result) {
        setNotificationStatus(true);
        setNotification({
          severity: 'success',
          message: 'Your new friend has been added!'
        });
        getFriendRequests().then(f=>setRequests(f))
        
      }
      else {
        setNotificationStatus(true);
        setNotification({
          severity: 'error',
          message: 'There\'s been an error adding your new friend.'
        });
      }
    }


    useEffect(()=>{
      getFriendRequests().then(f=>setRequests(f))
    }
    ,[])




    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">Friend username</StyledTableCell>
              <StyledTableCell align="center">Friend web id</StyledTableCell>
              <StyledTableCell align="center">Accept requests</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
              {(rowsPerPage > 0
                      ? requests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : requests
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
                        <Button variant="contained" onClick={()=>{
                          handleSubmit(row.webId);
                          }}>Accept request</Button>
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
              count={requests.length}
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
        <Snackbar open={notificationStatus} autoHideDuration={3000} onClose={() => { setNotificationStatus(false) }}>
            <Alert severity={notification.severity} sx={{ width: '100%' }}>
                    {notification.message}
              </Alert>
          </Snackbar>
      </TableContainer>
    );
  }






export default function FriendsView(){
    //Hook for the friend web id
    
    
    const [notificationStatus, setNotificationStatus] = useState(false);
    const [notification, setNotification] = useState<NotificationType>({ severity: 'success', message: '' });
    const[text,setText] = useState("");


    //Send a friend request
    const handleSubmit = async (text:string) => {   
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
          message: 'There\'s been an error sending your friend request.'
        });
      }
    }




    return (
        <>
          <div className="table-area">
          <h1>Friend management menu</h1>
                
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
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
                            <Button variant="contained" onClick={()=>handleSubmit(text)} sx={{height: 52}}>Send request</Button>
                            
                        </Grid>
                        
                          <Grid item xs={12}>
                              <FriendsTable/>
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