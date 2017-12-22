import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
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
            <View>
                <Text>What is the title of your new deck</Text>
                <TextInput style={styles.textInput} value={this.state.text} onChangeText={(deckTitle) => this.setState({deckTitle})}/>
                <TouchableOpacity onPress={this.saveDeck}>
                    <Text>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textInput: {
        width: 200, 
        height: 44, 
        padding: 8, 
        borderWidth: 1,
        margin: 50, 
        borderColor: '#757575'}
})

mapDispatchToProps = (dispatch) => ({
    addDeck: (title) => dispatch(addDeck(title))
})

export default connect(null, mapDispatchToProps)(NewDeck)