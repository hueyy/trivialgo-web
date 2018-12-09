import React from 'react'
import Autocomplete from 'react-autocomplete'

const defaultWrapperStyles = {
  width: `80vw`,
  height: `50px`,
  zIndex: 1,
}

const defaultInputStyles = {
  width: '100%',
  padding: `10px`,
  zIndex: 1
}

const defaultMenuStyles = {
  position: `fixed`,
  zIndex: 999,
  color: `black`
}

class PlaceInput extends React.Component {
  render(){
    const { items, value, onChange, onSelect, placeholder } = this.props
    return (
      <Autocomplete
        {...this.props}
        getItemValue={(item) => item.id}
        items={items}
        renderItem={(item, isHighlighted) =>
          <div style={{ background: isHighlighted ? 'lightgray' : 'white' }} key={`${placeholder}${item.id}`}>
            {item.name} ({item.id})
          </div>
        }
        value={value}
        onChange={onChange}
        onSelect={onSelect}
        wrapperStyle={{
          ...defaultWrapperStyles,
          ...this.props.wrapperStyle
        }}
        inputProps={{
          placeholder,
          style: {
            ...defaultInputStyles,
            ...this.props.inputStyle
          }
        }}
        menuStyle={{
          ...defaultMenuStyles,
          ...this.props.menuStyle
        }}
      />
    )
  }
}

export default PlaceInput
