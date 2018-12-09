const axios = require('axios')

const api = axios.create({
  baseURL: 'https://4a8d90b4.eu.ngrok.io',
})

const getPlaceSuggestions = (query) => api.get(`/suggest/${query}`)
const getIntersections = ({
  placeA,
  placeB,
  outbound,
  inbound
}) => api.get(`/intersect/${placeA}/${placeB}/${outbound}/${inbound}`)

module.exports = {
  getPlaceSuggestions,
  getIntersections
}