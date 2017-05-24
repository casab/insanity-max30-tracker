import React from 'react'
import Calendar from 'react-native-calendar'
import Reactotron from 'reactotron-react-native'
import { connect } from 'react-redux'
import { ActionCreators } from '../redux'
import moment from 'moment'

const { selectDate, setWorkoutProgram } = ActionCreators

import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native'

const mapStateToProps = (state) => {
  const { workoutProgram, selectedDate } = state.main
  return { workoutProgram, selectedDate }
}

const PROGRAM_TEMPLATE = [
  [0, "Cardio Challenge", "cardio"],
  [1, "Tabata Power", "power"],
  [1, "Sweat Intervals", "cardio"],
  [1, "Tabata Power", "power"],
  [1, "Friday Fight: Round 1", "cardio"],
  [1, "Pulse", "stretch"],
  [2, "Cardio Challenge", "cardio"],
  [1, "Tabata Power", "power"],
  [1, "Sweat Intervals", "cardio"],
  [1, "Tabata Power", "power"],
  [1, "Friday Fight: Round 1", "cardio"],
  [1, "Pulse", "stretch"],
  [2, "Cardio Challenge", "cardio"],
  [1, "Tabata Strength", "strength"],
  [1, "Sweat Intervals", "cardio"],
  [1, "Tabata Strength", "strength"],
  [1, "Friday Fight: Round 1", "cardio"],
  [1, "Pulse", "stretch"],
  [2, "Cardio Challenge", "cardio"],
  [1, "Tabata Strength", "strength"],
  [1, "Sweat Intervals", "cardio"],
  [1, "Tabata Strength", "strength"],
  [1, "Friday Fight: Round 1", "cardio"],
  [1, "Pulse", "stretch"],
]

const calendarStyle = {
  dayCircleFiller: {
    backgroundColor: 'rgba(79,97,127,0.05)',
  }
}

const workoutToColor = {
  cardio: "lightblue",
  power: "red",
  strength: "orange",
  stretch: "lightgreen"
}

const eventDaysCreator = (program, colors) => {
  //const program = workoutProgramDesigner(startDay)
  let events = []

  for (day of Object.keys(program)) {
    events.push({
      date: day,
      eventIndicator: {
        backgroundColor: colors[program[day].workoutType]
      }
    })
  }
  return events
}

const WorkoutProgram = (props) => {
  const {workoutProgram, selectedDate, selectDate, setWorkoutProgram} = props
  return (
    <View style={styles.container}>
      <Calendar
        showEventIndicators={true}
        showControls={true}
        events={workoutProgram && eventDaysCreator(workoutProgram, workoutToColor)}
        customStyle={calendarStyle}
        onDateSelect={(date) => {
          selectDate(moment(date).format('YYYY-MM-DD'))
        }}
      />
      <Text>{workoutProgram && (workoutProgram.hasOwnProperty(selectedDate) ?
          workoutProgram[selectedDate].name
          : "Just relax"
      )}</Text>
      {selectedDate &&
      <Button
        onPress={() => setWorkoutProgram(selectedDate, PROGRAM_TEMPLATE)}
        title="Set Workout Program"
      />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10
  },
})

export default connect(mapStateToProps, { selectDate, setWorkoutProgram })(WorkoutProgram)