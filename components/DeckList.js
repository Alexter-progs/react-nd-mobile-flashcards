import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'

const dummies = [
    { key: 1, text: 'Dummy 1', count: 2},
    { key: 2,text: 'Dummy 2', count: 5},
    { key: 3,text: 'Dummy 3', count: 89},
    { key: 4,text: 'Dummy 4', count: 12},
    { key: 5,text: 'Dummy 5', count: 14},
    { key: 6,text: 'Dummy 6', count: 5},
]

export default class DeckList extends Component {

    renderItem = ({item}) => {
        return(
            <View key={item.text}>
                <View style={{flex: 1, height: 50, alignItems: 'center', borderStyle: 'solid', borderBottomWidth: 1, borderColor: '#123321', paddingTop: 50, paddingBottom: 50}}>
                    <Text>{item.text}</Text>
                    <Text>{item.count} cards</Text>
                </View>
            </View>
        )
    }

    render() {
        return(
            <View style={{flex: 1}}>
                <FlatList data={dummies} renderItem={this.renderItem}/>
            </View>
        )
    }
}