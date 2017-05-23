import React, { PropTypes } from 'react'
import { Platform, ART } from 'react-native'
const { Surface, Shape, Path, Group } = ART

function createPath(cx, cy, r, startAngle, arcAngle) {
  const p = new Path()
  if (Platform.OS === 'ios') {
    p.path.push(0, cx + r * Math.cos(startAngle), cy + r * Math.sin(startAngle))
    p.path.push(4, cx, cy, r, startAngle, startAngle + arcAngle, 1)
  }
  else {
    p.path.push(4, cx, cy, r, startAngle, startAngle - arcAngle, 0)
  }
  return p
}


const Pie = ({ series, colors, radius, innerRadius, backgroundColor, outerSeries, outerColors, outerRadius=radius }) => {
  const width = radius - innerRadius
  const outerWidth = outerRadius - radius
  const backgroundPath = createPath(outerRadius, outerRadius, radius - width / 2, 0, 360)
  let startValue = 0
  let outStartValue = 0
  return (
    <Surface
      width={outerRadius * 2}
      height={outerRadius * 2}
    >
      <Group rotation={-90} originX={outerRadius} originY={outerRadius}>
        <Shape d={backgroundPath} stroke={backgroundColor} strokeWidth={width}/>
        {series.map((item, idx) => {
          startAngle = startValue / 360 * 2 * Math.PI
          arcAngle = item / 360 * 2 * Math.PI
          startValue = startValue + item
          const path  = createPath(outerRadius, outerRadius, radius - width / 2, startAngle, arcAngle)
          return <Shape key={idx} d={path} stroke={colors[idx]} strokeWidth={width} strokeCap='butt'/>
        })}
        {outerSeries ?
          outerSeries.map((item, idx) => {
            startAngle = outStartValue / 360 * 2 * Math.PI
            arcAngle = item / 360 * 2 * Math.PI
            outStartValue = outStartValue + item
            const path = createPath(outerRadius, outerRadius, outerRadius - outerWidth / 2, startAngle, arcAngle)
            return <Shape key={idx} d={path} stroke={outerColors[idx]} strokeWidth={outerWidth} strokeCap='butt'/>
          }) : null}
      </Group>
    </Surface>
  )
}

export default Pie

Pie.propTypes = {
  series: PropTypes.array.isRequired,
  colors: PropTypes.array.isRequired,
  radius: PropTypes.number.isRequired,
  innerRadius: PropTypes.number,
  outerRadius: PropTypes.number,
  outerColors: PropTypes.array,
  outerSeries: PropTypes.array,
  backgroundColor: PropTypes.string,
}

Pie.defaultProps = {
  innerRadius: 0,
  backgroundColor: '#fff',
}