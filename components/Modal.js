import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { toggleModal } from "../stateManagement/uiActions";
import {
  MODAL_DISMISSED,
  MODAL_CONFIRMED,
  SET_MODAL_INSTANCE,
  TOGGLE_MODAL,
} from "../stateManagement/TYPES";

const ModalWithConfirmation = ({
  modal: { modalText, modalHeader, isConfirmation, isOpen },
  UI: { isEditing },
  toggleModal,
}) => {
  const dispatch = useDispatch();
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [modalInstance, setModalInstance] = useState(null);
  useEffect(() => {
    handleModalOpenState();
  }, [isOpen]);

  const handleModalOpenState = () => {
    if (typeof window !== "undefined") {
      let em = document.getElementById("portalModal");
      let initialInstance = new bootstrap.Modal(em);
      if (initialInstance && isFirstRender) {
        setModalInstance(initialInstance);
        setIsFirstRender(false);
      }
      let instance = bootstrap.Modal.getInstance(
        window.document.getElementById("portalModal")
      );
      if (isOpen) {
        modalInstance ? modalInstance.show() : instance.show();
      }
      if (!isOpen) {
        modalInstance ? modalInstance.hide() : instance.hide();
      }
    }
  };

  const dispatchFromModalConfirmation = (isConfirmed) => {
    // if (!isConfirmation) {
    //   dispatch({ type: TOGGLE_MODAL });
    // }
    // isConfirmed
    //   ? dispatch({
    //       type: MODAL_CONFIRMED,
    //     })
    //   : dispatch({
    //       type: MODAL_DISMISSED,
    //     });
  };

  return (
    <div
      class="modal fade"
      id="portalModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
              {modalHeader}
            </h5>
            <button
              type="button"
              class="btn-close"
              aria-label="Close"
              id="modalDeniedButtonX"
              onClick={() => dispatchFromModalConfirmation(false)}
            ></button>
          </div>
          <div class="modal-body">{modalText}</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              id="modalDeniedButton"
              onClick={() => dispatchFromModalConfirmation(false)}
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              style={
                isConfirmation ? { display: "block" } : { display: "none" }
              }
              id="modalConfirmationButton"
              onClick={() => dispatchFromModalConfirmation(true)}
            >
              Understood
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  modal: state.UI.modal,
  UI: state.UI,
});

export default connect(mapStateToProps, { toggleModal })(ModalWithConfirmation);
