import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

import { Constants } from 'expo'

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import reducer from './reducers'

import DeckList from "./components/DeckList"
import NewDeck from "./components/NewDeck"
import Deck from "./components/Deck"
import NewCard from './components/NewCard'
import Quiz from './components/Quiz'

import { setLocalNotification } from './utils/helpers'

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
        screen: Tabs
    },
    Deck: {
        screen: Deck,
        navigationOptions: ({navigation}) => ({
            headerTintColor: '#fff',
            headerStyle: styles.headerStyle
        })
    },
    NewCard: {
        screen: NewCard,
        navigationOptions: ({navigation}) => ({
            headerTintColor: '#fff',
            headerStyle: styles.headerStyle
        })
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: ({navigation}) => ({
            headerTintColor: '#fff',
            headerStyle: styles.headerStyle
        })
    }
})

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default class App extends React.Component {
    componentDidMount() {
        setLocalNotification()
    }
  render() {
    return (
        <Provider store={store}>
            <View style={styles.container}>
                <View style={styles.statusBar}>
                    <StatusBar translucent backgroundColor={styles.statusBar.backgroundColor} barStyle='light-content'/>
                </View>
                <MainNavigator/>
            </View>
        </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: Constants.statusBarHeight,
    backgroundColor: '#000'
  },
  headerStyle: {
      backgroundColor: '#000'
  }
});
