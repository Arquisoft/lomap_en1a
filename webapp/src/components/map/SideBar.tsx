import { Sidebar, Menu, MenuItem, useProSidebar, SubMenu } from "react-pro-sidebar";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AddLocationIcon from '@mui/icons-material/AddLocation';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import PersonIcon from '@mui/icons-material/Person';
import { useEffect, useRef, useState } from 'react';
import { Place } from "../../domain/Place";
import { addUserToList, getAllPublicUsers, getFriendsForUser,getPrivatePlacesByUser, getProfile, getPublicPlacesByPublicUser, getPublicPlacesByUser, getSharedPlacesByUser } from "../../api/api";
import { FriendWindowDataType, InfoWindowDataType, SlidingPaneView } from "./MapView";
import { User } from "../../domain/User";
import { CategoryList } from "./FilterCategory";
import { addMarkersByUserId, displayedUsers, removeMarkersByUserId } from "../ol/vector";
import { NotificationType } from "./CommentForm";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Box, Button } from "@mui/material";



type SideBarProps = {
  handleFriendWindowData: (value: FriendWindowDataType) => Promise<void>,
  handleInfoWindowData: (value: InfoWindowDataType) => Promise<void>,
  handleSlidingPaneView: (value: number) => Promise<void>,
  visibility: string,
  handleIsOpen: (value: boolean) => Promise<void>,
  newPlace: number,
}




export default function MySideBar(props: SideBarProps): JSX.Element {

  const [notificationStatus, setNotificationStatus] = useState(false);
  const [notification, setNotification] = useState<NotificationType>({ severity: 'success', message: '' });

  //For the public places
  const [publicPlaces, setPublicPlaces] = useState<Place[]>([]);
  const refreshPublicPlaceList = async () => {
    getPublicPlacesByUser().then((places) => {
      places.sort(function(a, b) {
        let name1 = a.name.toLowerCase();
        let name2 = b.name.toLowerCase();
        if(name1 < name2) { return -1; }
        if(name1 > name2) { return 1; }
        return 0;
      })

      setPublicPlaces(places)
    });

  }

  //For the  private places
  const [privatePlaces, setPrivatePlaces] = useState<Place[]>([]);
  const refreshPrivatePlaceList = async () => {
    getPrivatePlacesByUser().then((places) => {
      places.sort(function(a, b) {
        let name1 = a.name.toLowerCase();
        let name2 = b.name.toLowerCase();
        if(name1 < name2) { return -1; }
        if(name1 > name2) { return 1; }
        return 0;
      })
      
      setPrivatePlaces(places)
    });

  }

  const [importedPlaces, setImportedPlaces] = useState<Place[]>([]);
  const refreshImportedPlaceList = async () => {
    let places: Place[] = []
    for (let i = 0; i < displayedUsers.length; i++) {
      let id = displayedUsers[i];
      let userPlaces = await getPublicPlacesByPublicUser(id);

      userPlaces.forEach(p => {
        places.push(p)});
    }

    places.sort(function(a, b) {
      let name1 = a.name.toLowerCase();
      let name2 = b.name.toLowerCase();
      if(name1 < name2) { return -1; }
      if(name1 > name2) { return 1; }
      return 0;
    })

    setImportedPlaces(places);
  }

  //For the friend places
  const [sharedPlaces, setSharedPlaces] = useState<Place[]>([]);
  const refreshSharedPlaceList = async () => {
    getSharedPlacesByUser().then((places) => {
      places.sort(function(a, b) {
        let name1 = a.name.toLowerCase();
        let name2 = b.name.toLowerCase();
        if(name1 < name2) { return -1; }
        if(name1 > name2) { return 1; }
        return 0;
      })

      setSharedPlaces(places)
    });

  }

 //Get the list of places for the current user
  const [friends, setFriends] = useState<User[]>([]);
  const refreshFriendList = async () => {
    getProfile().then((user) => getFriendsForUser(user.webId).then((friends) => {
      friends.sort(function(a, b) {
        let name1 = a.username.toLowerCase();
        let name2 = b.username.toLowerCase();
        if(name1 < name2) { return -1; }
        if(name1 > name2) { return 1; }
        return 0;
      })

      setFriends(friends)
    }));

  }

   //Get the list of public users
  const [users, setUsers] = useState<User[]>([]);
  const refreshPublicUsersList = async () => {
    let publicUsers = await getAllPublicUsers();
    let profile = await getProfile();

    let index = publicUsers.map(u => u.webId).indexOf(profile.webId);
    if (index >= 0) publicUsers.splice(index, 1);

    publicUsers.sort(function(a, b) {
      let name1 = a.username.toLowerCase();
      let name2 = b.username.toLowerCase();
      if(name1 < name2) { return -1; }
      if(name1 > name2) { return 1; }
      return 0;
    })

    setUsers(publicUsers);
  }

  const addUserToPublicList = async () => {
    let result = await addUserToList();
    if (result) {
      setNotificationStatus(true);
      setNotification({
        severity: 'success',
        message: 'You have been added to the public user list!'
      });
    }
    else {
      setNotificationStatus(true);
      setNotification({
        severity: 'error',
        message: 'There\'s been an error adding you to the public user list.'
      });
    }

  }

  const handleUserMarkers = (id: string) => {
    if (displayedUsers.indexOf(id) >= 0) {
      removeMarkersByUserId(id)
    } else {
      addMarkersByUserId(id)
    }

    refreshImportedPlaceList();
    setUpdateCount(updateCount + 1)
  }

  const getUserDisplayStatus = (id: string) => {
    return displayedUsers.indexOf(id) >= 0
  }

  //For the visibility
  const displayVisibility = (visibility: string) => {
    if (visibility == null) {
      return "";
    } else {
      return "Filtering by: " + visibility;
    }
  }


  //Update place list when a new place is added
  useEffect(() => {
    refreshPublicPlaceList()
    refreshPrivatePlaceList()
    refreshSharedPlaceList()
  }, [props.newPlace]);


  //Get friend list and public users list
  useEffect(() => {
    refreshFriendList();
    refreshPublicUsersList();
    return () => {
      setFriends([]); // Cleanup
    };
  }, []);

  //For the sidebar
  const { collapseSidebar } = useProSidebar();

  const [updateCount, setUpdateCount] = useState(0);

  return (
    <Sidebar style={{ height: "80vh", color: "black"}}>
      <Menu
      >
        <MenuItem
          icon={<MenuOutlinedIcon />}
          onClick={() => {
            collapseSidebar();
          }}
        >
          {" "}
          <h2>LoMap</h2>
        </MenuItem>
        <SubMenu label="Public sites" icon={<AddLocationIcon />} onClick={() => { refreshPublicPlaceList(); }

        }>

          {publicPlaces.map((place, index) => (


            <MenuItem icon={<ArrowRightIcon />}

              key={index}
              onClick={() => {
                props.handleInfoWindowData({
                  title: place.name,
                  category:place.category,
                  id: place.id,
                  latitude: place.latitude,
                  longitude: place.longitude,
                  description:place.description

                });
                props.handleSlidingPaneView(SlidingPaneView.InfoWindowView);
                props.handleIsOpen(true);
              }}

            >{place.name}</MenuItem>
          ))}

        </SubMenu>
        <SubMenu label="Private sites" icon={<AddLocationIcon />} onClick={() => { refreshPrivatePlaceList(); }}>

              {privatePlaces.map((place, index) => (


                <MenuItem icon={<ArrowRightIcon />}

                  key={index}
                  onClick={() => {
                    props.handleInfoWindowData({
                      title: place.name,
                      category:place.category,
                      id: place.id,
                      latitude: place.latitude,
                      longitude: place.longitude,
                      description:place.description

                    });
                    props.handleSlidingPaneView(SlidingPaneView.InfoWindowView);
                    props.handleIsOpen(true);
                  }}

                >{place.name}</MenuItem>
              ))}

          </SubMenu>

          <SubMenu label="Imported sites" icon={<AddLocationIcon />} onClick={() => { refreshImportedPlaceList(); }}>

              {importedPlaces.map((place, index) => (


                <MenuItem icon={<ArrowRightIcon />}

                  key={index}
                  onClick={() => {
                    props.handleInfoWindowData({
                      title: place.name,
                      category:place.category,
                      id: place.id,
                      latitude: place.latitude,
                      longitude: place.longitude,
                      description:place.description

                    });
                    props.handleSlidingPaneView(SlidingPaneView.InfoWindowView);
                    props.handleIsOpen(true);
                  }}

                >{place.name}</MenuItem>
              ))}

          </SubMenu>

          <SubMenu label="Shared sites" icon={<AddLocationIcon />} onClick={() => { refreshSharedPlaceList(); }}>

            {sharedPlaces.map((place, index) => (


              <MenuItem icon={<ArrowRightIcon />}

                key={index}
                onClick={() => {
                  props.handleInfoWindowData({
                    title: place.name,
                    category:place.category,
                    id: place.id,
                    latitude: place.latitude,
                    longitude: place.longitude,
                    description:place.description

                  });
                  props.handleSlidingPaneView(SlidingPaneView.InfoWindowView);
                  props.handleIsOpen(true);
                }}

              >{place.name}</MenuItem>
            ))}

          </SubMenu>
        <SubMenu label="Friends" icon={<PeopleOutlinedIcon />   } >
          {friends.map((ti, index) => (
            <MenuItem icon={<PersonIcon />}
              key={index}
              onClick={() => {
                props.handleFriendWindowData({
                  friend: ti,
                  friendPhoto: "foto",
                  sharedSites: []

                });

                props.handleSlidingPaneView(SlidingPaneView.FriendsView);
                props.handleIsOpen(true);


              }
              }
            >{ti.username}</MenuItem>
          ))}

        </SubMenu>

        <SubMenu label="Categories" icon={<AddLocationIcon />}>
          <CategoryList/>
        </SubMenu>


        <SubMenu label="Public users" icon={<PeopleOutlinedIcon />   }>
          {users.map((user, index) => (
            <Box key={index} component="p" textAlign="left">
                {user.username}
                <br></br>
                <Button variant="contained" onClick={() => handleUserMarkers(user.webId)}>
                    {getUserDisplayStatus(user.webId)?"Hide this user's markers":"Show this user's markers"}
                </Button>
            </Box>
          ))}

        </SubMenu>
        <MenuItem onClick={()=>addUserToPublicList()}>Add me to public user list</MenuItem>
        <MenuItem>{displayVisibility(props.visibility)}</MenuItem>
        
      </Menu>
      <Snackbar open={notificationStatus} autoHideDuration={3000} onClose={() => { setNotificationStatus(false) }}>
        <Alert severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>


    </Sidebar>
    

  )

}




