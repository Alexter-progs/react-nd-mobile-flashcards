import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export default class DeckList extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.deck.title
    });

    handleQuizStart = () => {
        if(this.props.navigation.state.params.deck.questions.length <= 0) {
            this.props.navigation.navigate('NewCard', { deckId: this.props.navigation.state.params.deck.title})
        } else {
            this.props.navigation.navigate('Quiz', { questions: this.props.navigation.state.params.deck.questions})
        }
    }

    render() {

        return(
            <View>
                <Text>Deck</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('NewCard', { deckId: this.props.navigation.state.params.deck.title})}>
                    <Text>Add new card</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.handleQuizStart}>
                    <Text>Start Quiz</Text>
                </TouchableOpacity>
            </View>
        )
    }
}