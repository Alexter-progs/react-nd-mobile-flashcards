import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'

import { addCardToDeck } from '../api'
import { addCard } from '../actions/index'
import { gray, black, white } from '../utils/colors'

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
    
        addCardToDeck(deckTitle, card).then(() => {
            return this.props.addCard(deckTitle, card)
        }).then(() => {
            this.props.navigation.goBack()
        })
    }

    render() {
        return(
            <KeyboardAvoidingView style={styles.container} behavior='padding'>
                <TextInput style={styles.textInput} placeholder='Enter question' value={this.state.question} onChangeText={(question) => this.setState({question})}/>
                <TextInput style={styles.textInput} placeholder='Enter answer' value={this.state.answer} onChangeText={(answer) => this.setState({answer})}/>
                
                <TouchableOpacity style={styles.submitBtn} onPress={this.saveCard}>
                    <Text style={styles.text}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    textInput: {
        width: 275, 
        height: 44, 
        borderWidth: 1, 
        borderRadius: 10,
        marginVertical: 10, 
        borderColor: gray
    },
    submitBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 125,
        height: 50,
        backgroundColor: black,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: black
    },
    text: {
        color: white
    }
})

mapDispatchToProps = (dispatch) => ({
    addCard: (deckTitle, card) => dispatch(addCard(deckTitle, card))
})

export default connect(null, mapDispatchToProps)(NewCard)