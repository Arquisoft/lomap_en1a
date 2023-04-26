import Map from "ol/Map";
import Feature from "ol/Feature";
import { InfoWindowDataType } from "../map/MapView";

export type TOpenLayersProps = {
  visibility: string;
  handleIsOpen: (value: boolean) => Promise<void>,
  handleLatitude: (value: number) => Promise<void>,
  handleLongitude: (value: number) => Promise<void>,
  handleSlidingPaneView: (value: number) => Promise<void>,
  handleInfoWindowData: (value: InfoWindowDataType) => Promise<void>
  handleIsLoading: (value: boolean) => Promise<void>,
  isLoading: boolean
};

export type TVectorLayerComponentProps = TOpenLayersProps & {
  map: Map;
  features?: Feature[];
};



export type TMapState = {
  mapContext?: IMapContext;
};

export interface IMapContext {
  map: Map;
}

