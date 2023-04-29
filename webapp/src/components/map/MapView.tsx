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
import LoadingSpinner from '../LoadingSpinner';
import { Category } from '../../domain/Category';



export enum SlidingPaneView {
  InfoWindowView = 0,
  CreatePlaceView,
  FriendsView
}

export type FriendWindowDataType={
  friend:User,
  friendPhoto:string,
  sharedSites:any
}

export type InfoWindowDataType={
  title: string,
  creator: string,
  category:Category,
  id: string,
  latitude: number,
  longitude: number,
  description:string
}


export default function MapView(): JSX.Element {

  const deleteLastMarker = useRef(false);//To control when to remove a marker from the map automatically


  //These useState is used to monitor useEffect hooks; they just increment to detect change when needed
  //FIXME
  const [newPlace, setNewPlace] = useState(0);


  //Hooks
  const [isOpen, setIsOpen] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [visibility, setVisibility] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [slidingPaneView, setSlidingPaneView] = useState(0);
  const [infoWindowData, setInfoWindowData] = useState<InfoWindowDataType>({
    title: "",
    creator: "",
    category: Category.BAR,
    id: "",
    latitude: 0,
    longitude: 0,
    description:""
  });
  const [friendWindowData, setFriendWindowData] = useState<FriendWindowDataType>({
    friend: new User("", ""),
    friendPhoto: "",
    sharedSites: []
  });


  //Handlers
  const handleFriendWindowData = async (value:FriendWindowDataType) => {
    setFriendWindowData(value);
  }
  const handleInfoWindowData = async (value:InfoWindowDataType) => {
    setInfoWindowData(value);
  }
  const handleSlidingPaneView = async (value:number) => {
    setSlidingPaneView(value);
  }

  const handleLatitude = async (value:number) => {
    setLatitude(value);
  }

  const handleLongitude = async (value:number) => {
    setLongitude(value);
  }
  const handleIsOpen = async (value:boolean) => {
    setIsOpen(value);
  }

  const handleNewPlace = async () => {
    setNewPlace(n => n + 1);
  }

  const handleDeleteMarker = async (value:boolean) => {
    deleteLastMarker.current=value;
  }

  const handleIsLoading = async (value:boolean,message?:string) => {
    setIsLoading(value);
    if(message){
      setLoadingMessage(message);
    }
    

  }






  window.addEventListener( "popstate", function ( event ) {
    window.location.reload();
  });

  return (

    <>
      <div className='map-view'>
        <div className='side-bar'>
          <ProSidebarProvider>
            <MySideBar handleFriendWindowData={handleFriendWindowData} handleInfoWindowData ={handleInfoWindowData } handleSlidingPaneView={handleSlidingPaneView}
              visibility={visibility} handleIsOpen={handleIsOpen} newPlace={newPlace} />
          </ProSidebarProvider>
        </div>

        <div className='filter-list'>
          <FilterList visibility={visibility} setVisibility={setVisibility} />
        </div>


        <MapComponent handleSlidingPaneView={handleSlidingPaneView} handleInfoWindowData={handleInfoWindowData}
          handleLatitude={handleLatitude} handleLongitude={handleLongitude} handleIsOpen={handleIsOpen} visibility={visibility} />

      </div>




      <SlidingPane
        title= {isLoading ? <LoadingSpinner message={loadingMessage} />:<></>}
        isOpen={isOpen}
        onRequestClose={() => {
          setIsOpen(false);
          //If a place was not added, when closing setRemoveMarker(true)
          if (deleteLastMarker && slidingPaneView === SlidingPaneView.CreatePlaceView) {
            deleteMarker();
          }

          deleteLastMarker.current = false;


        }}
        width="85vh"
        className='info-window'
        overlayClassName='info-window'
      >
        {
          slidingPaneView === SlidingPaneView.CreatePlaceView ? <CreatePlaceWindow latitude={latitude} longitude={longitude} handleNewPlace={handleNewPlace}
          handleDeleteMarker ={handleDeleteMarker } handleIsOpen={handleIsOpen} /> :
            slidingPaneView === SlidingPaneView.InfoWindowView ? <InfoWindow infoWindowData={infoWindowData} handleIsLoading={handleIsLoading} isLoading={isLoading}/> :
              slidingPaneView === SlidingPaneView.FriendsView ? <FriendPanel friend={friendWindowData.friend} friendPhoto={friendWindowData.friendPhoto} sharedSites={friendWindowData.sharedSites} /> :
                <div></div>
        }


      </SlidingPane>

    </>


  );


}