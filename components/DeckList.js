import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'

import { getDecks } from '../api'

export default class DeckList extends Component {
    renderItem = ({item}) => {
        return(
            <View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Deck', {deck: item})}>
                    <View style={{flex: 1, height: 50, alignItems: 'center', borderStyle: 'solid', borderBottomWidth: 1, borderColor: '#123321', paddingTop: 50, paddingBottom: 50}}>
                        <Text>{item.title}</Text>
                        <Text>{item.questions.length} cards</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    state = {
        decks: []
    }

    componentDidMount() {
        getDecks().then(decks => {
            let keys = Object.keys(decks)

            let mappedDecks = keys.map((key) => {
                //Virtualized list warns if no key prop is presented on the data object for flat list
                decks[key].key = key
                return decks[key]
            })

            this.setState(() => ({
                decks: mappedDecks
            }))
        })
    }

    render() {
        if(this.state.decks.length === 0) {
            return (
                <View>
                    <Text>No decks</Text>
                </View>
            )
        }
        return(
            <View style={{flex: 1}}>
                <FlatList data={this.state.decks} renderItem={this.renderItem}/>
            </View>
        )
    }
}