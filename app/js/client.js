import 'whatwg-fetch';

export default class Client {
  static getCurrentWeatherData(data, token, success) {
    const apiUrl = '//api.openweathermap.org/data/2.5/weather?q='
                    + data + '&type=accurate&appid=' + token;
    return fetch(apiUrl, {
      headers: {
        Accept: 'application/json',
      },
    }).then(this.checkStatus)
      .then(this.parseJSON)
      .then(success);
  }

  static getForecastWeatherData(data, token, success) {
    const apiUrl = '//api.openweathermap.org/data/2.5/forecast?q='
                    + data + '&type=accurate&appid=' + token;
    return fetch(apiUrl, {
      headers: {
        Accept: 'application/json',
      },
    }).then(this.checkStatus)
      .then(this.parseJSON)
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
