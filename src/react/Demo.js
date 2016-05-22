/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
import Logo from '../images/logo.png';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

var Demo = React.createClass({
    getInitialState() {
        return {
            position: {
                coords: {
                    latitude: 'unknown',
                    longitude: 'unknown',
                },
            },
        };
    },

    handlePositionChange(position) {
        this.setState({position});
    },

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            this.handlePositionChange,
            (error) => alert(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
        this.watchID = navigator.geolocation.watchPosition(this.handlePositionChange);
    },

    render() {
        return (
            <View style={styles.container}>
                <Image source={Logo} />
                <Text style={styles.welcome}>
                    Sending your location to Bird Alert
                </Text>
                <Text>
                    Latitude: {this.state.position.coords.longitude}
                </Text>
                <Text>
                    Longitude: {this.state.position.coords.latitude}
                </Text>
            </View>
        );
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    location: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
});

module.exports = Demo;
