'use client';
import { useMemo, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import styles from './map.module.css';
import { getGeocode } from 'use-places-autocomplete';

function Map({ mapCoordinates, setMapCoordinates, setLocation }) {
  const mapRef = useRef();
  const center = useMemo(() => ({ lat: 10.491, lng: -66.902 }), []);
  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  const onLoad = useCallback((map) => (mapRef.current = map), []);

  useEffect(() => {
    mapRef.current?.panTo(mapCoordinates);
  }, [mapCoordinates]);

  const handleMapClick = (e) => {
    let lat = e.latLng.lat();
    let lng = e.latLng.lng();
    setMapCoordinates({ lat, lng });
    getGeocode({ latLng: e.latLng }).then((results) => {
      let newLocation = results[0].formatted_address;
      console.log(results[0].formatted_address);
      setLocation(newLocation);
    });
  };

  return (
    <div className={styles.mapWrapper}>
      <GoogleMap
        zoom={11}
        center={center}
        mapContainerClassName={styles.mapContainer}
        options={options}
        onLoad={onLoad}
        onClick={(e) => handleMapClick(e)}
      >
        {mapCoordinates && <Marker position={mapCoordinates} />}
      </GoogleMap>
    </div>
  );
}

export default Map;
