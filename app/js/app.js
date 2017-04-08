import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Home from './components/Home.js';
import GetWeatherForm from './components/GetWeatherForm.js';
import ForecastContainer from './components/Forecast.js';

import styles from '../main.css';

const City = ({ match }) => {
  return <ForecastContainer city={match.params.city} />;
};

const App = () => (
  <Router>
    <div className='background app aligner'>
      <Navbar />
      <Route exact path="/" component={Home} />
      <Route path="/forecast/:city" component={City} />
    </div>
  </Router>
);

export default App;
