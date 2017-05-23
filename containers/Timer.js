import React, { Component } from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import { ActionCreators } from '../redux'
import TimerMixin from 'react-timer-mixin'
import Reactotron from 'reactotron-react-native'
import reactMixin from 'react-mixin'

import Pie from '../components/Pie'

const { startTimer, stopTimer, resetTimer, setMaxOut } = ActionCreators

const mapStateToProps = (state) => {
  const { baseTime, startedAt, stoppedAt, maxOutSet, maxOutTime } = state.main
  return { baseTime, startedAt, stoppedAt, maxOutSet, maxOutTime }
}

const getElapsedTime = (baseTime, startedAt, stoppedAt = new Date().getTime()) => {
  if (!startedAt) {
    return 0
  }
  else {
    return stoppedAt - startedAt + baseTime
  }
}

const readableElapsedTime = (ms) => {
  let minutes = Math.floor((ms % 3600000) / 60000)
  let seconds = Math.floor(((ms % 360000) % 60000) / 1000)
  minutes = minutes < 10 ? "0" + minutes : minutes
  seconds = seconds < 10 ? "0" + seconds : seconds
  return minutes + ":" + seconds
}

const piePercentage = (time, maxTime = 1800000) => {
  return (time / maxTime) * 360
}

class Timer extends Component{
  constructor(props){
    super(props)
    this.elapsed = undefined
  }

  componentDidMount() {
    this.interval = this.setInterval(this.forceUpdate.bind(this), 300)
  }
  componentWillUnmount() {
    this.clearInterval(this.interval)
  }
  componentDidUpdate() {
    if(this.elapsed && this.elapsed > 1800000){
      this.props.stopTimer()
    }
  }
  render(){
    const { baseTime, startedAt, stoppedAt, maxOutTime, maxOutSet } = this.props
    this.elapsed = getElapsedTime(baseTime, startedAt, stoppedAt)
    //const boxStyle = this.props.maxOutSet ? [styles.box, styles.completed]: styles.box
    return(
      <View style={styles.container}>
        <View>
          <Pie
            radius={50}
            innerRadius={30}
            series={maxOutSet ? [piePercentage(maxOutTime)] : [piePercentage(this.elapsed)]}
            outerSeries={[piePercentage(this.elapsed)]}
            outerColors={['green']}
            outerRadius={70}
            colors={['red']}
            backgroundColor='#87CEEB'
          />
          <View style={styles.gauge}>
            <Text style={styles.gaugeText}>{readableElapsedTime(this.elapsed)}</Text>
          </View>
        </View>
        <View style={styles.maxOutTextContainer}>
          {maxOutSet ?
            <Text style={styles.maxOutText}>Maxed Out at {readableElapsedTime(maxOutTime)}</Text>
          : null}
        </View>
        <View style={styles.controller}>
          <View style={styles.row}>
            <Button
              onPress={() => this.props.startTimer(this.elapsed)}
              title="Start"
            />
            <Button
              onPress={() => this.props.stopTimer()}
              title="Stop"
            />
            <Button
              onPress={() => this.props.resetTimer()}
              title="Reset"
            />
          </View>
          <Button
            onPress={() => this.props.setMaxOut(this.elapsed)}
            title="Max Out!"
          />
        </View>
      </View>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#D1CAD0',
  },
  completed: {
    backgroundColor: 'red',
  },
  controller: {
    paddingBottom: 20,
    justifyContent: 'center',
    padding: 5
  },
  row: {
    flexDirection: 'row',
    padding: 5,
  },
  gauge: {
    position: 'absolute',
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeText: {
    backgroundColor: 'transparent',
    color: '#000',
    fontSize: 24,
  },
  maxOutTextContainer: {
    height: 34,
    padding: 10,
  },
  maxOutText: {
    color: 'red',
    fontSize: 24,
  }
})

reactMixin.onClass(Timer, TimerMixin)

export default connect(mapStateToProps, { startTimer, stopTimer, resetTimer, setMaxOut })(Timer)