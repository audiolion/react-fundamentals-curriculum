import React from 'react';
import { Menu, Container, Form, Input, Grid, Header, Item, Button } from 'semantic-ui-react';
import {
  BrowserRouter as Router,
  withRouter,
  Route,
  Link
} from 'react-router-dom';
import Client from './client.js';

import styles from '../main.css';


const App = () => (
  <Router>
    <div className='background app aligner'>
      <Navbar />
      <Route exact path="/" component={Home} />
      <Route path="/forecast/:city" component={City} />
    </div>
  </Router>
);

class Navbar extends React.Component {
  state = { activeItem: 'home' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state

    return (
      <Menu className='menu-bg inverted fixed top' style={{marginBottom: 0, height: '80px'}}>
        <Menu.Item
          name='home'
          onClick={this.handleItemClick}
          as={Link}
          to='/'
        >
          <h2 className='header item borderless'>
            OpenWeather React App
          </h2>
        </Menu.Item>

        <Menu.Menu position='right'>
          <Menu.Item className='borderless'>
            <GetWeatherForm
              placeholder='Rochester, NY'
              inline={true}
            />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
};

const City = ({ match }) => {
  return <Forecast city={match.params.city} />;
};

class Forecast extends React.Component {

  static defaultProps = {
    city: '',
    isLoading: true,
    token: '71cceac10b96599e8d1c746d56e8d0b3',
  };

  componentDidMount() {
    this.makeRequest({
      'city': this.props.city,
      'token': this.props.token,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.makeRequest({
      'city': nextProps.city,
      'token': nextProps.token,
    });
  }

  makeRequest = (data) => {
    Client.getCurrentWeatherData(data.city, data.token, function(res) {
      console.log(res);
    });
    Client.getForecastWeatherData(data.city, data.token, function(res) {
      console.log(res);
    });
  };

  render() {
    if (this.props.isLoading) {
      return (
        <div>
          <h1 className="h1">Loading</h1>
        </div>
      );
    } else {
      return (
        <div>
          <h1 className="h1">Complete</h1>
        </div>
      );
    }
  }
}

class Home extends React.Component {
  render() {
    return (
      <Item.Group>
        <Item.Content verticalAlign='middle'>
          <Header as='h1' className='h1'>Enter a City and State</Header>
        </Item.Content>
        <Item.Content verticalAlign='middle'>
          <GetWeatherForm placeholder='Rochester, NY' />
        </Item.Content>
      </Item.Group>
    )
  }
};


class GetWeatherForm extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  state = {
    searchText: this.props.searchText || '',
  };

  static defaultProps = {
    inline: '',
  }

  handleClick = (e) => {
    e.preventDefault();
    this.handleSubmit();
  };

  handleChange = (e) => {
    this.setState({ searchText: e.target.value });
  };

  handleSubmit = () => {
    if (this.state.searchText !== '') {
      const { router } = this.context;
      router.history.push('/forecast/' + this.state.searchText);
    } else {
      console.log('Validation Error, no query text');
    }
  };

  render() {
    if (this.props.inline === '') {
      return (
        <Form>
          <div className="field">
            <WeatherInputSearch
              placeholder={this.props.placeholder === '' ? 'Buffalo, NY' : this.props.placeholder}
              value={this.state.searchText}
              onChange={this.handleChange}
            />
          </div>
          <div className="field" style={{textAlign: 'center'}}>
            <GetWeatherButton
              onClick={this.handleClick}
            />
          </div>
        </Form>
      );
    } else {
      return (
        <Form>
          <div className="fields" style={{marginBottom: 0}}>
            <div className="field">
              <WeatherInputSearch
                placeholder={this.props.placeholder === '' ? 'Buffalo, NY' : this.props.placeholder}
                value={this.state.searchText}
                onChange={this.handleChange}
              />
            </div>
            <div className="field">
              <GetWeatherButton
                onClick={this.handleClick}
              />
            </div>
          </div>
        </Form>
      );
    }
  }
}

class WeatherInputSearch extends React.Component {
  render() {
    return (
      <Input
        icon='search'
        placeholder={this.props.placeholder}
        onChange={this.props.onChange}
        value={this.props.value}
      />
    );
  }
}

class GetWeatherButton extends React.Component {

  static defaultProps = {
    text: 'Get Weather'
  };

  render() {
    return (
      <Button
        color='green'
        type='submit'
        onClick={this.props.onClick}
      >
        {this.props.text}
      </Button>
    );
  }
}

export default App;
