/**
 * Sample React Native App with Impagination.js
 *
 * https://github.com/robdel12/robotImpagination
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import Home from './components/Home';

export default class robotImpagination extends Component {
  render() {
    return (
      <Home />
    );
  }
}

AppRegistry.registerComponent('robotImpagination', () => robotImpagination);
