import 'whatwg-fetch';

var _baseURL = '//api.openweathermap.org/data/2.5/';
var _APPID = '71cceac10b96599e8d1c746d56e8d0b3';

export default class Client {
  static getCurrentWeatherData(data, success) {
    const apiUrl = _baseURL + 'weather'
                    + '?q=' + encodeURIComponent(data.city)
                    + '&type=accurate&appid=' + _APPID + '&cnt=5';
    return fetch(apiUrl, {
      headers: {
        Accept: 'application/json',
      },
    }).then(Client.checkStatus)
      .then(Client.parseJSON)
      .then(success);
  }

  static getForecastWeatherData(data, success) {
    const apiUrl = _baseURL + 'forecast'
                    + '?q=' + encodeURIComponent(data.city)
                    + '&type=accurate&appid=' + _APPID + '&cnt=5';
    return fetch(apiUrl, {
      headers: {
        Accept: 'application/json',
      },
    }).then(Client.checkStatus)
      .then(Client.parseJSON)
      .then(success);
  }

  static checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      const error = new Error(`HTTP Error ${response.statusText}`);
      error.status = response.statusText;
      error.response = response;
      console.log(error);
      throw error;
    }
  }

  static parseJSON(response) {
    return response.json();
  }
}
