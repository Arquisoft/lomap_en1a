import { Sidebar, Menu, MenuItem, useProSidebar, SubMenu } from "react-pro-sidebar";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AddLocationIcon from '@mui/icons-material/AddLocation';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import PersonIcon from '@mui/icons-material/Person';
import { useEffect, useState } from 'react';
import { Place } from "../../domain/Place";
import { addUserToList, getAllPublicUsers, getFriendsForUser,getPrivatePlacesByUser, getProfile, getPublicPlacesByUser, getSharedPlacesByUser } from "../../api/api";
import { FriendWindowDataType, InfoWindowDataType, SlidingPaneView } from "./MapView";
import { User } from "../../domain/User";
import { CategoryList } from "./FilterCategory";
import { addMarkersByUserId } from "../ol/vector";
import { NotificationType } from "./CommentForm";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';



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
    getPublicPlacesByUser().then((places) => setPublicPlaces(places));

  }

  //For the  private places
  const [privatePlaces, setPrivatePlaces] = useState<Place[]>([]);
  const refreshPrivatePlaceList = async () => {
    getPrivatePlacesByUser().then((places) => setPrivatePlaces(places));

  }

  //For the friend places
  const [sharedPlaces, setSharedPlaces] = useState<Place[]>([]);
  const refreshSharedPlaceList = async () => {
    getSharedPlacesByUser().then((places) => setSharedPlaces(places));

  }

 //Get the list of places for the current user
  const [friends, setFriends] = useState<User[]>([]);
  const refreshFriendList = async () => {
    getProfile().then((user) => getFriendsForUser(user.webId).then((friends) => setFriends(friends)));

  }

   //Get the list of public users
  const [users, setUsers] = useState<User[]>([]);
  const refreshPublicUsersList = async () => {
    getAllPublicUsers().then((u) => setUsers(u));

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

  return (
    <Sidebar style={{ height: "80vh", color: "black",width:"44vh" }}>
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
                  longitude: place.longitude

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
                      longitude: place.longitude

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
                    longitude: place.longitude

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
            <MenuItem icon={<PersonIcon />}
              key={index}
              onClick={() => {addMarkersByUserId(user.webId)}}
            >{user.username}</MenuItem>
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




