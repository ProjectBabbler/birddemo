/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
import React from 'react';
import Demo from './src/react/Demo';
import {
  AppRegistry,
} from 'react-native';

var birddemo = React.createClass({
    render() {
        return (
            <Demo />
        );
    }
});

AppRegistry.registerComponent('birddemo', () => birddemo);
