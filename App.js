import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import params from './src/Params';
import Field from './src/components/Field';
import Flag from './src/components/Flag';
export default class App extends Component {
  render() {
    return (
      <View styles={styles.container}>
        <Text>Campo Minado!</Text>
        <Text>Tamanho da grade: {params.getColumnsAmount()} x {params.getColumnsAmount()}</Text>
        <Field/>
        <Field opened={true}/>
        <Field opened={true} nearMines={1}/>
        <Field opened={true} nearMines={2}/>
        <Field opened={true} nearMines={3}/>
        <Field opened={true} nearMines={6}/>
        <Field mined={true}/>
        <Field mined={true} opened={true}/>
        <Field mined={true} opened={true} exploded={true}/>
        <Field flagged={true}/>
        <Field flagged={true} opened={true}/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff'
  },
});
