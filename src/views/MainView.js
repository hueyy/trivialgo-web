import React from 'react'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'

import Map from '../components/Map'
import PlaceInput from '../components/PlaceInput'
import DateInput from '../components/DateInput'

import ApiManager from '../utils/ApiManager'

class MainView extends React.Component {
  constructor(){
    super()
    this.state = {
      a: {
        query: '',
        suggestions: [],
        selected: null,
        location: ''
      },
      b: {
        query: '',
        suggestions: [],
        selected: null,
        location: ''
      },
      from: '2019-01-01',
      to: '2019-01-10'
    }
  }
  render(){
    const { a, b, from, to } = this.state
    return (
      <div className="main-view">
        <Map
          key="map"
          intersections={[]}
          coordinates={null}
        />
        <div
          id="controls"
          style={{ top: 0, position: `fixed`, padding: 20, boxSizing: 'border-box', width: '100%' }}
        >
          <PlaceInput
            value={a.query}
            items={a.suggestions}
            placeholder="Your City"
            wrapperStyle={{
              zIndex: 999
            }}
            onChange={this.updateTextField('a')}
            onSelect={this.updateSelectField('a')}
          />
          <PlaceInput
            value={b.query}
            items={b.suggestions}
            placeholder="Your Friend's City"
            onChange={this.updateTextField('b')}
            onSelect={this.updateSelectField('b')}
          />
          <div className="row" style={{ marginTop: 10, display: 'flex' }}>
            <DateInput
              style={{ marginRight: 10 }}
              value={from}
              onChange={this.updateDateField('from')}
              placeholder="FROM"
            />
            <DateInput
              value={to}
              onChange={this.updateDateField('to')}
              placeholder="TO"
            />
          </div>
        </div>
        <div id="footer">
          <div
            id="button"
            onClick={this.calculateNow}
          >
            CALCULATE
          </div>
        </div>
      </div>
    )
  }
  updateTextField = field => e => this.setState(
    { [field]: { ...this.state[field], query: e.target.value } },
    () => this.getSuggestions(field)
  )
  updateDateField = field => e => this.setState({ [field]: e.target.value })
  updateSelectField = field => (value, item) => {
    this.setState({
      [field]: {
        ...this.state[field],
        query: `${item.name} (${item.id})`,
        selected: value,
        location: item.location
      }
    })
  }
  getSuggestions = async (field) => {
    let suggestions
    try {
      suggestions = (await ApiManager.getPlaceSuggestions(this.state[field].query)).data
    } catch (error) {
      return console.error(error)
    }
    console.log(suggestions)
    this.setState({
      [field]: {
        ...this.state[field],
        suggestions
      }
    })
  }
  calculateNow = async () => {
    const { from, to, a, b } = this.state
    const queryParams = {
      placeA: a.selected,
      placeB: b.selected,
      outbound: from,
      inbound: to,
      placeALocation: a.location,
      placeBLocation: b.location
    }
    this.props.history.push(`/results?${queryString.stringify(queryParams)}`)
  }
}

export default withRouter(MainView)