import React from "react";
import clsx from "clsx";
import { connect } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";


const drawerWidth = 240
const useStyles = makeStyles((theme) => ({
    root: {
        width: "100vw", 
        border: "4px solid red",
    },
    shifted: {
        width: `calc(100vw - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
      },
}))

const AdjustForDrawerContainer = ({
  UI: {
    portalDrawer: { open: drawerIsOpen },
    viewport: {navHeight}
  },
  props: {children}
}) => {
    const [shifted, setShifted] = useState(false)
    const [styles, setStyles] = useState({})
    useEffect(() => {
        setShifted(drawerIsOpen)
    }, [drawerIsOpen, navHeight])
    const style = {
        position: 'absolute',
        top: 
    }
  return <div className={clsx(classes.root, shifted && classes.shifted)}>{...children}</div>;
};

const mapStateToProps = (state, props) => ({
  UI: state.UI,
  props: props
});

export default connect(mapStateToProps)(AdjustForDrawerContainer);
