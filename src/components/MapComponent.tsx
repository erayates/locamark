// MapComponent.js
import React from 'react';
interface MapComponentProps {
    theme: 'light' | 'dark';
}

const MapComponent: React.FC<MapComponentProps> = ({theme}) => {
    return (
      <div style={{height:'100vh',width:'100%'}} id="map" className={`map-container ${theme}`} />
    );
}

export default MapComponent;