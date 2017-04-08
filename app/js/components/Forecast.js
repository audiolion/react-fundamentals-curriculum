import React from 'react';
import Loading from './loading.js';
import { Header } from 'semantic-ui-react';
import Client from '../client.js';
import utils from '../utils.js';


export default class ForecastContainer extends React.Component {
  state = {
    isLoading: true,
    forecastData: {}
  };

  static defaultProps = {
    city: '',
  };

  componentDidMount() {
    this.makeRequest({
      'city': this.props.city,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.makeRequest({
      'city': nextProps.city,
    });
  }

  makeRequest = (data) => {
    Client.getForecastWeatherData(data.city, (res) => {
      this.setState({ isLoading: false, forecastData: res });
    });
  };

  render() {
    return (
      <Forecast
        isLoading={this.state.isLoading}
        forecastData={this.state.forecastData}
      />
    );
  }
}

function puke(object) {
  return <pre>{JSON.stringify(object, null, ' ')}</pre>;
}

function DayItem(props) {
  var date = utils.getDate(props.day.dt);
  var icon = props.day.weather[0].icon;
  return (
    <div className="four wide column">
      <img src={'./app/images/weather-icons/' + icon + '.svg'} alt='Weather' />
      <h2>{date}</h2>
    </div>
  )
}

class Forecast extends React.Component {
  static propTypes = {
    isLoading: React.PropTypes.bool.isRequired,
    forecastData: React.PropTypes.object.isRequired,
  };

  render() {
    if (this.props.isLoading) {
      return (
        <Loading />
      );
    } else {
      return (
        <div className="ui grid stackable sixteen wide">
          <div className="row four wide column centered">
            <Header className='h1' as='h1'>{this.props.forecastData.city.name}</Header>
          </div>
          <div className="row">
            {this.props.forecastData.list.map((item) => {
              <DayItem key={item.dt} day={item} />
            })}
          </div>
        </div>
      );
    }
  }
}
