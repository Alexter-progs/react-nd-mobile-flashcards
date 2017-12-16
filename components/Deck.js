import React, { Component } from 'react'
import { View, Text } from 'react-native'

export default class DeckList extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.deckTitle
    });

    render() {
        return(
            <View>
                <Text>Deck</Text>
            </View>
        )
    }
}