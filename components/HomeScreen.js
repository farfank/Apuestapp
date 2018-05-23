
import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import { Container, Header, Content, Button, Text } from 'native-base';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
      title: 'Welcome to the app!',
    };
  
    render() {
      return (
        <View style={styles.container}>

          <Button
            style={{  alignSelf: "center" ,marginBottom: 80}}
            onPress={this._showMoreApp}
          >
              <Text>Show me more of the app </Text>
          </Button>

          <Button
            style={{  alignSelf: "center" }}
            onPress={this._signOutAsync}
          >
              <Text>Actually, sign me out :) </Text>
          </Button>

          <Button title="Show me more of the app" onPress={this._showMoreApp} />
          <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
        </View>
      );
    }
  
    _showMoreApp = () => {
      this.props.navigation.navigate('Other');
    };
  
    _signOutAsync = async () => {
      await AsyncStorage.clear();
      this.props.navigation.navigate('Auth');
    };
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });