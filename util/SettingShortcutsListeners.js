
import * as KeyIcons from "../components/modalsAndAlerts/KeyIcons"
import store from "../stateManagement/store"
import * as Types from "../stateManagement/TYPES"
import { skEnum } from "../stateManagement/userReducer"



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
                
                let newActiveKeys = getNewCurrentKeys({ event, state: this?.state })
                console.log('newActiveKeys: coming from setSpecialKeys', newActiveKeys);
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

export const settingKeysKeydown = (e) => {
    let state = store.getState();

    const bypassKeys = ["Escape", "Tab", "Enter", "Control", "Alt"]
    
    if (!bypassKeys.includes(e.key)) {
        e.preventDefault()
        e.stopPropagation()
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
        console.log('newActiveKeys: coming from 175', newSpecialKeys);
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



const mainShortcutModalListener = (e) => {
    console.log("Coming from listener mainShortcutModalListener")
    let state = store.getState();
    if(!state?.user?.userSettings?.allowKeyboardShortcuts){
        return
    }
    if(e.repeat){
        return
    }
    let csk = state?.user?.userSettings?.keyboardShortcuts
    if(csk){

        let fs = csk.filter((sk) => Boolean(sk.booleanCheck)).every((sk) => Boolean(e[sk.booleanCheck]))
        let nfs = csk.filter((sk) => !sk.booleanCheck)[0]
        if (fs && e.key === nfs?.key) {
            console.log('e: cnt', e);
            store.dispatch({
                type: Types.TOGGLE_ADD_RECIPE_KEYBOARD_SHORTCUTS,
                payload: { 
                    nfs
                }
            })
        }
    }
}





export const getNewCurrentKeys = ({ event, reset, state, metaKeys, ...rest }) => {
    if (reset) {
        return []
    }
    
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
            rKeys = [...currentKeys?.filter((ck) => ck.isSpecialKey), newKey]
        }
        if (newKey.isSpecialKey) {
            
            let nsk = currentKeys?.filter((ck) => !ck?.isSpecialKey)?.[0]
            nsk && rKeys.push(nsk)
            if (currentKeys?.filter(ck => ck?.isSpecialKey).length <= 1) {
                let osk = currentKeys?.find(ck => ck?.isSpecialKey)
                osk && rKeys.push(osk)
                
            }
        }
        return rKeys
    }
    if (event.type === "keyup") {        
        return currentKeys?.filter((sk) => sk?.keyCode !== event.keyCode)
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
//     
// }

// const handleKeyUp = (e) => {
//     
// }

// TODO add filter to remove cntrl key press but still push to state to avoid weird characters like ??? 
const Listeners = {
    settingKeyDownListener: (e) => {
        console.log('Coming from listener settingKeyDownListener: settingKeyDownListener');
        
        e.preventDefault()
        e.stopPropagation()
        
        if (SpecialKeys(localState)?.[e.key]) {
            SpecialKeys(localState)?.[e.key]?.setPressed(true, e)
        }
        let localState = store.getState();
        if(!localState?.user?.userSettings?.allowKeyboardShortcuts){
            return
        }
        
        const bypassKeys = ["Escape", "Tab", "Enter"]
        if (!bypassKeys.includes(e.key)) {
            e.preventDefault()
            e.stopPropagation()
        }
        if (e.repeat) {
            return
        };
        if (e.altKey) {
            e.preventDefault()
            e.stopPropagation()
        }
        if (!e.altKey) {
            if (!SpecialKeys(localState)[e.key]) {
                if (disallowKeys.includes(e.key) || e.key === "" || e.key.length > 1) {
                    return;
                }
                let newSpecialKeys = getNewCurrentKeys({ event: e, state: localState })
                console.log('newActiveKeys: coming from setSpecialKeys', newSpecialKeys);
                store.dispatch({
                    type: Types.SET_CURRENT_ACTIVE_KEYS,
                    payload: {
                        currentActiveKeys: newSpecialKeys
                    }
                })
                
                let skKey = localState?.user?.userSettings?.skString
                if(skKey){
                    updateEventListeners(skKey)       
                }
            }
        }
    },
    settingKeyUpListener: (e) => {
        console.log('Coming from listener settingKeyUpListener');
        
        let localState = store.getState();
        
        if(!localState?.user?.userSettings?.allowKeyboardShortcuts){
            return
        }
        // e.preventDefault()
        if (e.repeat) {
            return
        }
        if (SpecialKeys()[e.key]) {
            SpecialKeys()[e.key].setPressed(false, e)
        }
        if(localState?.user?.userSettings?.currentActiveKeys.filter(sk => sk?.key === e.key) && localState?.user?.userSettings?.currentActiveKeys?.length === 3){
            store.dispatch({
                type: Types.CLEAR_SET_SHORTCUTS_TIMER,
                // payload: {
                //     currentActiveKeys: []
                // }
            })
        }
        if (e.key === "Meta") {
            store.dispatch({
                type: Types.CLEAR_CURRENT_ACTIVE_KEYS
            })
        }
        SpecialKeys(localState).setSpecialKeys(e)
    },
    hasOwnKeyUpListener: (e) => {
        let localState = store.getState()
        if(!localState?.user?.userSettings?.allowKeyboardShortcuts){
            return
        }
        mainShortcutModalListener(e)
        console.log('Coming from listener hasOwnKeyUpListener');
        
    },
    hasOwnKeyDownListener: (e) => {
        let localState = store.getState()
        if(!localState?.user?.userSettings?.allowKeyboardShortcuts){
            return
        }
        mainShortcutModalListener(e)
        console.log('Coming from listener hasOwnKeyDownListener');
        
    }
}


const clearKeyListeners = (state) => {
    let newSkString = state?.user?.userSettings?.skString
    if (newSkString && typeof window !== "undefined") {
        console.log('window.CURRENT_LISTENERS: up here', window.CURRENT_LISTENERS);
        Object.keys(Listeners).map((l) => {
            let r = new RegExp("keydown", "gi")
            let type = r.test(l) ? "keydown" : "keyup"
            let controllers = window.CURRENT_LISTENERS
            console.log("CURRENT_LISTENERS controllers cnt", controllers, typeof controllers)
            if(controllers){
                // Object.keys(controllers).map((c) => controllers[c].abort())
    
                Object.keys(controllers).forEach((c) => {
                    let cnt = controllers[c]
                    // debugger
                    console.log('cnt: ', cnt);
                    cnt?.controller?.abort()
                    window.removeEventListener(cnt.type, cnt.listener)                    
                    delete window.CURRENT_LISTENERS[cnt]
                    console.log('cnt: ', cnt);
                    console.log('cnt: ', cnt);
                    console.log('cnt: ', JSON.stringify(cnt));
                    // cnt?.controller?.abort()
                })
            }
            console.log("CURRENT_LISTENERS controllers DOWN HERE", window.CURRENT_LISTENERS)
            window.removeEventListener(type, Listeners[l])
        })
        window.CURRENT_LISTENERS = {}
        console.log('window.CURRENT_LISTENERS: ', window.CURRENT_LISTENERS);

    }
}



export const updateEventListeners = (key, _type) => {
    let state = store.getState()
    // if(key){
    //     store.dispatch({
    //         type: Types.SET_SK_STRING,
    //         payload: key
    //     })
    // }
    // let skString = state?.user?.userSettings?.skString
    clearKeyListeners(state)
    if(typeof window !== "undefined"){
        let _l = Listeners[`${key}KeyDownListener`]
        let _lu = Listeners[`${key}KeyUpListener`]
        if (_l) {
            let controller = new AbortController()
    
            window.addEventListener("keydown", _l, {
                signal: controller.signal
            })
            window.CURRENT_LISTENERS  = {
                ...window.CURRENT_LISTENERS,
                settingKeyDownListener: {
                    type: "keydown",
                    listener: _l,
                    controller: controller,
                },
                }
            }
        if (_lu) {
            let controller = new AbortController()
            let type = "keyup"
            window.addEventListener(type, _lu, {
                signal: controller.signal
            })
            window.CURRENT_LuISTENERS  = {
                ...window.CURRENT_LISTENERS,
                settingKeyDownListeneru: {
                    type: "keyup",
                    listener: _lu,
                    controller: controller,
                },
                }
            }
            
        }
}



export const handleEventListeners = () => {
    let state = store.getState();
    const handleStoreUpdate = () => {
        let localState = store.getState();
        let newSkString = localState?.user?.userSettings?.skString
        let oldSkString = state?.user?.userSettings?.skString
        state.user.userSettings.skString = newSkString
        if (newSkString && (newSkString !== oldSkString || newSkString === "setting")) {
            clearKeyListeners(state)
            Object.keys(Listeners).map((l) => {
                let r = new RegExp("keydown", "gi")
                let type = r.test(l) ? "keydown" : "keyup"
                let controller = new AbortController()
                console.log('newSkString: window.current_listeners', newSkString);
                let _listener = Listeners[`${newSkString}KeyDownListener`]
                console.log('Window.c newSkString: ', newSkString);
                // debugger
                if(_listener){
                    window.addEventListener(type, _listener, {
                        signal: controller.signal
                    })
                    window.CURRENT_LISTENERS = {
                        ...window?.CURRENT_LISTENERS,
                        [l]: {
                            type,
                            controller,
                            listener: _listener
                        }
                    }
                }
                
            })
        }
    }
    let unSubscribe = store.subscribe(handleStoreUpdate)
    
    if (typeof window !== undefined) {
        let csk = state?.user?.userSettings?.keyboardShortcuts
        if (state?.user?.userSettings?.allowKeyboardShortcuts && csk && csk?.filter((sk) => Boolean(sk?.booleanCheck)).length >= 2) {
            clearKeyListeners(state)
            let controller = new AbortController()
            window.CURRENT_LISTENERS = {
                ...window?.CURRENT_LISTENERS,
                mainShortcutModalListener: {
                    type: "keydown",
                    controller: controller,
                    listener: mainShortcutModalListener
                }
            }
            window.addEventListener("keydown", mainShortcutModalListener, {
                signal: controller.signal
            })           
        }
        if (state?.UI?.settingsModal?.settingKeysBackdrop) {
            // window.addEventListener("keydown", Listeners[`${state?.user?.userSettings?.skString}KeyDownListener`]);
            // window.addEventListener("keyup", Listeners[`${state?.user?.userSettings?.skString}KeyUpListener`]);
        }
    }

    if (!state?.user?.userSettings?.allowKeyboardShortcuts || !state?.UI?.settingsModal?.settingKeysBackdrop && state?.user?.userSettings?.skString === "setting") {
        // let x = window.removeEventListener("keydown", Listeners[`${state?.user?.userSettings?.skString}KeyDownListener`]);
        // let controller = window.localStorage.getItem(`${state?.user?.userSettings?.skString}KeyDownListener`)
        // if(controller) {
        //     // Remove this or change the way this is handled once you figure out where the listerner is being set
        //     clearKeyListeners(state)
        // }
        // window.removeEventListener("keyup", Listeners[`${state?.user?.userSettings?.skString}KeyUpListener`]);
    }
}