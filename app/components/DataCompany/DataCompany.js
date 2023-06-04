import { useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import Places from '../Places/Places';
import Map from '../Map/Map';

function DataCompany({
  name,
  setName,
  webUrl,
  setWebUrl,
  location,
  setLocation,
}) {
  const [libraries] = useState(['places']);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    libraries,
  });

  const [mapCoordinates, setMapCoordinates] = useState({});

  return (
    <div>
      <InputBox
        value={name}
        setValue={setName}
        placeholder='Enter the name of the company'
        label='Company Name'
      />
      <InputBox
        value={webUrl}
        setValue={setWebUrl}
        placeholder='Enter the web url of the company'
        label='Web Url'
      />
      <InputBox
        value={location}
        setValue={setLocation}
        placeholder='Enter the location of the company'
        label='Location'
      />
      {isLoaded && (
        <>
          <Places
            setLocation={setLocation}
            setMapCoordinates={setMapCoordinates}
            location={location}
          />
          <Map
            mapCoordinates={mapCoordinates}
            setMapCoordinates={setMapCoordinates}
            setLocation={setLocation}
          />
        </>
      )}
    </div>
  );
}

export default DataCompany;
