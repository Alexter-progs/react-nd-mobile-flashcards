import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import QuizItem from './QuizItem'

import { clearLocalNotifications, setLocalNotification } from '../utils/helpers'
import { gray, white, green, red, black } from '../utils/colors'

class Quiz extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Quiz'
    });

    state = {
        currentQuestionNumber: 1,
        correctAnswersAmount: 0,
        currentQuestionIndex: 0,
        isQuizCompleted: false
    }

    handleCorrectAnswer = () => {
        const questionsAmount = this.props.questions.length

        const newCurrentQuestionNumber = this.state.currentQuestionNumber + 1
        const newCurrentQuestionIndex = this.state.currentQuestionIndex + 1
        const newCorrectAnswersAmount = this.state.correctAnswersAmount + 1

        if(newCurrentQuestionIndex >= questionsAmount){
            this.setState((state) => ({
                ...state,
                correctAnswersAmount: newCorrectAnswersAmount
            }))
            this.handleQuizCompletion()
        } else {
            this.setState((state) => ({
                ...state,
                currentQuestionIndex: newCurrentQuestionIndex,
                currentQuestionNumber: newCurrentQuestionNumber,
                correctAnswersAmount: newCorrectAnswersAmount
            }))
        }
    }

    handleIncorrectAnswer = () => {
        const questionsAmount = this.props.questions.length

        const newCurrentQuestionNumber = this.state.currentQuestionNumber + 1
        const newCurrentQuestionIndex = this.state.currentQuestionIndex + 1

        if(newCurrentQuestionIndex >= questionsAmount){
            this.handleQuizCompletion()
        } else {
            this.setState((state) => ({
                ...state,
                currentQuestionIndex: newCurrentQuestionIndex,
                currentQuestionNumber: newCurrentQuestionNumber
            }))
        }
    }

    handleQuizCompletion = () => {
        this.setState((state) => ({
            ...state,
            isQuizCompleted: true
        }))

        clearLocalNotifications().then(setLocalNotification)
    }

    restartQuiz = () => {
        this.setState(() => ({
            currentQuestionNumber: 1,
            correctAnswersAmount: 0,
            currentQuestionIndex: 0,
            isQuizCompleted: false
        }))
    }

    render() {
        const questionsAmount = this.props.questions.length

        if(this.state.isQuizCompleted) {
            const answerPercentile = ((this.state.correctAnswersAmount / questionsAmount) * 100).toFixed(1)
            return(
                <View style={styles.resultContainer}>
                    <Text style={styles.answerPercentile}>Your score: {answerPercentile}%</Text>
                    <TouchableOpacity style={styles.restartQuizBtn} onPress={this.restartQuiz}>
                        <Text>Restart quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.goBackBtn} onPress={() => {this.props.navigation.goBack()}}>
                        <Text style={styles.goBackText}>Go back</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        return(
            <View style={styles.container}>
                <View style={styles.quistionsCountContainer}>
                    <Text>{this.state.currentQuestionNumber} / {questionsAmount}</Text>
                </View>

            
                <View>
                    <QuizItem quizItem={this.props.questions[this.state.currentQuestionIndex]}/>
                </View>
                    
                <View>
                    <TouchableOpacity style={[styles.submitAnswerButton, { backgroundColor: green}]} onPress={this.handleCorrectAnswer}>
                        <Text style={styles.submitText}>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.submitAnswerButton, { backgroundColor: red}]} onPress={this.handleIncorrectAnswer}>
                        <Text style={styles.submitText}>Incorrect</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    quistionsCountContainer: {
        marginLeft: 5,
        marginTop: 5,
        alignSelf: 'flex-start'
    },
    submitAnswerButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        height: 50,
        borderRadius: 10,
        marginBottom: 10
    },
    resultContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    restartQuizBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: black,
        marginBottom: 10,
    },
    goBackBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 50,
        backgroundColor: black,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: black
    },
    goBackText: {
        color: white
    },
    submitText: {
        color: white
    },
    answerPercentile: {
        fontSize: 20,
        marginBottom: 10
    }
})

mapStateToProps = (state, props) => ({
    questions: state[props.navigation.state.params.deckTitle].questions
})

export default connect(mapStateToProps)(Quiz)