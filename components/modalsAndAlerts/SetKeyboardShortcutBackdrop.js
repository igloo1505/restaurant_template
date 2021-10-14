/* eslint-disable react/prop-types */
import React, { Fragment, useEffect, useState, useRef } from "react";
import clsx from "clsx";
import { connect, useDispatch } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import * as muiColor from "@material-ui/core/colors"
import * as Types from "../../stateManagement/TYPES"
import store from "../../stateManagement/store"
import ClientOnlyPortal from "../portalAuthenticated/ClientSidePortal";
import { gsap } from 'gsap'
import Backdrop from "@material-ui/core/Backdrop";
import * as KeyIcons from "./KeyIcons"
import {updateEventListeners} from '../../util/SettingShortcutsListeners';
import {
    _specialKeys,
    SpecialKeys,
    settingKeysKeydown,
    settingKeysKeyup,
} from "../../util/SettingShortcutsListeners"


const keyIconContainerId = "keyboardShortcutSelectedNotSpecialKey"


const useClasses = makeStyles((theme) => ({
    backdropRoot: {
        zIndex: theme.zIndex.modal + 1,
        // backgroundColor: "rgba(0, 0, 0, 0.5)",
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        // display: "flex",
        display: "grid",
        gridTemplateRows: "50% 50%",
        gridTemplateColumns: "1fr",
        // flexDirection: "column",
        // justifyContent: "center"
    },
    topRow: {
        display: "flex",
        position: "relative",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    bottomRow: {
        display: "flex",
        position: "relative",
        justifyContent: "flex-start",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
}))




const SetKeyboardShortcutBackdrop = ({
    UI: {
        settingsModal: {
            settingKeysBackdrop,
            _startBackdropHide        }
    },
    user: {
        userSettings: {
            keyboardShortcuts: currentShortcuts,
            allowKeyboardShortcuts,
            currentActiveKeys: specialKeys,
            settingProgress: {
                elapsedTime: currentTimerValue,
                originalValue: originalTimerValue,
                toggle: currentToggle
            },
        }
    },
    props
}) => {

    const classes = useClasses();
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(settingKeysBackdrop);
    

    useEffect(() => {
        if(_startBackdropHide){
            setIsOpen(false)
            setTimeout(() => {
                dispatch({
                    type: Types.TOGGLE_SET_KEYS_BACKDROP,
                    payload: {
                        settingKeysBackdrop: false,
                    }
                })
            }, 750)
        }
    }, [_startBackdropHide])

    useEffect(() => {
        if (currentToggle === 3 && specialKeys.length === 3) {
            let _d = 5000
            dispatch({
                type: Types.SET_NEW_CURRENT_SHORTCUTS,
                payload: {
                    banner: {
                        isOpen: true,
                        delay: _d,
                        variant: "success",
                        message: "New Keys Set!"
                    }
                }
            })
            setTimeout(() => {
                dispatch({
                    type: Types.TOGGLE_ADD_RECIPE_KEYBOARD_SHORTCUTS,
                    payload: {
                        settingKeysBackdrop: false
                    }
                })
            }, _d + 1000);
        }
    }, [currentToggle])

    const clearTimer = () => {
        dispatch({
            type: Types.CLEAR_SET_SHORTCUTS_TIMER,
        })
    }


    const handleTimer = ({ otv, specialKeys, ctv, original, currentToggle, clear }) => {
        let timerLimit = 3000
        let timer;
        if (original) {
            timer = new Timer({ otv, specialKeys, ctv, original, currentToggle, clear, timerLimit })
            timer.init(dispatch)
        }
        let elapsedTime = Date.now() - otv
        let startingTimer;

        if (elapsedTime > timerLimit || specialKeys?.length < 3) {
            console.countReset("updateTimer")
            if (startingTimer) {
                clearInterval(startingTimer)
            }
            clearTimer()
        }
    }



    useEffect(() => {
        if (originalTimerValue && specialKeys?.length === 3 && !currentTimerValue) {
            handleTimer({ otv: originalTimerValue, original: true, specialKeys, currentToggle })
        }
        if (originalTimerValue && specialKeys?.length < 3) {
            clearTimer()
        }
    }, [originalTimerValue, currentTimerValue, specialKeys])

    useEffect(() => {
        setIsOpen(settingKeysBackdrop);
        if (settingKeysBackdrop) {
            updateEventListeners("setting")
        }
        
    }, [settingKeysBackdrop])
    const handleBackdropClick = (e) => {
        console.log("did click backdrop", e)
        // if (e.target.id === "set-shortcuts-backdrop") {
        dispatch({
            type: Types.TOGGLE_SET_KEYS_BACKDROP,
            payload: {
                settingKeysBackdrop: false
            }
        })
    }

    const handleBlur = (e) => {
        console.log("dispatch reset activeKeys here", e)
        dispatch({
            type: Types.CLEAR_CURRENT_ACTIVE_KEYS,
        })
    }

    return (
        <ClientOnlyPortal selector="#topLevelPortalContainer">
            <Backdrop classes={{ root: classes.backdropRoot }} open={isOpen} onClick={handleBackdropClick} id="set-shortcuts-backdrop" onBlur={handleBlur} onBeforeInput={(e) => e.preventDefault()}
                onInput={(e) => e.preventDefault()}
            >
                <div className={classes.topRow}>
                    <IconContainer
                        specialKeys={specialKeys}
                        SpecialKeys={SpecialKeys}
                    />
                </div>
                <div className={classes.bottomRow}>
                    <LowerIconContainer
                        SpecialKeys={SpecialKeys}
                    />
                </div>
            </Backdrop>
        </ClientOnlyPortal>
    )
}

const mapStateToProps = (state, props) => ({
    UI: state.UI,
    user: state.user,
    props: props
});

export default connect(mapStateToProps)(SetKeyboardShortcutBackdrop)




const useIconContainerClasses = makeStyles((theme) => ({
    iconContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        gap: "1rem",
        alignItems: "center",
        flexWrap: "wrap",
        width: "min(980px, 85vw)",
        height: "fit-content",
        padding: "1rem",
        // backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    lowerContainer: {
        display: "flex",
        flexDirection: "row",
        width: "min(1280px, 85vw)",
        justifyContent: "space-between",
        gap: "1rem",
        // position: "absolute",
        top: "calc(50vh + 2.5rem)",
        border: `1px solid ${theme.palette.grey[800]}`,
        borderRadius: "10px",
        padding: "1.5rem",
        backgroundColor: "#393939"
    },
    iconContainerActive: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        gap: "1rem",
        alignItems: "center",
        flexWrap: "wrap",
        width: "min(1280px, 85vw)",
        height: "100%",
        padding: "1rem",

    },
    iconRoot: {
        color: theme.palette.primary.main,
        minWidth: "3rem",
        minHeight: "3rem",
        transition: theme.transitions.create(['color'], {
            duration: 350,
        }),
    },
    iconRootActive: {
        // color: theme.palette.primary.main,
        color: "#fff",
        minWidth: "3rem",
        minHeight: "3rem",
        transition: theme.transitions.create(['color'], {
            duration: 350,
        }),
    },
    singleIconContainer: {
        fontSize: "4rem"
    },
    childIconContainer: {
        // fontSize: "4rem"
        padding: "0.75rem",
        minWidth: "fit-content",
        minHeight: "fit-content",
        opacity: 0
    },
    singleIconContainerActive: {
        fontSize: "4rem",
        color: "#fff"
    },
    childIconContainerActive: {
        // fontSize: "4rem"
        padding: "0.75rem",
        minWidth: "fit-content",
        minHeight: "fit-content",
        backgroundColor: theme.palette.primary.main,
        opacity: 1,
        transition: theme.transitions.create(['background-color', 'opacity', 'box-shadow'], {
            duration: 350,
        }),
    },
    keyIconContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        gap: "1rem",
        alignItems: "center",
        flexWrap: "wrap",
        width: "min(980px, 85vw)",
        height: "fit-content",
        padding: "1rem",
        // backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    keyIconContainerActive: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        gap: "1rem",
        alignItems: "center",
        flexWrap: "wrap",
        width: "min(980px, 85vw)",
        height: "100%",
        padding: "1rem",

    },
    keyIconRoot: {
        color: theme.palette.primary.main,
        minWidth: "3rem",
        minHeight: "3rem",
        // transition: theme.transitions.create(['color'], {
        //     duration: 350,
        // }),
    },
    keyIconRootActive: {
        // color: theme.palette.primary.main,
        color: "#fff",
        minWidth: "3rem",
        minHeight: "3rem",
        // transition: theme.transitions.create(['color'], {
        //     duration: 350,
        // }),
    },
    keySingleIconContainer: {
        fontSize: "4rem"
    },
    keyChildIconContainer: {
        // fontSize: "4rem"
        padding: "0.75rem",
        minWidth: "fit-content",
        minHeight: "fit-content",
        opacity: 0
    },
    keySingleIconContainerActive: {
        fontSize: "4rem",
        color: "#fff"
    },
    keyChildIconContainerActive: {
        // fontSize: "4rem"
        padding: "0.75rem",
        minWidth: "fit-content",
        minHeight: "fit-content",
        backgroundColor: theme.palette.primary.main,
        opacity: 1,
        // transition: theme.transitions.create(['background-color', 'opacity'], {
        //     duration: 350,
        // }),
    },
}))


const useKeyIconStyles = makeStyles((theme) => ({
    // SpecialKey Icon here
    iconContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0.75rem",
        marginTop: "15%",
        // transform: "translateY(-50%)",
        // width: "100px",
        // height: "100px",
        minWidth: "100px",
        minHeight: "100px",
        border: `2px solid ${theme.palette.primary.main}`,
        boxShadow: `8px 8px 12px rgba(0, 0, 0, 0.7), -8px - 8px 12px rgba(255, 255, 255, 0.17)`,
        background: "linear-gradient(145deg, #3d3d3d, #333333)",
        // position: "absolute",
        // top: "calc(50vh - 2.5rem)",
        borderRadius: "5px",
        // "&:hover": {
        //     cursor: "pointer"
        // }
    },
    iconText: {
        color: theme.palette.primary.main,
        fontWeight: 600,
        fontSize: "3.25rem",
    }
}))




const _IconContainer = ({
    props: {
        SpecialKeys,
        specialKeys,
    },
    UI: {
        settingsModal: {
            isOpen: settingsModalIsOpen,
            settingKeysBackdrop: editBackdropIsOpen,
        },
    },
    user: {
        userSettings: {
            currentActiveKeys,
            settingProgress: {
                elapsedTime,
                originalValue: originalTimerValue,
                percentage,
                toggle: currentToggle
            },
        }
    }
}) => {
    const classes = useIconContainerClasses();
    const [showAlternativeKeyIcon, setShowAlternativeKeyIcon] = useState(editBackdropIsOpen)
    const [_currentActiveKeys, set_currentActiveKeys] = useState(currentActiveKeys)
    const theme = useTheme()
    useEffect(() => {
        if (showAlternativeKeyIcon) {
            console.count("Called useEffect with showAlternativeKeyIcon")
            console.log("specialKeys", specialKeys)
            animateKeyIconEntrance()
            // animateKeySetting()
        }
    }, [showAlternativeKeyIcon])

    useEffect(() => {
        let _tl = animateKeySetting({ currentToggle })
        if (currentActiveKeys.length < 3) {
            _tl.pause()
            return resetKeySetting()
        }
        if (_currentActiveKeys.length === 3 && currentActiveKeys.length === 2) {
            resetKeyOrientation()
            resetKeySetting()
        }
        set_currentActiveKeys(currentActiveKeys)
    }, [currentToggle])


    // useEffect(() => {
    //     if (elapsedTime > 0) {
    //         animateKeySetting(elapsedTime)
    //     }
    // }, [originalTimerValue])


    useEffect(() => {
        let _f = specialKeys?.length > 0 ? specialKeys?.filter((sk) => !sk?.isSpecialKey)?.[0] : false
        // let _f = false
        console.log('_f: ', currentActiveKeys);
        if (_f) {
            console.log("Setting showAlternativeIcon");
            setShowAlternativeKeyIcon(_f)
        }
        if (!_f) {
            setShowAlternativeKeyIcon(null)
        }
    }, [currentActiveKeys])

    if (showAlternativeKeyIcon) {
        return (
            <KeyIcons.KeyIcon
                ownStyles={useKeyIconStyles}
                keyData={showAlternativeKeyIcon}
                specialKeys={_specialKeys}
                shouldShow={Boolean(showAlternativeKeyIcon)}
                SpecialKeys={SpecialKeys}
                _id={keyIconContainerId}
            />
        )
    }
    else {
        return null
    }
}


const IconContainer = connect(mapStateToProps)(_IconContainer)


const _IndividualIcons = ({
    props: { index,
        classes,
        specialKeys,
        specialKey,
        SpecialKeys,
    },
    user: {
        userSettings: {
            skListeners
        }
    }
}) => {
    const [isActive, setIsActive] = useState(false)


    let ThisIcon = _specialKeys[specialKey.key].icon
    if (ThisIcon) {
        return (
            <div key={index} className={clsx(classes.singleIconContainer, isActive && classes.singleIconContainerActive)}>
                <ThisIcon _className={{ icon: clsx(classes.iconRoot, isActive && classes.iconRootActive), container: clsx(classes.childIconContainer, isActive && classes.childIconContainerActive) }} />
            </div>
        )
    }
    if (!ThisIcon) {
        return (
            <div key={index} className={clsx(classes.keySingleIconContainer, isActive && classes.keySingleIconContainerActive)}>
                <KeyIcons.KeyIcon _className={{ icon: clsx(classes.keyIconRoot, isActive && classes.keyIconRootActive), container: clsx(classes.keyChildIconContainer, isActive && classes.keyChildIconContainerActive) }} />
            </div>
        )
    }
}

const IndividualIcons = connect(mapStateToProps)(_IndividualIcons)



const useLowerIconClasses = makeStyles((theme) => ({
    iconContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        gap: "1rem",
        alignItems: "center",
        flexWrap: "wrap",
        width: "min(980px, 85vw)",
        height: "100%",
        padding: "1rem",
        borderRadius: "15px",
        // backgroundColor: 'rgba(0, 0, 0, 0.7)',

    },
    iconContainerActive: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        gap: "1rem",
        alignItems: "center",
        flexWrap: "wrap",
        width: "min(980px, 85vw)",
        height: "100%",
        padding: "1rem",
        borderRadius: "15px",
    },
    iconRoot: {
        color: theme.palette.primary.main,
        minWidth: "3rem",
        minHeight: "3rem",
        transition: theme.transitions.create(['color'], {
            duration: 350,
        }),
    },
    iconRootActive: {
        // color: theme.palette.primary.main,
        color: "#fff !important",
        minWidth: "3rem",
        minHeight: "3rem",
        transition: theme.transitions.create(['color'], {
            duration: 350,
        }),
    },
    singleIconContainer: {
        fontSize: "4rem"
    },
    singleIconContainerActive: {
        fontSize: "4rem",
        color: "#fff"
    },
    childIconContainer: {
        // fontSize: "4rem"
        padding: "0.75rem",
        // minWidth: "fit-content",
        // minHeight: "fit-content",
        minWidth: "100px",
        minHeight: "100px",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        borderRadius: "15px",
        boxShadow: "12px 12px 18px #2b2b2b, -12px -12px 18px #474747",
        // backgroundColor: "#393939",
        background: "linear-gradient(145deg, #3d3d3d, #333333)",
        border: `1px solid ${theme.palette.grey[800]}`
    },
    childIconContainerActive: {
        // fontSize: "4rem"
        padding: "0.75rem",
        minWidth: "100px",
        minHeight: "100px",
        background: theme.palette.primary.main,
        boxShadow: "4px 4px 8px #2b2b2b, -4px -4px 8px #474747",
        // opacity: 1,
        transition: theme.transitions.create(['background', 'opacity', 'box-shadow'], {
            duration: 350,
        }),
    },
}))


const _LowerIconContainer = ({
    user: {
        userSettings: {
            skListeners
        }
    }
}) => {
    const [listeners, setListeners] = useState({
        shiftKey: false,
        ctrlKey: false,
        metaKey: false,
        altKey: false,
    })

    useEffect(() => {
        setListeners(skListeners)
    }, [skListeners])

    const classes = useIconContainerClasses();
    return (
        <div className={classes.lowerContainer}>
            {Object.keys(_specialKeys).map((sk, index) => {
                return <LowerIcon sk={sk} key={`key - ${index}`} SpecialKeys={SpecialKeys}
                    controlPressed={listeners}
                    metaPressed={listeners.metaKey}
                    altPressed={listeners.altKey}
                    shiftPressed={listeners.shiftKey}
                    index={index}
                    skListeners={skListeners}
                />
            })
            }
        </div>
    )
}


const useLowerIconStyles = makeStyles((theme) => ({
    iconContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        gap: "1rem",
        alignItems: "center",
        flexWrap: "wrap",
        width: "min(980px, 85vw)",
        height: "100%",
        padding: "1rem",
        // backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    iconContainerActive: {

    },
    iconText: {

    },
    iconTextActive: {

    },
    // iconContainer: {
    //     display: "flex",
    //     flexDirection: "row",
    //     justifyContent: "space-around",
    //     gap: "1rem",
    //     alignItems: "center",
    //     flexWrap: "wrap",
    //     width: "min(980px, 85vw)",
    //     height: "100%",
    //     padding: "1rem",
    //     backgroundColor: 'rgba(0, 0, 0, 0.7)',

    // },
    // iconContainerActive: {
    //     display: "flex",
    //     flexDirection: "row",
    //     justifyContent: "space-around",
    //     gap: "1rem",
    //     alignItems: "center",
    //     flexWrap: "wrap",
    //     width: "min(980px, 85vw)",
    //     height: "100%",
    //     padding: "1rem",

    // },
    // iconRoot: {
    //     color: theme.palette.primary.main,
    //     minWidth: "3rem",
    //     minHeight: "3rem",
    //     transition: theme.transitions.create(['color'], {
    //         duration: 350,
    //     }),
    // },
    // iconRootActive: {
    //     // color: theme.palette.primary.main,
    //     color: "#fff !important",
    //     minWidth: "3rem",
    //     minHeight: "3rem",
    //     transition: theme.transitions.create(['color'], {
    //         duration: 350,
    //     }),
    // },
    // singleIconContainer: {
    //     fontSize: "4rem"
    // },
    // childIconContainer: {
    //     // fontSize: "4rem"
    //     padding: "0.75rem",
    //     // minWidth: "fit-content",
    //     // minHeight: "fit-content",
    //     minWidth: "100px",
    //     minHeight: "100px",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     display: "flex"
    //     // opacity: 0
    // },

}))

const LowerIcon = ({
    sk,
    controlPressed,
    metaPressed,
    altPressed,
    index,
    shiftPressed,
    skListeners
}) => {
    const [isActive, setIsActive] = useState(false)
    useEffect(() => {
        setIsActive(skListeners[_specialKeys[sk].booleanCheck])
    }, [skListeners])
    const classes = useLowerIconClasses();
    let ThisIcon = _specialKeys[sk].icon
    return (<ThisIcon _className={{ icon: clsx(classes.iconRoot, isActive && classes.iconRootActive), container: clsx(classes.childIconContainer, isActive && classes.childIconContainerActive) }}
        ownStyles={useLowerIconStyles}
        id={isActive ? "active-key-icon-container" : `key - icon - container - ${index}`} />
    )
}



const LowerIconContainer = connect(mapStateToProps)(_LowerIconContainer)



const animateKeyIconEntrance = () => {
    console.count("ANIMATING KEY ICON ENTRANCEE")
    const duration = Math.random() * 5 + 0.5
    // let tl = gsap.timeline({})
    // let rs = Math.floor(Math.random() * 360)
    const _rotateX = Math.random() * 360
    const _rotateY = Math.random() * 360
    const _rotateZ = Math.random() * 360;
    let _radius = 100
    let _a = Math.random() * 180 + 90

    let _x = _radius * Math.sin(Math.PI * 2 * _a / 360)
    let _y = _radius * Math.cos(Math.PI * 2 * _a / 360)
    console.log('_rotateY: ', _rotateY);
    console.log('_rotateX: ', _rotateX);
    const fromArray = [{
        y: _y,
        x: _x,
        opacity: 0,
        scale: 0.3,
        // rotation: Math.random() > 0.5 ? -360 : 360,
        rotateY: Math.random() > 0.5 ? `${_rotateY}deg` : ` -${_rotateY}deg`,
        rotateX: Math.random() > 0.5 ? `${_rotateX}deg` : ` -${_rotateX}deg`,
        rotateZ: Math.random() > 0.5 ? `${_rotateZ}deg` : ` -${_rotateZ}deg`,
        duration: 0.5,
        // ease: "bounce.out"
        ease: "back.out(1.7)"
        // ease: "rough({ template: none.out, strength: 1, points: 20, taper: 'none', randomize: true, clamp: false})"
    }]

    gsap.fromTo("#keyboardShortcutSelectedNotSpecialKey", {
        y: _y,
        x: _x,
        opacity: 0,
        scale: 0.3,
        // rotation: Math.random() > 0.5 ? -60 : 360,
        rotateY: Math.random() > 0.5 ? `${_rotateY}deg` : ` -${_rotateY}deg`,
        rotateX: Math.random() > 0.5 ? `${_rotateX}deg` : ` -${_rotateX}deg`,
        rotateZ: Math.random() > 0.5 ? `${_rotateZ}deg` : ` -${_rotateZ}deg`,
        duration: 0.5,
        // ease: "bounce.out"
        ease: "back.out(1.7)"
        // ease: "rough({ template: none.out, strength: 1, points: 20, taper: 'none', randomize: true, clamp: false})"
    }, {
        y: 0,
        x: 0,
        opacity: 1,
        scale: 1,
        rotateX: 0,
        rotation: 0,
        rotateY: 0,
        rotateZ: 0,
        duration: 0.5,
        ease: "back.out(1.7)",
    })
    // gsap.from(`#${keyIconContainerId}`, {
    //     y: -100,
    //     opacity: 0.5,
    //     scale: 0.5,
    //     rotateX: -180,
    //     duration: 2.5,
    //     ease: "power3.inOut"
    // })
}








class Timer {
    constructor({ otv, specialKeys, ctv, timerLimit, original, currentToggle, clear }) {
        this.originalValue = otv
        // if (ctv) {
        //     this.currentValue = ctv
        // }
        this.currentToggle = -1
        this.percentage = 0
        this.elapsedTime = 0
        this.specialKeys = specialKeys
        this.timerLimit = timerLimit
        this.updateValue = function (dispatch) {
            console.log("updating timer class: ", this.originalValue)
            console.log("updating timer class: date.now", Date.now())
            console.log("updating timer class: difference", Date.now() - this.originalValue)
            let elapsedTime = Date.now() - this.originalValue
            this.elapsedTime = elapsedTime
            this.currentToggle = this.currentToggle + 1
            this.percentage = elapsedTime / this.timerLimit * 100
            console.log("This dot currentToggle", this.currentToggle)
            dispatch({
                type: Types.UPDATE_SHORTCUT_TIMER,
                payload: {
                    elapsedTime: elapsedTime,
                    // elapsedTime: 0,
                    currentToggle: this.currentToggle + 1,
                    percentage: elapsedTime / this.timerLimit * 100
                }
            })
        }
        this.init = function (dispatch) {
            const updateAndDispatch = () => {
                let elapsedTime = Date.now() - this.originalValue
                this.elapsedTime = Date.now() - this.originalValue
                this.currentToggle = this.currentToggle + 1
                this.percentage = this.elapsedTime / this.timerLimit * 100
                // debugger
                console.log("dis dot currentToggle", this)
                if (this.currentToggle > 3) {
                    clearInterval(thisInterval)
                    console.log("handle submitting keys here")
                    return
                }
                dispatch({
                    type: Types.UPDATE_SHORTCUT_TIMER,
                    payload: {
                        elapsedTime: elapsedTime,
                        currentToggle: this.currentToggle,
                        percentage: this.percentage
                    }
                })
            }
            updateAndDispatch()
            let thisInterval = setInterval(updateAndDispatch, 1000);
        }
    }
}

const animateKeySetting = ({ currentToggle }) => {
    let _r = Math.floor(currentToggle / 3 * 360)
    let _colors = [
        "#227ce6",
        "#D500F9",
        "#eb6010",
        "#76FF03"
    ]
    let tl = gsap.timeline()
    console.log('new timeline scale parseFloat(`1.${currentToggle * 2}`): ', parseFloat(`1.${currentToggle * 2}`), currentToggle);
    console.log('currentToggle: ', currentToggle);
    tl.to(`#${keyIconContainerId}-childIcon`, {
        rotateZ: "360deg",
        color: "#fff",
        scale: parseFloat(`1.${currentToggle * 2}`),
        duration: 0.5,
        ease: "back.out(1.9)"
    })
    tl.to(`#${keyIconContainerId}`, {
        y: -100,
        background: _colors[currentToggle],
        rotateZ: `-${_r}deg`,
        color: "#fff",
        border: "2px solid #fff",
        scale: parseFloat(`1.${currentToggle * 2}`),
        duration: 0.5,
        ease: "back.out(1.9)"
    })
    if (currentToggle === 3) {
        let nS = parseFloat(`1.${currentToggle * 2}`)
        tl.to(`#${keyIconContainerId}`, {
            y: -50,
            x: -50,
            background: _colors[currentToggle],
            rotateZ: `-${_r - 15}deg`,
            color: "#fff",
            // border: "4px solid #51a1ff",
            scale: nS * 1.05,
            duration: 0.35,
        }, "+=0.2")
        tl.to(`#${keyIconContainerId}`, {
            y: 0,
            x: -100,
            background: _colors[currentToggle],
            rotateZ: `-${_r - 30}deg`,
            color: "#fff",
            // border: "4px solid #51a1ff",
            scale: nS * 1.1,
            duration: 0.35,
        }, "+=0.2")
        let ab = document.getElementById("accountIconButton")
        let ki = document.getElementById(keyIconContainerId)
        if (ab && ki) {
            let abL = {
                x: ki.offsetTop - ab.offsetTop
            }
            let cw = window.innerWidth
            tl.to(`#${keyIconContainerId}`, {
                background: _colors[currentToggle],
                rotateZ: "-1080deg",
                color: "#fff",
                y: ab.offsetTop - ki.offsetTop,
                x: ab.offsetLeft - ki.offsetLeft,
                zIndex: 999999,
                // border: "4px solid #51a1ff",
                opacity: 0,
                scale: 0,
                duration: 0.75,
            }, "+=0.2")
        }
    }
    return tl
}


const resetKeySetting = () => {
    let tl = gsap.timeline()
    tl.to(`#${keyIconContainerId}`, {
        y: 0,
        x: 0,
        background: "linear-gradient(145deg, #3d3d3d, #333333)",
        border: "1px solid #424242",
        scale: 1.0,
        rotateZ: "360deg",
        duration: 0.5,
        ease: "back.out(1.4)"
    }, 0)
    tl.to(`#${keyIconContainerId}-childIcon`, {
        color: "#268AFF",
        scale: 1.0,
        duration: 0.5,
        rotateZ: "360deg",
        ease: "back.out(1.4)"
    }, 0)
    return tl
}
