import React, {useState, useEffect} from 'react'
import {connect, useDispatch} from 'react-redux';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import DialogContent from "@material-ui/core/DialogContent"
import {BsCommand, BsShift} from "react-icons/bs"
import {ImArrowLeft, ImArrowRight} from "react-icons/im"
import * as Types from '../../stateManagement/TYPES';


const useClasses = makeStyles((theme) => ({
    backdropRoot: {
        backgroundColor: "rgba(0,0,0,0.2)",
      },
      shortcutItem: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center", 
        gap: "0.75rem",
        width: "calc(50% - 1rem)",
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
      dialogContainer: { backgroundColor: "rgba(0,0,0,0.2)"
     },
      dialogScrollBody: {},
      title: {
        fontSize: "1.1rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: theme.palette.primary.light,
        borderBottom: `1px solid ${theme.palette.primary.light}`,
        color: "#fff",
        // paddingBottom: "0, px",
      },
      shortcutText: {
          color: "#000"
      },
      dialogContentRoot: {
          width: "min(980px, 80vw)",
          display: "flex",
          flexDirection: "row",
        flexWrap: "wrap",
        gap: "1rem",
        margin: "1rem",
        [theme.breakpoints.down(900)]: {
            flexDirection: "column",
          },
      },
      dialogPaper: {
          maxWidth: "unset"
      }
}))



const AddRecipeKeyboardShortcuts = ({alert : {keyboardShortcuts: {show}}}) => {
    const classes = useClasses()
    const [highlights, setHighlights] = useState({
        k: false,
        shift: false,
        arrowLeft: false,
        arrowRight: false,
        cmd: false
    } )
    const theme = useTheme()
    const dispatch = useDispatch()
    let standardIconStyle = {
        width: "1.2rem",
        height: "1.2rem",
        borderRadius: "8px",
        // padding: "0.4rem",
        transition: theme.transitions.create(['box-shadow'], {
        duration: 350,
        }),
    }
    let standardTextIconStyle = {
        borderRadius: "4px",
        // padding: "0.4rem",
        fontSize: "1.2rem",
        padding: "0px 4px",
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
    const [cmdIconStyles, setCmdIconStyles] = useState(standardIconStyle)
    const [shiftIconStyles, setShiftIconStyles] = useState(standardIconStyle)
    const [kIconStyles, setKIconStyles] = useState(standardTextIconStyle)
    const [arrowLeftIconStyles, setArrowLeftIconStyles] = useState(standardIconStyle)
    const [arrowRightIconStyles, setArrowRightIconStyles] = useState(standardIconStyle)
    useEffect(() => {
        if(show){
            setKIconStyles(standardTextIconStyle)
            setCmdIconStyles(standardIconStyle)
            setShiftIconStyles(standardIconStyle)
            setArrowRightIconStyles(standardIconStyle)
            setArrowLeftIconStyles(standardIconStyle)
        }
    }, [show])
    useEffect(() => {
        if(typeof window !== "undefined"){
            document.addEventListener("keydown", (e) => {      
                console.log('e.key: ', e.key);
                if(e.key === "Escape"){
                    dispatch({
                        type: Types.TOGGLE_ADD_RECIPE_KEYBOARD_SHORTCUTS,
                        payload: "hide"
                    })
                }
                if(e.key === "k"){
                    setKIconStyles(highlightTextIconStyle)
                }
                if(e.key === "Shift"){
                    setShiftIconStyles(hightLightedIconStyle)
                }
                if(e.key === "ArrowLeft"){
                    setArrowLeftIconStyles(hightLightedIconStyle)                    
                }   
                if(e.key === "ArrowRight"){
                    setArrowRightIconStyles(hightLightedIconStyle)
                }
                if(e.key === "Meta"){
                    setCmdIconStyles(hightLightedIconStyle)
                }
            })
            document.addEventListener("keyup", (e) => {      
                if(e.key === "k"){
                    setKIconStyles(standardTextIconStyle)
                }
                if(e.key === "Shift"){
                    setShiftIconStyles(standardIconStyle)
                }
                if(e.key === "ArrowLeft"){
                    setArrowLeftIconStyles(standardIconStyle)                    
                }   
                if(e.key === "ArrowRight"){
                    setArrowRightIconStyles(standardIconStyle)
                }
                if(e.key === "Meta"){
                    setCmdIconStyles(standardIconStyle)
                }
            })
        }
    }, [])
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
            classes={{root: classes.backdropRoot,
                scrollPaper: classes.dialogScrollPaper,
                container: classes.dialogContainer,
                scrollBody: classes.dialogScrollBody,
                paper: classes.dialogPaper,
            }}
            >
                <DialogTitle
                id="alert-dialog-title"
                classes={{ root: classes.title }}
        >
            <Typography variant="h5" classes={{root: classes.titleTypography}}>
                Keyboard Shortcuts
            </Typography>
            </DialogTitle>
            <DialogContent classes={{root: classes.dialogContentRoot}}>
                <div className={classes.shortcutItem}>
                    <CmdIcon iconStyle={cmdIconStyles}/>
                    <ShiftIcon iconStyle={shiftIconStyles}/>
                    <LetterIcon letter="K" iconStyle={kIconStyles}/>
                <Typography variant="h6" classes={{root: classes.shortcutText}}>
                    Show Keyboard Shortcuts
                </Typography>
                </div>
                <div className={classes.shortcutItem}>
                    <CmdIcon iconStyle={cmdIconStyles}/>
                    <ShiftIcon iconStyle={shiftIconStyles}/>
                    <ArrowLeftIcon iconStyle={arrowLeftIconStyles}/>
                <Typography variant="h6" classes={{root: classes.shortcutText}}>
                    Backwards between sub-recipes
                </Typography>
                </div>
                <div className={classes.shortcutItem}>
                    <CmdIcon iconStyle={cmdIconStyles}/>
                    <ShiftIcon iconStyle={shiftIconStyles}/>
                    <ArrowRightIcon iconStyle={arrowRightIconStyles}/>
                <Typography variant="h6" classes={{root: classes.shortcutText}}>
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


const CmdIcon = ({iconStyle}) => {
    return (
      <BsCommand style={iconStyle}/>
    )
  }

export const ShiftIcon = ({iconStyle}) => {
    return (
      <BsShift style={iconStyle}/>
    )
  }

  const LetterIcon = ({letter, iconStyle}) => {
    return (
      <Typography variant="h6" style={iconStyle}>{letter}</Typography>
    )
  }    

  const ArrowLeftIcon = ({iconStyle}) => {
    return (
        <ImArrowLeft style={iconStyle}/> 
        )
    }
  const ArrowRightIcon = ({iconStyle}) => {
    return (
        <ImArrowRight style={iconStyle}/> 
        )
    }
       

       