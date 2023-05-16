import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, GroundOverlay } from '@react-google-maps/api';
import Buttons from './../buttons/buttons';
import fetchImage from '../../utils/utils';
import { options, containerStyle, defaultZoom, center } from './map.config';

export default function Map() {

  const [opacity, setOpacity] = useState(0.9);
  const [showLayers, setShowLayers] = useState(false);
  const [layersData, setLayersData] = useState([]);

  useEffect(() => {
    fetchImage()
      .then(layersData => {
        setLayersData(layersData)
      })
  }, []);

  const buildLayers = () => {
    return layersData.map((layer, index) => {
      const coordinates = layer.coordinates.split(/[ ,]+/);
      return (
        <GroundOverlay
          key={index}
          url={layer.itemUrl}
          bounds={{
            north: Number(coordinates[3]),
            south: Number(coordinates[1]),
            east: Number(coordinates[2]),
            west: Number(coordinates[4])
          }}
          opacity={opacity}
        />
      )
    })
  }

  return (
    <LoadScript
      googleMapsApiKey=""
    >
      <Buttons setOpacity={setOpacity} opacity={opacity} setShowLayers={setShowLayers} />
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={defaultZoom}
        options={options}
      >

        {showLayers ? buildLayers() : null}

      </GoogleMap>
    </LoadScript>
  )
}