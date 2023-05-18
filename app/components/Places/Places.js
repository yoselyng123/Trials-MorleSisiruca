import usePlacesAutoComplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import styles from './places.module.css';
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';

function Places({ setLocation, setMapCoordinates }) {
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
    setUbication(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      setValue(description, false);
      setUbication(description);
      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        console.log('📍 Coordinates: ', { lat, lng });
        setMapCoordinates({ lat, lng });
      });
    };

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
    <div ref={ref}>
      <div className={styles.searchBarWrapper}>
        <input
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Enter your company's location"
          className={styles.searchBar}
        />

        {value !== '' ? (
          <AiOutlineClose
            size={20}
            onClick={() => {
              clearSuggestions();
              setUbication('');
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
