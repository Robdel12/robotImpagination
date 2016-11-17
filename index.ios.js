/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Dataset  from 'impagination';
import {
  AppRegistry,
  StyleSheet,
} from 'react-native';

import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Spinner,
} from 'native-base';
import Faker from './components/Faker';


export default class reactnativeImpagination extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataset: null,
      store: null
    };
  }

  componentWillMount() {
    let _this = this;
    this.dataset = new Dataset({
      pageSize: 15,
      loadHorizen: 15,
      observe(store) {
        _this.setState({store});
      },
      fetch(pageOffset, pageSize, stats) {
        return fetch(`https://serene-beach-38011.herokuapp.com/api/faker?page=${pageOffset + 1}&per_page=${pageSize}`)
          .then((response) => response.json())
          .then((data) => {
            return data;
          }).catch((error) => {
            console.error(error);
          });
      }
    });

    this.setState({dataset: this.dataset});
    this.dataset.setReadOffset(0);
  }

  renderItem() {
    return this.state.store.map(record => {
      if(record.isPending) {
        return <Spinner style={styles.loadingSpinner} color="#00C497" key={Math.random()}/>;
      }

      return (
        <Faker record={record} key={record.content.id} />
      );
    });
  }

  loadMoreData() {
    this.state.dataset.setReadOffset(this.state.store.readOffset + 15);
  }

  render() {
    return (
      <Container>
        <Header>
          <Title>Impagination.js</Title>
        </Header>
        <Content>
          {this.renderItem()}
          <Button block onPress={() => { this.loadMoreData(); }} style={styles.loadMoreBtn}> Load More </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  loadMoreBtn: {
    margin: 10
  }
});

AppRegistry.registerComponent('reactnativeImpagination', () => reactnativeImpagination);
