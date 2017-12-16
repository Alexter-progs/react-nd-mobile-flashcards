import React, { Component } from 'react'
import { View, Text } from 'react-native'

export default class NewCard extends Component {
    static navigationOptions = {
        title: 'Quiz'
    }

    render() {
        return(
            <View>
                <Text>QUIZ</Text>
            </View>
        )
    }
}