

import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    HStack,
    IconButton,
    Input,
    SkeletonText,
    Text,
  } from '@chakra-ui/react'
  import { useParams } from 'react-router-dom';
  import { FaLocationArrow, FaTimes } from 'react-icons/fa'
  import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
    TrafficLayer,
    DrawingManager
  } from '@react-google-maps/api'
  import React, { useRef, useState } from 'react'
  import { ChakraProvider, theme } from '@chakra-ui/react'
  
  const center = { lat: 53.904648, lng: 27.553198 }
  
  export default function GoogleMapFuncRoute() {
    const { original, dest } = useParams();
    const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: 'AIzaSyArnk0gU5d941ZN0lCX1sPlO6PiG_CG848',
      libraries: ['places', 'drawing'],
    })
  
    const [map, setMap] = useState(/** @type google.maps.Map */ (null))
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
  
   

    /** @type React.MutableRefObject<HTMLInputElement> */
    const originRef = useRef()
    /** @type React.MutableRefObject<HTMLInputElement> */
    const destiantionRef = useRef()

  

    if (!isLoaded) {
      return <SkeletonText />
    }
  
    async function calculateRoute() {
      if (originRef.current.value === '' || destiantionRef.current.value === '') {
        return
      }
      // eslint-disable-next-line no-undef
      const directionsService = new window.google.maps.DirectionsService()
      const results = await directionsService.route({
        origin: originRef.current.value,
        destination: destiantionRef.current.value,
        // eslint-disable-next-line no-undef
        travelMode: window.google.maps.TravelMode.DRIVING,
      })
      setDirectionsResponse(results)
      setDistance(results.routes[0].legs[0].distance.text)
      setDuration(results.routes[0].legs[0].duration.text)
    }
  
    function clearRoute() {
      setDirectionsResponse(null)
      setDistance('')
      setDuration('')
      originRef.current.value = ''
      destiantionRef.current.value = ''
    }
  


    return (

        
      <ChakraProvider theme={theme}>
      <Flex
        position='relative'
        flexDirection='column'
        alignItems='center'
       
        //h='80vh'
         //w='80vw'
      >
        <Box position='fixed' h='100%' w='100%' >
          {/* Google Map Box */}
          <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{ width: '100%', height: '100%' }}
            options={{
            
            }}
            onLoad={map => setMap(map)}
          >
            <Marker position={center} />
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
            <DrawingManager />
            <TrafficLayer />
            
          </GoogleMap>
        </Box>
      
        <Box bgColor="white" shadow="base" p={4} borderRadius="lg" zIndex="1">
          <HStack spacing={2} justifyContent='space-between'>
            <Box flexGrow={1}>
              <Autocomplete>
              <Input type='text' placeholder='Начальнй пункт' ref={originRef} defaultValue={original} />
              </Autocomplete>
            </Box>
            <Box flexGrow={1}>
              <Autocomplete>
              <Input
                type='text'
                placeholder='Конечный пункт'
                ref={destiantionRef}
                defaultValue={dest}
                />
              </Autocomplete>
            </Box>
  
            <ButtonGroup>
              <Button colorScheme='pink' type='submit' onClick={calculateRoute}>
                Построить маршрут
              </Button>
              <IconButton
                aria-label='center back'
                icon={<FaTimes />}
                onClick={clearRoute}
              />
            </ButtonGroup>
          </HStack>
          <HStack spacing={4} mt={4} justifyContent='space-between'>
            <Text>Расстояние: {distance} </Text>
            <Text>Время: {duration} </Text>
            <IconButton
              aria-label='center back'
              isRound
              icon={<FaLocationArrow />}
              onClick={() => {
                map.panTo(center)
                map.setZoom(15)
              }}
            />
          </HStack>
        </Box>
      </Flex>
    </ChakraProvider>
    )
  }
  
  