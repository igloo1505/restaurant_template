import * as KeyIcons from "../components/modalsAndAlerts/KeyIcons"
import store from "../stateManagement/store"
import * as Types from "../stateManagement/TYPES"

import { List } from '@material-ui/core';

const settingKeysModal = (state) => {
    return state?.UI?.settingsModal?.settingKeysBackdrop
}

const allowKeys = (state) => {
    return state?.user?.userSettings?.allowKeyboardShortcuts
}


class ShortcutKey {
    constructor({ e, icon, isActive, isSpecialKey, booleanCheck }) {
        this.key = e.key
        this.icon = icon
        this.keyCode = e.keyCode
        this.isActive = isActive || true
        this.code = e.code
        this.booleanCheck = booleanCheck || false,
            this.isSpecialKey = isSpecialKey || false
    }
}


const disallowKeys = [
    "CapsLock",
    "Tab",
    "Enter",
]

export const _specialKeys = {
    "Shift": new ShortcutKey({
        booleanCheck: "shiftKey",
        icon: KeyIcons.ShiftIcon,
        isSpecialKey: true,
        isActive: false,
        e: {
            key: "Shift",
            keyCode: 16,
            code: "ShiftLeft",
        }
    }),
    "Alt": new ShortcutKey({
        booleanCheck: "altKey",
        icon: KeyIcons.AltIcon,
        isActive: false,
        isSpecialKey: true,
        e: {
            key: "Alt",
            keyCode: 18,
            code: "AltLeft"
        }
    }),
    "Meta": new ShortcutKey({
        booleanCheck: "metaKey",
        icon: KeyIcons.CommandIcon,
        isActive: false,
        isSpecialKey: true,
        e: {
            key: "Meta",
            keyCode: 91,
            code: "MetaLeft"
        }
    }),
    "Control": new ShortcutKey({
        booleanCheck: "ctrlKey",
        icon: KeyIcons.ControlIcon,
        isActive: false,
        isSpecialKey: true,
        e: {
            key: "Control",
            keyCode: 17,
            code: "ControlLeft"
        }
    }),
}





class SpecialKeysClass {
    constructor(_localState) {
        this._localState = _localState
        this.state = store.getState();
        this.Shift = {
            pressed: this.state?.user?.userSettings?.skListeners?.shiftPressed,
            setPressed: (newValue, event) => {
                store.dispatch({
                    type: Types.SET_LISTENER_KEY,
                    payload: { shiftKey: newValue }
                })
                this.setSpecialKeys(event)
            }
        },
            this.Alt = {
                pressed: this.state?.user?.userSettings?.skListeners?.altPressed,
                setPressed: (newValue, event) => {
                    store.dispatch({
                        type: Types.SET_LISTENER_KEY,
                        payload: { altKey: newValue }
                    })
                    this.setSpecialKeys(event)
                }
            },
            this.Meta = {
                pressed: this.state?.user?.userSettings?.skListeners?.metaPressed,
                setPressed: (newValue, event) => {
                    store.dispatch({
                        type: Types.SET_LISTENER_KEY,
                        payload: { metaKey: newValue }
                    })
                    this.setSpecialKeys(event)
                }
            },
            this.Control = {
                pressed: this.state?.user?.userSettings?.skListeners?.controlPressed,
                setPressed: (newValue, event) => {
                    store.dispatch({
                        type: Types.SET_LISTENER_KEY,
                        payload: { ctrlKey: newValue }
                    })
                    this.setSpecialKeys(event)
                }
            },
            // setSpecialKeys: (newKey) => {
            //     setSpecialKeys(newKey)
            // }
            this.setSpecialKeys = function (event) {
                console.log('event sending to getNewCurrentKeys: ', event);
                if (!event) {
                    console.trace("this.setSpecialKeys: ")
                }
                let newActiveKeys = getNewCurrentKeys({ event, state: this?.state })
                store.dispatch({
                    type: Types.SET_CURRENT_ACTIVE_KEYS,
                    payload: {
                        currentActiveKeys: newActiveKeys
                    }
                })
            }
    }
}
export const SpecialKeys = (_localState) => {
    return new SpecialKeysClass(_localState)
}


// export const SpecialKeys = (_localState) => {
//     let state = store.getState();

//     return {
//         "Shift": {
//             pressed: state?.user?.userSettings?.skListeners?.shiftPressed,
//             setPressed: (newValue, event) => {
//                 store.dispatch({
//                     type: Types.SET_LISTENER_KEY,
//                     payload: { shiftKey: newValue }
//                 })
//                 this.setSpecialKeys(event)
//             }
//         },
//         "Alt": {
//             pressed: state?.user?.userSettings?.skListeners?.altPressed,
//             setPressed: (newValue, event) => {
//                 store.dispatch({
//                     type: Types.SET_LISTENER_KEY,
//                     payload: { altKey: newValue }
//                 })
//                 this.setSpecialKeys(event)
//             }
//         },
//         "Meta": {
//             pressed: state?.user?.userSettings?.skListeners?.metaPressed,
//             setPressed: (newValue, event) => {
//                 store.dispatch({
//                     type: Types.SET_LISTENER_KEY,
//                     payload: { metaKey: newValue }
//                 })
//                 this.setSpecialKeys(event)
//             }
//         },
//         "Control": {
//             pressed: state?.user?.userSettings?.skListeners?.controlPressed,
//             setPressed: (newValue, event) => {
//                 store.dispatch({
//                     type: Types.SET_LISTENER_KEY,
//                     payload: { ctrlKey: newValue }
//                 })
//                 this.setSpecialKeys(event)
//             }
//         },
//         // setSpecialKeys: (newKey) => {
//         //     setSpecialKeys(newKey)
//         // }
//         setSpecialKeys: (event) => {
//             let newActiveKeys = getNewCurrentKeys({ event, state })
//             console.log('newActiveKeys up here: ', newActiveKeys);
//             store.dispatch({
//                 type: Types.SET_CURRENT_ACTIVE_KEYS,
//                 payload: newActiveKeys,
//             })
//         }
//     }
// }


export const settingKeysKeydown = (e) => {
    let state = store.getState();
    console.log('state: p-b', state);
    const bypassKeys = ["Escape", "Tab", "Enter"]
    console.log('bypassKeys.includes(e.key): ', bypassKeys.includes(e.key));
    if (!bypassKeys.includes(e.key)) {
        e.preventDefault()
    }
    if (e.repeat) {
        return
    };
    if (SpecialKeys(state)[e.key]) {
        SpecialKeys(state)[e.key].setPressed(true, e)
    }

    if (!SpecialKeys(state)[e.key]) {
        if (disallowKeys.includes(e.key) || e.key === "" || e.key.length > 1) {
            return;
        }
        let newSpecialKeys = getNewCurrentKeys({ event: e, state })
        store.dispatch({
            type: Types.SET_CURRENT_ACTIVE_KEYS,
            payload: {
                currentActiveKeys: newSpecialKeys
            }
        })

    }
}



export const settingKeysKeyup = (e) => {
    let localState = store.getState();
    e.preventDefault()
    if (e.repeat) {
        return
    };
    if (SpecialKeys()[e.key]) {
        SpecialKeys()[e.key].setPressed(false, e)
    }
    SpecialKeys(localState).setSpecialKeys(e)
}







export const getNewCurrentKeys = ({ event, reset, state, metaKeys, ...rest }) => {
    if (reset) {
        return []
    }
    console.log('getNewCurrentKeys state, metaKeys, ...rest: gnk', state, metaKeys, rest);
    let isSpecialKey = Object.keys(_specialKeys).includes(event?.key)
    let currentKeys = state?.user?.userSettings?.currentActiveKeys || []
    const newKey = new ShortcutKey({
        e: event,
        isActive: true,
        ...(Boolean(_specialKeys[event.key]) && { isSpecialKey: true }),
        ...(Boolean(_specialKeys[event.key]) && { booleanCheck: _specialKeys[event.key].booleanCheck }),
    })
    if (event.type === "keydown") {
        let rKeys = [newKey]
        if (!newKey.isSpecialKey) {
            rKeys = [...currentKeys.filter((ck) => ck.isSpecialKey), newKey]
        }
        if (newKey.isSpecialKey) {
            console.log('currentKeys: gnk', currentKeys);
            let nsk = currentKeys.filter((ck) => !ck?.isSpecialKey)?.[0]
            nsk && rKeys.push(nsk)
            if (currentKeys.filter(ck => ck?.isSpecialKey).length <= 1) {
                let osk = currentKeys.find(ck => ck?.isSpecialKey)
                osk && rKeys.push(osk)
                console.log('osk: gnk ', rKeys);
            }
        }
        return rKeys
    }
    if (event.type === "keyup") {
        console.log("handling key up gnk", currentKeys.filter((sk) => sk?.keyCode !== event.keyCode))
        console.log("key up gnk", event.keyCode);
        currentKeys.map((sk) => console.log("key up sk gnk", sk.keyCode))
        console.log("key up gnk", event.keyCode);
        return currentKeys.filter((sk) => sk?.keyCode !== event.keyCode)
    }
    return currentKeys
}


export const clearListeners = () => {
    store.dispatch({
        type: Types.SET_LISTENER_KEY,
        payload: {
            shiftKey: false,
            altKey: false,
            metaKey: false,
            ctrlKey: false,
        }
    })
}


// const handleKeyDown = (e) => {
//     console.log('handleKeyDown: ', handleKeyDown);
// }

// const handleKeyUp = (e) => {
//     console.log('handleKeyUp: ', handleKeyUp);
// }
const Listeners = {
    settingKeyDownListener: (e) => {
        let localState = store.getState();
        console.log('localState: p-b', localState);
        const bypassKeys = ["Escape", "Tab", "Enter"]
        if (!bypassKeys.includes(e.key)) {
            e.preventDefault()
        }
        if (e.repeat) {
            return
        };
        if (SpecialKeys(localState)[e.key]) {
            SpecialKeys(localState)[e.key].setPressed(true, e)
        }

        if (!SpecialKeys(localState)[e.key]) {
            if (disallowKeys.includes(e.key) || e.key === "" || e.key.length > 1) {
                return;
            }
            let newSpecialKeys = getNewCurrentKeys({ event: e, state: localState })
            store.dispatch({
                type: Types.SET_CURRENT_ACTIVE_KEYS,
                payload: {
                    currentActiveKeys: newSpecialKeys
                }
            })
        }
    },
    settingKeyUpListener: (e) => {
        let localState = store.getState();
        e.preventDefault()
        if (e.repeat) {
            return
        };

        if (SpecialKeys()[e.key]) {
            SpecialKeys()[e.key].setPressed(false, e)
        }
        SpecialKeys(localState).setSpecialKeys(e)
    }
}

export const handleEventListeners = () => {
    let state = store.getState();
    console.log('state: ', state);
    if (typeof window !== undefined) {
        if (state?.user?.userSettings?.allowKeyboardShortcuts) {
            document.addEventListener("keydown", (e) => {
                console.log("Logging this: ", e)
                // if(e)
            })
        }
        if (state?.UI?.settingsModal?.settingKeysBackdrop) {
            console.log('window: ', window.location);
            document.addEventListener("keydown", Listeners[`${state?.user?.userSettings?.skString}KeyDownListener`]);
            document.addEventListener("keyup", Listeners[`${state?.user?.userSettings?.skString}KeyUpListener`]);
        }
    }


    //   if (!state?.user?.userSettings?.allowKeyboardShortcuts || !state?.UI?.settingsModal?.settingKeysBackdrop) {
    //     document.removeEventListener("keydown", handleEventListeners("keyDown"));
    //     document.removeEventListener("keyup", handleEventListeners("keyUp"));
    //   }
}