import React from "react";
import { connect } from "react-redux";

function Message({ message }) {
  if (!message) return null;

  return <div id="message">{message}</div>;
}

const mapStateToProps = (state) => ({
  message: state.infoMessage,
});

export default connect(mapStateToProps)(Message);
