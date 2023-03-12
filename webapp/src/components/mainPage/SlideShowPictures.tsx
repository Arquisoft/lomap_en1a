import React from "react";

import list from "../map/InfoWindow";
import setList from "../map/InfoWindow";
import { Picture } from "../../domain/Picture";
import { addPicture } from '../../api/api';

const delay = 2500;

type PictureListProps = {
    pictures: Picture[];
}


export default function SlideshowPictures(props: PictureListProps): JSX.Element {
    const [index, setIndex] = React.useState(0);
    const timer: ReturnType<typeof setTimeout> = setTimeout(() => '', 0);
    const timeoutRef = React.useRef(timer);
  

    function resetTimeout() {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  
    React.useEffect(() => {
      resetTimeout();
      timeoutRef.current = setTimeout(
        () =>
          setIndex((prevIndex) =>
            prevIndex === props.pictures.length - 1 ? 0 : prevIndex + 1
          ),
        delay
      );
  
      return () => {
        resetTimeout();
      };
    }, [index]);
  
    return (
        <div className="slideshow">
            <div
                className="slideshowSlider"
                style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
            >
            {props.pictures.map((image, index) => (
                <div
                className="slide"
                key={index}
                style={{ 
                    backgroundImage: `url(${image.getUrl()})`,  //AQUI ALGO HACE QUE SALTE AVISO EN EL NAVEGADOR
                    /*maxWidth: '100%', 
                    maxHeight: 350, 
                    width: 'auto', 
                    height: 'auto',*/
                    }}
                ></div>
          ))}
        </div>
  
        <div className="slideshowDots">
          {props.pictures.map((_, idx) => (
            <div
              key={idx}
              className={`slideshowDot${index === idx ? " active" : ""}`}
              onClick={() => {
                setIndex(idx);
              }}
            ></div>
          ))}
        </div>
      </div>
    );
  }
