import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation'
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

import { Constants } from 'expo'

import DeckList from "./components/DeckList";
import NewDeck from "./components/NewDeck";
import Deck from "./components/Deck";
import NewCard from './components/NewCard'

const Tabs = TabNavigator({
    DeckList: {
        screen: DeckList,
        navigationOptions: {
            tabBarLabel: 'Decks',
            tabBarIcon: ({tintColor}) => <MaterialCommunityIcons name='cards' size={30} color={tintColor}/>
        }
    },
    NewDeck: {
        screen: NewDeck,
        navigationOptions: {
            tabBarLabel: 'New deck',
            tabBarIcon: ({tintColor}) => <Ionicons name='ios-add' size={30} color={tintColor}/>
        }
    }
}, {
    navigationOptions: {
        header: null
    },
    tabBarOptions: {
        //activeTintColor: '#f26f28',
        style: {
            height: 56,
            shadowColor: 'rgba(0,0,0,0.24)',
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1
        }
    }
})

const MainNavigator = StackNavigator({
    Home: {
        screen: Tabs,
    },
    Deck: {
        screen: Deck,
        navigationOptions: {
            //headerTintColor: white,
            //headerStyle: {
            //    backgroundColor: purple
            //}
        }
    },
    NewCard: {
        screen: NewCard
    }
})

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
          <View style={{height: Constants.statusBarHeight}}>
              <StatusBar translucent barStyle='dark-content' backgroundColor='#434516'/>
          </View>
          <MainNavigator/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
