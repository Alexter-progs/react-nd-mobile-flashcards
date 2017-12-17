import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import QuizItem from './QuizItem'

export default class NewCard extends Component {
    static navigationOptions = {
        title: 'Quiz'
    }

    state = {
        questionsCount: 0,
        cards: [
            { question: '1', answer: '6'},
            { question: '2', answer: '5'},
            { question: '3', answer: '4'},
            { question: '4', answer: '3'},
            { question: '5', answer: '2'},
            { question: '6', answer: '1'},
        ],
        questionsAnsweredCount: 1,
        correctAnswersCount: 0,
        currentQuestionIndex: null,
        isQuizCompleted: false
    }

    componentDidMount() {
        this.setState((state) => ({
            ...state,
            questionsCount: state.cards.length,
            currentQuestionIndex: 0
        }))
    }

    handleCorrectAnswer = () => {
        const newQuestionAnsweredCount = this.state.questionsAnsweredCount + 1
        const newCurrentQuestionIndex = this.state.currentQuestionIndex + 1
        const newCorrectAnswersCount = this.state.correctAnswersCount + 1

        if(newCurrentQuestionIndex >= this.state.questionsCount){
            this.setState((state) => ({
                ...state,
                isQuizCompleted: true,
                correctAnswersCount: newCorrectAnswersCount
            }))
        } else {
            this.setState((state) => ({
                ...state,
                currentQuestionIndex: newCurrentQuestionIndex,
                questionsAnsweredCount: newQuestionAnsweredCount,
                correctAnswersCount: newCorrectAnswersCount
            }))
        }
    }

    handleIncorrectAnswer = () => {
        const newQuestionAnsweredCount = this.state.questionsAnsweredCount + 1
        const newCurrentQuestionIndex = this.state.currentQuestionIndex + 1

        if(newCurrentQuestionIndex >= this.state.questionsCount){
            this.setState((state) => ({
                ...state,
                isQuizCompleted: true,
                questionsAnsweredCount: newQuestionAnsweredCount
            }))
        } else {
            this.setState((state) => ({
                ...state,
                currentQuestionIndex: newCurrentQuestionIndex,
                questionsAnsweredCount: newQuestionAnsweredCount
            }))
        }
    }

    render() {
        if(this.state.isQuizCompleted) {
            const answerPercentile = Math.fround((this.state.correctAnswersCount / this.state.questionsCount) * 100)
            return(
                <View>
                    <Text>Questions answered count: {this.state.questionsAnsweredCount}</Text>
                    <Text>Correct answers count: {this.state.correctAnswersCount}</Text>
                    <Text>Current question index: {this.state.currentQuestionIndex}</Text>
                    <Text>Is quiz completed: {this.state.isQuizCompleted}</Text>
                    <Text>Questions count: {this.state.questionsCount}</Text>
                    <Text>{answerPercentile}%</Text>
                </View>
            )
        }
        return(
            <View style={{flex: 1, alignItems: 'center'}}>
                <View style={{flex:1, alignItems: 'flex-start', flexDirection: 'row'}}><Text>{this.state.questionsAnsweredCount}/{this.state.questionsCount}</Text></View>
                <View style={{flex: 1}}>
                    <QuizItem quizItem={this.state.cards[this.state.currentQuestionIndex]}/>
                    <TouchableOpacity onPress={this.handleCorrectAnswer}>
                        <Text>Correct</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.handleIncorrectAnswer}>
                        <Text>Incorrect</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}