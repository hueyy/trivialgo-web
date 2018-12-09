import React from 'react'
import queryString from 'query-string'

import Map from '../components/Map'

import ApiManager from '../utils/ApiManager'

class ResultsView extends React.Component {
  constructor(){
    super()
    this.state = {
      intersections: [],
      aLat: 0,
      aLon: 0,
      bLat: 0,
      bLon: 0
    }
  }
  componentDidMount(){
    const { location: { search } } = this.props
    const searchParams = queryString.parse(search)
    this.calculateIntersections(searchParams)

    const [aLat, aLon] = searchParams.placeALocation.split(',')
    const [bLat, bLon] = searchParams.placeBLocation.split(',')
    this.setState({ aLat, aLon, bLat, bLon })
  }
  render(){
    const { intersections, aLat, aLon, bLat, bLon } = this.state
    return (
      <div className="results-view">
        <Map
          key="map"
          intersections={intersections}
          coordinates={{ a: { lat: aLat, lng: aLon }, b:{ lat: bLat, lng: bLon } }}
        />
      </div>
    )
  }
  calculateIntersections = async (params) => {
    let intersections
    try {
      intersections = (await ApiManager.getIntersections(params)).data
    } catch (error) {
      return console.error(error)
    }

    this.setState({ intersections })
  }
}

export default ResultsView
