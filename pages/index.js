import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import * as types from "../stateManagement/TYPES";

const Home = ({
  viewport: { width: deviceWidth, height: deviceHeight, navHeight },
  user: {
    loggedIn,
    self: { token },
  },
}) => {
  const dispatch = useDispatch();
  const [offsetHeight, setOffsetHeight] = useState({});

  return (
    <div style={offsetHeight} id="applicationWrapper">
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
