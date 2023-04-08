import React, { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import image from "../../icons/friend.icon.png";
import { User } from "../../domain/User";
import { getPlacesToShareByUser} from "../../api/api";
import { Place } from "../../domain/Place";



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
    const refreshFriendPlaceList = async () => {
        getPlacesToShareByUser(props.friend.webId).then((places) => setFriendPlaces(places));

    }

    //Refresh the friend list on component render
    useEffect(() => {
        refreshFriendPlaceList()
    }, []);



    return (

        <>
            <Grid container spacing={1} alignItems="center" justifyContent="center" className='info-window'>
                <Grid item xs={6} textAlign="center">
                    <Box component="h1" ><>{props.friend.username}</></Box>
                </Grid>

                <Grid alignItems="center" item xs={12}>
                    <Box justifySelf={"center"} component="img" src={image} sx={{ maxWidth: '100%', maxHeight: 350, width: 'auto', height: 'auto', }}></Box>
                    <Box component="h2" textAlign="left">{"Shared sites"}</Box>
                    <PlacesOf sharedSites={friendPlaces}></PlacesOf>
                </Grid>
            </Grid>
        </>

    );

}

//Returns a list of p elements with data from the places
function PlacesOf(props: PlaceOfProps): JSX.Element {

    return (
        <>
            {
                props.sharedSites.map((place) => (

                    <Box component="p" textAlign="left">{place.name + ": " + place.latitude + "," + place.longitude}</Box>

                ))
            }
        </>
    )



}


