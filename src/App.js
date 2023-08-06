import React, { useState,useRef } from 'react'
import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer  } from '@react-google-maps/api'
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  SkeletonText,
} from '@chakra-ui/react'
import { FaTimes } from 'react-icons/fa'

const center = { lat: 48.8584, lng: 2.2945 }

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "", ///GoogleApi key
    libraries: ['places']
  })

  const [map, setMap] = useState( /** @type google.maps.Map */(null))
  const [direction, setDirection] = useState(null)
  const [distance, setDistance] = useState("")

  const originRef = useRef()
  const destinationRef = useRef()

  if (!isLoaded) {
    return <SkeletonText />
  }

  async function calculateRoute() {
    if (originRef.current.value === '' || destinationRef.current.value === '') {
      return
    }
      //es
    // eslint-disable-next-line no-undef
    const directionService = new google.maps.DirectionsService()
    const results = await directionService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING
    })
    setDirection(results)
    setDistance(results.routes[0].legs[0].distance.text)
  }

  function clearRoute() {
    setDirection(null)
    setDistance('')
    originRef.current.value = ''
    destinationRef.current.value = ''
  }

  return (
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      backgroundPosition='bottom'
      height='100vh'
      width='100vw'
    >
      <Box position='absolute' left={0} top={0} height='100%' width='100%'>
        <GoogleMap center={center} zoom={15} mapContainerStyle={{ width: '100%', height: '100%' }}
          onLoad={(map) => setMap(map)} >
          <Marker position={center} />
          {direction && <DirectionsRenderer directions={direction} />}
        </GoogleMap>
      </Box>

      <Box
        // p={4}
        // borderRadius='lg'
        // mt={4}
        // backgroundColor='white'
        // shadow='base'
        minWidth='container.md'
        zIndex='modal'
      >

        <Autocomplete>
          <input type='text' placeholder='Origin' ref={originRef} />
        </Autocomplete>
        <Autocomplete>
          <input type='text' placeholder='Destination' ref={destinationRef} />
        </Autocomplete>

        <ButtonGroup>
          <Button colorScheme='blue' type='submit' onClick={calculateRoute}>
            Magic
          </Button>
          <IconButton
            aria-label='center back'
            icon={<FaTimes />}
            onClick={clearRoute}
          />
        </ButtonGroup>

      </Box>
    </Flex>
  )
}

export default App;





