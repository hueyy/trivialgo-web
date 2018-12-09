import React from 'react'

const defaultStyles = {
  height: `50px`,
  flex: 1,
  textAlign: 'center'
}

class DateInput extends React.Component {
  render(){
    const { placeholder, style, value } = this.props
    return (
      <input
        {...this.props}
        type="date"
        value={value}
        placeholder={placeholder}
        style={{
          ...defaultStyles,
          ...style
        }}
      />
    )
  }
}

export default DateInput
