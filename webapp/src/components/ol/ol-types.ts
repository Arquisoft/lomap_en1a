import Map from "ol/Map";
import Feature from "ol/Feature";

export type TOpenLayersProps = {
  webId: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLatitude: React.Dispatch<React.SetStateAction<number>>;
  setLongitude: React.Dispatch<React.SetStateAction<number>>;
  setIsNew: React.Dispatch<React.SetStateAction<number>>;
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

