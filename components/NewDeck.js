import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
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
            this.props.navigation.navigate('Home')
        })
        
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

mapDispatchToProps = (dispatch) => ({
    addDeck: (title) => dispatch(addDeck(title))
})

export default connect(null, mapDispatchToProps)(NewDeck)