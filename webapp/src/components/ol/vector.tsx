import React from "react";
import { MapBrowserEvent } from "ol";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import Style from "ol/style/Style";
import { MapContext } from "./map";
import { TOpenLayersProps, TVectorLayerComponentProps, IMapContext } from "./ol-types";
import { Geometry } from 'ol/geom';
import Icon from "ol/style/Icon";
import { Coordinate } from "ol/coordinate";
import { getPublicPlacesByUser, getPrivatePlacesByUser, getSharedPlacesByUser,getSharedPlacesByFriends } from "../../api/api";
import { useEffect } from "react";
import { FeatureLike } from "ol/Feature";
import { useGeographic } from 'ol/proj';
import { SlidingPaneView } from "../map/MapView";
import { Place } from "../../domain/Place";



//Global variables---------------------------------
var source: VectorSource = new VectorSource({
  features: undefined,
});
export var displayMap = new Map();
var lastMarker = new Feature();
var currVisibility = "";

//List of all places added to the map
var places:Place[];
places = [];
//-------------------------------------------------



//Adds all the places given in the array to the map
const addAllMarkers=(p:Place[])=>{
  var coordinates: number[];
  for (let i = 0; i < p.length; i++) {
    places.push(p[i])
    coordinates = [p[i].longitude, p[i].latitude];
    var visibility = p[i].visibility;
    addMarker(coordinates, visibility,p[i].id);
  }
}

//Adds all public places to the map
const addPublicPlaces = async()=>{
  getPublicPlacesByUser().then((p) => {
    addAllMarkers(p);
  });
}

//Adds all private places to the map
const addPrivatePlaces = async()=>{
  getPrivatePlacesByUser().then((p) => {
    addAllMarkers(p);
  });
}

//Adds all shared places to the map
const addSharedPlaces = async()=>{
  getSharedPlacesByUser().then((p) => {
    addAllMarkers(p);
  });
}

//Adds all places to the map
const getMarkers = async () => {
    addPublicPlaces();
    addPrivatePlaces();
    addSharedPlaces();

}

//Adds a marker to the map
const addMarker = (coordinate: Coordinate, visibility: string,id:string, isNew?: boolean, isFriend?: boolean) => {

  const featureToAdd = new Feature({
    geometry: new Point(coordinate),
    name: "feature"
  });

  var color;

  switch (visibility) {
    case "public":
      color = 'rgb(255, 0, 0)';
      break;
    case "friends":
      color = 'rgb(230, 120, 110)';
      break;
    case "private":
      color = 'rgb(127, 127, 127)';
      break;
  }
  const style = new Style({
    image: new Icon({
      color: color,
      src: "https://docs.maptiler.com/openlayers/default-marker/marker-icon.png",
      anchor: [0.5, 1]
    })
  });
  featureToAdd.setStyle(style);
  featureToAdd.setId(id);

  var markerVisibility = visibility.toUpperCase()

  if (!isFriend) {
    if (isNew || checkVisibility(markerVisibility)) {
      source.addFeatures([featureToAdd]);
      lastMarker = featureToAdd;
    }
  } else {
    if (displayMap.get(id) && checkVisibility(markerVisibility)) {
      source.addFeatures([featureToAdd]);
      lastMarker = featureToAdd;
    }
  }
}


const checkVisibility = (visibility:string) => {

  if (typeof currVisibility !== undefined) {
    if (currVisibility && visibility !== currVisibility) {
      return false;
    }
  }

  return true;
}

export function addFriendMarkerById(id: string) {
  getSharedPlacesByFriends().then((p) => {
    var coordinates: number[];
    for (let i = 0; i < p.length; i++) {
      if (p[i].id === id) {
        places.push(p[i])
        coordinates = [p[i].longitude, p[i].latitude];
        var visibility = p[i].visibility;
        addMarker(coordinates, visibility,p[i].id, false, true);
      }
    }
  });
}

//Deletes a marker given its ID
export function deleteMarkerById(id: string) {
  var sourceFeatures = source.getFeatures()
  var markerToDelete=sourceFeatures.find(marker=>marker.getId()===id)
  if(markerToDelete !== undefined){
    source.removeFeature(markerToDelete);
  }

}

//Updates the map list 
export function updateMapList(place:Place){
  lastMarker.setId(place.id)//The id for the last marker is added
  places.push(place);
}

//Deletes the last marker
export function deleteMarker() {
  source.removeFeature(lastMarker);
}

//Changes the colour of the last marker given its visibility
export function changeMarkerColour(visibility:string){
 
  var color;

  switch (visibility) {
    case "public":
      color = 'rgb(255, 0, 0)';
      break;
    case "friends":
      color = 'rgb(230, 120, 110)';
      break;
    case "private":
      color = 'rgb(127, 127, 127)';
      break;
  }
  const style = new Style({
    image: new Icon({
      color: color,
      src: "https://docs.maptiler.com/openlayers/default-marker/marker-icon.png",
      anchor: [0.5, 1]
    })
  });
  lastMarker.setStyle(style);


}

export async function refreshMarkers(visibility: string) {
  source.clear();
  currVisibility = visibility;

  switch (visibility) {
    case "PUBLIC":
      addPublicPlaces();
      break;

    case "FRIENDS":
      addSharedPlaces();
      break;

    case "PRIVATE":
      addPrivatePlaces();
      break;

     default:
      getMarkers();
      break;
  }

}

function Vector(props: TVectorLayerComponentProps) {
  useGeographic();


  let layer: VectorLayer<VectorSource<Geometry>> = new VectorLayer({
    source: source,
  });


  const onMapClick = (event: MapBrowserEvent<UIEvent>) => {
    props.setSlidingPaneView(SlidingPaneView.CreatePlaceView);
    props.setIsOpen(true);

    props.setLatitude(event.coordinate[1]);
    props.setLongitude(event.coordinate[0]);
    addMarker(event.coordinate, "public", "",true); //The new marker still has no id
  };

  const findPlace=(id:String)=>{
    return places.find(p => p.id===id);
  }

  const onMarkerClick = async (feature: FeatureLike) => {

    let f = feature as Feature<Point>;
    let id = f.getId() as string;
    var place = findPlace(id);
    place = place as Place;
    props.setInfoWindowData({
      title: place.name,
      id: place.id,
      latitude: place.latitude,
      longitude: place.longitude
    });
    props.setIsOpen(true);
    props.setSlidingPaneView(SlidingPaneView.InfoWindowView);




  }

  //When map is first rendered
  useEffect(() => {
    props.map.addLayer(layer);
    props.map.on("dblclick", onMapClick);
    props.map.on('singleclick', function (e) {
      props.map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
        onMarkerClick(feature);

      })
    });

    getMarkers();
  }, [])

  return null;
}

export const VectorLayerWithContext = (props: TOpenLayersProps) => {
  return (
    <MapContext.Consumer>
      {(mapContext: IMapContext | void) => {
        if (mapContext) {
          return <Vector {...props} map={mapContext.map} />;
        }
      }}
    </MapContext.Consumer>
  );
};
