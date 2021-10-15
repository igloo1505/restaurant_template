import React, { useState, Fragment, useEffect, useRef } from 'react'
import { connect, useDispatch } from 'react-redux';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useRouter } from "next/router"
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
import ReturnIcon from "@material-ui/icons/KeyboardReturnOutlined"


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


const KeyboardShortcutModalDropdown = ({ alert: { keyboardShortcuts: { filteredShortcutArray } }, selectedItemIndex, setSelectedItemIndex,
}) => {
    const router = useRouter()
    const classes = useClasses()
    const [dropdownIsOpen, setDropdownIsOpen] = useState(false)
    const [currentHighlightedIndex, setCurrentHighlightedIndex] = useState(selectedItemIndex)
    useEffect(() => {
        console.log('router: ', router);
        setCurrentHighlightedIndex(selectedItemIndex)
    }, [selectedItemIndex])

    useEffect(() => {
        setDropdownIsOpen(Boolean(filteredShortcutArray?.length > 0))
        animateDropdownMenuChange()
    }, [filteredShortcutArray])

    return (
        <Paper classes={{ root: clsx(classes.outerContainer, !dropdownIsOpen && classes.hide) }}>
            <MenuList classes={{ root: classes.menuListRoot }}>
                {filteredShortcutArray && filteredShortcutArray?.map((shortcut, index, array) => <ShortCutDropdownItem shortcut={shortcut} index={index} array={array} isHighlighted={Boolean(currentHighlightedIndex === index)} selectedItemIndex={selectedItemIndex} />)}
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
        alignItems: "center",
        justifyContent: "center",
    },
    typography: {
        transition: theme.transitions.create(['color'], {
            duration: 250,
        }),
    },
    typographyHighlighted: {
        // color: theme.palette.primary.main,
        color: "#fff",
        transition: theme.transitions.create(['color'], {
            duration: 500,
        }),
    },
    listItemIconRoot: {
        marginLeft: "0.75rem",
        color: theme.palette.primary.dark,
    },
    iconRoot: {
        width: "auto",
        height: "2.1rem",
    },
    iconHighlighted: {
        color: '#fff'
    },
    minWidth: "unset",
    menuItemHighlighted: {
        backgroundColor: theme.palette.primary.dark,
        transition: theme.transitions.create(['background-color'], {
        duration: 500,
        }),
    },
    itemIconContainer: {
        width: "80px"
    }
}
))

const ShortCutDropdownItem = ({ shortcut, index, array, isHighlighted: _isHighlighted, selectedItemIndex }) => {
    const classes = useMenuItemClasses()
    const [isHighlighted, setIsHighlighted] = useState(_isHighlighted)
    useEffect(() => {
        setIsHighlighted(selectedItemIndex === index)
        if (selectedItemIndex === index) {
            console.log('selectedItemIndex === index: ', shortcut.displayText, selectedItemIndex === index);
        }
    }, [_isHighlighted, selectedItemIndex])
    return (
        <Fragment>
            <MenuItem classes={{ root: clsx(classes.menuItemRoot, "shortcutDropdownMenuItem", isHighlighted && classes.menuItemHighlighted) }}>
                <Typography variant="h4" color="text.secondary" classes={{ root: clsx(classes.typography, isHighlighted && classes.typographyHighlighted, `shortcutTypographyFocused-${index}`) }}>
                    {shortcut.displayText}
                </Typography>
                <div className={classes.itemIconContainer}>
                {
                    selectedItemIndex === index && <AnimatedReturnIcon classes={classes} index={index} selectedItemIndex={selectedItemIndex} />
                }
                </div>
            </MenuItem>
            {index !== array.length - 1 && <Divider />}
        </Fragment>
    )
}




const AnimatedReturnIcon = ({ classes, index, selectedItemIndex }) => {
    const [isHighlighted, setIsHighlighted] = useState(false)
    useEffect(() => {
        setIsHighlighted(selectedItemIndex === index)
        animateReturnIcon(index, selectedItemIndex)
    }, [index, selectedItemIndex])
    return (
        <ListItemIcon classes={{ root: clsx(classes.listItemIconRoot, `shortcutListItemFocused-${index}`) }}>
            <ReturnIcon fontSize="small" className={clsx(classes.iconRoot, isHighlighted && classes.iconHighlighted)} />
        </ListItemIcon>
    )

}


const animateReturnIcon = (index, selectedItemIndex) => {
    gsap.fromTo(`.shortcutListItemFocused-${index}`, {
        // scaleX: 0.0001,
        opacity: 0,
        x: 50,
        duration: 0.75,
        // ease: "elastic.out(1, 0.3)",
        ease: "bounce.out",
    },
        {
            scaleX: 1,
            x: 0,
            opacity: 1,
            duration: 0.75,
            // ease: "elastic.out(1, 0.3)",
            ease: "bounce.out",
        }
    );
    gsap.fromTo(`.shortcutTypographyFocused-${index}`, {
        // y: -5,
        duration: 0.7,
        ease: "elastic.out(1.7, 0.3)",
    },
        {
            y: 0,
            duration: 0.7,
            ease: "elastic.out(1.7, 0.3)",
        }
    );
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