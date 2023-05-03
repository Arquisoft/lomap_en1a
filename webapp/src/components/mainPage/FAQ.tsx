import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';

import privateP from "../../images/Private_places.png";
import publicP from "../../images/Public_places.png";
import friendP from "../../images/Friend_places.png";

export function FAQ() {
  return (
    <>
        <div className="table-area">
            <h1>Frequently asked questions</h1>
            <Grid container spacing={3} justifyContent="space-around"
                        marginLeft='auto' marginRight='auto' marginTop="1em">
                <Grid item xs={12} textAlign={"center"}
                        className="question"
                        marginBottom="1em">
                    <Box textAlign="left"
                            height="100%"
                            display="flex"
                            justifyContent="center"
                            flexDirection="column">
                        <h2>How do I add a place?</h2>
                        <p>
                            Just double click on the map! A window will appear to your right where you can input your 
                            new place's data. Then, your new marker will be visible.
                        </p>
                    </Box>
                </Grid>
                <Grid item xs={12} textAlign={"center"}
                        className="question"
                        marginBottom="1em">
                    <Box textAlign="left"
                            height="100%"
                            display="flex"
                            justifyContent="center"
                            flexDirection="column">
                        <h2>Why are some markers in different colours?</h2>
                        <p>
                            Different colours mean different visibility!
                        </p>
                    </Box>
                </Grid>
                <Grid item xs={12} textAlign={"center"}
                        className="question"
                        marginBottom="1em">
                    <Box textAlign="left"
                            height="100%"
                            display="flex"
                            justifyContent="center"
                            flexDirection="column">
                        <h2>What are all those options in the left lateral menu?</h2>
                        <ul>
                            <li><b>My public sites:</b> public places you created.</li>
                            <li><b>My shared sites:</b> shared places you created.</li>
                            <li><b>Imported sites:</b> public places you added from other users.</li>
                            <li><b>Friends:</b> your friend list. By clicking on a friend, a window will appear to your right. 
                                This window shows the places your friend shared with you, and you can choose to show or hide them.</li>
                            <li><b>Public users:</b> this is the list of public users; that is, users that want to share their public places with anyone.</li>
                            <li><b>Categories:</b> the categories filter.</li>
                            <li><b>Add me to the public user list:</b> by clicking here, you will be added to the public user list.</li>
                        </ul>
                    </Box>
                </Grid>
                <Grid item xs={12} textAlign={"center"}
                    className="question"
                    marginBottom="1em">
                    <Box textAlign="left"
                            height="100%"
                            display="flex"
                            justifyContent="center"
                            flexDirection="column">
                        <h2>How can I see the information of a place?</h2>
                        <p>You can click on the marker in the map or click on the place in the left lateral menu!</p>
                        <Grid container spacing={0} justifyContent="space-around"
                                marginLeft='auto' marginRight='auto'>
                            <Grid item xs={4} textAlign={"center"}>
                                <Box textAlign="center"
                                        height="100%"
                                        display="flex"
                                        justifyContent="center"
                                        flexDirection="column"
                                        marginLeft='auto' marginRight='auto'
                                    component="img" src={publicP} alt="Public">
                                </Box>
                            </Grid>
                            <Grid item xs={4} textAlign={"center"}>
                                <Box textAlign="center"
                                        height="100%"
                                        display="flex"
                                        justifyContent="center"
                                        flexDirection="column"
                                        marginLeft='auto' marginRight='auto'
                                    component="img" src={privateP} alt="Private">
                                </Box>
                            </Grid>
                            <Grid item xs={4} textAlign={"center"}>
                                <Box textAlign="center"
                                        height="100%"
                                        display="flex"
                                        justifyContent="center"
                                        flexDirection="column"
                                        marginLeft='auto' marginRight='auto'
                                    component="img" src={friendP} alt="Friend">
                                </Box>
                            </Grid>
                            <Grid item xs={4} textAlign={"center"}>
                                <Box textAlign="center"
                                        height="100%"
                                        display="flex"
                                        justifyContent="center"
                                        flexDirection="column"
                                        marginLeft='auto' marginRight='auto'
                                        fontSize="0.7em">
                                    <p>Public marker</p>
                                </Box>
                            </Grid>
                            <Grid item xs={4} textAlign={"center"}>
                                <Box textAlign="center"
                                        height="100%"
                                        display="flex"
                                        justifyContent="center"
                                        flexDirection="column"
                                        marginLeft='auto' marginRight='auto'
                                        fontSize="0.7em">
                                    <p>Private marker</p>
                                </Box>
                            </Grid>
                            <Grid item xs={4} textAlign={"center"}>
                                <Box textAlign="center"
                                        height="100%"
                                        display="flex"
                                        justifyContent="center"
                                        flexDirection="column"
                                        marginLeft='auto' marginRight='auto'
                                        fontSize="0.7em">
                                    <p>Friend marker</p>
                                </Box>
                            </Grid>
                        </Grid>
                        
                    </Box>
                </Grid>
                
                <Grid item xs={12} textAlign={"center"}
                        className="question"
                        marginBottom="1em">
                    <Box textAlign="left"
                            height="100%"
                            display="flex"
                            justifyContent="center"
                            flexDirection="column">
                        <h2>What is the friend management menu?</h2>
                        <p>Here, you can both send and receive friend requests to your Pod. By sending a friend request, you add that person as a friend to your Pod, but they will not have you as a friend in their Pod yet; instead, they will receive a friend request in the application, which they can accept.</p>
                    </Box>
                </Grid>
            </Grid>
        </div>
    </>
  )
}