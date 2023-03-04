import Grid from '@mui/material/Grid';
import MySideBar from './SideBar';
import { ProSidebarProvider } from "react-pro-sidebar";
import InfoWindow from './InfoWindow';
import SlidingPane from "react-sliding-pane";
import { useState } from 'react';
import "../../App.css"
import "react-sliding-pane/dist/react-sliding-pane.css";





export default function MapView():JSX.Element{
  const [state, setState] = useState({
    isPaneOpen: false,
  });

    return (
      <div>
      <ProSidebarProvider>
          <MySideBar/>
      </ProSidebarProvider>

        
        <button onClick={() => setState({ isPaneOpen: true })}>
        Click me to open right pane!
      </button>
      <SlidingPane
          isOpen={state.isPaneOpen}
          onRequestClose={() => {
          // triggered on "<" on left top click or on outside click
            setState({ isPaneOpen: false });
          }}
          width="50vh"
          className="some-custom-class"
          overlayClassName="some-custom-overlay-class"
          >
          <InfoWindow/>
                        
      </SlidingPane>
          </div>

        );
      

}