import React, { useState, useEffect } from 'react';

function LocationSelector() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await fetch('https://crio-location-selector.onrender.com/countries');
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    }
    fetchCountries();
  }, []);

  async function fetchStates(countryName) {
    try {
      const response = await fetch(`https://crio-location-selector.onrender.com/country=${countryName}/states`);
      const data = await response.json();
      setStates(data);
    } catch (error) {
      console.error(`Error fetching states for ${countryName}:`, error);
    }
  }

  async function fetchCities(countryName, stateName) {
    try {
      const response = await fetch(`https://crio-location-selector.onrender.com/country=${countryName}/state=${stateName}/cities`);
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error(`Error fetching cities for ${stateName}, ${countryName}:`, error);
    }
  }

  function handleCountryChange(e) {
    const countryName = e.target.value;
    setSelectedCountry(countryName);
    setSelectedState('');
    setSelectedCity('');
    fetchStates(countryName);
  }

  function handleStateChange(e) {
    const stateName = e.target.value;
    setSelectedState(stateName);
    setSelectedCity('');
    fetchCities(selectedCountry, stateName);
  }

  function handleCityChange(e) {
    const cityName = e.target.value;
    setSelectedCity(cityName);
  }

  return (
    <div>
      <select value={selectedCountry} onChange={handleCountryChange}>
        <option value="">Select Country</option>
        {countries.map(country => (
          <option key={country} value={country}>{country}</option>
        ))}
      </select>
      <select value={selectedState} onChange={handleStateChange} disabled={!selectedCountry}>
        <option value="">Select State</option>
        {states.map(state => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>
      <select value={selectedCity} onChange={handleCityChange} disabled={!selectedState || !selectedCountry}>
        <option value="">Select City</option>
        {cities.map(city => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
      <div>
        {selectedCity && (
          <p>You Selected {selectedCity}, {selectedState}, {selectedCountry}</p>
        )}
      </div>
    </div>
  );
}

export default LocationSelector;
