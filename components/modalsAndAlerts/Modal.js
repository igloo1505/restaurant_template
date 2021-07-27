import React, { useEffect, Fragment, useState, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import * as Types from "../../stateManagement/TYPES";
import { showModal, hideModal } from "../../stateManagement/uiActions";
import ClientSidePortal from "../portalAuthenticated/ClientSidePortal";

const modalId = "modal_ref_id";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    flexGrow: 1,
    minWidth: 300,
    transform: "translateZ(0)",
    backgroundColor: "transparent",
  },
  modal: {
    display: "flex",
    padding: theme.spacing(1),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    borderRadius: "5px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ModalComponent = ({
  UI: { isClient },
  modal: { isOpen, dismissible, variant },
  showModal,
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [backDropStyles, setBackDropStyles] = useState({ width: 0, height: 0 });

  // DELETE AFTER CONFIRMATION MODAL AND FORM MODAL WORKING
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     document.addEventListener("keydown", (e) => {
  //       if (e.code === "Space") {
  //         // dispatch({ type: Types.SHOW_ALERT });
  //         dispatch({
  //           type: Types.SHOW_SNACKBAR,
  //           payload: {
  //             message: "Getting rid of frustrated curse words before I commit.",
  //             variant: "success",
  //           },
  //         });
  //         // showModal();
  //       }
  //     });
  //   }
  // }, [isClient]);

  useEffect(() => {
    if (isOpen) {
      setBackDropStyles({ width: "100vw", height: "100vh" });
    }
    if (!isOpen) {
      setBackDropStyles({ width: 0, height: 0 });
    }
  }, [isOpen]);

  const handleBackdropClick = () => {
    if (dismissible) {
      dispatch({ type: Types.HIDE_MODAL });
    }
  };

  const willOpen = () => {
    setBackDropStyles({ width: "100vw", height: "100vh" });
  };

  // const rootRef = useRef(null);

  return (
    <Fragment>
      <ClientSidePortal selector="#topLevelPortalContainer">
        <div
          className={classes.root}
          id={modalId}
          // ref={rootRef}
          style={backDropStyles}
          onClick={handleBackdropClick}
        >
          <Modal
            disablePortal
            disableEnforceFocus
            disableAutoFocus
            open={isOpen}
            // hideBackdrop
            onOpen={willOpen}
            BackdropProps={{ id: "backDropDiv" }}
            // aria-labelledby=""
            // aria-describedby=""
            className={classes.modal}
            // container={() => rootRef.current}
            container={() => {
              if (typeof window !== "undefined") {
                document.getElementById(modalId);
              }
            }}
          >
            <ModalChildren variant={variant} />
          </Modal>
        </div>
      </ClientSidePortal>
    </Fragment>
  );
};

const mapStateToProps = (state, props) => ({
  UI: state.UI,
  modal: state.modal,
});

export default connect(mapStateToProps, { showModal })(ModalComponent);

const ModalChildren = ({ variant }) => {
  switch (variant) {
    default:
      return null;
  }
};
