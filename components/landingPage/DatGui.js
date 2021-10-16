import React from 'react'
import DatGui, { DatBoolean, DatColor, DatNumber, DatString } from 'react-dat-gui';
import {extend} from "@react-three/fiber"
extend({ DatBoolean, DatColor, DatNumber, DatString, DatGui })

const typeMap = {
    boolean: DatBoolean,
    number: DatNumber,
    string: DatString,
    color: DatColor
}


const GUIEditor = ({data, updateData}) => {
    return (
        <DatGui data={data} onUpdate={updateData}>
        <DatBoolean path="isOpen" label="boolean"/>        
        </DatGui>
        )
    }
    
export default GUIEditor
