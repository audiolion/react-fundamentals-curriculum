import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import GetWeatherForm from './GetWeatherForm.js';

export default class Navbar extends React.Component {
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
