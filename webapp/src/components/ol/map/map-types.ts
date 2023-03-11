import Map from "ol/Map";

export type TMapProps = {
  setLatitude:React.Dispatch<React.SetStateAction<number>>;
  setLongitude:React.Dispatch<React.SetStateAction<number>>;
  setIsNew:React.Dispatch<React.SetStateAction<boolean>>;
  setInfoWindowData:React.Dispatch<React.SetStateAction<{
    isOpen: boolean; //If the info window is open or not
    id:string; //The ID of the place to show
    title: string; //The name of the place to show
    latitude: number;
    longitude:number;

}>>
};

export type TMapState = {
  mapContext?: IMapContext;
};

export interface IMapContext {
  map: Map;
}
