/* eslint-disable react/prop-types */
import React, { Fragment, useEffect, useState, useRef } from "react";
import clsx from "clsx";
import { connect, useDispatch } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import * as Types from "../../stateManagement/TYPES"
import store from "../../stateManagement/store"
import ClientOnlyPortal from "../portalAuthenticated/ClientSidePortal";
import { gsap } from 'gsap'
import Backdrop from "@material-ui/core/Backdrop";
import * as KeyIcons from "./KeyIcons"
import { ClassNames } from "@emotion/react";
import {
    _specialKeys,
    SpecialKeys,
    settingKeysKeydown,
    settingKeysKeyup,
} from "../../util/SettingShortcutsListeners"


const keyIconContainerId = "keyboardShortcutSelectedNotSpecialKey"

gsap.registerEffect({
    name: "pulse",
    effect: ({ elapsedTime, percentage }) => {
        let tl = gsap.timeline({
            defaults: {
                ease: "power1.inOut",
                duration: 0.5,
            }
        })
        tl.to(`#${keyIconContainerId}`, {
            scale: 1.6,
            repeat: 1,
            yoyo: true,
            stagger: 0.1,
        })
        return tl
    }
}
)

gsap.registerEffect({
    name: "secondaryShift",
    effect: ({ theme }) => {
        gsap.to(`#${keyIconContainerId}`, {
            scale: 1.6,
            duration: 2,
            background: "#EB6010 !important",
            border: "1px solid #EB6010",
            color: "#fff",
            ease: "back.out(1.3)",
        })
    }
})
gsap.registerEffect({
    name: "shiftBackwards",
    effect: ({ theme }) => {
        console.log("running shiftBackwards");
        gsap.to(`#${keyIconContainerId}`, {
            scale: 1.0,
            duration: 2,
            background: "#268AFF !important",
            border: "1px solid #268AFF",
            color: "#fff",
            ease: "back.out(1.3)",
        })
    }
})



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
        }
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
    const [controlPressed, setControlPressed] = useState(false)
    const [metaPressed, setMetaPressed] = useState(false)
    const [altPressed, setAltPressed] = useState(false)


    const clearTimer = () => {
        // console.trace("Called clearTimer")
        dispatch({
            type: Types.CLEAR_SET_SHORTCUTS_TIMER,
        })
    }

    const handleTimer = ({ otv, specialKeys, ctv, original, currentToggle, clear }) => {
        let timerLimit = 3000
        let timer = new Timer({ otv, specialKeys, ctv, original, currentToggle, clear, timerLimit })
        console.log('originalTimerValue: timer', currentTimerValue);
        console.log('timer class: timer', timer);
        console.log('specialKeys: timer', specialKeys);
        if (original) {
            return dispatch({
                type: Types.UPDATE_SHORTCUT_TIMER,
                payload: {
                    elapsedTime: timer.elapsedTime,
                    percentage: timer.percentage,
                    toggle: timer.currentToggle,
                }
            })
        }
        console.log('timer class down here: ', timer);
        let elapsedTime = Date.now() - otv
        console.log('elapsedTime: timer class', `${timer.percentage}%`);
        let startingTimer;
        if (timer.percentage < 100 && specialKeys?.length === 3) {
            timer.updateValue(dispatch)
            // dispatch({
            //     type: Types.UPDATE_SHORTCUT_TIMER,
            //     payload: {
            //         elapsedTime: elapsedTime,
            //         percentage: elapsedTime / 50,
            //     }
            // })
        }
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
            console.log("clearing timer");
            clearTimer()
        }
        if (specialKeys?.length === 3) {
            setTimeout(() => {
                handleTimer({ otv: originalTimerValue, original: false, specialKeys, currentToggle })
            }, 1000);
        }
    }, [originalTimerValue, currentTimerValue, specialKeys])


    // useEffect(() => {
    //     console.log("Running handleTimer");
    //     handleTimer({ ctv: currentTimerValue })
    // }, [currentTimerValue])




    useEffect(() => {
        // BUG remove this... just reintroduced this to mess with the UI for now.
        console.log('SpecialKeys: ', SpecialKeys);
        // SpecialKeys().setSpecialKeys("reset")
    }, [])


    useEffect(() => {
        console.log('settingKeysBackdrop: ', settingKeysBackdrop);
        setIsOpen(settingKeysBackdrop);
    }, [settingKeysBackdrop])
    const handleBackdropClick = (e) => {
        if (e.target.id === "set-shortcuts-backdrop") {
            dispatch({
                type: Types.TOGGLE_SET_KEYS_BACKDROP,
                payload: {
                    settingKeysBackdrop: false
                }
            })
        }
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
        "&:hover": {
            cursor: "pointer"
        }
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
                percentage
            },
        }
    }
}) => {
    const classes = useIconContainerClasses();
    const [showAlternativeKeyIcon, setShowAlternativeKeyIcon] = useState(editBackdropIsOpen)
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
        // if (!elapsedTime) {
        //     gsap.effects.shiftBackwards()
        // }
        // if (theme) {
        //     gsap.effects.secondaryShift({ theme })
        // }
        if (currentActiveKeys.length < 3) {
            return resetKeySetting()
        }
        animateKeySetting({ elapsedTime, percentage })
    }, [elapsedTime, percentage])


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

const LowerIcon = ({ sk, controlPressed,
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
        rotateY: Math.random() > 0.5 ? `${_rotateY}deg` : ` - ${_rotateY}deg`,
        rotateX: Math.random() > 0.5 ? `${_rotateX}deg` : ` - ${_rotateX}deg`,
        rotateZ: Math.random() > 0.5 ? `${_rotateZ}deg` : ` - ${_rotateZ}deg`,
        duration: 0.5,
        // ease: "bounce.out"
        ease: "back.out(1.7)"
        // ease: "rough({ template: none.out, strength: 1, points: 20, taper: 'none', randomize: true, clamp: false})"
    }]

    gsap.fromTo(`#${keyIconContainerId}`, fromArray[Math.floor(Math.random() * fromArray.length)], {
        y: 0,
        x: 0,
        opacity: 1,
        scale: 1,
        rotateX: 0,
        rotation: 0,
        rotateY: 0,
        rotateZ: 0,
        duration: 0.5,
        // ease: "elastic",
        ease: "back.out(1.7)",
        // ease: "rough({ template: none.out, strength: 1, points: 20, taper: 'none', randomize: true, clamp: false})"
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
        this.currentToggle = 0
        this.percentage = 0
        this.elapsedTime = 0
        this.specialKeys = specialKeys
        this.timerLimit = timerLimit
        if (original) {
            this.currentToggle = currentToggle || 2
        }
        this.updateValue = function (dispatch) {
            console.log("updating timer class: ", this.originalValue)
            console.log("updating timer class: date.now", Date.now())
            console.log("updating timer class: difference", Date.now() - this.originalValue)
            let elapsedTime = Date.now() - this.originalValue
            this.elapsed = elapsedTime
            this.currentToggle = this.currentToggle + 1
            this.percentage = elapsedTime / this.timerLimit * 100
            console.log('percentage: timer class', elapsedTime / this.timerLimit * 100);
            dispatch({
                type: Types.UPDATE_SHORTCUT_TIMER,
                payload: {
                    // elapsedTime: elapsedTime,
                    elapsedTime: 0,
                    currentToggle: this.currentToggle + 1,
                    percentage: elapsedTime / this.timerLimit * 100
                }
            })
        }
    }
}

const animateKeySetting = ({ }) => {
    gsap.to(`#${keyIconContainerId}-childIcon`, {
        // y: -100,
        // background: "#eb6010",
        color: "#fff",
        scale: 1.4,
        duration: 0.5,
        ease: "back.out(1.4)"
    })
    gsap.to(`#${keyIconContainerId}`, {
        y: -100,
        background: "#eb6010",
        color: "#fff",
        border: "2px solid #fff",
        scale: 1.4,
        duration: 0.5,
        ease: "back.out(1.4)"
    })
}

const resetKeySetting = () => {
    gsap.to(`#${keyIconContainerId}`, {
        y: 0,
        background: "linear-gradient(145deg, #3d3d3d, #333333)",
        border: "1px solid #424242",
        scale: 1.0,
        duration: 0.5,
        ease: "back.out(1.4)"
    })
    gsap.to(`#${keyIconContainerId}-childIcon`, {
        color: "#268AFF",
        scale: 1.0,
        duration: 0.5,
        ease: "back.out(1.4)"
    })
}