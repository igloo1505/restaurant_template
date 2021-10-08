/* eslint-disable react/prop-types */
import React, { Fragment, useEffect, useState, useRef } from "react";
import clsx from "clsx";
import { connect, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import * as Types from "../../stateManagement/TYPES"
import ClientOnlyPortal from "../portalAuthenticated/ClientSidePortal";
import { gsap } from 'gsap'
import Backdrop from "@material-ui/core/Backdrop";
import * as KeyIcons from "./KeyIcons"
import { ClassNames } from "@emotion/react";

const useClasses = makeStyles((theme) => ({
    backdropRoot: {
        zIndex: theme.zIndex.modal + 1,
        // backgroundColor: "rgba(0, 0, 0, 0.5)",
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    }
}))


const disallowKeys = [
    "CapsLock",
    "Tab",
    "Enter",
]
// TODO MAKE SURE TO FILTER OUT e.SHIFTPRESSED AND META AND CONTROL FOR !SPECIALKEYS  
// TODO add arrow key icons or disallow arrow keys
const _specialKeys = {
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
            currentActiveKeys: specialKeys
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
    const [shiftPressed, setShiftPressed] = useState(false)

    const setSpecialKeys = (sk) => {
        dispatch({
            type: Types.SET_CURRENT_ACTIVE_KEYS,
            payload: sk
        })
    }




    const SpecialKeys = {
        "Shift": {
            pressed: shiftPressed,
            setPressed: (newValue) => {
                setShiftPressed(newValue)

                let newKeys = [...specialKeys].filter((sk) => !sk?.isSpecialKey)?.slice(newKeys?.length - 2, newKeys?.length)
                if (newKeys?.length >= 2) {
                    newKeys = newKeys?.splice(newKeys?.length - 1, 1)
                }
                delete _specialKeys.Shift.icon
                setSpecialKeys([
                    _specialKeys.Shift
                ]
                )
            }
        },
        "Alt": {
            pressed: altPressed,
            setPressed: (newValue) => {
                setAltPressed(newValue)

                let newKeys = [...specialKeys].filter((sk) => !sk?.isSpecialKey)?.slice(newKeys?.length - 2, newKeys?.length)
                if (newKeys?.length >= 2) {
                    newKeys = newKeys?.splice(newKeys?.length - 1, 1)
                }
                cons
                delete _specialKeys.Alt.icon

                setSpecialKeys([
                    _specialKeys.Alt
                ]
                )
            }
        },
        "Meta": {
            pressed: metaPressed,
            setPressed: (newValue) => {
                setMetaPressed(newValue)

                let newKeys = [...specialKeys].filter((sk) => !sk?.isSpecialKey)?.slice(newKeys?.length - 2, newKeys?.length)
                if (newKeys?.length >= 2) {
                    newKeys = newKeys.splice(newKeys.length - 1, 1)
                }
                delete _specialKeys.Meta.icon
                setSpecialKeys([
                    _specialKeys.Meta
                ]
                )
            }
        },
        "Control": {
            pressed: controlPressed,
            setPressed: (newValue) => {
                setControlPressed(newValue)
                let newKeys = [...specialKeys].filter((sk) => !sk?.isSpecialKey)?.slice(newKeys?.length - 2, newKeys?.length)
                if (newKeys?.length >= 2) {
                    newKeys = newKeys?.splice(newKeys?.length - 1, 1)
                }
                delete _specialKeys.Control.icon
                setSpecialKeys([
                    _specialKeys.Control
                ]
                )
            }
        },
    }
    useEffect(() => {
        // BUG remove this... just reintroduced this to mess with the UI for now.
        setSpecialKeys(currentShortcuts)
    }, [currentShortcuts])

    const handleKeyDown = (e) => {
        e.preventDefault()
        if (e.repeat) {
            return
        };
        if (SpecialKeys[e.key]) {
            SpecialKeys[e.key].setPressed(true)
        }

        if (!SpecialKeys[e.key]) {
            console.log('e!!!: ', e);
            if (disallowKeys.includes(e.key) || e.key === "" || e.key.length > 1) {
                return;
            }
            let newSpecialKeys = [...specialKeys].filter((sk) => sk.isSpecialKey)
            console.log('newSpecialKeys: ', newSpecialKeys);
            console.log('specialKeys right above filter: ', specialKeys);
            let forSomeReasonINeedThis = [...specialKeys].filter((sk) => sk.keyCode === e.keyCode)
            console.log('forSomeReasonINeedThis: ', forSomeReasonINeedThis);
            if (forSomeReasonINeedThis.length > 0) {

                return
            }
            setSpecialKeys([
                ...newSpecialKeys,
                {
                    keyCode: e.keyCode,
                    key: e.key,
                    code: e.code,
                    isActive: true,
                    isSpecialKey: false,
                }
            ])
        }
    }
    const handleKeyUp = (e) => {
        e.preventDefault()
        if (e.repeat) {
            return
        };
        if (SpecialKeys[e.key]) {
            SpecialKeys[e.key].setPressed(false)
        }
        if (!SpecialKeys[e.key]) {
            let newKeys = [...specialKeys].filter((sk) => sk.key !== e.key)
            // TODO add this back in once UI looks good.
            setSpecialKeys(newKeys)
        }
    }

    useEffect(() => {
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

    return (
        <ClientOnlyPortal selector="#topLevelPortalContainer">
            <Backdrop classes={{ root: classes.backdropRoot }} open={isOpen} onClick={handleBackdropClick} id="set-shortcuts-backdrop">
                <IconContainer
                    specialKeys={specialKeys}
                    controlPressed={controlPressed}
                    setControlPressed={setControlPressed}
                    metaPressed={metaPressed}
                    setMetaPressed={setMetaPressed}
                    altPressed={altPressed}
                    setAltPressed={setAltPressed}
                    shiftPressed={shiftPressed}
                    setShiftPressed={setShiftPressed}
                    SpecialKeys={SpecialKeys}

                />
                <LowerIconContainer
                    SpecialKeys={SpecialKeys}
                    controlPressed={controlPressed}
                    metaPressed={metaPressed}
                    altPressed={altPressed}
                    shiftPressed={shiftPressed}
                />
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
        width: "min(980px, 85vw)",
        justifyContent: "space-between",
        gap: "1rem",
        position: "absolute",
        top: "calc(50vh + 2.5rem)"
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
        transition: theme.transitions.create(['background-color', 'opacity'], {
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
    iconContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // padding: "0.75rem",
        width: "100px",
        height: "100px",
        minWidth: "100px",
        minHeight: "100px",
        border: `1px solid ${theme.palette.primary.main}`,
        position: "absolute",
        top: "calc(50vh - 2.5rem)",
        borderRadius: "5px",
        "&:hover": {
            cursor: "pointer"
        }
    },
    iconText: {
        color: theme.palette.primary.main
    }
}))




const IconContainer = ({
    controlPressed,
    setControlPressed,
    metaPressed,
    setMetaPressed,
    altPressed,
    setAltPressed,
    shiftPressed,
    SpecialKeys,
    specialKeys,
    setShiftPressed, }) => {
    const classes = useIconContainerClasses();
    const [showAlternativeKeyIcon, setShowAlternativeKeyIcon] = useState(false)

    useEffect(() => {
        if (showAlternativeKeyIcon) {
            console.count("Called useEffect with showAlternativeKeyIcon")
            console.log("specialKeys", specialKeys)
            animateKeyIconEntrance()
            // animateKeySetting()
        }
    }, [showAlternativeKeyIcon])
    useEffect(() => {
        let _f = specialKeys?.length > 0 ? specialKeys?.filter((sk) => !sk?.isSpecialKey)?.[0] : false
        console.count("Called useEffect with specialKeys")
        // let _f = false
        if (_f) {
            setShowAlternativeKeyIcon(_f)
        }
        if (!_f) {
            setShowAlternativeKeyIcon(null)
        }
    }, [specialKeys])

    if (showAlternativeKeyIcon) {
        return (
            <KeyIcons.KeyIcon
                ownStyles={useKeyIconStyles}
                keyData={showAlternativeKeyIcon}
                specialKeys={_specialKeys}
                shouldShow={Boolean(showAlternativeKeyIcon)}
                SpecialKeys={SpecialKeys}
                controlPressed={controlPressed}
                metaPressed={metaPressed}
                altPressed={altPressed}
                shiftPressed={shiftPressed}
                setControlPressed={setControlPressed}
                setMetaPressed={setMetaPressed}
                setAltPressed={setAltPressed}
                setShiftPressed={setShiftPressed}
                _id={"keyboardShortcutSelectedNotSpecialKey"}
            />
        )
    }
    else {
        return null
    }
}

const IndividualIcons = ({
    index,
    classes,
    specialKeys,
    specialKey,
    SpecialKeys,
    controlPressed,
    metaPressed,
    altPressed,
    shiftPressed,
}) => {
    const [isActive, setIsActive] = useState(false)
    useEffect(() => {
        setIsActive(SpecialKeys[specialKey.key].pressed)
    }, [specialKeys, specialKey, controlPressed,
        metaPressed,
        altPressed,
        shiftPressed,])

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
        backgroundColor: 'rgba(0, 0, 0, 0.7)',

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
    childIconContainer: {
        // fontSize: "4rem"
        padding: "0.75rem",
        // minWidth: "fit-content",
        // minHeight: "fit-content",
        minWidth: "100px",
        minHeight: "100px",
        justifyContent: "center",
        alignItems: "center",
        display: "flex"
        // opacity: 0
    },
    singleIconContainerActive: {
        fontSize: "4rem",
        color: "#fff"
    },
    childIconContainerActive: {
        // fontSize: "4rem"
        padding: "0.75rem",
        minWidth: "100px",
        minHeight: "100px",
        backgroundColor: theme.palette.primary.main,
        // opacity: 1,
        transition: theme.transitions.create(['background-color', 'opacity'], {
            duration: 350,
        }),
    },
}))


const LowerIconContainer = ({ SpecialKeys, controlPressed,
    metaPressed,
    altPressed,
    shiftPressed, }) => {
    const classes = useIconContainerClasses();
    return (
        <div className={classes.lowerContainer}>
            {Object.keys(_specialKeys).map((sk, index) => {

                return <LowerIcon sk={sk} key={`key-${index}`} SpecialKeys={SpecialKeys}
                    controlPressed={controlPressed}
                    metaPressed={metaPressed}
                    index={index}
                    altPressed={altPressed}
                    shiftPressed={shiftPressed}

                />
            })
            }
        </div>
    )
}

const _LowerIcon = ({ props: { sk, SpecialKeys, controlPressed,
    metaPressed,
    altPressed,
    index,
    shiftPressed
},
    user: {
        userSettings: {
            skListeners
        }
    }
}) => {
    const [isActive, setIsActive] = useState(false)
    useEffect(() => {
        // setIsActive(SpecialKeys[sk].pressed)
        console.log('skListeners: ', skListeners);
    }, [skListeners])
    const classes = useLowerIconClasses();
    let ThisIcon = _specialKeys[sk].icon
    return (<ThisIcon _className={{ icon: clsx(classes.iconRoot, isActive && classes.iconRootActive), container: clsx(classes.childIconContainer, isActive && classes.childIconContainerActive) }} id={isActive ? "active-key-icon-container" : `key-icon-container-${index}`} />
    )
}

const mapStateToLowerIcon = (state, props) => ({
    UI: state.UI,
    user: state.user,
    props: props
});

const LowerIcon = connect(mapStateToLowerIcon)(_LowerIcon)



const animateKeyIconEntrance = () => {
    const duration = Math.random() * 5 + 0.5
    let rs = Math.floor(Math.random() * 90)
    const _rotateX = rs
    const _rotateY = 90 - rs;
    let _radius = 100
    // let _a = Math.random() * 90 / 2 * Math.PI / 180
    // let _a = Math.random() * Math.PI / 2
    // let _a = 90
    let _a = Math.random() * 180 + 90
    // let _x = -Math.abs(Math.random() * _radius)
    // let _y = Math.sqrt(_radius * _radius - _x * _x)
    // let _y = 90

    let _x = _radius * Math.sin(Math.PI * 2 * _a / 360)
    let _y = _radius * Math.cos(Math.PI * 2 * _a / 360)




    const fromArray = [{
        y: _y,
        x: _x,
        opacity: 0,
        scale: 0.3,
        rotation: Math.random() > 0.5 ? -360 : 360,
        // rotateY: _rotateY,
        duration: 0.5,
        // ease: "bounce.out"
        ease: "rough({ template: none.out, strength: 1, points: 20, taper: 'none', randomize: true, clamp: false})"
    }]

    gsap.fromTo("#keyboardShortcutSelectedNotSpecialKey", fromArray[Math.floor(Math.random() * fromArray.length)], {
        y: 0,
        x: 0,
        opacity: 1,
        scale: 1,
        rotateX: 0,
        rotation: 0,
        rotateY: 0,
        duration: 0.5,
        // ease: "elastic",
        ease: "bounce.out",
        // ease: "rough({ template: none.out, strength: 1, points: 20, taper: 'none', randomize: true, clamp: false})"
    })
    // gsap.from("#keyboardShortcutSelectedNotSpecialKey", {
    //     y: -100,
    //     opacity: 0.5,
    //     scale: 0.5,
    //     rotateX: -180,
    //     duration: 2.5,
    //     ease: "power3.inOut"
    // })
}

const animateKeySetting = () => {

}