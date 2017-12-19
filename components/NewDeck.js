import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'

import { saveDeck } from '../api'

export default class NewDeck extends Component {
    state = {
        deckTitle: ''
    }

    saveDeck = () => {
        saveDeck(this.state.deckTitle)
        this.props.navigation.navigate('Home')
    }

    render() {
        return(
            <View>
                <Text>What is the title of your new deck</Text>
                <TextInput style={{width: 200, height: 44, padding: 8, borderWidth: 1, margin: 50, borderColor: '#757575'}} value={this.state.text} onChangeText={(deckTitle) => this.setState({deckTitle})} placeholderTextColor='#4ac431'/>
                <TouchableOpacity onPress={this.saveDeck}>
                    <Text>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}