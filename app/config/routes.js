import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const App = () => (
  <Router>
    <div
      className='ui text container'
    >
      <h2 className='ui dividing header'>
        OpenWeather React App
      </h2>

      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={HelloWorld}/>
      <Route path="/about" component={About}/>
    </div>
  </Router>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

class HelloWorld extends React.Component {
  render() {
    return (
      <div>Hi</div>
    )
  }
};

export default App;
