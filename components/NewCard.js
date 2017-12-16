import React, { Component } from 'react'
import { View, Text } from 'react-native'

export default class NewCard extends Component {
    static navigationOptions = {
        title: 'Add Card'
    }

    render() {
        return(
            <View>
                <Text>New Card</Text>
                <Text>{this.props.navigation.state.params.deckTitle}</Text>
            </View>
        )
    }
}