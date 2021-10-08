/* eslint-disable react/prop-types */
import React, { useState, Fragment, useEffect, useRef } from 'react'
import { connect, useDispatch } from 'react-redux';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useRouter } from "next/router"
import Dialog from "@material-ui/core/Dialog";
import { gsap } from 'gsap';
import * as Types from '../../stateManagement/TYPES';
import Divider from '@material-ui/core/Divider';
import SettingShortcutsBackdrop from "./SetKeyboardShortcutBackdrop"
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SomeIcon from "@material-ui/icons/ThumbUp"
import clsx from 'clsx'
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import Menu from "@material-ui/core/Menu";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import DialogContent from "@material-ui/core/DialogContent"
import { BsCommand, BsShift } from "react-icons/bs"
import { BiCommand } from "react-icons/bi"
import { ImArrowLeft, ImArrowRight } from "react-icons/im"
import ClientSidePortal from '../../components/portalAuthenticated/ClientSidePortal';
import ReturnIcon from "@material-ui/icons/KeyboardReturnOutlined"
import * as KeyIcons from "./KeyIcons"

const useClasses = makeStyles((theme) => ({
    outerContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        position: "absolute",
        // top: 0,
        left: 0,
    },
    menuListRoot: {
        width: "100%",
    },
    hide: {
        display: "none"
    },
    contentContainer: {
        padding: "1rem"
    },
    titleTypography: {
        color: "#fff",
        fontWeight: "bold",
        letterSpacing: "0.1rem"
    },
    titleContainer: {
        padding: "0.5rem 0.75rem",
        backgroundColor: theme.palette.primary.main,
    },
    contentTypography: {},
    shortcutsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "0.75rem"
    },
    keyboardSwitchContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "0.75rem"
    },
}))


const SettingsModal = ({
    settingsModal: { isOpen, settingKeysBackdrop },
    props
}) => {
    const router = useRouter()
    const classes = useClasses()
    const dispatch = useDispatch()
    const [userSettings, setUserSettings] = useState({
        isDarkMode: false,
        allowKeyboardShortcuts: false,
        currentShortcuts: [
            {
                key: "Shift",
                code: "ShiftLeft",
                keyCode: 16,
            },
            {
                key: "Meta",
                code: "MetaLeft",
                keyCode: 91,
            },
            {
                key: "i",
                code: "KeyI",
                keyCode: 73,
            },
            // {
            //     key: "Control",
            //     code: "ControlLeft",
            //     keyCode: 17,
            // },
            // {
            //     key: "Alt",
            //     code: "AltLeft",
            //     keyCode: 18,
            // },
        ]
    })
    const handleClose = () => {
        dispatch({
            type: Types.TOGGLE_SETTINGS_MODAL,
            payload: {
                isOpen: false
            }
        })
    }

    const handleToggle = (_field) => {
        setUserSettings({
            ...userSettings,
            [_field]: !userSettings[_field]
        })
    }

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            classes={{
                root: classes.backdropRoot,
                scrollPaper: classes.dialogScrollPaper,
                container: classes.dialogContainer,
                scrollBody: classes.dialogScrollBody,
                paper: classes.backdropPaper
            }}
        >
            <DialogTitle id="alert-dialog-title" classes={{ root: classes.titleContainer }} variant="h6">
                <Typography variant="h6" classes={{ root: classes.titleTypography }}>
                    Settings
                </Typography>
            </DialogTitle>
            <DialogContent id="alert-dialog-title" classes={{ root: classes.contentContainer }}>
                <div className={classes.keyboardSwitchContainer}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={userSettings.allowKeyboardShortcuts}
                                onChange={() => handleToggle("allowKeyboardShortcuts")}
                                name="allowKeyboardShortcuts"
                            />
                        }
                        label="Keyboard Shortcuts"
                    />
                    {
                        userSettings.allowKeyboardShortcuts && <ShortcutIcons
                            userSettings={userSettings}
                            allowShortcuts={userSettings.allowKeyboardShortcuts}
                            classes={classes}
                            settingKeysBackdrop={settingKeysBackdrop}
                        />
                    }
                </div >
            </DialogContent>
        </Dialog>
    )
}


const mapStateToProps = (state, props) => ({
    alert: state.alert,
    settingsModal: state.UI.settingsModal,
    props: props
});

export default connect(mapStateToProps)(SettingsModal)


const ShortcutIcons = ({ userSettings, classes, settingKeysBackdrop, allowShortcuts }) => {
    const [allow, setAllow] = useState(allowShortcuts)
    const dispatch = useDispatch()
    useEffect(() => {
        // setAllow(allowShortcuts)
        if (allowShortcuts) {
            animateIconEntrance()
        }
    }, [allowShortcuts])
    const iconMap = {
        "Shift": KeyIcons.ShiftIcon,
        "Meta": KeyIcons.CommandIcon,
        "Control": KeyIcons.CommandIcon,
    }


    const showSetKeysBackdrop = (e) => {

        dispatch({
            type: Types.TOGGLE_SET_KEYS_BACKDROP,
            payload: {
                settingKeysBackdrop: true
            }
        })
    }




    return (
        <div className={classes.shortcutsContainer}>
            <Divider />
            {userSettings.currentShortcuts.map((shortcut, index) => {
                let ThisIcon = iconMap[shortcut.key]
                return ThisIcon ? <ThisIcon keyData={shortcut} showSetKeysBackdrop={showSetKeysBackdrop} /> : <KeyIcons.KeyIcon keyData={shortcut} showSetKeysBackdrop={showSetKeysBackdrop} />
            })}
            <Divider />
        </div>
    )
}









const animateIconEntrance = () => {
    gsap.fromTo(".shortcut-icon-animated", {
        stagger: 0.1,
        y: -50,
        opacity: 0,
        scale: 0.7,
        rotateX: -180,
        ease: "power3.inOut"
    }, {
        stagger: 0.1,
        y: 0,
        opacity: 1,
        scale: 1,
        rotateX: 0,
        ease: "power3.inOut"
    })
}