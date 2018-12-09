import React from 'react'
import { compose, withProps, withHandlers, lifecycle } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel"

import Utils from '../utils/Utils'

const GOOGLE_MAPS_API_KEY = 'AIzaSyAKZLRtD8MZsqkyFu0HvWtY3axr-QyG-vI'

const defaultLat = 51.512970
const defaultLon = -0.117316

const expensiveColor = [255, 107, 129]
const thriftyColor = [123, 237, 159]

const SpanMap = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100vh`, width: `100vw` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  withHandlers(() => {
    let map
    return {
      onRef: () => (ref) => (map = ref),
      scrollMap: ({ intersections }) => () => {
        const bounds = new window.google.maps.LatLngBounds()
        intersections.map((intersection, i) => {
          bounds.extend(new window.google.maps.LatLng(
            intersection.lat,
            intersection.lng
          ))
        })
        map.fitBounds(bounds)
      }
    }
  }),
  lifecycle({
      componentDidUpdate(){
        this.props.scrollMap()
      }
  })
)((props) =>
  <GoogleMap
    ref={props.onRef}
    defaultZoom={8}
    defaultCenter={{ lat: defaultLat, lng: defaultLon }}
    defaultOptions={{
      streetViewControl: false,
      scaleControl: false,
      mapTypeControl: false,
      panControl: false,
      zoomControl: false,
      rotateControl: false,
      fullscreenControl: false
    }}
    disableDefaultUI
  >
    <React.Fragment>
      {
        props.coordinates ? (
          <React.Fragment>
            <Marker
              position={{
                lat: Number.parseFloat(props.coordinates.a.lat),
                lng: Number.parseFloat(props.coordinates.a.lng)
              }}
              icon='https://i.imgur.com/OnyW4Pi.png'
            />
            <Marker
              position={{
                lat: Number.parseFloat(props.coordinates.b.lat),
                lng: Number.parseFloat(props.coordinates.b.lng)
              }}
              icon='https://i.imgur.com/1vEqG44.png'
            />
          </React.Fragment>
        ) : null
      }
      {
        props.intersections.map(({ lat, lng, priceA, priceB, totalPrice, id, name }, i) => (
          <MarkerWithLabel
            key={id}
            labelAnchor={{ x: 45, y: 12.5 }}
            position={{ lat, lng }}
            icon='https://i.imgur.com/q8EvJnO.png'
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                backgroundColor: Utils.pickHex(expensiveColor, thriftyColor, i / (props.intersections.length - 1) ),
                width: 90,
                height: 25,
                color: '#000',
                border: '1px solid #636e72',
                borderRadius: 10
              }}
              >
                <div style={{fontWeight: 300}}>{name}</div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    marginTop: 5,
                    width: '100%'
                  }
                }>
                  <span style={{ backgroundColor: '#ff7675', padding: '3px', border: '1px solid black' }}>£{priceA}</span>
                  <span style={{ backgroundColor: '#74b9ff', padding: '3px', border: '1px solid black' }}>£{priceB}</span>
                </div>
              </div>
          </MarkerWithLabel>
        ))
      }
    </React.Fragment>
  </GoogleMap>
)

export default SpanMap