import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MySideBar from './SideBar';
import { ProSidebarProvider } from "react-pro-sidebar";

export default function MapView():JSX.Element{

    return (
        <ProSidebarProvider>
        <div style={{ height: "100vh",  display: "flex"}}>
                <MySideBar/>
        <main>
        <h1 style={{ color: "white", marginLeft: "5rem" }}>
          PLACEHOLDER
        </h1>
        
      </main>
        </div>
        </ProSidebarProvider>

        );
      

}