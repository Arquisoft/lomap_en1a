import MySideBar from './SideBar';
import { ProSidebarProvider } from "react-pro-sidebar";
import InfoWindow from './InfoWindow';
import SlidingPane from "react-sliding-pane";
import { useState } from 'react';
import "../../App.css";
import { FilterList, IVisibility } from './FilterList';
import { CreatePlaceWindow } from './CreatePlaceWindow';
import { MapComponent } from '../ol/map/map';
import { Score } from '../../domain/Score';
import { getScores } from '../../api/api';



export default function MapView():JSX.Element{

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
  //For the scores
  const [scores,setScores] = useState<Score[]>([]);

  //For the computation of the avg score
  const [avg,setAvg] = useState(0);





  const refreshScores = async (place:string) => {

    //NOT FIXED YET
    getScores(place).then((s)=>{
        setScores(s);
        let aux = 0;
        for (let i = 0; i < scores.length; i++) {
        
          aux+=scores[i].score;
        }
        let avg = aux/scores.length;
        let a = avg.toFixed(1)
        setAvg(parseFloat(a)); //Calculates the new average
    });
  }



  //NOTA: en el sliding pane parece que no funciona el class para añadir estilo???????

    return (

      <>
      <div className='map-view'>
        <div className='side-bar'>
          <ProSidebarProvider>
                <MySideBar setInfoWindowData={setInfoWindowData} setIsNew={setIsNew} visibility={visibility.value} setIsOpen={setIsOpen} refreshScores={refreshScores}/>
          </ProSidebarProvider>
        </div>

        <div className='filter-list'>
          <FilterList visibility={visibility} setVisibility={setVisibility}/>
        </div>
         

          <MapComponent setIsNew={setIsNew} setInfoWindowData={setInfoWindowData} setLatitude={setLatitude} setLongitude={setLongitude} setIsOpen={setIsOpen}/>
          
      </div>


        
        
        <SlidingPane 
            isOpen={isOpen}
            onRequestClose={() => {
                setIsOpen(false)
            }}
            width="70vh"
            className='info-window'
            overlayClassName='info-window'
            >
          {isNew ?  <CreatePlaceWindow latitude={latitude} longitude={longitude}/>:
           <InfoWindow infoWindowData={infoWindowData} refreshScores={refreshScores} avg={avg}/>}
            
                          
        </SlidingPane>
      
      </>
        



      
        

      

          

        );
      

}