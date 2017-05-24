import Reactotron from 'reactotron-react-native'
import moment from 'moment'

const types = {
  START_TIMER: 'START_TIMER',
  STOP_TIMER: 'STOP_TIMER',
  RESET_TIMER: 'RESET_TIMER',
  SET_MAX_OUT: 'SET_MAX_OUT',
  SELECT_DATE: 'SELECT_DATE',
  SET_WORKOUT_PROGRAM: 'SET_WORKOUT_PROGRAM',
}

const initialState = {
  startedAt: undefined,
  stoppedAt: undefined,
  baseTime: undefined,
  maxOutTime: undefined,
  maxOutSet: false,
  workOutTime: 0,
  finishedWorkout: false,
  selectedDate: undefined,
  workoutProgram: undefined,
  bestWorkout: {
    "Cardio Challenge": undefined,
    "Tabata Power": undefined,
    "Sweat Intervals": undefined,
    "Friday Fight: Round 1": undefined,
    "Tabata Strength": undefined,
    "Max Out Cardio": undefined,
    "Max Out Sweat": undefined,
    "Max Out Strength": undefined,
    "Friday Fight: Round 2": undefined,
  },
  lastWorkout: undefined,
}


export const reducer = (state=initialState, action) =>{
  const {type} = action
  switch(type){
    case "RESET_TIMER":
      return {
        ...state,
        baseTime: 0,
        startedAt: state.startedAt ? action.now : undefined,
        stoppedAt: state.stoppedAt ? action.now : undefined,
        maxOutSet: false,
      }
    case "START_TIMER":
      return {
        ...state,
        baseTime: action.baseTime,
        startedAt: action.now,
        stoppedAt: undefined
      }
    case "STOP_TIMER":
      return {
        ...state,
        stoppedAt: state.stoppedAt ? state.stoppedAt : action.now,
        maxOutTime: state.maxOutTime ? state.maxOutTime : (action.now - state.startedAt + state.baseTime),
        maxOutSet: true,
        finishedWorkout: true,
      }
    case "SET_MAX_OUT":
      return {
        ...state,
        maxOutTime: action.maxOutTime,
        maxOutSet: true
      }
    case "SELECT_DATE":
      return {
        ...state,
        selectedDate: action.selectedDate,
      }
    case "SET_WORKOUT_PROGRAM":
      return {
        ...state,
        workoutProgram: action.workoutProgram
      }
    default:
      return state
  }
}

export const actionCreators = {
  startTimer: (baseTime = 0) => {
    return {
      type: "START_TIMER",
      baseTime: baseTime,
      now: new Date().getTime()
    }
  },
  stopTimer: () => {
    return {
      type: "STOP_TIMER",
      now: new Date().getTime()
    }
  },
  resetTimer: () => {
    return {
      type: "RESET_TIMER",
      now: new Date().getTime()
    }
  },
  setMaxOut: (elapsed) => {
    return {
      type: "SET_MAX_OUT",
      maxOutTime: elapsed
    }
  },
  selectDate: (date) => {
    return {
      type: "SELECT_DATE",
      selectedDate: date
    }
  },
  setWorkoutProgram: (date, template) => {
    let startDay = moment(date).startOf('isoweek')
    let program = {}

    for (let i = 0; i < template.length; i++) {
      let date = startDay.add(template[i][0], 'days').format('YYYY-MM-DD')
      program[date] = {
        name: template[i][1],
        workoutType: template[i][2]
      }
    }

    return {
      type: "SET_WORKOUT_PROGRAM",
      workoutProgram: program
    }
  }
}