import React, { useState, useEffect } from 'react';

function LocationSearch(props) {
  const [location, setLocation] = useState('');
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    // Create a function to initialize the autocomplete
    function initAutocomplete() {
      const input = document.getElementById('autocomplete-input');
      const options = {
        types: ['(cities)'], // Limit predictions to cities
      };
      const autocomplete = new window.google.maps.places.Autocomplete(input, options);

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        setLocation(place.formatted_address);
        props.onLocationChange({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
        setPredictions([]); // Clear predictions
      });
    }

    // Ensure the API is loaded
    if (window.google) {
      initAutocomplete();
    } else {
      // If the API is not loaded yet, listen for the 'load' event
      window.addEventListener('google-api-load', initAutocomplete);
    }
  }, [props]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setLocation(inputValue);

    // Check if the input is not empty before fetching predictions
    if (inputValue.trim() !== '') {
      const service = new window.google.maps.places.AutocompleteService();
      service.getPlacePredictions(
        { input: inputValue, types: ['(cities)'] },
        (predictions) => {
          setPredictions(predictions || []);
        }
      );
    } else {
      // If the input is empty, clear predictions
      setPredictions([]);
    }
  };

  return (
    <div className="relative w-full">
      <input
        id="autocomplete-input"
        placeholder="Enter location (e.g., city name)"
        value={location}
        onChange={handleInputChange}
        className="input-field"
        style={{ fontSize: '1.5rem' }}
      />
      {predictions.length > 0 && (
        <div className="autocomplete-predictions">
          {predictions.map((prediction) => (
            <div
              key={prediction.place_id}
              onClick={() => {
                setLocation(prediction.description);
                setPredictions([]);
              }}
            >
              {prediction.description}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LocationSearch;
