import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import { gray, black, white } from '../utils/colors'

 class Deck extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.deckTitle
    });

    handleQuizStart = () => {
        this.props.navigation.navigate('Quiz', { deckTitle: this.props.deck.title})
    }

    render() {
        const isQuizDisabled = this.props.deck.questions.length > 0 ? false : true

        return(
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <View style={styles.center}>
                        <Text style={styles.title}>{this.props.deck.title}</Text>
                        <Text style={styles.cardsCount}>{this.props.deck.questions.length} cards</Text>
                    </View>
                </View>
                <View style={[styles.buttonsContainer, {justifyContent: 'flex-end'}]}>
                    <TouchableOpacity style={styles.newCardBtn} onPress={() => this.props.navigation.navigate('NewCard', { deckTitle: this.props.deck.title})}>
                        <Text>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.startQuizBtn, {opacity: isQuizDisabled ? 0.2 : 1}]} disabled={isQuizDisabled} onPress={this.handleQuizStart}>
                        <Text style={styles.startQuizBtnText}>Start Quiz</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontSize: 20
    },
    cardsCount: {
        color: gray
    },
    newCardBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: black,
        marginBottom: 10
    },
    startQuizBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 50,
        backgroundColor: black,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: black
    },
    startQuizBtnText: {
        color: white
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    buttonsContainer: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: 50
    },
    center: {
        alignItems: 'center'
    }
})

mapStateToProps = (state, props) => {
    return {
        deck: state[props.navigation.state.params.deckTitle]
    }
}

export default connect(mapStateToProps)(Deck)