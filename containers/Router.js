import React, { Component } from 'react'
import { View, Button, StyleSheet, Text } from 'react-native'
import { StackNavigator, TabNavigator } from 'react-navigation'
import { connect } from 'react-redux'

import Timer from './Timer'
import WorkoutProgram from './WorkoutProgram'

Workout = () =>
  <Timer/>

Program = () =>
  <WorkoutProgram/>

AllWorkouts = (props) =>
  <Text>You are gonna make it, believe yourself</Text>


const AppRouter = TabNavigator({
  Program: { screen: Program },
  Workout: { screen: Workout },
  All: { screen: AllWorkouts},
}, {
  tabBarOptions: {
    inactiveTintColor: '#D6D8CF',
    activeTintColor: '#FBFBF9',
    showLabel: true,
    indicatorStyle: {
      backgroundColor: '#18F0ED',
    },
    style: {
      backgroundColor: '#AE9CAC',
      marginTop: 24,
    }
  }
})


export default connect()(AppRouter)