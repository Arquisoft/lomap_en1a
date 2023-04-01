import React from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

type Place = {
    id: string;
    title: string;
    latitude: number;
    longitude: number;
}

type FriendPanelProps = {
    friendName: string,
    friendPhoto: string,
    sharedSites: Place[]
}
type PlaceOfProps = {
    sharedSites: Place[]
}

var list: Place[] = [
    {
        id: "Sitio1",
        title: "Sitio1",
        latitude: 1,
        longitude: 1
    },
    {
        id: "Sitio2",
        title: "Sitio2",
        latitude: 1,
        longitude: 1
    },
    {
        id: "Sitio3",
        title: "Sitio3",
        latitude: 1,
        longitude: 1
    },
    {
        id: "Sitio4",
        title: "Sitio4",
        latitude: 1,
        longitude: 1
    }

];
export function FriendPanel(props: FriendPanelProps): JSX.Element {


    //TODO: cambiar lista de places por la de la llamada desde InfoWindow

    return (


        <>
            <Grid container spacing={1} alignItems="center" justifyContent="center" className='info-window'>

                <Grid item xs={6} textAlign="center">
                    <Box component="h1" ><>{props.friendName}</></Box>
                </Grid>


                <Grid item xs={12}>
                    <Box component="img" src={props.friendPhoto} sx={{ maxWidth: '100%', maxHeight: 350, width: 'auto', height: 'auto', }}></Box>

                    <Box component="h2" textAlign="left">{"Shared sites"}</Box>
                    <PlacesOf sharedSites={list}></PlacesOf>
                </Grid>


            </Grid>
        </>



    );

}

function PlacesOf(props: PlaceOfProps): JSX.Element {

    return (
        <>
            {
                list.map((place) => (

                    <Box component="p" textAlign="left">{place.title + ": " + place.latitude + "," + place.longitude}</Box>

                ))
            }
        </>
    )



}


