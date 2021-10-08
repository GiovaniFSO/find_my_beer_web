import { Fragment, useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import PubsService from './services/pubs_service';
import Pub from './components/Pub';
import NearbyPubs from './components/NearbyPubs';
import { LONGITUDE, LATITUDE } from './constants'

function App() {
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [location, setLocation] = useState([])
  const [locations, setLocations] = useState([])
  const [selected, setSelected] = useState({})

  const { REACT_APP_GOOGLE_API_KEY } = process.env

  useEffect(() =>{
    setCurrentLocation()
    if( latitude === LATITUDE && longitude === LONGITUDE) {
      alert("Will trigger Dublin location to test the app :D")
    }
  }, [location])


  async function setCurrentLocation(){
    await navigator.geolocation.getCurrentPosition(function (position){
      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)
      loadPubs()
    }, function(error){
      setLatitude(LATITUDE)
      setLongitude(LONGITUDE)
      loadPubs()
    })
  }

  async function loadPubs(){
    const response = await PubsService.index(latitude, longitude)
    setLocations(response.data.results)
    setLocation(LATITUDE, LONGITUDE)
  }

  return (
    <Fragment>
      <LoadScript googleMapsApiKey={REACT_APP_GOOGLE_API_KEY}>
        <GoogleMap mapContainerStyle={{height: "100vh", width: "100%"}}
          zoom={15} center={{lat: latitude, lng: longitude}}>
          {
            locations.map((item, index) => {
              return (
                <Marker key={index} icon="/images/beer-pin.png" title={item.name} animation="4"
                  position={{lat: item.geometry.location.lat, lng: item.geometry.location.lng}}
                  onClick={() => setSelected(item)}
                />
              )
            })
          }
          {
            selected.place_id && (
              <Pub place={ selected }/>
            )
          }
          <Marker key="my location" icon="/images/my-location-pin.png" title="Your local" animation="2"
            position={{lat: latitude, lng: longitude}}
          />

          {(latitude !== 0 && longitude !== 0) &&
            <NearbyPubs latitude={latitude} longitude={longitude} />
          }
        </GoogleMap>
      </LoadScript>
    </Fragment>
  );
}

export default App;