import React from 'react';
import { AppRegistry, 
  StyleSheet, 
  FlatList, 
  Text, 
  View, 
  Alert, 
  Button, 
  TouchableHighlight,
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
 
 } from 'react-native';
import { StackNavigator, SwitchNavigator } from 'react-navigation';

export default class App extends React.Component {


  _onPress = (string) =>{
    Alert.alert(string);
  };

  constructor(props){
    super(props);

    this.state = { isLoading: true}
  }

  componentDidMount(){
    fetch('http://www.json-generator.com/api/json/get/ceVOkPVCcy?indent=2')
    .then ((response) => response.json())
    .then(responseJson => {


      this.setState({
        isLoading: false,
        dataSource: responseJson.Partidos,
      }, function(){
        });
    })
    .catch(error => {
      console.error(error);
    });
  }
FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#fcf6c8",
        }}
      />
    );
  }

 


  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
  
  async logout(){
    try{
      await firebase.auth().signOut()
      this.props.navigator.push({
        id: 'Auth'
      })
    }catch(error){
      console.log(error)
    }
  }
  render() {
    return (
      <View>
        <View style={{backgroundColor: '#21140f'}}>
          <FlatList
          data = {this.state.dataSource}
          ItemSeparatorComponent = {this.FlatListItemSeparator}
          renderItem = {({item}) =>
          <TouchableHighlight onPress={() => this._onPress(item.Estadio)}>
          <View>
          <Text style ={{fontSize:20,fontWeight:'bold', paddingTop:25, color: '#fcf6c8'}}> {item.EquipoA} vs. {item.EquipoB}</Text>
          <Text style={{color: '#fcf6c8'}}> {item.Fecha}{"\n"} {item.Grupo}{"\n"} {item.Lugar}{"\n"} {item.Estadio}{"\n"}</Text>
          </View>
          </TouchableHighlight>
          }
          />
        </View>
      </View>

    );
  }
}