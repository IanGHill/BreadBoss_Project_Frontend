import React from 'react';
import './ImageComponent.css';

const ImageComponent = (props) => {
  console.log(props);
    return (
      <img id="recipe-image" className="recipe-image" src={'./images/' + props.url} alt={props.url}/>
    );
  }

export default ImageComponent;