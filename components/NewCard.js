import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'

import { addCardToDeck } from '../api'

export default class NewCard extends Component {
    static navigationOptions = {
        title: 'Add Card'
    }

    state = {
        question: '',
        answer: ''
    }

    saveCard = () => {
        const deckTitle = this.props.navigation.state.params.deckId
        const card = {
            question: this.state.question,
            answer: this.state.answer
        }
    
        addCardToDeck(deckTitle, card)
        this.props.navigation.goBack()
    }

    render() {
        return(
            <View>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <TextInput style={{width: 200, height: 44, borderWidth: 1, marginVertical: 10, borderColor: '#757575'}} placeholder='Enter question' value={this.state.question} onChangeText={(question) => this.setState({question})} placeholderTextColor='#4ac431'/>
                    <TextInput style={{width: 200, height: 44, borderWidth: 1, marginVertical: 10, borderColor: '#757575'}} placeholder='Enter answer' value={this.state.answer} onChangeText={(answer) => this.setState({answer})} placeholderTextColor='#4ac431'/>
                    
                    <TouchableOpacity onPress={this.saveCard}>
                        <Text>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}