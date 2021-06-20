import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import * as types from "../stateManagement/TYPES";
import Alert from "../components/Alert";
import ModalWithConfirmation from "../components/Modal";
import PortalAuthenticated from "../components/portalAuthenticated/PortalAuthenticated";

const Home = ({
  viewport: { width: deviceWidth, height: deviceHeight, navHeight },
  user: {
    loggedIn,
    user: { token },
  },
}) => {
  const dispatch = useDispatch();
  const [offsetHeight, setOffsetHeight] = useState({});

  return (
    <div style={offsetHeight}>
      <div>Welp...</div>
      <style jsx>{``}</style>
    </div>
  );
};

// export async function getServerSideProps(context) {
//   return {
//     props: {},
//   };
// }

const mapStateToProps = (state, props) => ({
  viewport: state.UI.viewport,
  user: state.user,
});

export default connect(mapStateToProps)(Home);
