import './App.css';
import { useJsApiLoader, GoogleMap, Marker, Autocomplete,DirectionsRenderer} from '@react-google-maps/api';
import { useRef, useState } from 'react';

const center = { lat: 23.16914528880484, lng: 77.41922136083194 }

function App() {
  const [map, setMap] = useState(/**@type google.maps.map */(null))
  const[directionsResponse,setDirectionResponse]=useState(null)
  const[distance,setDistance]=useState('')

  const originRef=useRef()
  const destinationRef=useRef()

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "", ///googleApikey 
    libraries: ['places']
  })
  if (!isLoaded) {
    return <h1>Loading....</h1>

  }
  async function calculateRoute(){
    if(originRef.current.value==='' || destinationRef.current.value===''){
      return
    }
    //es
    // eslint-disable-next-line no-undef
    const directionService=new google.maps.DirectionsService()
    const results=await directionService.route({
      origin:originRef.current.value,
      destination:destinationRef.current.value,
      
      // eslint-disable-next-line no-undef
      travelMode:google.maps.TravelMode.DRIVING
    })
    setDirectionResponse(results)
    setDistance(results.routes[0].legs[0].distance.text);
  }
  function clearRoute(){
   window.location.reload();
    
   
  }

  return (
    <div className="App" style={{ display: "flex", flexDirection: 'column', gap: '20px', justifyContent: "center", alignItems: 'center', height: "100vh" }}>
      <div style={{ display: "flex", gap: '10px' }}>
        <div>
          <label>Origin</label>
          <Autocomplete>
            <input type='text' ref={originRef} />
          </Autocomplete>

        </div>
        <div>
          <label>Destination</label>
          <Autocomplete>
            <input type='text' ref={destinationRef} />
          </Autocomplete>


        </div>
        <div>
          <button onClick={()=>calculateRoute()} >GO</button>
        </div>
        <div>
          <button onClick={() => clearRoute()}>Reset</button>
        </div>
      </div>
      <h3>Distance:{distance}</h3>
      {/* ////////MAP//////// */}
      <div style={{ height: '500px', width: "500px", backgroundColor: 'red' }} >
        <GoogleMap center={center} zoom={4} mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            fullscreenControl: false
          }}
          onLoad={(map) => setMap(map)}
        >
         
          {
            directionsResponse && <DirectionsRenderer directions={directionsResponse}/>
          }
        </GoogleMap>
      </div>
    </div>
  );
}

export default App;
