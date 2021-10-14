import React, { useState, Fragment, useEffect, useRef } from 'react'
import { connect, useDispatch, useStore } from 'react-redux';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import { useRouter } from 'next/router';
import clsx from 'clsx'
import DialogTitle from "@material-ui/core/DialogTitle";
import { returnFilteredShortcutArray } from '../../stateManagement/keyboardShortcutArray';
import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";
import * as Types from '../../stateManagement/TYPES';
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import DialogContent from "@material-ui/core/DialogContent"
import { BsCommand, BsShift } from "react-icons/bs"
import { FaArrowRight, FaArrowLeft } from "react-icons/fa"
import { ImArrowLeft, ImArrowRight } from "react-icons/im"
import ClientSidePortal from '../portalAuthenticated/ClientSidePortal';
import KeyboardShortcutModalDropdown from '../../stateManagement/KeyboardShortcutModalDropdown';
import { ArrowLeft } from '@material-ui/icons';
import { MenuList } from '@material-ui/core';

// TODO Turn this into something resembling alphred that autoSelects a autoComplete textField with array of commands  
// RESUME Turn this into something resembling alphred that autoSelects a autoComplete textField with array of commands

const useClasses = makeStyles((theme) => ({
    dropDownContainer: {
        // position: "relative",
    },
    backdropRoot: {
        backgroundColor: "rgba(0,0,0,0.2)",
        // opacity: 0,
        // width: "fit-content"
    },
    shortcutItem: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "0.75rem",
        // height: 'fit-content',
        // width: "calc(50% - 1rem)",
        [theme.breakpoints.down(900)]: {
            width: "100%",
            justifyContent: "center",
        },
    },
    dialogScrollPaper: {
        width: "100vw"
    },
    titleTypography: {
        color: "#fff"
    },
    dialogContainer: {
        backgroundColor: "rgba(0,0,0,0.2)"
    },
    dialogScrollBody: {},
    inputIconRightContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
    },
    title: {
        fontSize: "1.1rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: theme.palette.primary.light,
        borderBottom: `1px solid ${theme.palette.primary.light}`,
        padding: "0px 1rem",
        color: "#fff",
        // paddingBottom: "0, px",
    },
    shortcutText: {
        color: "#000"
    },
    dialogContentRoot: {
        width: "min(980px, 80vw)",
        minHeight: "min(300px, 60vh)",
        padding: "0px 1rem 1rem 1rem",
        // display: "flex",
        // flexDirection: "row",
        // flexWrap: "wrap",
        // gap: "1rem",
        // // margin: "1rem",
        // margin: "0px",
        // minHeight: "min(30vh, 300px)",
        // width: '100%',
        display: 'grid',
        // gridColumnGap: '10px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(50%, 1fr))',
        [theme.breakpoints.down(900)]: {
            // flexDirection: "column",
        },
    },
    dialogPaper: {
        maxWidth: "unset"
    },
}))

const initialSpecialKeyState = {
    ArrowLeft: 0,
    ArrowRight: 0
}

const AddRecipeKeyboardShortcuts = ({ alert: { keyboardShortcuts: { show, shortcutMenuValue, filteredShortcutArray } } }) => {
    const classes = useClasses()
    const theme = useTheme()
    const dispatch = useDispatch()
    const store = useStore()
    let standardIconStyle = {
        width: "1.2rem",
        height: "1.2rem",
        borderRadius: "8px",
        transition: theme.transitions.create(['box-shadow'], {
            duration: 350,
        }),
    }
    let standardTextIconStyle = {
        borderRadius: "4px",
        fontSize: "1.2rem",
        padding: "0px 4px",
        minWidth: "1.2rem",
        minHeight: "1.2rem",
        transition: theme.transitions.create(['box-shadow'], {
            duration: 350,
        }),
    }
    let highlightTextIconStyle = {
        borderRadius: "4px",
        // padding: "0.4rem",
        fontSize: "1.2rem",
        padding: "0px 4px",
        minWidth: "1.2rem",
        minHeight: "1.2rem",
        color: theme.palette.primary.light,
        // boxShadow: `6px 6px 12px ${theme.palette.grey[400]}, -6px 6px 12px ${theme.palette.grey[300]}`,
        transition: theme.transitions.create(['box-shadow', 'color'], {
            duration: 350,
        }),
    }

    let hightLightedIconStyle = {
        width: "1.2rem",
        height: "1.2rem",
        borderRadius: "8px",
        color: theme.palette.primary.light,
        transition: theme.transitions.create(['box-shadow', 'color'], {
            duration: 350,
        }),
        fontSize: "1.6rem",
        // boxShadow: `6px 6px 12px ${theme.palette.grey[400]}, -6px 6px 12px ${theme.palette.grey[300]}`,
    }
    const [searchFieldCurrentValue, setSearchFieldCurrentValue] = useState("")

    const [cmdIconStyles, setCmdIconStyles] = useState(standardIconStyle)
    const [shiftIconStyles, setShiftIconStyles] = useState(standardIconStyle)
    const [kIconStyles, setKIconStyles] = useState(standardTextIconStyle)
    const [iIconStyles, setIIconStyles] = useState(standardTextIconStyle)
    const [arrowLeftIconStyles, setArrowLeftIconStyles] = useState(standardIconStyle)
    const [arrowRightIconStyles, setArrowRightIconStyles] = useState(standardIconStyle)
    const [dropdownIsOpen, setDropdownIsOpen] = useState(false)
    const [selectedItemIndex, setSelectedItemIndex] = useState(0)

    const [specialKeysState, setSpecialKeysState] = useState(initialSpecialKeyState)

    useEffect(() => {
        setDropdownIsOpen(filteredShortcutArray?.length > 0)
    }, [filteredShortcutArray])


    useEffect(() => {
        if (show) {
            setIIconStyles(standardTextIconStyle)
            setKIconStyles(standardTextIconStyle)
            setCmdIconStyles(standardIconStyle)
            setShiftIconStyles(standardIconStyle)
            setArrowRightIconStyles(standardIconStyle)
            setArrowLeftIconStyles(standardIconStyle)
        }
    }, [show])
    useEffect(() => {
        if (typeof window !== "undefined") {
            document.addEventListener("keydown", (e) => {
                if (e.key === "Escape") {
                    dispatch({
                        type: Types.TOGGLE_ADD_RECIPE_KEYBOARD_SHORTCUTS,
                        payload: "hide"
                    })
                }
                if (e.key === "k") {
                    setKIconStyles(highlightTextIconStyle)
                }
                if (e.key === "i") {
                    setIIconStyles(highlightTextIconStyle)
                }
                if (e.key === "Shift") {
                    setShiftIconStyles(hightLightedIconStyle)
                }
                if (e.key === "ArrowLeft") {
                    setArrowLeftIconStyles(hightLightedIconStyle)
                }
                if (e.key === "ArrowRight") {
                    setArrowRightIconStyles(hightLightedIconStyle)
                }
                if (e.key === "Meta") {
                    setCmdIconStyles(hightLightedIconStyle)
                }
            })
            document.addEventListener("keyup", (e) => {
                if (e.key === "k") {
                    setKIconStyles(standardTextIconStyle)
                }
                if (e.key === "i") {
                    setIIconStyles(standardTextIconStyle)
                }
                if (e.key === "Shift") {
                    setShiftIconStyles(standardIconStyle)
                }
                if (e.key === "ArrowLeft") {
                    setArrowLeftIconStyles(standardIconStyle)
                }
                if (e.key === "ArrowRight") {
                    setArrowRightIconStyles(standardIconStyle)
                }
                if (e.key === "Meta") {
                    setCmdIconStyles(standardIconStyle)
                }
            })
        }
    }, [])
    const fauxListener = (_name, type) => {
        setFocusState({
            ...focusState,
            [_name]: {
                focus: type === "focus" ? true : false,
                shrink: shortcutMenuValue.length > 0 ? true : false
            }
        })
    }

    const handleDialogClose = (e) => {
        dispatch({
            type: Types.TOGGLE_ADD_RECIPE_KEYBOARD_SHORTCUTS,
            payload: "hide"
        })
    }
    return (
        <Dialog
            open={show}
            onClose={handleDialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            classes={{
                root: classes.backdropRoot,
                scrollPaper: classes.dialogScrollPaper,
                container: classes.dialogContainer,
                scrollBody: classes.dialogScrollBody,
                paper: classes.dialogPaper,
            }}
        >
            <DialogTitle
                id="alert-dialog-title"
                classes={{ root: classes.title }}
                disableTypography
            >
                <ModalSearchField selectedItemIndex={selectedItemIndex}
                    filteredShortcutArray={filteredShortcutArray}
                    specialKeysState={specialKeysState}
                    setSpecialKeysState={setSpecialKeysState}
                    setSelectedItemIndex={setSelectedItemIndex} />
                <SpecialKeyIcons
                    specialKeysState={specialKeysState}
                    setSpecialKeysState={setSpecialKeysState}
                    classes={classes}
                />
            </DialogTitle>
            <DialogContent classes={{ root: classes.dialogContentRoot }} id="dialogContentMain">
                <KeyboardShortcutModalDropdown
                    selectedItemIndex={selectedItemIndex}
                    setSelectedItemIndex={setSelectedItemIndex}
                    specialKeysState={specialKeysState}
                    setSpecialKeysState={setSpecialKeysState}
                />
                <div className={classes.shortcutItem}>
                    <CmdIcon iconStyle={cmdIconStyles} />
                    <ShiftIcon iconStyle={shiftIconStyles} />
                    <LetterIcon letter="K" iconStyle={kIconStyles} />
                    <Typography variant="h6" classes={{ root: classes.shortcutText }}>
                        Show Keyboard Shortcuts
                    </Typography>
                </div>
                <div className={classes.shortcutItem}>
                    <CmdIcon iconStyle={cmdIconStyles} />
                    <ShiftIcon iconStyle={shiftIconStyles} />
                    <LetterIcon letter="i" iconStyle={iIconStyles} />
                    <Typography variant="h6" classes={{ root: classes.shortcutText }}>
                        Add sub-recipe
                    </Typography>
                </div>
                <div className={classes.shortcutItem}>
                    <CmdIcon iconStyle={cmdIconStyles} />
                    <ShiftIcon iconStyle={shiftIconStyles} />
                    <ArrowLeftIcon iconStyle={arrowLeftIconStyles} />
                    <Typography variant="h6" classes={{ root: classes.shortcutText }}>
                        Backwards between sub-recipes
                    </Typography>
                </div>
                <div className={classes.shortcutItem}>
                    <CmdIcon iconStyle={cmdIconStyles} />
                    <ShiftIcon iconStyle={shiftIconStyles} />
                    <ArrowRightIcon iconStyle={arrowRightIconStyles} />
                    <Typography variant="h6" classes={{ root: classes.shortcutText }}>
                        Backwards between sub-recipes
                    </Typography>
                </div>
            </DialogContent>
        </Dialog>
    )
}


const mapStateToProps = (state, props) => ({
    alert: state.alert,
    props: props
});

export default connect(mapStateToProps)(AddRecipeKeyboardShortcuts)


const CmdIcon = ({ iconStyle }) => {
    return (
        <BsCommand style={iconStyle} />
    )
}

export const ShiftIcon = ({ iconStyle }) => {
    return (
        <BsShift style={iconStyle} />
    )
}

const LetterIcon = ({ letter, iconStyle }) => {
    return (
        <Typography variant="h6" style={iconStyle}>{letter}</Typography>
    )
}

const ArrowLeftIcon = ({ iconStyle }) => {
    return (
        <ImArrowLeft style={iconStyle} />
    )
}
const ArrowRightIcon = ({ iconStyle }) => {
    return (
        <ImArrowRight style={iconStyle} />
    )
}


const useSearchFieldClasses = makeStyles((theme) => ({
    formControlRoot: {
        width: "100%",
        marginBottom: "-22px"
    },
    inputLabelRoot: {
        color: "#fff"
    },
    inputLabelFocused: {
        color: "#fff !important",
        display: "none"
    },
    inputLabelDisabled: {

    },
    inputLabelShrink: {
        display: "none"
    },
    inputLabelError: {

    },
    formHelperText: {},
    inputRoot: {
        margin: "0px !important"
    },
    inputError: {},
    inputFocused: {
        "&:before": {
            borderBottom: "2px solid #fff !important",
        },
        "&:after": {
            borderBottom: "2px solid #fff !important",
        },
    },
    inputDisabled: {},
    hide: {
        opacity: 0
    },
    input_root: {
        color: "#fff",
        fontSize: "2.5rem",
        letterSpacing: "0.5ch",
        textTransform: "uppercase",
        // padding: "0px",
    },
}))

const ModalSearchField = ({ selectedItemIndex, filteredShortcutArray, setSelectedItemIndex, specialKeysState, setSpecialKeysState }) => {
    const classes = useSearchFieldClasses()
    const inputRef = useRef(null)
    const [keyboardShortcutSearchValue, setKeyboardShortcutSearchValue] = useState("")
    const [focusState, setFocusState] = useState({
        focus: true,
        shrink: true
    })
    useEffect(() => {
        inputRef.current.focus()
        inputRef.current.select()
    }, [])

    const [showHelperText, setShowHelperText] = useState(false)
    const dispatch = useDispatch()
    const [helperText, setHelperText] = useState("Search for a shortcut")
    const router = useRouter()

    const resetSpecialKeyState = (e) => {
        setTimeout(() => {
            setSpecialKeysState({
                ...specialKeysState,
                ...(specialKeysState[e.key] > 0 && { [e.key]: specialKeysState[e.key] - 1 })
            })
        }, 1000);
    }

    const highjackArrowKeys = (e) => {
        let preventKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Enter", "Tab"]
        if (preventKeys.includes(e.key) && e.target.value === "") {
            setSpecialKeysState({
                ...initialSpecialKeyState,
                ...(specialKeysState[e.key] < 2 && { [e.key]: specialKeysState[e.key] + 1 })
            })
            resetSpecialKeyState(e)
            e.stopPropagation()
            e.preventDefault()
        }
        if (filteredShortcutArray) {
            if (e.key === "ArrowUp") {
                let newIndex = selectedItemIndex > 0 ? selectedItemIndex - 1 : filteredShortcutArray.length - 1
                return setSelectedItemIndex(newIndex)
            }
            if (e.key === "ArrowDown" || e.key === "Tab") {
                let newIndex = selectedItemIndex < filteredShortcutArray.length - 1 ? selectedItemIndex + 1 : 0
                return setSelectedItemIndex(newIndex)
            }
            if (e.key === "Enter") {
                console.log("Should send: ", filteredShortcutArray[selectedItemIndex])
                if (typeof filteredShortcutArray[selectedItemIndex]?.action === "function") {
                    filteredShortcutArray[selectedItemIndex].action()
                }
            }
        }
    }
    const handleChange = (e) => {
        console.log('e: ', e);
        if (e.target.value.length <= 0) {
            dispatch({
                type: Types.HIDE_SHORTCUT_MENU,
            })
        }
        if (e.target.value.length > 0) {
            setFocusState({
                ...focusState,
                shrink: true
            })
        }
        if (e.target.value.length <= 0) {
            setFocusState({
                ...focusState,
                shrink: false
            })
            setHelperText("Search for a shortcut")
        }
        setKeyboardShortcutSearchValue(e.target.value)
        console.log('router.pathname: ', router.pathname);
        const _state = store.getState()
        console.log('_state: ', _state);
        let newShortcutArray = returnFilteredShortcutArray({
            searchString: e.target.value,
            currentState: _state,
            currentPath: router.pathname
        })
        console.log("newShortcutArray", newShortcutArray);
        dispatch({
            type: Types.FILTER_KEYBOARD_SHORTCUTS,
            payload: newShortcutArray
        })
    }
    return (
        <FormControl classes={{ root: classes.formControlRoot }}>
            <InputLabel htmlFor="keyboard-shortcut-input" classes={{
                root: classes.inputLabelRoot,
                error: classes.inputLabelError,
                disabled: classes.inputLabelDisabled,
                focused: classes.inputLabelFocused,
                shrink: classes.inputLabelShrink
            }}
                focused={focusState.focus}
                shrink={focusState.shrink}
                onFocus={() => setFocusState({ focus: true, shrink: keyboardShortcutSearchValue.length > 0 ? true : false })}
                onBlur={() => setFocusState({ focus: false, shrink: keyboardShortcutSearchValue.length > 0 ? true : false })}
            >Search for a shortcut</InputLabel>
            <Input autoFocus={true} id="keyboard-shortcut-input" inputRef={inputRef} autocomplete="off" aria-describedby="keyboard-shortcut-helper-text" classes={{
                root: classes.inputRoot,
                error: classes.inputError,
                input: classes.input_root,
                focused: classes.inputFocused,
                disabled: classes.inputDisabled
            }}
                onChange={handleChange}
                onKeyDown={highjackArrowKeys}
                inputProps={{
                    autoComplete: "off"
                }}
            />
            <FormHelperText id="keyboard-shortcut-helper-text" classes={{ root: clsx(classes.formHelperText, !showHelperText && classes.hide) }}>{helperText}</FormHelperText>
        </FormControl>
    )
}


const SpecialKeyIcons = ({ specialKeysState, setSpecialKeysState, classes }) => {
    const [iconArrays, setIconArrays] = useState({ ArrowLeft: [], ArrowRight: [] })

    useEffect(() => {
        let newIconArrays = {
            ArrowLeft: [],
            ArrowRight: []
        }
        let _icons = {
            ArrowLeft: FaArrowLeft,
            ArrowRight: FaArrowRight,
        }
        Object.keys(specialKeysState).forEach((_key) => {
            for (let i = 0; i < specialKeysState[_key]; i++) {
                newIconArrays[_key].push(_icons[_key])
            }
        })
        setIconArrays(newIconArrays)
    }, [specialKeysState])


    return (
        <div className={classes.inputIconRightContainer}>
            {
                Object.keys(iconArrays).map((_key) => {
                    return iconArrays[_key].map((_icon) => {
                        let ThisIcon = _icon
                        console.log('_icon: ', _icon);
                        return <ThisIcon />
                    }
                    )
                })
            }
        </div>
    )
}