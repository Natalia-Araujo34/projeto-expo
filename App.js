import React from 'react'; 
import {SafeAreaView, StyleSheet, Text, View, Image} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions'; 
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

i18n.translations = {
  en: {welcome: 'Hello', name: 'friend', dt:'Geographic Data', cd: 'Coordenates', rg: 'Region', lg:'Language', ct:'Country', br:'Brazil'},
  nl: {welcome: 'Hallo', name: 'vriend', dt: 'Geografische Gegevens', cd:'Coördineren', rg: 'Regio', lg:'Taal', ct:'Land', br:'Brazilië'},
  it: {welcome: 'Ciao', name: 'amico', dt: 'Dati Geografici', cd:'Coordinata ', rg:'Regione', lg: 'Linguaggio', ct:'Paese', br:'Brasile'},
  pt: {welcome: 'Olá', name: 'amigo', dt: 'Dados Geográficos', cd:'Coordenadas', rg:'Região', lg: 'Idioma', ct:'País', br:'Brasil'},
};
// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;

export default class App extends React.Component{

  state = {
    location: {},
    errorMessage: ''
  }

  componentWillMount(){
    this._getLocation();
  }

  _getLocation = async()=> {
    const {status} = await Permissions.askAsync(Permissions.LOCATION);

    if(status !== 'granted'){
      console.log('PERMISSION NOT GRANTED!');

      this.setState({
        errorMessage: 'PERMISSION NOT GRANTED'
      })
    }

    const location = await Location.getCurrentPositionAsync();

    this.setState({
      location, 
    });
  };

  render(){
    return(
      <SafeAreaView style={styles.principal}>

        <Image style={styles.imagem}
       source={require('./assets/logo.png')}/>

      <View style={styles.container}>
      <Text style={styles.titulo}>
      {i18n.t('dt')}
      </Text>
      <Text></Text>
      <Text style={styles.paragraph}>
      {i18n.t('welcome')} {i18n.t('name')}!
    </Text>
    <Text></Text>
        <Text style={styles.paragraph}> {i18n.t('cd')}:
        {JSON.stringify(this.state.location)}
        </Text>
        <Text style={styles.paragraph}>{i18n.t('rg')}: {Localization.timezone}</Text>
        <Text style={styles.paragraph}>{i18n.t('lg')}: {Localization.locale}</Text>
        <Text style={styles.paragraph}>{i18n.t('ct')}: {i18n.t('br')}</Text>
      </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  principal: {
    flex: 1, 
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#BDC4A7',
    alignItems: 'center'
  }, 
  titulo: {
    fontSize: 30, 
    fontWeight: "bold",
    color: '#5e2129' 
  },
  container: {
    flex: 1, 
    backgroundColor: '#BDC4A7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagem: {
    height: 400, 
    resizeMode: "center"
  },
  paragraph: {
    fontSize: 20,
    fontWeight: "bold", 
    textAlign: 'center'
  }
});