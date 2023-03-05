import Grid from '@mui/material/Grid';
import {MySideBar} from './SideBar';
import { ProSidebarProvider } from "react-pro-sidebar";
import {InfoWindow} from './InfoWindow';
import SlidingPane from "react-sliding-pane";
import { useState } from 'react';
import "../../App.css";



export interface IInfoWindowData{
  setInfoWindowData:React.Dispatch<React.SetStateAction<{
    isOpen: boolean;
    title: string;
    stars:number;
}>>
  infoWindowData?:{
    isOpen:boolean;
    title:string;
    stars:number
  }
}

export default function MapView():JSX.Element{
  const [infoWindowData, setInfoWindowData] = useState({
    isOpen:false,
    title:"",
    stars:0
  });

  //NOTA: en el sliding pane parece que no funciona el class para añadir estilo???????

    return (
      <div>
      <ProSidebarProvider>
          <MySideBar setInfoWindowData={setInfoWindowData}/>
      </ProSidebarProvider>

        
        <button onClick={()=>setInfoWindowData({
          isOpen:true,
          title:"Title 1",
          stars:3
        })}>
        Click me to open right pane!
      </button>
      
      <SlidingPane 
          isOpen={infoWindowData.isOpen}
          onRequestClose={() => {
            setInfoWindowData({
              isOpen:false,
              title:"",
              stars:0
            });
          }}
          width="70vh"
          className='info-window'
          overlayClassName='info-window'
          >
          <InfoWindow infoWindowData={infoWindowData} setInfoWindowData={setInfoWindowData}/>
                        
      </SlidingPane>
      

          </div>

        );
      

}