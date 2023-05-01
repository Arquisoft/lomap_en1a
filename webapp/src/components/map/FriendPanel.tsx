import React, { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import image from "../../icons/friend.icon.png";
import { User } from "../../domain/User";
import { getPlacesToShareByUser } from "../../api/api";
import { Place } from "../../domain/Place";
import { Button } from "@mui/material";
import { addFriendMarkerById, deleteMarkerById, displayMap } from "../ol/vector";
import { Divider } from '@material-ui/core';



type FriendPanelProps = {
    friend: User,
    friendPhoto: string,
    sharedSites: Place[]
}
type PlaceOfProps = {
    sharedSites: Place[]
}

export function FriendPanel(props: FriendPanelProps): JSX.Element {

    //For the friends
    const [friendPlaces, setFriendPlaces] = useState<Place[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const refreshFriendPlaceList = async () => {
        setIsLoading(true)
        getPlacesToShareByUser(props.friend.webId).then((places) => {
            places.sort(function (a, b) {
                let name1 = a.name.toLowerCase();
                let name2 = b.name.toLowerCase();
                if (name1 < name2) { return -1; }
                if (name1 > name2) { return 1; }

                return 0;
            })

            setFriendPlaces(places)
            setIsLoading(false);
        });

    }

    //Refresh the friend list on component render
    useEffect(() => {
        refreshFriendPlaceList()
    }, []);



    return (

        <>
            
            <Grid container spacing={3} justifyContent="space-around"
                    marginLeft='auto' marginRight='auto'>
                <Grid item xs={12} textAlign="center" paddingBottom="0.4em">
                    <Box className="new-place">Shared sites by {props.friend.username}</Box>
                    <Divider/>
                </Grid>
                <Grid item xs={12} textAlign={"center"} paddingBottom="0.6em">
                    <Box component="img" 
                        src={props.friend?.photo ? props.friend?.photo : image } 
                        sx={{ objectFit: "cover", width: '6em', height: '6em', borderRadius: '50%' }}>
                    </Box>
                </Grid>
                <Grid container spacing={1} justifyContent="space-around">
                    <PlacesOf sharedSites={friendPlaces}></PlacesOf>
                </Grid>
            </Grid>

        </>

    );

}

//Returns a list of p elements with data from the places
function PlacesOf(props: PlaceOfProps): JSX.Element {

    const [updateCount, setUpdateCount] = useState(0);
    
    const changePlaceDisplayStatus = (id: string) => {
        if (!displayMap.has(id)) {
            displayMap.set(id, true);
            addFriendMarkerById(id);
        } else {
            if (displayMap.get(id)) {
                deleteMarkerById(id)
            } else {
                addFriendMarkerById(id);
            }

            displayMap.set(id, !displayMap.get(id));
        }

        setUpdateCount(updateCount + 1)
    }

    const getPlaceDisplayStatus = (id: string) => {
        if (displayMap.get(id)) {
            return true
        } else {
            return false
        }
    }

    return (
        <>
            {
                props.sharedSites.map((place) => (
                    <>
                        <Grid item xs={12} textAlign={"center"}>
                            <Grid container justifyContent="space-around"
                                    marginBottom="0.3em"
                                    border="0.1em solid rgb(134, 134, 134)"
                                    padding="0.2em 0.5em"
                                    borderRadius="0.4em">
                                <Grid item xs={8} textAlign={"center"} fontSize={"1em"}>
                                    <Box key={place.id} textAlign="left"
                                            height="100%"
                                            display="flex"
                                            justifyContent="center"
                                            flexDirection="column">
                                        {place.name}
                                    </Box>
                                </Grid>
                                <Grid item xs={4} textAlign={"center"} fontSize={"0.6em"}>
                                    <Box key={place.id} textAlign="right"
                                            height="100%"
                                            display="flex"
                                            justifyContent="center"
                                            flexDirection="column">
                                        <i>{place.category}</i>
                                    </Box>
                                </Grid>
                                <Grid item xs={5} textAlign={"center"}>
                                    <Box key={place.id}
                                            height="100%"
                                            display="flex"
                                            justifyContent="center"
                                            flexDirection="column">
                                        <Button variant="contained" 
                                                id={`${getPlaceDisplayStatus(place.id) ? "btn-hide" : "btn-show"}`}
                                                sx={{height: '75%', width: '65%', marginLeft: 'auto', marginRight: 'auto'}} 
                                                onClick={() => changePlaceDisplayStatus(place.id)}>
                                            {getPlaceDisplayStatus(place.id) ? "Hide" : "Show"}
                                        </Button>
                                    </Box>
                                </Grid>
                                <Grid item xs={7} textAlign={"center"}>
                                    <Grid container spacing={1} justifyContent="space-around" marginTop="0.1em">
                                        <Grid item xs={2} textAlign={"center"} fontSize={"0.6em"}>
                                            <Box key={place.id} textAlign="left"
                                                    height="100%"
                                                    display="flex"
                                                    justifyContent="center"
                                                    flexDirection="column">
                                                <i>Lat: </i>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={10} textAlign={"center"} fontSize={"0.8em"}>
                                            <Box key={place.id}
                                                    height="100%"
                                                    display="flex"
                                                    justifyContent="center"
                                                    flexDirection="column">
                                                {place.latitude}
                                            </Box>
                                        </Grid>
                                        <Grid item xs={2} textAlign={"center"} fontSize={"0.6em"}>
                                            <Box key={place.id} textAlign="left"
                                                    height="100%"
                                                    display="flex"
                                                    justifyContent="center"
                                                    flexDirection="column">
                                                <i>Lon: </i>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={10} textAlign={"center"} fontSize={"0.8em"}>
                                            <Box key={place.id}
                                                    height="100%"
                                                    display="flex"
                                                    justifyContent="center"
                                                    flexDirection="column">
                                                {place.longitude}
                                            </Box>
                                        </Grid>
                                    </Grid>     
                                </Grid>
                            </Grid>
                        </Grid>
                                       
                    </>

                ))
            }
        </>
    )



}


