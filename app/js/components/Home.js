import React from 'react';
import { Item, Header } from 'semantic-ui-react';
import GetWeatherForm from './GetWeatherForm.js';

export default class Home extends React.Component {
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
