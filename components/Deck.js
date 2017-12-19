import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { getDeck } from '../storage/DAL';

export default class DeckList extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.deck.title
    });

    state = {
        deck: {}
    }

    handleQuizStart = () => {
        if(this.state.deck.questions.length <= 0) {
            this.props.navigation.navigate('NewCard', { deckId: this.state.deck.title})
        } else {
            this.props.navigation.navigate('Quiz', { questions: this.state.deck.questions})
        }
    }

    componentDidMount() {
        getDeck(this.props.navigation.state.params.deck.title).then(deck => {
            console.log(deck)
            this.setState(() => ({
                deck
            }))
        })
    }

    componentWillUpdate() {
        console.log('Updating Deck')
    }

    render() {

        return(
            <View>
                <Text>Deck</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('NewCard', { deckId: this.state.deck.title})}>
                    <Text>Add new card</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.handleQuizStart}>
                    <Text>Start Quiz</Text>
                </TouchableOpacity>
            </View>
        )
    }
}