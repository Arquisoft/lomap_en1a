import MySideBar from './SideBar';
import { ProSidebarProvider } from "react-pro-sidebar";
import InfoWindow from './InfoWindow';
import SlidingPane from "react-sliding-pane";
import { useState, useEffect } from 'react';
import { FilterList } from './FilterList';
import CreatePlaceWindow from './CreatePlaceWindow';
import { MapComponent } from '../ol/map';
import { useSession } from '@inrupt/solid-ui-react';
import { deleteMarker } from '../ol/vector';
import { FriendPanel } from './FriendPanel';


export enum SlidingPaneView {
  InfoWindowView = 0,
  CreatePlaceView,
  FriendsView
}

export default function MapView(): JSX.Element {

  const { session } = useSession();
  var webId = session.info.webId as string;
  const [addedPlace, setAddedPlace] = useState(false); //To control when to remove a marker from the map automatically

  //These 3 useStates are used to monitor useEffect hooks; they just increment to detect change when needed
  const [newPlace, setNewPlace] = useState(0);

  const [visibility, setVisibility] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [slidingPaneView, setSlidingPaneView] = useState(0); 
  const [isOpen, setIsOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState({
    title: "",
    id: "",
    latitude: 0,
    longitude: 0,
  });
  const [friendWindowData, setFriendWindowData] = useState({
    friendName: "",
    friendPhoto: "",
    sharedSites: []
  });







  //NOTA: en el sliding pane parece que no funciona el class para añadir estilo???????

  return (

    <>
      <div className='map-view'>
        <div className='side-bar'>
          <ProSidebarProvider>
            <MySideBar setFriendWindowData={setFriendWindowData} setInfoWindowData={setInfoWindowData}  setSlidingPaneView={ setSlidingPaneView}
              visibility={visibility} setIsOpen={setIsOpen} newPlace={newPlace} />
          </ProSidebarProvider>
        </div>

        <div className='filter-list'>
          <FilterList visibility={visibility} setVisibility={setVisibility} />
        </div>


        <MapComponent setSlidingPaneView={setSlidingPaneView} setInfoWindowData={setInfoWindowData}
          setLatitude={setLatitude} setLongitude={setLongitude} setIsOpen={setIsOpen} webId={webId} visibility={visibility} />

      </div>




      <SlidingPane
        isOpen={isOpen}
        onRequestClose={() => {
          setIsOpen(false);
          //If a place was not added, when closing setRemoveMarker(true)
          if (!addedPlace && slidingPaneView == SlidingPaneView.CreatePlaceView) {
            deleteMarker();
          }

          setAddedPlace(false);


        }}
        width="70vh"
        className='info-window'
        overlayClassName='info-window'
      >
        {
          slidingPaneView == SlidingPaneView.CreatePlaceView ? <CreatePlaceWindow latitude={latitude} longitude={longitude} setNewPlace={setNewPlace}
            setAddedPlace={setAddedPlace} setIsOpen={setIsOpen} /> :
            slidingPaneView == SlidingPaneView.InfoWindowView ? <InfoWindow infoWindowData={infoWindowData} /> :
            slidingPaneView == SlidingPaneView.FriendsView ? <FriendPanel friendName={friendWindowData.friendName} friendPhoto={friendWindowData.friendPhoto} sharedSites={friendWindowData.sharedSites} /> :
                <div></div>
        }


      </SlidingPane>

    </>











  );


}