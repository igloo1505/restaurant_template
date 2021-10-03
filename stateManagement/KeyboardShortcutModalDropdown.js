import React, { useState, Fragment, useEffect, useRef } from 'react'
import { connect, useDispatch } from 'react-redux';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import { gsap } from 'gsap';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SomeIcon from "@material-ui/icons/ThumbUp"
import clsx from 'clsx'
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import Menu from "@material-ui/core/Menu";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import DialogContent from "@material-ui/core/DialogContent"
import { BsCommand, BsShift } from "react-icons/bs"
import { ImArrowLeft, ImArrowRight } from "react-icons/im"
import ClientSidePortal from '../components/portalAuthenticated/ClientSidePortal';


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
    }
}))


const KeyboardShortcutModalDropdown = ({ alert: { keyboardShortcuts: { filteredShortcutArray } } }) => {
    const classes = useClasses()
    const [dropdownIsOpen, setDropdownIsOpen] = useState(false)
    useEffect(() => {
        setDropdownIsOpen(Boolean(filteredShortcutArray?.length > 0))
        animateDropdownMenuChange()
    }, [filteredShortcutArray])

    return (
        <Paper classes={{ root: clsx(classes.outerContainer, !dropdownIsOpen && classes.hide) }}>
            <MenuList classes={{ root: classes.menuListRoot }}>
                {filteredShortcutArray && filteredShortcutArray?.map((shortcut, index, array) => <ShortCutDropdownItem shortcut={shortcut} index={index} array={array} />)}
            </MenuList>
        </Paper>
    )
}


const mapStateToProps = (state, props) => ({
    alert: state.alert,
    props: props
});

export default connect(mapStateToProps)(KeyboardShortcutModalDropdown)


const useMenuItemClasses = makeStyles((theme) => ({
    menuItemRoot: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
    }
}))

const ShortCutDropdownItem = ({ shortcut, index, array }) => {
    const classes = useMenuItemClasses()
    return (
        <Fragment>
            <MenuItem classes={{ root: clsx(classes.menuItemRoot, "shortcutDropdownMenuItem") }}>
                <ListItemIcon>
                    <SomeIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="h4" color="text.secondary">
                    {shortcut.displayText}
                </Typography>
            </MenuItem>
            {index !== array.length - 1 && <Divider />}
        </Fragment>
    )
}



const animateDropdownMenuChange = () => {
    gsap.fromTo(".shortcutDropdownMenuItem", {
        stagger: 0.15,
        scaleY: 0.0001,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
    },
        {
            stagger: 0.15,
            scaleY: 1,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)",
        }
    );
}