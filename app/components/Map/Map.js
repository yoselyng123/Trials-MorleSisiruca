'use client';
import { useMemo, useCallback, useRef } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
// import Places from '.places';
import styles from './map.module.css';

function Map({}) {
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

  // useEffect(() => {
  //   mapRef.current?.panTo(mapCoordinates);
  // }, [mapCoordinates]);

  const handleMapClick = (e) => {
    let lat = e.latLng.lat();
    let lng = e.latLng.lng();
    setMapCoordinates({ lat, lng });
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
        {/* {mapCoordinates && <Marker position={mapCoordinates} />} */}
      </GoogleMap>
    </div>
  );
}

export default Map;
