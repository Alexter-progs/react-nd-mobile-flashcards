import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export default class DeckList extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.deckTitle
    });

    render() {
        return(
            <View>
                <Text>Deck</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('NewCard', { deckId: this.props.navigation.state.params.deckTitle})}>
                    <Text>Add new card</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Quiz')}>
                    <Text>Start Quiz</Text>
                </TouchableOpacity>
            </View>
        )
    }
}