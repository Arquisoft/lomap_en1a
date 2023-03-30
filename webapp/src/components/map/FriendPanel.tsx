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


export function FriendPanel(props: FriendPanelProps): JSX.Element {

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
    //TODO: cambiar lista de places por la de la llamada desde InfoWindow

    return (


        <>
            <Grid container spacing={1} alignItems="center" justifyContent="center" className='info-window'>

                <Grid item xs={6} textAlign="center">
                    <Box component="h3" ><>{props.friendName}</></Box>
                </Grid>


                <Grid item xs={12}>
                    <Box component="img" src={props.friendPhoto} sx={{ maxWidth: '100%', maxHeight: 350, width: 'auto', height: 'auto', }}></Box>
                </Grid>

                <PlacesOf sharedSites={list}></PlacesOf>



            </Grid>
        </>



    );

}

function PlacesOf(props: PlaceOfProps): JSX.Element {

    return (
        <>
            {
                props.sharedSites.map((place) => {

                    <Grid item xs={3}>
                        <Box component="p" textAlign="right">{place.title}</Box>
                    </Grid>

                })
            }
        </>
    )



}


