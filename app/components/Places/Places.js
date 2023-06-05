import usePlacesAutoComplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import styles from './places.module.css';
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import { useEffect } from 'react';

function Places({ setLocation, setMapCoordinates, location }) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutoComplete();

  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    clearSuggestions();
  });

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
    setLocation(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      setValue(description, false);
      setLocation(description);
      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        console.log(results[0].formatted_address);
        console.log('📍 Coordinates: ', { lat, lng });
        setMapCoordinates({ lat, lng });
      });
      clearSuggestions();
    };

  useEffect(() => {
    if (location !== '') {
      getGeocode({ address: location }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        console.log(results[0].formatted_address);
        console.log('📍 Coordinates: ', { lat, lng });
        setMapCoordinates({ lat, lng });
      });
    }
  }, []);

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <div
          key={place_id}
          onClick={handleSelect(suggestion)}
          className={styles.searchResult}
        >
          <p>
            {main_text} {secondary_text}
          </p>
        </div>
      );
    });
  return (
    <div ref={ref} className={styles.container}>
      <div className={styles.searchBarWrapper}>
        <input
          value={location}
          onChange={handleInput}
          disabled={!ready}
          placeholder='Enter your location'
          className={styles.searchBar}
        />

        {location !== '' ? (
          <AiOutlineClose
            size={20}
            onClick={() => {
              clearSuggestions();
              setLocation('');
              setValue('');
            }}
          />
        ) : (
          <AiOutlineSearch size={22} />
        )}
      </div>

      {status === 'OK' && (
        <div className={styles.searchResultsWrapper}>{renderSuggestions()}</div>
      )}
    </div>
  );
}

export default Places;
