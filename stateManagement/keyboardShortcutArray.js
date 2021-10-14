import * as Types from './TYPES';
import store from './store';
import Router from "next/router"


const handleRedirect = (data, ...rest) => {
    console.log("data in with router", data, rest)

}




export const defaultShortcutArray = [
    {
        key: '1',
        scs: ["NEXT", "NS", "NS "],
        displayText: "Forward one step",
        locations: ["/addRecipe"],
        action: () => store.dispatch({
            type: Types.SET_ADD_RECIPE_STEP,
            payload: "increase"
        })
    },
    {
        key: '2',
        scs: ["BACK", "PREVIOUS", "BS", "PS "],
        displayText: "Back one step",
        locations: ["/addRecipe"],
        action: () => store.dispatch({
            type: Types.SET_ADD_RECIPE_STEP,
            payload: "decrease"
        })
    },
    {
        key: '3',
        scs: ["DETAILS", "JUMP TO DETAILS", "JTDE", "JDE"],
        displayText: "Jump to Details",
        locations: ["/addRecipe"],
        action: () => store.dispatch({
            type: Types.SET_ADD_RECIPE_STEP,
            payload: 0
        })
    },
    {
        key: '4',
        scs: ["INGREDIENTS", "JUMP TO INGREDIENTS", "JTI", "JI"],
        displayText: "Jump to Ingredients",
        locations: ["/addRecipe"],
        action: () => store.dispatch({
            type: Types.SET_ADD_RECIPE_STEP,
            payload: 1
        })
    },
    {
        key: '5',
        scs: ["DIRECTIONS", "JUMP TO DIRECTIONS", "JTDIRECTIONS", "JDIRECTIONS"],
        displayText: "Jump to Directions",
        locations: ["/addRecipe"],
        action: () => store.dispatch({
            type: Types.SET_ADD_RECIPE_STEP,
            payload: 2
        })
    },
    {
        key: '6',
        scs: ["ADD SUB RECIPE", "ADDSUBRECIPE", "ASR", "ADDSR", "SUBRECIPE", "SR"],
        displayText: "Add a sub-Recipe",
        locations: ["/addRecipe"],
        test: (prevState) => {
            console.log('prevState: ', prevState);
            if (prevState?.UI?.addRecipe?.allowSubRecipe) {
                console.log("test true")
                return true
            }
            return false
        },
        action: {
            type: Types.SHOW_ALERT,
            payload: () => store.dispatch({
                title: "Sub-Recipe Title",
                variant: "setSubRecipeTitle",
                titleColor: "primary",
            })
        }
    },
    {
        key: '7',
        scs: ["NEXT SUBRECIPE", "NEXTSUBRECIPE", "NSR", "NSUBRECIPE", "NEXT SR", "NEXTSR"],
        displayText: "Next sub-Recipe",
        locations: ["/addRecipe"],
        test: (prevState) => {
            return prevState?.UI?.addRecipe?.formData?.subRecipes?.length > 0
        },
        action: () => store.dispatch({
            type: Types.LOOP_THROUGH_SUB_RECIPES,
            payload: "rightKey"
        })
    },
    {
        key: '8',
        scs: ["PREVIOUS SUBRECIPE", "PSR", "PREVIOUS", "PSUBRECIPE"],
        displayText: "Previous sub-Recipe",
        locations: ["/addRecipe"],
        test: (prevState) => {
            return prevState?.UI?.addRecipe?.formData?.subRecipes?.length > 0
        },
        action: () => store.dispatch({
            type: Types.LOOP_THROUGH_SUB_RECIPES,
            payload: "leftKey"
        })
    },
    {
        key: '9',
        scs: ["ADD SUBRECIPE", "ASR", "ADDSUBRECIPE", "SR"],
        displayText: "Add a sub-Recipe",
        locations: ["/addRecipe"],
        // test: (prevState) => {
        //     console.log('prevState: ', prevState);
        //     return true
        // },
        action: () => store.dispatch({
            type: Types.SHOW_ALERT,
            payload: {
                title: "Sub-Recipe Title",
                variant: "setSubRecipeTitle",
                titleColor: "primary",
            },
        })
    },
    {
        key: '10',
        scs: ["SHOWSUMMARY", "SHOW RECIPE SUMMARY", "SH", "SRS", "SS"],
        displayText: "Show Recipe Summary",
        locations: ["/addRecipe"],
        // test: (prevState) => {
        //     console.log('prevState: ', prevState);
        //     return true
        // },
        action: (payload) => {
            store.dispatch({
                type: Types.SHOW_RECIPE_SUMMARY_FULLSCREEN_MODAL,
                ...(payload && { payload: payload })
            })
        }
    },
    {
        key: '11',
        scs: ["ADD NEW RECIPE", "ANR", "ADDRECIPE", "ADDNEWRECIPE"],
        displayText: "Add New Recipe",
        locations: ["*"],
        // test: (prevState) => {
        //     console.log('prevState: ', prevState);
        //     return true
        // },
        action: () => {
            Router.router.push("/addRecipe")
        }
    },
    {
        key: '12',
        scs: ["SET SHORTCUT KEYS", "NEWSHORTCUT ", "CHANGE SHORTCUT", "SETSHORTCUT", "NEWSHORTCUTS ", "SHORTCUTS", "CHANGESHORTCUTS", "CSK", "NSK", "KEYS"],
        displayText: "Adjust Shortcut Keys",
        locations: ["*"],
        // test: (prevState) => {
        //     console.log('prevState: ', prevState);
        //     return true
        // },
        action: () => {
            // handleRedirect(payload)
            store.dispatch({
                type: Types.TOGGLE_SET_KEYS_BACKDROP,
                payload: {
                    // settingKeysBackdrop: true
                }
            })
            // store.dispatch({
            //     type: Types.SET_SK_STRING,
            //     // payload: "setting"
            // })
        }
    },
]



export const returnShortcutArray = (location) => {
    if (!location) {
        return defaultShortcutArray.filter((_shortcut) => _shortcut.locations.includes("*"))
    }
    let filtered = defaultShortcutArray.filter(shortcut => shortcut.locations.includes(location) || shortcut.locations.includes("*"))
    return filtered
}



export const returnFilteredShortcutArray = ({
    searchString,
    currentState,
    currentPath,
}) => {
    let filteredByLocation = returnShortcutArray(currentPath)
    console.log('filteredByLocation: fsk', filteredByLocation);
    let _regex = new RegExp(searchString, "gi")
    let _r = {}

    let allScs = (() => {
        let _allScs = [];
        filteredByLocation.forEach(sc => {
            sc.scs.forEach((st) => {
                _allScs.push({ t: st, key: sc.key })
            })
        });
        return _allScs;
    })();
    let _newFilteredArray = allScs.filter((sc) => _regex.test(sc.t)).filter((sc) => {
        let shouldSet = !_r[sc.key]
        _r[sc.key] = true;
        return shouldSet;
    })
        .map((sc) => filteredByLocation.filter(dsc => dsc.key === sc.key)[0])

    // if (_newFilteredArray.length === filteredByLocation.length) {
    //     _newFilteredArray.length = 0
    // }
    if (searchString === "") {
        _newFilteredArray.length = 0
    }
    if (_newFilteredArray.length !== 0) {
        _newFilteredArray = _newFilteredArray.filter((sc) => defaultShortcutArray.filter((it) => it.key === sc.key)[0]?.test ? defaultShortcutArray.filter((it) => it.key === sc.key)[0]?.test(currentState) : true).map((_sc) => {
            if (_sc.test) {
                delete _sc.test
            }
            return _sc
        })
    }
    console.log("newFilteredArray", _newFilteredArray)

    return _newFilteredArray.length !== 0 ? _newFilteredArray : null
}