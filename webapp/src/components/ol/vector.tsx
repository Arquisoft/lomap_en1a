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
import { getPlaces, getPlaceDetails, getPlacesByUser } from "../../api/api";
import { useEffect } from "react";
import { FeatureLike } from "ol/Feature";
import {useGeographic} from 'ol/proj';
import { SlidingPaneView } from "../map/MapView";



var source: VectorSource = new VectorSource({
  features: undefined,
});

var lastMarker = new Feature();
var webId = "";
var currentVisibility = "";

const getMarkers = async (visibilityLevel: string) => {
  if (visibilityLevel === "") {
    await getPlacesByUser(webId).then((p) => {
      var coordinates: number[];
      for (let i = 0; i < p.length; i++) {
        coordinates = [p[i].longitude, p[i].latitude];
        var visibility = p[i].visibility;
        addMarker(coordinates, visibility);
      }
    });
  } else {
    await getPlaces(webId, visibilityLevel).then((p) => {
      var coordinates: number[];
      var visibility = visibilityLevel;
      for (let i = 0; i < p.length; i++) {
        coordinates = [p[i].longitude, p[i].latitude];
        visibility = p[i].visibility;
        addMarker(coordinates, visibility);
      }
    });
  }
}

const addMarker = (coordinate: Coordinate, visibility: string) => {

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
      color = 'rgb(230,230,250)';
      break;

    case "FULL":
      color = 'rgb(127, 127, 127)';
      break;
  }

  const style = new Style({
    image: new Icon({
      color: color,
      src: "https://docs.maptiler.com/openlayers/default-marker/marker-icon.png",
      anchor: [0.5, 0.9]
    })


  });
  featureToAdd.setStyle(style);
  source.addFeatures([featureToAdd]);
  lastMarker = featureToAdd;

}


export function deleteMarker() {
  source.removeFeature(lastMarker);
}

export function refreshMarkers(visibility?: string) {
  source.clear();
  if (typeof visibility !== 'undefined') {
    currentVisibility = visibility;
  }

  getMarkers(currentVisibility)
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
    addMarker(event.coordinate, "USER");
  };

  const onMarkerClick = async (feature: FeatureLike) => {

    let f = feature as Feature<Point>;
    props.setIsOpen(true);
    props.setSlidingPaneView(SlidingPaneView.InfoWindowView);
    let id = f.getId() as string;

    await getPlaceDetails(id).then((p) => {
      let place = p[0];
      props.setInfoWindowData({
        id: id,
        title: place.name,
        latitude: place.latitude,
        longitude: place.longitude
      });
    })

  }

  //When map is first rendered
  useEffect(() => {
    webId = props.webId;
    props.map.addLayer(layer);
    props.map.on("dblclick", onMapClick);
    props.map.on('singleclick', function (e) {
      props.map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
        //NO FUNCIONA AUN
        // onMarkerClick(feature);

      })
    });

    getMarkers(props.visibility);
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
