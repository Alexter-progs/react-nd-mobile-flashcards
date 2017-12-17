import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export default class QuizItem extends Component {
    state = {
        isShowAnswer: false
    }

    showAnswer = () => {
        this.setState(() => ({
            isShowAnswer: true
        }))
    }

    showQuestion = () => {
        this.setState(() => ({
            isShowAnswer: false
        }))
    }

    render() {
        if(!this.props.quizItem) {
            return (<View></View>)
        }
        return (
            <View>
                {
                    this.state.isShowAnswer ? (
                        <Text>{this.props.quizItem.answer}</Text>

                    ) : (
                        <Text>{this.props.quizItem.question}</Text>

                    )
                }
                { this.state.isShowAnswer ? (
                        <TouchableOpacity onPress={this.showQuestion}><Text>Question</Text></TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={this.showAnswer}><Text>Answer</Text></TouchableOpacity>
                    )
                }
            </View>
        )
    }
}