import React, { useState } from "react";
import { MapBrowserEvent } from "ol";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import Style from "ol/style/Style";
import { MapContext } from "../../map";
import { IMapContext } from "../../map-types";
import { TVectorLayerProps, TVectorLayerComponentProps } from "./vector-types";
import { Geometry } from 'ol/geom';
import Icon from "ol/style/Icon";
import { Coordinate } from "ol/coordinate";
import { getPlaceDetails, getPlaces, getPlacesByUser } from "../../../../../api/api";
import { useEffect } from "react";
import { FeatureLike } from "ol/Feature";

/*class VectorLayerComponent extends React.PureComponent<TVectorLayerComponentProps> {

  source: VectorSource=new VectorSource({
    features: undefined,
  });

  layer: VectorLayer<VectorSource<Geometry>> = new VectorLayer({
    source: this.source,
  });

  places:Place[]=[];

  lastMarker: Feature<Point>= new Feature({
    geometry: new Point([0,0]),
  });


  removeMarker(){
    this.source.removeFeature(this.lastMarker)
  }


  addMarker(coordinate: Coordinate){
    const featureToAdd = new Feature({
      geometry: new Point(coordinate),
    });
    const style = new Style({
      image: new Icon({
        src:"https://docs.maptiler.com/openlayers/default-marker/marker-icon.png",
        anchor:[0.5,0]
      })

    });
    featureToAdd.setStyle(style);    
    this.source.addFeatures([featureToAdd]);
    this.lastMarker = featureToAdd;

  }


  async getMarkers(){
    await getPlacesByUser(this.props.webId).then((p)=>{
      var coordinates:number[];
      for(let i = 0;i<p.length;i++){
         coordinates= [p[i].longitude,p[i].latitude];
         this.addMarker(coordinates);
  
      }

    });
  }

  componentDidUpdate(prevProps: Readonly<TVectorLayerComponentProps>, prevState: Readonly<{}>, snapshot?: any): void {
    alert("hola")
    if(this.props.removeMarker){
      this.removeMarker();
    }
  }




  componentDidMount() {
    //Igual estas inicializaciones no hacen falta ya
    this.source = new VectorSource({
      features: undefined,
    });

    this.layer = new VectorLayer({
      source: this.source,
    });

    this.props.map.addLayer(this.layer);
    this.props.map.on("singleclick", this.onMapClick);
    this.getMarkers();


  
  }



   

  


  

  onMapClick = (event: MapBrowserEvent<UIEvent>) => {

    this.props.setIsNew(true);
    this.props.setIsOpen(true);

    this.props.setLatitude(event.coordinate[1]);
    this.props.setLongitude(event.coordinate[0]);
    this.addMarker(event.coordinate);

  };

  render() {
    return null;
  }
}*/

var source: VectorSource=new VectorSource({
  features: undefined,
});

var lastMarker = new Feature();
var webId = "";

const getMarkers=async (visibilityLevel: string) =>{
  if (visibilityLevel === "") {
    await getPlacesByUser(webId).then((p)=>{
      var coordinates:number[];
      for(let i = 0;i<p.length;i++){
        coordinates= [p[i].longitude,p[i].latitude];
        var visibility=p[i].visibility;
        addMarker(coordinates, visibility);
      }
    });
  } else {
    await getPlaces(webId, visibilityLevel).then((p)=>{
      var coordinates:number[];
      var visibility = visibilityLevel;
      for(let i = 0;i<p.length;i++){
        coordinates= [p[i].longitude,p[i].latitude];
        visibility=p[i].visibility;
        addMarker(coordinates, visibility);
      }
    });
  }
}

const addMarker= (coordinate: Coordinate, visibility: string)=>{

  const featureToAdd = new Feature({
    geometry: new Point(coordinate),
    name: "feature"
  });

  var color;

  switch (visibility) {
    case "USER":
      color = 'rgb(255, 0, 0)';
      break;
    
    case "GROUP":
      color = 'rgb(0, 255, 0)';
      break;

    case "FRIENDS":
      color = 'rgb(0, 0, 255)';
      break;
    
    case "FULL":
      color = 'rgb(127, 127, 127)';
      break;
  }

  const style = new Style({
    image: new Icon({
      color: color,
      src:"https://docs.maptiler.com/openlayers/default-marker/marker-icon.png",
      anchor:[0.5,0]
    })
  

  });
  featureToAdd.setStyle(style);   
  source.addFeatures([featureToAdd]);
  //featureToAdd.setId();
  lastMarker = featureToAdd;

}


export function deleteMarker(){
  source.removeFeature(lastMarker);
}

export function refreshMarkers(visibility: string) {
  while (source.getFeatures().length > 0) {
    var pos = source.getFeatures().length - 1;
    source.removeFeature(source.getFeatures()[pos]);
  }

  getMarkers(visibility)
}

function Vector(props:TVectorLayerComponentProps){


  let layer: VectorLayer<VectorSource<Geometry>> = new VectorLayer({
    source: source,
  });


  const onMapClick = (event: MapBrowserEvent<UIEvent>) => {

    props.setIsNew(true);
    props.setIsOpen(true);

    props.setLatitude(event.coordinate[1]);
    props.setLongitude(event.coordinate[0]);
    addMarker(event.coordinate, "USER");
  };




  

  const onMarkerClick=async(feature:FeatureLike)=>{
                
    let f =feature as Feature<Point>;
    props.setIsOpen(true);
    props.setIsNew(false);
    let id = f.getId() as string;

    await getPlaceDetails(id).then((p)=>{
      let place = p[0];
      props.setInfoWindowData({
        id:id,
        title:place.name,
        latitude: place.latitude,
        longitude:place.longitude
      });
    })

  }

  




  //When map is first rendered
  useEffect(()=>{
        webId = props.webId;   
        props.map.addLayer(layer);
        props.map.on("dblclick", onMapClick);
        props.map.on('singleclick', function (e) {  
          props.map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
            //NO FUNCIONA AUN
           // onMarkerClick(feature);
            
          })
        });

      
        getMarkers(props.visibility.value);
        

  },[])

  


  return null;
  

  
}

export const VectorLayerWithContext = (props: TVectorLayerProps) => {
 // console.log(props);
  return (
    <MapContext.Consumer>
      {(mapContext: IMapContext | void) => {
        if (mapContext) {
          //console.log(mapContext);
          return <Vector {...props} map={mapContext.map} />;
        }
      }}
    </MapContext.Consumer>
  );
};
