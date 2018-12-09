import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import MainView from './views/MainView'
import ResultsView from './views/ResultsView'

const AppRouter = () => (
  <Router>
    <div>
      <Route path="/" exact component={MainView} />
      <Route path="/results/" component={ResultsView} />
    </div>
  </Router>
)

export default AppRouter