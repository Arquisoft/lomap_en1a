import MySideBar from './SideBar';
import { ProSidebarProvider } from "react-pro-sidebar";
import InfoWindow from './InfoWindow';
import SlidingPane from "react-sliding-pane";
import { useState, useEffect } from 'react';
import "../../App.css";
import { FilterList, IVisibility } from './FilterList';
import CreatePlaceWindow  from './CreatePlaceWindow';
import { MapComponent } from '../ol/map/map';
import { Score } from '../../domain/Score';
import { getPlaces, getPlacesByUser, getScores } from '../../api/api';
import { Place } from '../../domain/Place';
import { useSession } from '@inrupt/solid-ui-react';
import { deleteMarker } from '../ol/map/layers/vector/vector';



export default function MapView():JSX.Element{

  const { session } = useSession();
  var webId = session.info.webId as string;
  const[removeMarker, setRemoveMarker]=useState(false); //To control when to remove a marker from the map automatically
  const[addedPlace, setAddedPlace]=useState(false); //To control when to remove a marker from the map automatically

  //These 3 useStates are used to monitor useEffect hooks; they just increment to detect change when needed
  const[updateMap, setUpdateMap]=useState(0);
  const[changePlace, setChangePlace]=useState(0);
  const[newPlace, setNewPlace]=useState(0);

  const[latitude, setLatitude]=useState(0);
  const[longitude, setLongitude]=useState(0);
  const [visibility, setVisibility] = useState({
    value:"FULL"
  });
  const[isNew, setIsNew]=useState(false); //True if it is a new place to add, false if it is already a place in the map
  const[isOpen, setIsOpen]=useState(false);
  const [infoWindowData, setInfoWindowData] = useState({
    title:"",
    id:"",
    latitude: 0,
    longitude:0,
  });
  var p:Place[] = []; //Initial value for hook
  const [places, setPlaces]=useState<Place[]>(p);

  //For the computation of the avg score
  const [avg,setAvg] = useState(0);



  const refreshScores = async (place:string) => {


    getScores(place).then((s)=>{
      if(s.length>0){
        let aux = 0;
        for (let i = 0; i < s.length; i++) {
        
          aux+=s[i].score;
        }
        let avg = aux/s.length;
        let a = avg.toFixed(1)
        setAvg(parseFloat(a)); //Calculates the new average
      }else{
        setAvg(0)
      }

    });
  }


  //When th
  useEffect(()=>{
    
  },[newPlace])






  //NOTA: en el sliding pane parece que no funciona el class para añadir estilo???????

    return (

      <>
      <div className='map-view'>
        <div className='side-bar'>
          <ProSidebarProvider>
                <MySideBar setInfoWindowData={setInfoWindowData} setIsNew={setIsNew} setChangePlace={setChangePlace} changePlace={changePlace}
                 visibility={visibility.value} setIsOpen={setIsOpen} refreshScores={refreshScores} newPlace={newPlace}/>
          </ProSidebarProvider>
        </div>

        <div className='filter-list'>
          <FilterList visibility={visibility} setVisibility={setVisibility}/>
        </div>
         

          <MapComponent setIsNew={setIsNew} setInfoWindowData={setInfoWindowData} 
          setLatitude={setLatitude} setLongitude={setLongitude} setIsOpen={setIsOpen} webId={webId}/>
          
      </div>


        
        
        <SlidingPane 
            isOpen={isOpen}
            onRequestClose={() => {
                setIsOpen(false);
                setUpdateMap(updateMap+1);//These will force the useEffect hook of vector.tsx to execute
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
           <InfoWindow infoWindowData={infoWindowData} refreshScores={refreshScores} avg={avg} changePlace={changePlace}/>}
            
                          
        </SlidingPane>
      
      </>
        



      
        

      

          

        );
      

}