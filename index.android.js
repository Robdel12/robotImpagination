/**
 * Sample React Native App with Impagination.js
 *
 * https://github.com/robdel12/robotImpagination
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

// Native base for nice prestyled components
import {
  Container,
  Content,
  Header,
  Title,
} from 'native-base';
import Home from './components/Home';

export default class robotImpagination extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Title>Impagination.js</Title>
        </Header>
        <Content>
          <Home />
        </Content>
      </Container>
    );
  }
}

AppRegistry.registerComponent('robotImpagination', () => robotImpagination);
