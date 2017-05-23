const types = {
  START_TIMER: 'START_TIMER',
  STOP_TIMER: 'STOP_TIMER',
  RESET_TIMER: 'RESET_TIMER',
  INCREMENT_SECONDS: 'INCREMENT_SECONDS',
  SET_MAX_OUT: 'SET_MAX_OUT',
}

const initialState = {
  startedAt: undefined,
  stoppedAt: undefined,
  baseTime: undefined,
  maxOutTime: undefined,
  maxOutSet: false,
  workOutTime: 0,
  finishedWorkout: false,
}

export const reducer = (state=initialState, action) =>{
  const {type, payload} = action
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
        maxOutTime: state.maxOutTime ? state.maxOutTime : action.now - state.startedAt + state.baseTime,
        maxOutSet: true,
        finishedWorkout: true,
      }
    case "SET_MAX_OUT":
      return {
        ...state,
        maxOutTime: action.maxOutTime,
        maxOutSet: true
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
  }
}
