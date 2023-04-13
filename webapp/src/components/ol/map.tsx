import React from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { VectorLayerWithContext } from "./vector";
import { TOpenLayersProps, IMapContext, TMapState } from "./ol-types";
import "ol/ol.css";
import "../../App.css";
import { defaults } from 'ol/interaction';
import { transform } from "ol/proj";

export const MapContext = React.createContext<IMapContext | void>(undefined);

export class MapComponent extends React.PureComponent<TOpenLayersProps, TMapState> {
  private mapDivRef: React.RefObject<HTMLDivElement>;
  state: TMapState = {};

  constructor(props: TOpenLayersProps) {
    super(props);
    this.mapDivRef = React.createRef<HTMLDivElement>();
  }

  componentDidMount() {
    if (!this.mapDivRef.current) {
      return;
    }

    const map = new Map({
      target: this.mapDivRef.current,
      interactions : defaults({doubleClickZoom :false}),
      layers: [
        new TileLayer({
          source: new XYZ({
            url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          }),
        }),
      ],
      view: new View({
        center: transform([-5.85, 43.354], 'EPSG:4326', 'EPSG:3857'),
        zoom: 17
      }),
    });

    const mapContext: IMapContext = { map };
    this.setState({
      mapContext: mapContext,
    });
  }


  render() {
    return (
      <div  className="map" ref={this.mapDivRef}>
        {this.state.mapContext && (
          <MapContext.Provider value={this.state.mapContext}>
            <VectorLayerWithContext handleSlidingPaneView={this.props.handleSlidingPaneView} handleInfoWindowData={this.props.handleInfoWindowData}
            handleLatitude={this.props.handleLatitude} handleLongitude={this.props.handleLongitude} handleIsOpen={this.props.handleIsOpen} visibility = {this.props.visibility}/>
          </MapContext.Provider>
        )}
      </div>
    );
  }
}
