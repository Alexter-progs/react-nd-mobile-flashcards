import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { addDeck } from '../actions'

import { saveDeck } from '../api'

class NewDeck extends Component {
    state = {
        deckTitle: ''
    }

    saveDeck = () => {
        const title = this.state.deckTitle

        saveDeck(title).then(() => {
            return this.props.addDeck(title)
        }).then(() => {
            this.props.navigation.navigate('Deck', {deckTitle: title})
        })
        
    }

    render() {
        return(
            <KeyboardAvoidingView style={styles.container} behavior='padding'>
                <View>
                    <Text style={styles.text}>What is the title of your new deck?</Text>
                </View>
                <TextInput style={styles.textInput} placeholder='Deck Title' value={this.state.text} onChangeText={(deckTitle) => this.setState({deckTitle})}/>
                <TouchableOpacity style={styles.submitBtn} onPress={this.saveDeck}>
                    <Text style={styles.submitBtnText}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput: {
        width: 250, 
        height: 44, 
        padding: 8, 
        borderWidth: 1,
        borderRadius: 10,
        margin: 50, 
        borderColor: '#757575'
    },
    text: {
        fontSize: 20,
    },
    submitBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 125,
        height: 50,
        backgroundColor: '#000',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000'
    },
    submitBtnText: {
        color: '#fff'
    }
})

mapDispatchToProps = (dispatch) => ({
    addDeck: (title) => dispatch(addDeck(title))
})

export default connect(null, mapDispatchToProps)(NewDeck)