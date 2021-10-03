import * as Types from './TYPES';

export const defaultShortcutArray = [
    {
        key: '1',
        scs: ["NEXT", "NS", "NS "],
        displayText: "Forward one step",
        action: {
            type: Types.SET_ADD_RECIPE_STEP,
            _payload: "increase"
        }
    },
    {
        key: '2',
        scs: ["BACK", "PREVIOUS", "BS", "PS "],
        displayText: "Back one step",
        action: {
            type: Types.SET_ADD_RECIPE_STEP,
            _payload: "decrease"
        }
    },
    {
        key: '3',
        scs: ["DETAILS", "JUMP TO DETAILS", "JTDE", "JDE"],
        displayText: "Jump to Details",
        action: {
            type: Types.SET_ADD_RECIPE_STEP,
            _payload: 0
        }
    },
    {
        key: '4',
        scs: ["INGREDIENTS", "JUMP TO INGREDIENTS", "JTI", "JI"],
        displayText: "Jump to Ingredients",
        action: {
            type: Types.SET_ADD_RECIPE_STEP,
            _payload: 1
        }
    },
    {
        key: '5',
        scs: ["DIRECTIONS", "JUMP TO DIRECTIONS", "JTDIRECTIONS", "JDIRECTIONS"],
        displayText: "Jump to Directions",
        action: {
            type: Types.SET_ADD_RECIPE_STEP,
            _payload: 2
        }
    },
]
