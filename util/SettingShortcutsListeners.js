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


const disallowKeys = [
    "CapsLock",
    "Tab",
    "Enter",
]

export const _specialKeys = {
    "Shift": {
        booleanCheck: "shiftKey",
        icon: KeyIcons.ShiftIcon,
        isSpecialKey: true,
        isActive: false
    },
    "Alt": {
        booleanCheck: "altKey",
        icon: KeyIcons.AltIcon,
        isActive: false,
        isSpecialKey: true,
    },
    "Meta": {
        booleanCheck: "metaKey",
        icon: KeyIcons.CommandIcon,
        isActive: false,
        isSpecialKey: true,
    },
    "Control": {
        booleanCheck: "ctrlKey",
        icon: KeyIcons.ControlIcon,
        isActive: false,
        isSpecialKey: true,
    },
}



export const SpecialKeys = (_localState) => {
    let state = store.getState();
    let currentKeys = state?.user?.userSettings?.currentActiveKeys
    let _currentKeys = _localState?.user?.userSettings?.currentActiveKeys
    // console.log('state.user.userSettings.currentActiveKeys: ', state.user.userSettings.currentActiveKeys);
    console.log('currentKeys: ', currentKeys);
    console.log('localState currentKeys: ', _currentKeys);

    const setSpecialKeys = (event) => {
        let newActiveKeys = getNewCurrentKeys(event, state)
        store.dispatch({
            type: Types.SET_CURRENT_ACTIVE_KEYS,
            payload: newActiveKeys,
        })
    }
    return {
        "Shift": {
            pressed: state?.user?.userSettings?.skListeners?.shiftPressed,
            setPressed: (newValue, event) => {
                store.dispatch({
                    type: Types.SET_LISTENER_KEY,
                    payload: { shiftKey: newValue }
                })
                setSpecialKeys(_specialKeys.Shift)
            }
        },
        "Alt": {
            pressed: state?.user?.userSettings?.skListeners?.altPressed,
            setPressed: (newValue, event) => {
                store.dispatch({
                    type: Types.SET_LISTENER_KEY,
                    payload: { altKey: newValue }
                })
                setSpecialKeys(_specialKeys.Alt)
            }
        },
        "Meta": {
            pressed: state?.user?.userSettings?.skListeners?.metaPressed,
            setPressed: (newValue, event) => {
                store.dispatch({
                    type: Types.SET_LISTENER_KEY,
                    payload: { metaKey: newValue }
                })
                setSpecialKeys(_specialKeys.Meta)
            }
        },
        "Control": {
            pressed: state?.user?.userSettings?.skListeners?.controlPressed,
            setPressed: (newValue, event) => {
                store.dispatch({
                    type: Types.SET_LISTENER_KEY,
                    payload: { ctrlKey: newValue }
                })

                setSpecialKeys(_specialKeys.Control)
            }
        },
        setSpecialKeys: (newKey) => {
            setSpecialKeys(newKey)
        }
    }
}


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
        SpecialKeys(state)[e.key].setPressed(true)
    }

    if (!SpecialKeys(state)[e.key]) {
        if (disallowKeys.includes(e.key) || e.key === "" || e.key.length > 1) {
            return;
        }
        let newSpecialKeys = state?.user?.userSettings?.currentActiveKeys?.filter((sk) => sk.isSpecialKey)
        console.log('newSpecialKeys state: ', state);
        console.log('newSpecialKeys: p-b', state.user.userSettings.currentActiveKeys);
        console.log('newSpecialKeys factors: ', state?.user?.userSettings?.currentActiveKeys);
        console.log('state', state);
        console.log('sks', state?.user?.userSettings.skListeners, e.repeat);
        let forSomeReasonINeedThis = state?.user?.userSettings?.currentActiveKeys?.filter((sk) => sk.keyCode === e.keyCode)
        console.log('forSomeReasonINeedThis: ', forSomeReasonINeedThis);
        if (forSomeReasonINeedThis?.length > 0 || newSpecialKeys?.length >= 2) {
            return
        }
        store.dispatch({
            type: Types.SET_CURRENT_ACTIVE_KEYS,
            payload: [
                // ...newSpecialKeys,
                {
                    keyCode: e.keyCode,
                    key: e.key,
                    code: e.code,
                    isActive: true,
                    isSpecialKey: false,
                }
            ]
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







export const getNewCurrentKeys = (event, state) => {
    console.log("event", event)
    if (event === "reset") {
        return []
    }
    let currentKeys = state?.user?.userSettings?.currentActiveKeys
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


const handleKeyDown = (e) => {
    console.log('handleKeyDown: ', handleKeyDown);
}

const handleKeyUp = (e) => {
    console.log('handleKeyUp: ', handleKeyUp);
}
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
            SpecialKeys(localState)[e.key].setPressed(true)
        }

        if (!SpecialKeys(localState)[e.key]) {
            if (disallowKeys.includes(e.key) || e.key === "" || e.key.length > 1) {
                return;
            }
            let newSpecialKeys = localState?.user?.userSettings?.currentActiveKeys?.filter((sk) => sk.isSpecialKey)
            console.log('newSpecialKeys: p-b', localState.user.userSettings.currentActiveKeys);
            console.log('newSpecialKeys factors: ', localState?.user?.userSettings?.currentActiveKeys);
            console.log('localState', localState);
            console.log('sks', localState?.user?.userSettings.skListeners, e.repeat);
            let forSomeReasonINeedThis = localState?.user?.userSettings?.currentActiveKeys?.filter((sk) => sk.keyCode === e.keyCode)
            console.log('forSomeReasonINeedThis: ', forSomeReasonINeedThis);
            if (forSomeReasonINeedThis?.length > 0 || newSpecialKeys?.length >= 2) {
                return
            }
            console.log('Types.SET_CURRENT_ACTIVE_KEYS: 245', Types.SET_CURRENT_ACTIVE_KEYS);
            store.dispatch({
                type: Types.SET_CURRENT_ACTIVE_KEYS,
                payload: [
                    // ...newSpecialKeys,
                    {
                        keyCode: e.keyCode,
                        key: e.key,
                        code: e.code,
                        isActive: true,
                        isSpecialKey: false,
                    }
                ]
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