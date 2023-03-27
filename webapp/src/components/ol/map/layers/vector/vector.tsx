import React from "react";
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
import { getPlacesByUser } from "../../../../../api/api";
import { useEffect } from "react";
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

var counter = 0;
var lastMarker = 0;


export function deleteMarker(){
  let marker = source.getFeatureById(lastMarker);
  source.removeFeature(marker as Feature<Geometry>);
}

function Vector(props:TVectorLayerComponentProps){

  let layer: VectorLayer<VectorSource<Geometry>> = new VectorLayer({
    source: source,
  });

  const addMarker= (coordinate: Coordinate)=>{
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
    source.addFeatures([featureToAdd]);
    featureToAdd.setId(counter);
    lastMarker = counter;
    counter++;

  }

  const onMapClick = (event: MapBrowserEvent<UIEvent>) => {

    props.setIsNew(true);
    props.setIsOpen(true);

    props.setLatitude(event.coordinate[1]);
    props.setLongitude(event.coordinate[0]);
    addMarker(event.coordinate);
  

  };




  const getMarkers=async() =>{
    await getPlacesByUser(props.webId).then((p)=>{
      var coordinates:number[];
      for(let i = 0;i<p.length;i++){
         coordinates= [p[i].longitude,p[i].latitude];
         addMarker(coordinates);
      }
      

    });
  }
  




  //When map is first rendered
  useEffect(()=>{    
        props.map.addLayer(layer);
        props.map.on("singleclick", onMapClick);
        getMarkers();
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
