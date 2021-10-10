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
import {
    _specialKeys,
    SpecialKeys,
    settingKeysKeydown,
    settingKeysKeyup,
} from "../../util/SettingShortcutsListeners"

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

    return (
        <ClientOnlyPortal selector="#topLevelPortalContainer">
            <Backdrop classes={{ root: classes.backdropRoot }} open={isOpen} onClick={handleBackdropClick} id="set-shortcuts-backdrop"  >
                <IconContainer
                    specialKeys={specialKeys}
                    SpecialKeys={SpecialKeys}
                />
                <LowerIconContainer
                    SpecialKeys={SpecialKeys}
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
        width: "min(1280px, 85vw)",
        justifyContent: "space-between",
        gap: "1rem",
        position: "absolute",
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
            currentActiveKeys
        }
    }
}) => {
    const classes = useIconContainerClasses();
    const [showAlternativeKeyIcon, setShowAlternativeKeyIcon] = useState(editBackdropIsOpen)

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
        // let _f = false
        console.log('_f: ', currentActiveKeys);
        if (_f) {
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
                _id={"keyboardShortcutSelectedNotSpecialKey"}
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
                return <LowerIcon sk={sk} key={`key-${index}`} SpecialKeys={SpecialKeys}
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
        id={isActive ? "active-key-icon-container" : `key-icon-container-${index}`} />
    )
}



const LowerIconContainer = connect(mapStateToProps)(_LowerIconContainer)



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