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

let domain = 'https://bird-alert.herokuapp.com';
let username = 'buskergreg';

var Demo = React.createClass({
    getInitialState() {
        return {
            position: {
                coords: {
                    latitude: 'unknown',
                    longitude: 'unknown',
                },
            },
            error: null,
        };
    },

    handlePositionChange(position) {
        this.setState({position});
        fetch(`${domain}/api/location`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                username: username,
            })
        }).then(() => {
            this.state({
                error: 'Sent',
            });
        }).catch(e => {
            this.setState({
                error: JSON.stringify(e),
            });
        });
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
                <Text>
                    {this.state.error}
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
