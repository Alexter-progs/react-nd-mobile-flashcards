import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

 class Deck extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.deckTitle
    });

    handleQuizStart = () => {
        if(this.props.deck.questions.length <= 0) {
            this.props.navigation.navigate('NewCard', { deckTitle: this.props.deck.title})
        } else {
            this.props.navigation.navigate('Quiz', { deckTitle: this.props.deck.title})
        }
    }

    render() {

        return(
            <View>
                <Text>Deck</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('NewCard', { deckTitle: this.props.deck.title})}>
                    <Text>Add new card</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.handleQuizStart}>
                    <Text>Start Quiz</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

mapStateToProps = (state, props) => {
    return {
        deck: state[props.navigation.state.params.deckTitle]
    }
}

export default connect(mapStateToProps)(Deck)