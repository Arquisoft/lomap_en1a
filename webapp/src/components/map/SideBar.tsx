import { Sidebar, Menu, MenuItem, useProSidebar, SubMenu } from "react-pro-sidebar";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AddLocationIcon from '@mui/icons-material/AddLocation';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import PersonIcon from '@mui/icons-material/Person';
import { useEffect, useState } from 'react';
import { Place } from "../../domain/Place";
import { getFriendsForUser, getPlacesByUser, getProfile } from "../../api/api";
import { SlidingPaneView } from "./MapView";
import { User } from "../../domain/User";



type SideBarProps = {
  setInfoWindowData: React.Dispatch<React.SetStateAction<{
    id: string; //The ID of the place to show
    title: string; //The name of the place to show
    latitude: number;
    longitude: number;
  }>>,
  setFriendWindowData: React.Dispatch<React.SetStateAction<{
    friend: User;
    friendPhoto: string;
    sharedSites: never[];
  }>>,
  setSlidingPaneView: React.Dispatch<React.SetStateAction<number>>,
  visibility: string,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  newPlace: number,
}




export default function MySideBar(props: SideBarProps): JSX.Element {

  //For the places
  const [places, setPlaces] = useState<Place[]>([]);
  /*const { session } = useSession();
  var webId = session.info.webId as string;
*/
  //Get the list of places for the current user
  const refreshPlaceList = async () => {
    getPlacesByUser("test").then((places) => setPlaces(places));
  }

  const [friends, setFriends] = useState<User[]>([]);
  /*const { session } = useSession();
  var webId = session.info.webId as string;
*/
  //Get the list of places for the current user
  const refreshFriendList = async () => {
    getProfile().then((user) => getFriendsForUser(user.getWebId()).then((friends) => setFriends(friends)));
  }

  const displayVisibility = (visibility: string) => {
    if (visibility == null) {
      return "";
    } else {
      return "Filtering by: " + visibility;
    }
  }


  //Update place list when a new place is added
  useEffect(() => {
    refreshPlaceList()
  }, [props.newPlace]);

  useEffect(() => {
    refreshFriendList()
  }, []);


  //Style must be in-line; does not work otherwise

  const { collapseSidebar } = useProSidebar();
  return (
    <Sidebar style={{ height: "80vh", color: "black" }}>
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
        <SubMenu label="My sites" icon={<AddLocationIcon />} onClick={() => { refreshPlaceList(); }

        }>

          {places.map((place, index, array) => (


            <MenuItem icon={<ArrowRightIcon />}

              key={index}
              onClick={() => {
                props.setInfoWindowData({
                  title: place.name,
                  id: place.id,
                  latitude: place.latitude,
                  longitude: place.longitude

                });
                props.setSlidingPaneView(SlidingPaneView.InfoWindowView);
                props.setIsOpen(true);
              }}

            >{place.name}</MenuItem>
          ))}

        </SubMenu>
        <SubMenu label="Friends" icon={<PeopleOutlinedIcon />}>
          <MenuItem>
            {friends.map((ti, index) => (
              <MenuItem icon={<PersonIcon />}
                key={index}
                onClick={() => {
                  alert(ti.getUsername());
                  props.setFriendWindowData({
                    friend: ti,
                    friendPhoto: "foto",
                    sharedSites: []

                  });

                  props.setSlidingPaneView(SlidingPaneView.FriendsView);
                  props.setIsOpen(true);

                }
                }
              >{ti.getUsername()}</MenuItem>
            ))}
          </MenuItem>

        </SubMenu>
        <MenuItem icon={<ReceiptOutlinedIcon />}>Profile</MenuItem>
        <MenuItem icon={<HelpOutlineOutlinedIcon />}>FAQ</MenuItem>
        <MenuItem>{displayVisibility(props.visibility)}</MenuItem>
      </Menu>
    </Sidebar>

  )

}




