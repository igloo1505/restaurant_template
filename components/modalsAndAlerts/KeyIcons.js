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
import { BsCommand, BsShift, BsAlt } from "react-icons/bs";
import { MdKeyboardArrowUp } from "react-icons/md"
import { BiCommand } from "react-icons/bi"
import { ImArrowLeft, ImArrowRight } from "react-icons/im"
import ClientSidePortal from '../../components/portalAuthenticated/ClientSidePortal';
import ReturnIcon from "@material-ui/icons/KeyboardReturnOutlined"


const useIconClasses = makeStyles((theme) => ({
    icon: {
        color: theme.palette.primary.main,
        fontSize: "1.5rem",
        margin: "0.5rem",
        cursor: "pointer"
    },
    iconDisabled: {
        color: theme.palette.grey[500],
        fontSize: "1.5rem",
        margin: "0.5rem",
        cursor: "pointer"
    },
    iconContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // width: "100%",
        width: "40px",
        height: "40px",
        minWidth: "40px",
        minHeight: "40px",
        border: `1px solid ${theme.palette.primary.main}`,
        "&:hover": {
            cursor: "pointer"
        },
        borderRadius: "5px"
    }
}))



export const ShiftIcon = ({ settingKeysBackdrop, showSetKeysBackdrop, styles, _className, ownStyles }) => {
    const classes = ownStyles ? ownStyles() : useIconClasses()
    return (
        <div className={clsx(classes.iconContainer, "shortcut-icon-animated", _className?.container)} onClick={showSetKeysBackdrop}
            style={styles}
        >
            <BsShift className={clsx(classes.icon, _className?.icon)} />
        </div>
    )
}
export const AltIcon = ({ settingKeysBackdrop, showSetKeysBackdrop, styles, _className, ownStyles }) => {
    const classes = ownStyles ? ownStyles() : useIconClasses()
    return (
        <div className={clsx(classes.iconContainer, "shortcut-icon-animated", _className?.container)} onClick={showSetKeysBackdrop}
            style={styles}
        >
            <BsAlt className={clsx(classes.icon, _className?.icon)} />
        </div>
    )
}
export const ControlIcon = ({ settingKeysBackdrop, showSetKeysBackdrop, styles, _className, ownStyles }) => {
    const classes = ownStyles ? ownStyles() : useIconClasses()
    return (
        <div className={clsx(classes.iconContainer, "shortcut-icon-animated", _className?.container)} onClick={showSetKeysBackdrop}
            style={styles}
        >
            <MdKeyboardArrowUp className={clsx(classes.icon, _className?.icon)} />
        </div>
    )
}


export const CommandIcon = ({ settingKeysBackdrop, showSetKeysBackdrop, styles, _className, ownStyles }) => {
    const classes = ownStyles ? ownStyles() : useIconClasses()
    return (
        <div className={clsx(classes.iconContainer, "shortcut-icon-animated", _className?.container)} onClick={showSetKeysBackdrop}
            style={styles}
        >
            <BsCommand className={clsx(classes.icon, _className?.icon)} />
        </div>
    )
}


const useKeyIconClasses = makeStyles((theme) => ({
    iconContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // padding: "0.75rem",
        width: "40px",
        height: "40px",
        minWidth: "40px",
        minHeight: "40px",
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: "5px",
        "&:hover": {
            cursor: "pointer"
        }
    },
    iconText: {
        color: theme.palette.primary.main
    }
}))

export const KeyIcon = ({ settingKeysBackdrop, keyData, showSetKeysBackdrop, styles, _className, shouldShow, ownStyles, _id }) => {
    const classes = ownStyles ? ownStyles() : useKeyIconClasses()
    const [isActive, setIsActive] = useState(false)
    useEffect(() => {
        // setIsActive(shouldShow)
    }, [shouldShow])
    return (
        <div className={clsx(classes.iconContainer, isActive && classes.iconContainerActive, _className?.container && _className.container, "shortcut-icon-animated", _className?.container)} onClick={showSetKeysBackdrop}
            style={styles}
            id={_id}
        >
            <Typography variant="h4" className={clsx(classes.iconText, isActive && classes.iconTextActive, _className?.text && _className.text)} id={`${_id}-childIcon`}>
                {keyData.key?.toLowerCase()}
            </Typography>
        </div>
    )
}


