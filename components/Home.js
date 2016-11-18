import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

// Native base for nice prestyled components
import {
  Button,
  Spinner,
} from 'native-base';

import Dataset  from 'impagination';
import RobotItem from './RobotItem';

export default class Home extends Component {
  constructor(props) {
    super(props);
    console.log('ay');

    this.state = {
      dataset: null,
      store: null
    };
  }

  /**
   * Create a new impagination dataset when the component mounts and
   * set the intial readOffset to 0 to fetch data.
   *
   * @method setupImpagination
   */
  setupImpagination() {
    let _this = this;

    this.dataset = new Dataset({
      pageSize: 15,
      loadHorizon: 15,

      // Anytime there's a new store emitted, we want to set that on
      // the componets local state.
      observe(store) {
        _this.setState({store});
      },

      // Where to fetch the data from.
      fetch(pageOffset, pageSize, stats) {
        return fetch(`https://serene-beach-38011.herokuapp.com/api/faker?page=${pageOffset + 1}&per_page=${pageSize}`)
          .then(response => response.json())
          .then(data => data)
          .catch((error) => {
            console.error(error);
          });
      }
    });

    this.setState({dataset: this.dataset});

    // Set the readOffset to 0 to start reading from the dataset &
    // loading data.
    this.dataset.setReadOffset(0);
  }

  componentWillMount() {
    this.setupImpagination();
  }

  /**
   * Render each item in the impagination store. If the record is
   * pending we should show a loading spinner.
   *
   * @method renderItem
   */
  renderItem() {
    return this.state.store.map(record => {
      if(record.isPending) {
        return <Spinner style={styles.loadingSpinner} color="#00C497" key={Math.random()}/>;
      }

      return (
        <RobotItem record={record} key={record.content.id} />
      );
    });
  }

  /**
   * Set impaginations readOffset higher to load more data.
   *
   * @method loadMoreData
   */
  loadMoreData() {
    this.state.dataset.setReadOffset(this.state.store.readOffset + 15);
  }

  render() {
    return (
      <View>
        {this.renderItem()}
        <Button block onPress={() => { this.loadMoreData(); }} style={styles.loadMoreBtn}> Load More </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadMoreBtn: {
    margin: 10
  }
});
