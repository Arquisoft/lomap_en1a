import {MySideBar} from './SideBar';
import { ProSidebarProvider } from "react-pro-sidebar";
import {InfoWindow} from './InfoWindow';
import SlidingPane from "react-sliding-pane";
import { useState } from 'react';
import "../../App.css";
import { FilterList } from './FilterList';
import { CreatePlaceWindow } from './CreatePlaceWindow';


export interface IInfoWindowData{
  setInfoWindowData:React.Dispatch<React.SetStateAction<{
    isOpen: boolean; //If the info window is open or not
    id:string; //The ID of the place to show
    title: string; //The name of the place to show
    latitude: number;
    longitude:number;

}>>
  infoWindowData:{
    isOpen:boolean;
    id:string;
    title:string;
    latitude: number;
    longitude:number;
  }
}

export default function MapView():JSX.Element{

  const[isNew, setIsNew]=useState(false); //True if it is a new place to add, false if it is already a place in the map
  const [infoWindowData, setInfoWindowData] = useState({
    isOpen:false,
    title:"",
    id:"",
    latitude: 0,
    longitude:0

  });

  //NOTA: en el sliding pane parece que no funciona el class para añadir estilo???????

    return (

      <>
      <div className='map-view'>
        <div className='side-bar'>
          <ProSidebarProvider>
                <MySideBar setInfoWindowData={setInfoWindowData} infoWindowData={infoWindowData}/>
          </ProSidebarProvider>
        </div>

        <div className='filter-list'>
          <FilterList/>
        </div>
         

          <div className='map'>
              
          </div>
      </div>

        
        


        
        <SlidingPane 
            isOpen={infoWindowData.isOpen}
            onRequestClose={() => {
              setInfoWindowData({
                isOpen:false,
                title:"",
                id:"",
                latitude: 0,
                longitude:0
              });
            }}
            width="70vh"
            className='info-window'
            overlayClassName='info-window'
            >
          {isNew ?  <CreatePlaceWindow/>: <InfoWindow infoWindowData={infoWindowData} setInfoWindowData={setInfoWindowData}/>}
            
                          
        </SlidingPane>
      
      </>
        



      
        

      

          

        );
      

}