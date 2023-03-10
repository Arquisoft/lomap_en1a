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
import { Place } from "../../../../../domain/Place";
import { useSession } from "@inrupt/solid-ui-react";
import { getPlacesByUser } from "../../../../../api/api";

class VectorLayerComponent extends React.PureComponent<TVectorLayerComponentProps> {

  source: VectorSource=new VectorSource({
    features: undefined,
  });

  layer: VectorLayer<VectorSource<Geometry>> = new VectorLayer({
    source: this.source,
  });

  places:Place[]=[];


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



   

  
  /*
  componentWillUnmount() {
    this.props.map.removeLayer(this.layer);
  }

  componentDidUpdate(prevProps: TVectorLayerComponentProps) {
    if (prevProps.features != this.props.features) {
      this.source.clear();
      if (this.props.features) {
        this.source.addFeatures(this.props.features);
      }
    }
  }
  */

  

  onMapClick = (event: MapBrowserEvent<UIEvent>) => {

    this.props.setIsNew(true);
    this.props.setIsOpen(true);

    this.props.setLatitude(event.coordinate[1]);
    this.props.setLongitude(event.coordinate[0]);
    this.addMarker(event.coordinate);
    /*
    const featureToAdd = new Feature({
      geometry: new Point(event.coordinate),
    });
    const style = new Style({
      image: new Icon({
        src:"https://docs.maptiler.com/openlayers/default-marker/marker-icon.png",
        anchor:[0.5,0]
      })
      /*
        image: new Circle({
        radius: 6,
        fill: new Fill({color: 'red'}),
        stroke: new Stroke({
          color: [0,0,0], width: 2
        })
      */
    /*});
    featureToAdd.setStyle(style);    
    this.source.addFeatures([featureToAdd]);*/
  };

  render() {
    return null;
  }
}

export const VectorLayerWithContext = (props: TVectorLayerProps) => {
 // console.log(props);
  return (
    <MapContext.Consumer>
      {(mapContext: IMapContext | void) => {
        if (mapContext) {
          //console.log(mapContext);
          return <VectorLayerComponent {...props} map={mapContext.map} />;
        }
      }}
    </MapContext.Consumer>
  );
};
