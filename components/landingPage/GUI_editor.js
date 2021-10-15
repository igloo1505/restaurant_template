import React from 'react'
import DatGui, { DatBoolean, DatColor, DatNumber, DatString } from 'react-dat-gui'

const GUI_editor = (data) => {
    const handleUpdate = (newData) => console.log("Updating")
    return (
        <DatGui data={data} onUpdate={handleUpdate}>
        <DatString path='package' label='Package' />
        <DatNumber path='power' label='Power' min={9000} max={9999} step={1} />
        <DatBoolean path='isAwesome' label='Awesome?' />
        <DatColor path='feelsLike' label='Feels Like' />
      </DatGui>
    )
}

export default GUI_editor
