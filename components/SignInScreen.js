import React, {Component} from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Alert,
  TextInput,
  TouchableHighlight
} from 'react-native';
import { material, human, iOSUIKit, iOSColors} from 'react-native-typography'
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
import { StackNavigator, SwitchNavigator } from 'react-navigation'; // Version can be specified in package.json
import * as firebase from 'firebase';
import Expo from "expo";
import HomeScreen from './HomeScreen'

const firebaseConfig = {
  apiKey: "AIzaSyDfyz8cV9HtuuGMQzqURcXDRwxUXbcIGJs",
  authDomain: "apuestas-399ee.firebaseapp.com",
  databaseURL: "https://apuestas-399ee.firebaseio.com",
  projectId: "apuestas-399ee",
  storageBucket: "apuestas-399ee.appspot.com",
  messagingSenderId: "308327057646"
} 


export default class SignInScreen extends Component {
 
 

    constructor(props){
      super(props);
      this.state = {
        email:'test1@gmail.com' , password:'12345678', error:'', loading:false, hello:'holaaa'
      };
    }


    componentWillMount() {
      firebase.initializeApp(firebaseConfig);
    }

    static navigationOptions = {
      title: 'Please sign in',

    };

    onSignOutPress = ()=> {
      firebase.auth().signOut().then(function() {
        this.props.navigation.navigate('Auth')
      }).catch(function(error) {
        Alert.alert('NOK ',error)
      });
    }

    onSignInPress = ()=> {
      this.setState({ error: '', loading: true });
      const { email, password } = this.state;
      firebase.auth().signInWithEmailAndPassword(email, password)
          .then(() => { 
            this.setState({ error: '', loading: false }); 
            Alert.alert('Logged in')
            async();
          })
          .catch(() => {
            //Alert.alert('Creating user')
              firebase.auth().createUserWithEmailAndPassword(email, password)
                  .then(() => { 
                    Alert.alert('Creating user ok' )
                    this.setState({ error: '', loading: false }); 
                  })
                  .catch(() => {
                      Alert.alert('Creating user nok')
                      this.setState({ error: 'Authentication failed.', loading: false });
                  });
          });
  }

    loginOk = async () => {
      await AsyncStorage.setItem('userToken', 'abc');
      this.props.navigation.navigate('App');
    };
    
  
    render() {

      if (this.state.loading) {
        return <Expo.AppLoading />;
      }
      return (
        <View style={styles.container}>
        <Text style={[material.display1, human.largeTitle, iOSUIKit.largeTitleEmphasized, styles.redTitle]}>Apuestapp</Text>
          <View style={styles.containerInputs}>
            <TextInput
              placeholderTextColor="grey"
              style={styles.inputText}
              placeholder='Your email'
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
            />

            <TextInput
              placeholderTextColor="grey"
              placeholder="Password" 
              style={styles.inputText}
              password={true} 
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
            />
          </View>

          <TouchableHighlight
            onPress={this.onSignUpPress}
            style={[styles.signupButton, styles.button]}
          >
          <Text style={styles.textButton}>SignUp</Text>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={this.onLoginPress}
            style={[styles.loginButton, styles.button]}
          >
          <Text style={styles.textButton}>Login</Text>
          </TouchableHighlight>

       
        </View>
     
      );
    }
  
    onSignUpPress = ()=> {
     
      this.setState({error:'', loading:true});

      const { email, password } = this.state;

      firebase.auth().createUserWithEmailAndPassword(email,password).then(() =>{
        this.setState({error:'', loading:false});
        Alert.alert('Usuario registrado')
      //  loginOk();
      })
      .catch(err => {
        alert(err.code);
        this.setState({error:'authentication failed', loading:false});
      })
    };

    

    onLoginPress = ()=> {
     
      this.setState({error:'', loading:true});

      const { email, password } = this.state;

      firebase.auth().signInWithEmailAndPassword(email,password).
      then(() =>{
        this.setState({error:'', loading:false});
       // Alert.alert('Usuario autenticado')
           this.props.navigation.navigate('Appi');
        // loginOk();
      }) .catch(err => {
        alert(err.code);
        this.setState({error:'authentication failed', loading:false});
      })
      

    };
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingTop: '20%',
      backgroundColor: 'green'
    },
    inputText: {
        height: 50,
        width: 200,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 20,
        paddingVertical: 10,
        color: 'white'
    },
    button: {
        height: 50,
        width: 150,
        backgroundColor: 'yellowgreen',
        paddingVertical: 20,
        borderRadius: 5,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc'
    },
    textButton: {
        textAlign: 'center'
    },
    containerInputs:{
        marginBottom: 20,
        marginTop: 35
    },
    redTitle:{
      color: iOSColors.yellow
    }
  });