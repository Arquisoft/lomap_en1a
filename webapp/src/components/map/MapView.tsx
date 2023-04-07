import MySideBar from './SideBar';
import { ProSidebarProvider } from "react-pro-sidebar";
import InfoWindow from './InfoWindow';
import SlidingPane from "react-sliding-pane";
import { useState, useRef } from 'react';
import { FilterList } from './FilterList';
import CreatePlaceWindow from './CreatePlaceWindow';
import { MapComponent } from '../ol/map';
import { deleteMarker } from '../ol/vector';
import { FriendPanel } from './FriendPanel';
import { User } from '../../domain/User';



export enum SlidingPaneView {
  InfoWindowView = 0,
  CreatePlaceView,
  FriendsView
}

export default function MapView(): JSX.Element {

  // const [addedPlace, setAddedPlace] = useState(false); //To control when to remove a marker from the map automatically
  const deleteLastMarker = useRef(false);

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
    friend: new User("", ""),
    friendPhoto: "",
    sharedSites: []
  });






  return (

    <>
      <div className='map-view'>
        <div className='side-bar'>
          <ProSidebarProvider>
            <MySideBar setFriendWindowData={setFriendWindowData} setInfoWindowData={setInfoWindowData} setSlidingPaneView={setSlidingPaneView}
              visibility={visibility} setIsOpen={setIsOpen} newPlace={newPlace} />
          </ProSidebarProvider>
        </div>

        <div className='filter-list'>
          <FilterList visibility={visibility} setVisibility={setVisibility} />
        </div>


        <MapComponent setSlidingPaneView={setSlidingPaneView} setInfoWindowData={setInfoWindowData}
          setLatitude={setLatitude} setLongitude={setLongitude} setIsOpen={setIsOpen} visibility={visibility} />

      </div>




      <SlidingPane
        isOpen={isOpen}
        onRequestClose={() => {
          setIsOpen(false);
          //If a place was not added, when closing setRemoveMarker(true)
          if (deleteLastMarker && slidingPaneView == SlidingPaneView.CreatePlaceView) {
            deleteMarker();
          }

          deleteLastMarker.current = false;


        }}
        width="70vh"
        className='info-window'
        overlayClassName='info-window'
      >
        {
          slidingPaneView == SlidingPaneView.CreatePlaceView ? <CreatePlaceWindow latitude={latitude} longitude={longitude} setNewPlace={setNewPlace}
            deleteMarker={deleteLastMarker} setIsOpen={setIsOpen} /> :
            slidingPaneView == SlidingPaneView.InfoWindowView ? <InfoWindow infoWindowData={infoWindowData} /> :
              slidingPaneView == SlidingPaneView.FriendsView ? <FriendPanel friend={friendWindowData.friend} friendPhoto={friendWindowData.friendPhoto} sharedSites={friendWindowData.sharedSites} /> :
                <div></div>
        }


      </SlidingPane>

    </>











  );


}