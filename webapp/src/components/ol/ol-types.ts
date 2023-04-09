import Map from "ol/Map";
import Feature from "ol/Feature";

export type TOpenLayersProps = {
  visibility: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLatitude: React.Dispatch<React.SetStateAction<number>>;
  setLongitude: React.Dispatch<React.SetStateAction<number>>;
  setSlidingPaneView: React.Dispatch<React.SetStateAction<number>>;
  setInfoWindowData: React.Dispatch<React.SetStateAction<{
    id: string; //The ID of the place to show
    title: string; //The name of the place to show
    latitude: number;
    longitude: number;

  }>>
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
