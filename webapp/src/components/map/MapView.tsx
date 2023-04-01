import MySideBar from './SideBar';
import { ProSidebarProvider } from "react-pro-sidebar";
import InfoWindow from './InfoWindow';
import SlidingPane from "react-sliding-pane";
import { useState, useEffect } from 'react';
import { FilterList} from './FilterList';
import CreatePlaceWindow  from './CreatePlaceWindow';
import { MapComponent } from '../ol/map';
import { useSession } from '@inrupt/solid-ui-react';
import { deleteMarker } from '../ol/vector';



export default function MapView():JSX.Element{

  const { session } = useSession();
  var webId = session.info.webId as string;
  const[addedPlace, setAddedPlace]=useState(false); //To control when to remove a marker from the map automatically

  //These useState is used to monitor useEffect hooks; it just increments to detect change when needed
  //FIXME: I will try to replace this by another solution
  const[newPlace, setNewPlace]=useState(0);

  
  const[latitude, setLatitude]=useState(0);
  const[longitude, setLongitude]=useState(0);
  const [visibility, setVisibility] = useState("");
  const[isNew, setIsNew]=useState(false); //True if it is a new place to add, false if it is already a place in the map
  const[isOpen, setIsOpen]=useState(false);
  const [infoWindowData, setInfoWindowData] = useState({
    title:"",
    id:"",
    latitude: 0,
    longitude:0,
  });



  //NOTA: en el sliding pane parece que no funciona el class para añadir estilo???????

    return (

      <>
      <div className='map-view'>
        <div className='side-bar'>
          <ProSidebarProvider>
                <MySideBar setInfoWindowData={setInfoWindowData} setIsNew={setIsNew} 
                 visibility={visibility} setIsOpen={setIsOpen} newPlace={newPlace}/>
          </ProSidebarProvider>
        </div>

        <div className='filter-list'>
          <FilterList visibility={visibility} setVisibility={setVisibility}/>
        </div>
         

          <MapComponent setIsNew={setIsNew} setInfoWindowData={setInfoWindowData} 
          setLatitude={setLatitude} setLongitude={setLongitude} setIsOpen={setIsOpen} webId={webId} visibility={visibility}/>
          
      </div>


        
        
        <SlidingPane 
            isOpen={isOpen}
            onRequestClose={() => {
                setIsOpen(false);
                //If a place was not added, when closing setRemoveMarker(true)
                if(!addedPlace){
                  deleteMarker();
                }
                
                setAddedPlace(false);

                
            }}
            width="70vh"
            className='info-window'
            overlayClassName='info-window'
            >
          {isNew ?  <CreatePlaceWindow latitude={latitude} longitude={longitude} setNewPlace={setNewPlace} newPlace={newPlace}
          setAddedPlace={setAddedPlace} setIsOpen={setIsOpen}/>:
           <InfoWindow infoWindowData={infoWindowData}/>}
            
                          
        </SlidingPane>
      
      </>
        



      
        

      

          

        );
      

}