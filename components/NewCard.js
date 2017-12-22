import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import { addCardToDeck } from '../api'
import { addCard } from '../actions/index';

class NewCard extends Component {
    static navigationOptions = {
        title: 'Add Card'
    }

    state = {
        question: '',
        answer: ''
    }

    saveCard = () => {
        const deckTitle = this.props.navigation.state.params.deckTitle
        const card = {
            question: this.state.question,
            answer: this.state.answer
        }
        console.log(deckTitle, card)
    
        addCardToDeck(deckTitle, card).then(() => {
            return this.props.addCard(deckTitle, card)
        }).then(() => {
            this.props.navigation.goBack()
        })
    }

    render() {
        return(
            <View>
                <View style={styles.container}>
                    <TextInput style={styles.textInput} placeholder='Enter question' value={this.state.question} onChangeText={(question) => this.setState({question})}/>
                    <TextInput style={styles.textInput} placeholder='Enter answer' value={this.state.answer} onChangeText={(answer) => this.setState({answer})}/>
                    
                    <TouchableOpacity onPress={this.saveCard}>
                        <Text>Submit</Text>
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
    textInput: {
        width: 200, 
        height: 44, 
        borderWidth: 1, 
        marginVertical: 10, 
        borderColor: '#757575'
    }
})

mapDispatchToProps = (dispatch) => ({
    addCard: (deckTitle, card) => dispatch(addCard(deckTitle, card))
})

export default connect(null, mapDispatchToProps)(NewCard)