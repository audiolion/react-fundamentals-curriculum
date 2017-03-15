import React from 'react';
import { Menu, Container, Form, Input, Grid, Header, Item } from 'semantic-ui-react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import styles from '../main.css';


const App = () => (
  <Router>
    <div className='app'>
      <Navbar />

      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
    </div>
  </Router>
);

class Navbar extends React.Component {
  state = { activeItem: 'home' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state

    return (
      <Menu className='menu-bg inverted'>
        <div className='ui container'>
          <h2 className='header item borderless'>
            OpenWeather React App
          </h2>
          <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} as={Link} to='/'/>
          <Menu.Item name='about' active={activeItem === 'about'} onClick={this.handleItemClick} as={Link} to='/about'/>
          <Menu.Menu position='right'>
            <Menu.Item className='borderless'>
              <Form>
                <div className="fields" style={{marginBottom: 0}}>
                  <Form.Input icon='search' placeholder='Buffalo, NY' />
                  <Form.Button color='green'>Get Weather</Form.Button>
                </div>
              </Form>
            </Menu.Item>
          </Menu.Menu>
        </div>
      </Menu>
    )
  }
};

const About = () => (
  <div>
    <h2 className="ui header">About</h2>
  </div>
);

class Home extends React.Component {
  render() {
    return (
        <Grid columns={1} centered className='app background' stackable>
          <div className="aligner">
            <Item.Group>
              <Item.Content verticalAlign='middle'>
                <Header as='h1' className='h1'>Enter a City and State</Header>
              </Item.Content>
              <Item.Content verticalAlign='middle' className='row'>
                <Form>
                  <Form.Input icon='search' placeholder='Buffalo, NY' />
                  <Form.Button color='green'>Get Weather</Form.Button>
                </Form>
              </Item.Content>
            </Item.Group>
          </div>
        </Grid>
    )
  }
};

export default App;
