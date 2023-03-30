import { Sidebar, Menu, MenuItem, useProSidebar,SubMenu } from "react-pro-sidebar";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AddLocationIcon from '@mui/icons-material/AddLocation';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import PersonIcon from '@mui/icons-material/Person';
import { useEffect, useState } from 'react';
import { Place } from "../../domain/Place";
import { getPlacesByUser } from "../../api/api";
import { useSession } from "@inrupt/solid-ui-react";

type SideBarProps = {
  setInfoWindowData:React.Dispatch<React.SetStateAction<{
    id:string; //The ID of the place to show
    title: string; //The name of the place to show
    latitude: number;
    longitude:number;
  }>>,
  setIsNew:React.Dispatch<React.SetStateAction<boolean>>,
  visibility:string,
  setIsOpen:React.Dispatch<React.SetStateAction<boolean>>,
  refreshScores:(place: string) => Promise<void>,
  newPlace: number,
  changePlace:number,
  setChangePlace:React.Dispatch<React.SetStateAction<number>>
}


const friends  =["Friend 1", "Friend 2", "Friend 3"]; //This will be loaded from other layern

export default function MySideBar(props: SideBarProps): JSX.Element {

  //For the places
  const [places,setPlaces] = useState<Place[]>([]);
  const { session } = useSession();
  var webId = session.info.webId as string;

  //Get the list of places for the current user
  const refreshPlaceList = async () => {
   getPlacesByUser(webId).then((places)=>setPlaces(places));
  }

  const displayVisibility = (visibility:string) => {
    if (visibility == null) {
      return "";
    } else {
      return "Filtering by: " + visibility;
    }
  }


  //Update place list when a new place is added
  useEffect(()=>{
    refreshPlaceList()
  },[props.newPlace]);


  //Style must be in-line; does not work otherwise

    const { collapseSidebar } = useProSidebar();
    return (
        <Sidebar style={{ width: "15vw", height: "80vh" ,color:"black"}}> 
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
          <SubMenu label="My sites" icon={<AddLocationIcon />} onClick={()=>{refreshPlaceList();}
          
          }> 

                {places.map((place, index,array) => (
                  

                  <MenuItem icon={<ArrowRightIcon />}
                  key={index}
                  onClick={() => {
                    props.setInfoWindowData({
                      title:place.name,
                      id:place.id,
                      latitude:place.latitude,
                      longitude:place.longitude
                      
                    });
                    props.setIsNew(false);
                    props.setIsOpen(true);
                    props.refreshScores(place.id);
                    props.setChangePlace(props.changePlace+1);
                  }}

                  >{place.name}</MenuItem>
                   ))}

          </SubMenu>
          <SubMenu label="Friends" icon={<PeopleOutlinedIcon />}>
                  {friends.map((ti, index) => (
                    <MenuItem icon={<PersonIcon />}
                    key={index}
                    >{ti}</MenuItem>
                    ))}
          </SubMenu>
          <MenuItem icon={<ReceiptOutlinedIcon />}>Profile</MenuItem>
          <MenuItem icon={<HelpOutlineOutlinedIcon />}>FAQ</MenuItem>
          <MenuItem  onClick={() => {
                    props.setInfoWindowData({
                      title:"TITLE",
                      id:"",
                      latitude:0,
                      longitude:0
                      
                    });
                    props.setIsNew(false);
                    props.setIsOpen(true);
                  }}>PARA PRUEBAS</MenuItem>
          <MenuItem>{displayVisibility(props.visibility)}</MenuItem>
        </Menu>
      </Sidebar>
      
      )

}




