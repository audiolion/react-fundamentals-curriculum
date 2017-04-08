import React from 'react';
import { Form, Input, Button } from 'semantic-ui-react';

export default class GetWeatherForm extends React.Component {
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
