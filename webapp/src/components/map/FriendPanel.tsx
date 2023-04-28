import React, { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import image from "../../icons/friend.icon.png";
import { User } from "../../domain/User";
import { getPlacesToShareByUser} from "../../api/api";
import { Place } from "../../domain/Place";
import { Button } from "@mui/material";
import { addFriendMarkerById, deleteMarkerById, displayMap } from "../ol/vector";



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
        getPlacesToShareByUser(props.friend.webId).then((places) => {
            places.sort(function(a, b) {
                let name1 = a.name.toLowerCase();
                let name2 = b.name.toLowerCase();
                if(name1 < name2) { return -1; }
                if(name1 > name2) { return 1; }
                return 0;
            })

            setFriendPlaces(places)
        });

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
                    <Box component="img" textAlign="center" src={image} sx={{ maxWidth: '100%', maxHeight: 350, width: 'auto', height: 'auto'}}></Box>
                    <Box component="h2" textAlign="left">{"Shared sites"}</Box>
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

                    <Box key={place.id} component="p" textAlign="left">
                        {place.name}
                        <br></br>
                        <Button variant="contained" onClick={() => changePlaceDisplayStatus(place.id)}>
                            {getPlaceDisplayStatus(place.id)?"Hide":"Show"}
                        </Button>
                        <br></br>
                        {place.latitude + "," + place.longitude}
                    </Box>

                ))
            }
        </>
    )



}


