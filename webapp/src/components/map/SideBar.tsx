import { Sidebar, Menu, MenuItem, useProSidebar,SubMenu } from "react-pro-sidebar";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AddLocationIcon from '@mui/icons-material/AddLocation';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import PersonIcon from '@mui/icons-material/Person';
import { IInfoWindowData } from "./MapView";




const places  =["Place 1", "Place 2", "Place 3"]; //This will be loaded from other layer

const friends  =["Friend 1", "Friend 2", "Friend 3"]; //This will be loaded from other layer

export const MySideBar:React.FC<IInfoWindowData>=( {setInfoWindowData}) =>{

  //Style must be in-line; does not work otherwise

    const { collapseSidebar } = useProSidebar();
    return (
        <Sidebar style={{ height: "80vh" ,color:"black"}}> 
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
          <SubMenu label="My sites" icon={<AddLocationIcon />}>

                {places.map((ti, index) => (

                  <MenuItem icon={<ArrowRightIcon />}
                  key={index}
                  onClick={() => {
                    setInfoWindowData({
                      isOpen:true,
                      title:ti,
                      stars:index
                    });
                  }}

                  >{ti}</MenuItem>
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
        </Menu>
      </Sidebar>
      
      )

}




